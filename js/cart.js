// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Display cart items
    function displayCartItems() {
        const cartItems = document.querySelector('.cart-items');
        const emptyCart = document.querySelector('.empty-cart');
        const cartSummary = document.querySelector('.cart-summary');

        if (cart.length === 0) {
            if (emptyCart) emptyCart.style.display = 'block';
            if (cartItems) cartItems.style.display = 'none';
            if (cartSummary) cartSummary.style.display = 'none';
            return;
        }

        if (emptyCart) emptyCart.style.display = 'none';
        if (cartItems) cartItems.style.display = 'block';
        if (cartSummary) cartSummary.style.display = 'block';

        if (cartItems) {
            cartItems.innerHTML = '';
            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="item-image">
                    <div class="item-details">
                        <h3 class="item-title">${item.name}</h3>
                        <p class="item-price">$${item.price}</p>
                        <div class="item-quantity">
                            <button class="quantity-btn minus" data-index="${index}">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1">
                            <button class="quantity-btn plus" data-index="${index}">+</button>
                        </div>
                    </div>
                    <button class="remove-item" data-index="${index}">
                        <i class="fa fa-trash"></i>
                    </button>
                `;
                cartItems.appendChild(cartItem);
            });

            // Add event listeners for quantity buttons
            document.querySelectorAll('.quantity-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const index = this.dataset.index;
                    if (this.classList.contains('minus')) {
                        updateQuantity(index, -1);
                    } else {
                        updateQuantity(index, 1);
                    }
                });
            });

            // Add event listeners for remove buttons
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', function() {
                    const index = this.dataset.index;
                    removeItem(index);
                });
            });

            // Add event listeners for quantity inputs
            document.querySelectorAll('.quantity-input').forEach(input => {
                input.addEventListener('change', function() {
                    const index = this.parentElement.querySelector('.minus').dataset.index;
                    const newQuantity = parseInt(this.value);
                    if (newQuantity > 0) {
                        cart[index].quantity = newQuantity;
                        localStorage.setItem('cart', JSON.stringify(cart));
                        updateCartSummary();
                        updateCartCount();
                    }
                });
            });
        }
    }

    // Update quantity
    function updateQuantity(index, change) {
        cart[index].quantity += change;
        if (cart[index].quantity < 1) {
            cart[index].quantity = 1;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateCartSummary();
        updateCartCount();
    }

    // Remove item from cart
    function removeItem(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateCartSummary();
        updateCartCount();
    }

    // Update cart summary
    function updateCartSummary() {
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const shipping = subtotal > 50 ? 0 : 5;
        const total = subtotal + shipping;

        const subtotalElement = document.querySelector('.summary-row:nth-child(1) span:last-child');
        const shippingElement = document.querySelector('.summary-row:nth-child(2) span:last-child');
        const totalElement = document.querySelector('.total-row span:last-child');

        if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        if (shippingElement) shippingElement.textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
        if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Update cart count in header
    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems > 0 ? `(${totalItems})` : '';
            cartCount.style.display = totalItems > 0 ? 'inline' : 'none';
        }
    }

    // Initialize cart display and summary
    displayCartItems();
    updateCartSummary();
    updateCartCount();
});

// Add to cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const product = JSON.parse(this.dataset.product);
        addToCart(product);
        updateCartCount();
        showNotification('Product added to cart!');
    });
});

// Add product to cart
function addToCart(product) {
    const existingItem = cart.find(item => item.name === product.name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
    fetch("php/getProducts.php")
        .then((response) => response.json())
        .then((products) => {
            const productGrid = document.querySelector(".product-grid");
            productGrid.innerHTML = "";
            products.forEach((product) => {
                const productItem = document.createElement("div");
                productItem.classList.add("product");
                productItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <span class="price">$${product.price}</span>
                    <button class="add-to-cart" 
                        data-product='${JSON.stringify(product)}'>Add to Cart</button>
                `;
                productGrid.appendChild(productItem);
            });
        })
        .catch((error) => console.error("Error loading products:", error));
});
