// Simulamos los datos JSON obtenidos de Mockaroo
const data = [
    {
        id: 1,
        titulo: "Botella Reutilizable de Acero Inoxidable",
        descripcion: "Botella de acero inoxidable de 750 ml, perfecta para mantener tus bebidas frías o calientes durante todo el día. Libre de BPA, segura y duradera.",
        precio: 25.99,
        imagen: "https://http2.mlstatic.com/D_NQ_NP_670471-MLM75693115055_042024-O.webp",
        categoria: "Hogar",
        stock: 20
    },
    {
        id: 2,
        titulo: "Set de Utensilios de Cocina de Bambú",
        descripcion: "Este set incluye 7 utensilios de cocina (cuchara, espátula, tenedor, cuchara ranurada, espátula ranurada, etc), hechos de bambú 100% natural.",
        precio: 19.99,
        imagen: "https://i.blogs.es/715892/8-piezas-juego-de-utensilios-de-cocina-de-madera-de-bambu/original.jpeg",
        categoria: "Cocina",
        stock: 15
    },
    {
        id: 3,
        titulo: "Bolsas de Compras Reutilizables de Algodón Orgánico",
        descripcion: "Bolsas de tela resistente, perfectas y cómodas para llevar tus compras diarias. Hechas de algodón orgánico, lavables, reutilizables y duraderas.",
        precio: 12.99,
        imagen: "https://i.etsystatic.com/19857089/r/il/373b2c/3833517693/il_570xN.3833517693_8d4l.jpg",
        categoria: "Moda",
        stock: 50
    }
];

// Obtener el ID del producto desde la URL
const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("prod"), 10);

// Verificar si el usuario está logueado
const isLoggedIn = localStorage.getItem("email");

// Filtrar el producto que coincida con el ID
const producto = data.find((item) => item.id === productId);

// Crear la estructura HTML con los datos del producto seleccionado
if (producto) {
    const etiquetas = `
        <div class="product-detail-container">
            <img src="${producto.imagen}" alt="${producto.titulo}">
            <div class="product-detail-content">
                <h1>${producto.titulo}</h1>
                <p>${producto.descripcion}</p>
                <strong>Precio: $${producto.precio.toFixed(2)}</strong>
                <p class="product-detail-stock">Stock disponible: ${producto.stock} unidades</p>
                
                <div class="action-section">
                    <div class="contador mt-3" style="display: ${
                        isLoggedIn ? "block" : "none"
                    };">
                        <label for="cantidad">Cantidad:</label>
                        <div class="action-section-count">
                            <button class="btn btn-outline-secondary" id="decrementar">-</button>
                            <input type="text" id="cantidad" value="1" min="1" max="${producto.stock}" class="form-control" style="width: 80px;" disabled>
                            <button class="btn btn-outline-secondary" id="incrementar">+</button>
                        </div>
                    </div>
                    <button class="btn btn-${isLoggedIn ? "success" : "primary"} mt-3" onclick="${
        isLoggedIn ? "addCart()" : "window.location.href='login.html'"
    }">
                        ${isLoggedIn ? "Agregar al carrito" : "Iniciar sesión para comprar"}
                    </button>
                </div>
            </div>
        </div>
    `;

    // Insertar el contenido generado en el main de producto.html
    document.querySelector("main").innerHTML = etiquetas;

    if (isLoggedIn) {
        // Agregar eventos a los botones
        document.getElementById("incrementar").addEventListener("click", incrementarCantidad);
        document.getElementById("decrementar").addEventListener("click", decrementarCantidad);
    }
} else {
    // Si el producto no existe, mostrar un mensaje de error
    document.querySelector("main").innerHTML = "<p>Producto no encontrado</p>";
}

// Incrementar cantidad
function incrementarCantidad() {
    const cantidadInput = document.getElementById("cantidad");
    let cantidad = parseInt(cantidadInput.value, 10);
    if (cantidad < producto.stock) {
        cantidadInput.value = cantidad + 1;
    }
}

// Decrementar cantidad
function decrementarCantidad() {
    const cantidadInput = document.getElementById("cantidad");
    let cantidad = parseInt(cantidadInput.value, 10);
    if (cantidad > 1) {
        cantidadInput.value = cantidad - 1;
    }
}

// Agregar al carrito
// Agregar al carrito
function addCart() {
    const cantidad = parseInt(document.getElementById("cantidad").value, 10);
    let cart = JSON.parse(localStorage.getItem("cart"));
    const existingProduct = cart.find((item) => item.id === producto.id);

    if (existingProduct) {
        existingProduct.cantidad += cantidad;
    } else {
        cart.push({ ...producto, cantidad });
    }

    // Guardar carrito actualizado y la cantidad total en localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    const totalQuantity = cart.reduce((sum, item) => sum + item.cantidad, 0);
    localStorage.setItem("quantity", totalQuantity.toString());

    // Actualizar el tag #quantity en la navbar
    document.getElementById("quantity").textContent = totalQuantity;

    // Mostrar notificación con Toastify
    Toastify({
        text: `${cantidad} unidad(es) de "${producto.titulo}" agregada(s) al carrito.`,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        backgroundColor: "#198754",
        stopOnFocus: true,
    }).showToast();
}