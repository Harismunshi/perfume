const burger = document.getElementById("hamburger");
const list = document.getElementById("navlist")

burger.addEventListener("click",()=>{
    list.classList.toggle("navlist-active");
})







let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = cart.reduce((count, item) => count + item.quantity, 0);
document.getElementById('cart-count').textContent = cartCount;

// Sample products with images
const products = [
    {
        name: 'Acqua di Gio',
        price: 34.00,
        image: 'images/perfume2.png'
    },
    {
        name: 'Giorgio Armani',
        price: 40.00,
        image: 'images/perfume3.png'
    },
    {
        name: 'Dior Poison Eau de Toilette',
        price: 70.00,
        image: 'images/perfume4.png'
    },
    {
        name: 'Mon Paris Floral Edp',
        price: 95.00,
        image: 'images/perfume5.png'
    },
    {
        name: 'Givenchy Gentleman EDT',
        price: 53.00,
        image: 'images/perfume6.png'
    },
    {
        name: 'Wanted Eau De Toilette',
        price: 54.00,
        image: 'images/perfume7.png'
    },
    
    // Add more products as needed
];

function addToCart(name, price, image) {
    const product = { name, price, quantity: 1, image };
    const existingProductIndex = cart.findIndex(item => item.name === name);

    if (existingProductIndex !== -1) {
        // If product already exists, increase quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // Otherwise, add new product
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Store cart in localStorage
    updateCartCount();
}


function updateCartCount() {
    cartCount = cart.reduce((count, item) => count + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

function displayCartItems() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = ''; // Clear previous items

    let total = 0;
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <div class="cart-item-content">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div>
                    <span>${item.name}</span>
                    <span>$${item.price.toFixed(2)}</span>
                    <button onclick="changeQuantity('${item.name}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity('${item.name}', 1)">+</button>
                </div>
            </div>
        `;
        cartItemsDiv.appendChild(itemDiv); // Append itemDiv to the cart items div
        total += item.price * item.quantity; // Calculate total
    });

    document.getElementById('total-price').textContent = `Total: $${total.toFixed(2)}`;
}


function changeQuantity(name, amount) {
    const productIndex = cart.findIndex(item => item.name === name);
    
    if (productIndex !== -1) {
        cart[productIndex].quantity += amount;
        if (cart[productIndex].quantity <= 0) {
            cart.splice(productIndex, 1); // Remove product if quantity is 0
        }
        localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
        updateCartCount();
        if (document.title === "Your Cart") displayCartItems(); // Refresh cart display
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    alert('Thank you for your purchase!');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart)); // Clear cart from localStorage
    updateCartCount();
    if (document.title === "Your Cart") displayCartItems(); // Refresh cart display
}

// Display cart items on cart page load
if (document.title === "Your Cart") {
    displayCartItems();
}

// Example of adding product to cart (from main page)
// Assuming 'Add to Cart' button is updated to call addToCart with image URL
