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

// Capturar el parámetro de búsqueda de la URL
const params = new URLSearchParams(window.location.search);
const searchTerm = params.get('search');

// Mantener el valor del término de búsqueda en el input
const searchInput = document.getElementById('searchInput');
if (searchTerm) {
    searchInput.value = searchTerm; // Mostrar el término en el input
    const filterData = data.filter(producto =>
        producto.titulo.toLowerCase().includes(searchTerm) ||
        producto.descripcion.toLowerCase().includes(searchTerm)
    );
    generarTarjetas(filterData);
} else {
    // Si no hay término de búsqueda, mostrar todos los productos
    generarTarjetas(data);
}

// Capturar los botones de categorías
const categoriaButtons = document.querySelectorAll('button[data-categoria]');
const verTodosButton = document.getElementById('verTodos');

// Filtrar por categoría al hacer clic en los botones de categorías
categoriaButtons.forEach(button => {
    button.addEventListener('click', () => {
        const categoria = button.getAttribute('data-categoria');
        const filterData = data.filter(producto => producto.categoria === categoria);
        generarTarjetas(filterData);
    });
});

// Mostrar todos los productos cuando se hace clic en "Ver Todos"
verTodosButton.addEventListener('click', () => {
    generarTarjetas(data); // Mostrar todos los productos
});