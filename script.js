// Seleccionar las tres tarjetas utilizando querySelector
const card1 = document.querySelector('#card-1');
const card2 = document.querySelector('#card-2');
const card3 = document.querySelector('#card-3');

// Cambiar el nombre del producto en cada tarjeta
card1.querySelector('.card-title').textContent = 'Botella Ecológica';
card2.querySelector('.card-title').textContent = 'Set de Utensilios de Bambú';
card3.querySelector('.card-title').textContent = 'Bolsa Reutilizable de Algodón';

// Cambiar la descripción del producto en cada tarjeta
card1.querySelector('.card-text').textContent = 'Botella reutilizable de acero inoxidable, perfecta para el día a día.';
card2.querySelector('.card-text').textContent = 'Utensilios de cocina de bambú, ecológicos y duraderos.';
card3.querySelector('.card-text').textContent = 'Perfecta para tus compras diarias, resistente y duradera.';

// Cambiar el texto del botón en cada tarjeta
card1.querySelector('.btn').textContent = 'Añadir al carrito';
card2.querySelector('.btn').textContent = 'Añadir al carrito';
card3.querySelector('.btn').textContent = 'Añadir al carrito';

// Mostrar los cambios en la consola
console.log('Card 1:', card1.querySelector('.card-title').textContent, card1.querySelector('.card-text').textContent, card1.querySelector('.card-img-top').src);
console.log('Card 2:', card2.querySelector('.card-title').textContent, card2.querySelector('.card-text').textContent, card2.querySelector('.card-img-top').src);
console.log('Card 3:', card3.querySelector('.card-title').textContent, card3.querySelector('.card-text').textContent, card3.querySelector('.card-img-top').src);
