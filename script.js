// Asignar el título "Productos Destacados" al h2
document.querySelector('h2').textContent = 'Productos Destacados';

// Crear un array vacío para almacenar las tarjetas (cards)
const cardsArray = [];

// Crear un bucle for que agregue las tarjetas dinámicamente
for (let i = 1; i <= 9; i++) {
    const card = `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card">
                <img src="https://66d9ee6caa07a954166f10ed--gregarious-melba-cacdba.netlify.app/${i}.jpg" class="card-img-top" alt="Producto ${i}">
                <div class="card-body">
                    <h5 class="card-title">Producto ${i}</h5>
                    <p class="card-text">Descripción del producto ${i}.</p>
                    <p class="card-text"><strong>Precio: $${(i * 10)}.00</strong></p>
                    <a href="#" class="btn btn-success">Ver más</a>
                </div>
            </div>
        </div>
    `;

    // Agregar la tarjeta creada al array
    cardsArray.push(card);
}

// Asignar el contenido del array al div con la clase "row"
document.querySelector('.row').innerHTML = cardsArray.join('');