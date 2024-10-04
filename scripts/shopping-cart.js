let cart = JSON.parse(localStorage.getItem('cart')) || []; // Load cart from local storage or initialize as empty

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
    saveCartToLocalStorage(); // Save updated cart to local storage
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
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
        if (cart[index].quantity > 1) {
            // Decrease quantity
            cart[index].quantity--;
        } else {
            // Remove the item completely
            cart.splice(index, 1);
        }
        
        updateCart(); // Update the cart display
        saveCartToLocalStorage(); // Save updated cart to local storage
    }
}

function handleCheckout() {
    // Load the latest cart from local storage to ensure it reflects current state
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

    let checkoutItems;
    
    if (storedCart.length === 0) {
        alert("Ваша корзина пуста."); // Alert if cart is empty
        
        // Set checkoutItems to null for Sellix API call when there are no items in the cart
        checkoutItems = null; 
    } else {
        checkoutItems = storedCart.map(item => `${item.id}:${item.quantity}`).join(',');
    }

    const checkoutButton = document.querySelector('[data-sellix-cart]');
    
    // Pass null if there are no items in the storedCart, otherwise pass checkoutItems
    checkoutButton.setAttribute('data-sellix-cart', checkoutItems);

    console.log("Checkout items:", checkoutItems);

    // Proceed with your API call or further processing here...
}

// Function to save the current state of the cart to local storage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Initialize the display on page load
document.addEventListener('DOMContentLoaded', updateCart);
