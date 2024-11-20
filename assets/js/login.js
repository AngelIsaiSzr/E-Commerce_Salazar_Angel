// Credenciales predefinidas
const validCredentials = {
    email: "user@gmail.com",
    password: "1234",
};

// Comprobar si ya está logueado
if (localStorage.getItem("email")) {
    window.location.href = "index.html";
}

// Seleccionar elementos del formulario
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("errorMessage");

// Manejar el evento de envío del formulario
loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Evitar recarga de la página

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Comparar las credenciales ingresadas con las válidas
    if (email === validCredentials.email && password === validCredentials.password) {
        localStorage.setItem("email", email); // Guardar email en localStorage
        localStorage.setItem("cart", JSON.stringify([])); // Inicializar carrito como array vacío
        localStorage.setItem("quantity", "0"); // Inicializar cantidad en 0
        window.location.href = "index.html"; // Redirigir al index
    } else {
        // Mostrar mensaje de error
        errorMessage.style.display = "block";
        emailInput.value = ""; // Borrar valores
        passwordInput.value = "";
    }
});
