let cart = []; // Array to hold cart items

function addToCart(productName, productPrice, productImage, productId) {
    const existingProductIndex = cart.findIndex(item => item.id === productId);

    if (existingProductIndex > -1) {
        // Product exists in the cart, increase the quantity
        cart[existingProductIndex].quantity++;
    } else {
        // Create a new product object with quantity 1
        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1 // Initial quantity
        };
        // Add the product to the cart
        cart.push(product);
    }

    updateCart(); // Update the cart display
}

function updateCart() {
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = ''; // Clear the existing items
    let total = 0;

    // Loop through cart and add items to the cart display
    cart.forEach((item) => {
        total += item.price * item.quantity; // Calculate total price considering quantity
        const li = document.createElement("li");
        li.innerHTML = `<img src="${item.image}" alt="${item.name}" style="width: 50px;"> 
                        ${item.name} - ${item.price} р. (Количество: ${item.quantity}) 
                        <button data-sellix-cart-remove="${item.id}" onclick="removeFromCart('${item.id}')">Удалить</button>`;
        cartItems.appendChild(li);
    });

    // Update the total price display
    document.getElementById("totalPrice").innerText = `Итого: ${total} р.`;
}

function removeFromCart(productId) {
    // Find the product in the cart using the unique ID
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
        // Reduce the quantity or remove the item from the cart
        if (cart[index].quantity > 1) {
            cart[index].quantity--; // Decrease quantity
        } else {
            cart.splice(index, 1); // Remove the item completely
        }
    }
    updateCart(); // Update the cart display
}

// Handle checkout process
function handleCheckout() {
    // Check if the cart is empty
    if (cart.length === 0) {
        alert("Ваша корзина пуста."); // Alert if cart is empty
        return;
    }

    // Prepare checkout items string
    const checkoutItems = cart.map(item => `${item.id}:${item.quantity}`).join(',');

    // Update the Sellix checkout button data attribute
    const checkoutButton = document.querySelector('[data-sellix-cart]');
    checkoutButton.setAttribute('data-sellix-cart', checkoutItems);
    
    // Here you can also trigger the checkout modal if needed
    console.log("Checkout items:", checkoutItems);

    // If you have an explicit checkout function from Sellix, call it here
    // Example: sellixCheckout(checkoutItems);
}

// Example button for checkout
// <button data-sellix-cart="PRODUCT_UNIQID:QUANTITY,PRODUCT_UNIQID" onclick="handleCheckout()">Checkout</button>
