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

// Manejar el evento de envío del formulario
loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Evitar recarga de la página

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Comparar las credenciales ingresadas con las válidas
    if (email === validCredentials.email && password === validCredentials.password) {
        // Guardar los datos en localStorage
        localStorage.setItem("email", email); // Guardar email en localStorage
        localStorage.setItem("cart", JSON.stringify([])); // Inicializar carrito como array vacío
        localStorage.setItem("quantity", "0"); // Inicializar cantidad en 0

        // SweetAlert para inicio de sesión exitoso
        Swal.fire({
            title: "¡Inicio de Sesión Exitoso!",
            text: `Bienvenido, ${email}`,
            icon: "success",
            confirmButtonColor: "#198754",
        }).then(() => {
            // Redirigir al index después de cerrar el modal
            window.location.href = "index.html";
        });
    } else {
        // SweetAlert para error en el inicio de sesión
        Swal.fire({
            title: "Error",
            text: "Correo electrónico o contraseña no válidos. Inténtalo de nuevo.",
            icon: "error",
            confirmButtonColor: "#d33",
        });

        // Limpiar los valores del formulario
        emailInput.value = "";
        passwordInput.value = "";
    }
});
