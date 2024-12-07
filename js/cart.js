document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCart() {
        const cartItems = document.querySelector(".cart-items");
        cartItems.innerHTML = "";
        let subtotal = 0;

        cart.forEach((product, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <span class="price">$${product.price}</span>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;
            cartItems.appendChild(cartItem);
            subtotal += product.price;
        });

        document.getElementById("subtotal").innerText = `$${subtotal.toFixed(2)}`;
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    document.querySelector(".cart-items").addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-btn")) {
            const index = e.target.getAttribute("data-index");
            cart.splice(index, 1);
            updateCart();
        }
    });

    document.getElementById("checkout-btn").addEventListener("click", () => {
        const address = document.getElementById("address").value;
        if (cart.length && address) {
            alert(`Order placed! Total: ${document.getElementById("subtotal").innerText}, Shipping to: ${address}`);
            cart = [];
            updateCart();
        } else {
            alert("Please add items to cart and enter an address.");
        }
    });

    updateCart();
});
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
