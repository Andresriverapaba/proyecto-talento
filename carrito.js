const products = [
    { id: 1, name: "Totuma Decorativa", price: 15000 },
    { id: 2, name: "Hamaca Artesanal", price: 120000 },
    { id: 3, name: "Sombrero Vueltiao", price: 80000 },
    { id: 4, name: "Bolso Wayuu", price: 70000 },
    { id: 5, name: "Collar de Coral", price: 30000 },
    { id: 6, name: "Pulsera Tejida", price: 20000 },
    { id: 7, name: "Sandalias de Cuero", price: 60000 },
    { id: 8, name: "Sombrilla Artesanal", price: 45000 },
    { id: 9, name: "Tapete Tejido", price: 90000 },
    { id: 10, name: "Cuadro Decorativo", price: 50000 },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Renderizar productos en la página de productos
function renderProducts() {
    const productList = document.getElementById("product-list");
    if (productList) {
        products.forEach((product) => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("card", "mb-3");
            productDiv.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Precio: ${product.price} COP</p>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}">Agregar al carrito</button>
                </div>
            `;
            productList.appendChild(productDiv);
        });

        // Event listener para agregar productos al carrito
        document.querySelectorAll(".add-to-cart").forEach((button) => {
            button.addEventListener("click", (e) => {
                const productId = parseInt(e.target.getAttribute("data-id"));
                addToCart(productId);
            });
        });
    }
}

// Agregar productos al carrito
function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    const existingProduct = cart.find((item) => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} se agregó al carrito`);
}

// Renderizar el carrito
function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (cartItems) {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td><input type="number" class="quantity" data-id="${item.id}" value="${item.quantity}" min="1"></td>
                <td>${item.price} COP</td>
                <td>${itemTotal} COP</td>
                <td>
                    <button class="btn btn-danger btn-sm remove-item" data-id="${item.id}">Eliminar</button>
                </td>
            `;
            cartItems.appendChild(row);
        });

        cartTotal.textContent = total;

        // Event listeners para eliminar y actualizar cantidades
        document.querySelectorAll(".remove-item").forEach((button) => {
            button.addEventListener("click", (e) => {
                const productId = parseInt(e.target.getAttribute("data-id"));
                removeFromCart(productId);
            });
        });

        document.querySelectorAll(".quantity").forEach((input) => {
            input.addEventListener("change", (e) => {
                const productId = parseInt(e.target.getAttribute("data-id"));
                const quantity = parseInt(e.target.value);
                updateQuantity(productId, quantity);
            });
        });
    }
}

// Eliminar producto del carrito
function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// Actualizar cantidad
function updateQuantity(productId, quantity) {
    const product = cart.find((item) => item.id === productId);
    if (product) {
        product.quantity = quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }
}

// Vaciar carrito
document.getElementById("clear-cart")?.addEventListener("click", () => {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
});

// Pagar
document.getElementById("checkout")?.addEventListener("click", () => {
    alert("Redirigiendo a la pasarela de pago...");
    // Aquí puedes integrar PayPal
});

renderProducts();
renderCart();
