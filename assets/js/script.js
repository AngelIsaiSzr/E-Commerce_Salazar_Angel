// Simulamos los datos JSON obtenidos de Mockaroo
const data = [
    {
        "id": 1,
        "titulo": "Botella Reutilizable de Acero Inoxidable",
        "descripcion": "Botella de acero inoxidable de 750 ml, perfecta para mantener tus bebidas frías o calientes durante todo el día. Libre de BPA, segura y duradera.",
        "precio": 25.99,
        "imagen": "https://http2.mlstatic.com/D_NQ_NP_670471-MLM75693115055_042024-O.webp",
        "categoria": "Hogar"
    },
    {
        "id": 2,
        "titulo": "Set de Utensilios de Cocina de Bambú",
        "descripcion": "Este set incluye 7 utensilios de cocina (cuchara, espátula, tenedor, cuchara ranurada, espátula ranurada, etc), hechos de bambú 100% natural.",
        "precio": 19.99,
        "imagen": "https://i.blogs.es/715892/8-piezas-juego-de-utensilios-de-cocina-de-madera-de-bambu/original.jpeg",
        "categoria": "Cocina"
    },
    {
        "id": 3,
        "titulo": "Bolsas de Compras Reutilizables de Algodón Orgánico",
        "descripcion": "Bolsas de tela resistente, perfectas y cómodas para llevar tus compras diarias. Hechas de algodón orgánico, lavables, reutilizables y duraderas.",
        "precio": 12.99,
        "imagen": "https://i.etsystatic.com/19857089/r/il/373b2c/3833517693/il_570xN.3833517693_8d4l.jpg",
        "categoria": "Moda"
    }
];

// Función para generar las tarjetas de productos
function generarTarjetas(productos) {
    const cardsArray = productos.map(producto => `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.titulo}">
                <div class="card-body">
                    <h5 class="card-title">${producto.titulo}</h5>
                    <p class="card-text">${producto.descripcion}</p>
                    <p class="card-text"><strong>Precio: $${producto.precio.toFixed(2)}</strong></p>
                    <a href="producto.html?prod=${producto.id}" class="btn btn-success">Ver más</a>
                </div>
            </div>
        </div>
    `).join('');
    
    document.querySelector('.row').innerHTML = cardsArray;
}

// Llamar al generador de la barra de navegación y configurar el buscador
generarNavbar(configurarBuscador);

// Mostrar todos los productos al cargar la página
generarTarjetas(data);

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
