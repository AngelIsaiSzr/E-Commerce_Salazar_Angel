// Función para generar la barra de navegación
function generarNavbar(callback) {
    const isLoggedIn = localStorage.getItem("email");
    const quantity = localStorage.getItem("quantity") || "0";

    const navbarHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">EcoMundo</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" id="nav-inicio" href="index.html">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="nav-productos" href="productos.html">Productos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="nav-ofertas" href="#">Ofertas</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="nav-contacto" href="#">Contacto</a>
                    </li>
                </ul>
    
                <!-- Contenedor Flex para el buscador y el carrito -->
                <div class="d-flex align-items-center ms-2">
                    
                    <!-- Buscador -->
                    <form class="search-section d-flex">
                        <input id="searchInput" class="form-control" type="search" placeholder="Buscar productos..."
                            aria-label="Search">
                        <button id="searchButton" class="btn" type="button" title="Buscar">
                            <i class="bi bi-search"></i>
                        </button>
                        <button id="clearButton" class="btn" type="button" title="Limpiar">
                            <i class="bi bi-x-circle"></i>
                        </button>
                    </form>
    
                    <!-- Carrito -->
                    <div class="cart-section d-flex align-items-center">
                        <a href="cart.html" class="d-flex align-items-center" style="text-decoration: none;">
                            <i class="bi bi-cart"></i>
                            <span id="quantity">${quantity}</span>
                        </a>
                    </div>
    
                </div>
    
                <!-- Sesión -->
                <button class="btn btn-outline-secondary ms-2" id="authButton" onclick="${
                    isLoggedIn ? "cerrarSesion()" : "window.location.href='login.html'"
                }">
                    ${isLoggedIn ? "Cerrar sesión" : "Iniciar sesión"}
                </button>
            </div>
        </div>
    </nav>
    `;
    

    // Insertar la barra de navegación en el documento
    document.body.insertAdjacentHTML("afterbegin", navbarHTML);

    // Asignar la clase active al enlace correspondiente
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll(".nav-link").forEach((link) => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });

    // Ejecutar el callback después de generar el navbar
    if (callback && typeof callback === "function") {
        callback();
    }
}

// Llamar al generador de la barra de navegación y configurar el buscador
generarNavbar(configurarBuscador);

// Función para configurar el buscador
function configurarBuscador() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const clearButton = document.getElementById('clearButton');

    // Búsqueda al hacer clic en "Buscar"
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            window.location.href = `productos.html?search=${searchTerm}`;
        }
    });

    // Búsqueda también al presionar "Enter"
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evitar el comportamiento por defecto del form
            const searchTerm = searchInput.value.toLowerCase();
            if (searchTerm) {
                window.location.href = `productos.html?search=${searchTerm}`;
            }
        }
    });

    // Limpiar el filtro cuando se hace clic en el botón de limpiar
    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        window.location.href = 'productos.html'; // Redirigir y mostrar todos los productos
    });
}

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem("email");
    localStorage.removeItem("cart");
    localStorage.removeItem("quantity");
    window.location.href = "login.html";
}