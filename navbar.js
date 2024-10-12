// Función para generar la barra de navegación
function generarNavbar(callback) {
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

                <!-- Buscador -->
                <form class="d-flex">
                    <input id="searchInput" class="form-control me-2" type="search" placeholder="Buscar productos..."
                        aria-label="Search">
                    <button id="searchButton" class="btn btn-outline-primary me-2" type="button">Buscar</button>
                    <button id="clearButton" class="btn btn-outline-secondary" type="button">Limpiar</button>
                </form>
            </div>
        </div>
    </nav>
    `;

    // Insertar la barra de navegación en el documento
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    // Obtener la página actual para asignar la clase active al enlace correspondiente
    const currentPage = window.location.pathname.split('/').pop();

    // Asignar la clase active al enlace correspondiente
    if (currentPage === 'index.html') {
        document.getElementById('nav-inicio').classList.add('active');
        document.getElementById('nav-inicio').setAttribute('aria-current', 'page');
    } else if (currentPage === 'productos.html') {
        document.getElementById('nav-productos').classList.add('active');
        document.getElementById('nav-productos').setAttribute('aria-current', 'page');
    } else if (currentPage === 'ofertas.html') {
        document.getElementById('nav-ofertas').classList.add('active');
        document.getElementById('nav-ofertas').setAttribute('aria-current', 'page');
    } else if (currentPage === 'contacto.html') {
        document.getElementById('nav-contacto').classList.add('active');
        document.getElementById('nav-contacto').setAttribute('aria-current', 'page');
    }

    // Ejecutar el callback después de generar el navbar
    if (callback && typeof callback === 'function') {
        callback();
    }
}
