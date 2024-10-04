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
        li.innerHTML = `   
                    <li class="list__item">
                    <img class="list__item__img" style="width: 80px;" src="${item.image}" alt="">
                    <div class="list__item__details">
                        <div>${item.name}</div>
                        <div>${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' р.'}</div>
                    </div>
                    
                    <div class="count">
                        <button class="count__btn" data-sellix-cart-remove="${item.id}" onclick="removeFromCart('${item.id}')">-</button>
                        <p class="count__num">${item.quantity}</p>
                        <button class="count__btn" data-sellix-cart-add="${item.id}" onclick="toCart('${item.id}')">+</button>
                    </div>
                </li>
                        
                        `;
        cartItems.appendChild(li);
    });

    // Format the total price with spaces and currency
    total = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' р.';

    document.getElementById("totalPrice").innerText = total;
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

function toCart(productId) {
    const index = cart.findIndex(item => item.id === productId);

    if (index > -1) {
        cart[index].quantity++;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    updateCart();
    saveCartToLocalStorage();
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
