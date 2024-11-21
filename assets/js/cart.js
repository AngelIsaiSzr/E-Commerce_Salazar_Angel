// Redirigir a la Home si no hay sesión activa
if (!localStorage.getItem("email")) {
    window.location.href = "index.html";
}

// Seleccionar el contenedor de las cards y el total
const cartContainer = document.querySelector(".col-xl-8 .card-body");
const orderTotal = document.querySelector(".card-body .fw-bold");

// Leer datos del carrito desde localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Función para renderizar el carrito
function renderCart() {
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="alert alert-warning" role="alert">
                ¡Tu carrito está vacío! <a href="productos.html" class="alert-link">Ve a comprar.</a>
            </div>`;
        orderTotal.textContent = "$0.00";
        return;
    }

    // Mapear los productos en el carrito
    cartContainer.innerHTML = cart
        .map(
            (product) => `
        <div class="d-flex align-items-start border-bottom pb-3 pt-3">
            <div class="me-4">
                <img src="${product.imagen}" alt="${product.titulo}" class="avatar-lg rounded">
            </div>
            <div class="flex-grow-1 overflow-hidden">
                <h5 class="text-truncate font-size-18">${product.titulo}</h5>
                <div class="row">
                    <div class="col-md-4">
                        <div class="mt-3">
                            <p class="text-muted mb-2">Precio</p>
                            <h5 class="mb-0 mt-2">$${product.precio.toFixed(2)}</h5>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="mt-3">
                            <p class="text-muted mb-2">Cantidad</p>
                            <h5 class="mb-0 mt-2">${product.cantidad}</h5>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="mt-3">
                            <p class="text-muted mb-2">Total</p>
                            <h5>$${(product.precio * product.cantidad).toFixed(2)}</h5>
                        </div>
                    </div>
                </div>
                <button class="btn btn-danger btn-sm mt-2" onclick="removeProduct(${product.id})">
                    Eliminar
                </button>
            </div>
        </div>`
        )
        .join("");

    // Calcular y mostrar el total
    const total = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    orderTotal.textContent = `$${total.toFixed(2)}`;
}

// Función para eliminar un producto del carrito
function removeProduct(productId) {
    cart = cart.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("quantity", cart.reduce((sum, item) => sum + item.cantidad, 0));
    document.getElementById("quantity").textContent = localStorage.getItem("quantity");
    renderCart();
}

// Función para vaciar el carrito
function emptyCart() {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("quantity", "0");
    document.getElementById("quantity").textContent = "0";
    renderCart();
}

// Renderizar el carrito al cargar la página
renderCart();

// Evento para el botón de seguir comprando
document.getElementById("btn-seguir-comprando").addEventListener("click", () => {
    window.location.href = "productos.html";
});

// Evento para el botón de Checkout
document.getElementById("btn-checkout").addEventListener("click", () => {
    if (cart.length === 0) {
        Swal.fire("Carrito vacío", "No tienes productos en el carrito.", "error");
        return;
    }

    // Obtener el email del usuario
    const email = localStorage.getItem("email");

    // Crear los datos de la orden
    const orderData = {
        email: email,
        items: cart,
        total: orderTotal.textContent.replace("$", ""),
        date: new Date().toISOString(),
    };

    // Realizar el fetch al MockAPI
    fetch("https://673fa634a9bc276ec4b936e4.mockapi.io/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al procesar la orden.");
            }
            return response.json();
        })
        .then((order) => {
            Swal.fire({
                title: "¡Compra realizada con éxito!",
                html: `
                    <p>Email: ${order.email}</p>
                    <p>Número de Orden: ${order.id}</p>
                    <p>Total: $${order.total}</p>
                `,
                icon: "success",
            });
            emptyCart(); // Vaciar el carrito
        })
        .catch((error) => {
            Swal.fire("Error", "No se pudo completar tu compra. Intenta de nuevo.", "error");
        });
});
