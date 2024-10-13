const burger = document.getElementById("hamburger");
const list = document.getElementById("navlist")

burger.addEventListener("click",()=>{
    list.classList.toggle("navlist-active");
})


let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = cart.reduce((count, item) => count + item.quantity, 0);
document.getElementById('cart-count').textContent = cartCount;


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
    

];

function addToCart(name, price, image) {
    const product = { name, price, quantity: 1, image };
    const existingProductIndex = cart.findIndex(item => item.name === name);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart)); 
    updateCartCount();
}


function showPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'block'; 

    
    setTimeout(() => {
        popup.style.display = 'none'; 
    }, 1000); 
}


document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.primary-btn').forEach(button => {
        button.addEventListener('click', showPopup);
    });
});



function updateCartCount() {
    cartCount = cart.reduce((count, item) => count + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}


function displayCartItems() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = ''; 

    let total = 0;
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <div class="cart-item-content">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <span class="item-name">${item.name}</span>
                    <span class="item-price">$${item.price.toFixed(2)}</span>
                </div>
                <div class="cart-item-buttons">
                    <button onclick="changeQuantity('${item.name}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity('${item.name}', 1)">+</button>
                </div>
            </div>
        `;
        cartItemsDiv.appendChild(itemDiv);
        total += item.price * item.quantity; 
    });

    
    document.getElementById('total-price').textContent = `Total: $${total.toFixed(2)}`;
}

function changeQuantity(name, amount) {
    const productIndex = cart.findIndex(item => item.name === name);
    
    if (productIndex !== -1) {
        cart[productIndex].quantity += amount;
        if (cart[productIndex].quantity <= 0) {
            cart.splice(productIndex, 1); 
        }
        localStorage.setItem('cart', JSON.stringify(cart)); 
        updateCartCount();
        if (document.title === "Your Cart") displayCartItems(); 
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    alert('Thank you for your purchase!');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart)); 
    updateCartCount();
    if (document.title === "Your Cart") displayCartItems(); 
}


if (document.title === "Your Cart") {
    displayCartItems();
}



