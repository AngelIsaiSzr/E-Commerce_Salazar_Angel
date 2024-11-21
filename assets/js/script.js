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
    
    document.querySelector('#productGrid').innerHTML = cardsArray;
}

// Mostrar loader y luego la grilla de productos
function cargarProductos() {
    const loader = document.getElementById("loader");
    const productGrid = document.getElementById("productGrid");

    // Simular un retraso de 3 segundos con una promesa
    new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 3000); // 3 segundos
    }).then(() => {
        // Ocultar el loader y mostrar la grilla de productos
        loader.classList.add("d-none");
        productGrid.classList.remove("d-none");
        generarTarjetas(data); // Generar las tarjetas
    });
}

// Iniciar la carga de productos al cargar la página
cargarProductos();
