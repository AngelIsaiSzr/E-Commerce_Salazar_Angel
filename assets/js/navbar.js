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
                        <i class="bi bi-cart"></i>
                        <span id="quantity">${quantity}</span>
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

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem("email");
    localStorage.removeItem("cart");
    localStorage.removeItem("quantity");
    window.location.href = "login.html";
}