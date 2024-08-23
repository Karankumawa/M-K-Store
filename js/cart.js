// Cart array to store products
let cart = [];

// Function to add product to cart
function addToCart(product) {
    cart.push(product);
    updateCart();
}

// Function to update cart display
function updateCart() {
    const cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = '';
    let subtotal = 0;
    cart.forEach((product) => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <span class="price">${product.price}</span>
            <button class="remove-btn">Remove</button>
        `;
        cartItems.appendChild(cartItem);
        subtotal += product.price;
    });
    document.getElementById('subtotal').innerText = `$${subtotal.toFixed(2)}`;
}

// Function to remove product from cart
function removeProduct(product) {
    const index = cart.indexOf(product);
    if (index > -1) {
        cart.splice(index, 1);
        updateCart();
    }
}

// Add event listeners to cart buttons
document.addEventListener('DOMContentLoaded', () => {
    const cartButtons = document.querySelectorAll('.btn.add-to-cart');
    cartButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const product = {
                image: e.target.parentNode.querySelector('img').src,
                name: e.target.parentNode.querySelector('h3').innerText,
                description: e.target.parentNode.querySelector('p').innerText,
                price: parseFloat(e.target.parentNode.querySelector('span.price').innerText.replace('$', '')),
            };
            addToCart(product);
        });
    });

    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const product = {
                image: e.target.parentNode.querySelector('img').src,
                name: e.target.parentNode.querySelector('h3').innerText,
                description: e.target.parentNode.querySelector('p').innerText,
                price: parseFloat(e.target.parentNode.querySelector('span.price').innerText.replace('$', '')),
            };
            removeProduct(product);
        });
    });
});