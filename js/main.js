document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const loginForm = document.getElementById('loginForm');
    const loginFormElement = document.getElementById('loginFormElement');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const userWelcome = document.getElementById('userWelcome');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const errorMessage = document.getElementById('errorMessage');
    const logoutButton = document.getElementById('logoutButton');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const loginButtonText = document.getElementById('loginButtonText');

    // Verificar si ya hay una sesión activa
    checkSession();

    // Event Listeners
    loginFormElement.addEventListener('submit', handleLogin);
    logoutButton.addEventListener('submit', handleLogout);
    logoutButton.addEventListener('click', handleLogout);

    // Función para validar el correo electrónico
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Función para validar la contraseña
    function validatePassword(password) {
        return password.length >= 6;
    }

    // Función para manejar el inicio de sesión
    function handleLogin(e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        let isValid = true;

        // Validar correo electrónico
        if (!validateEmail(email)) {
            emailInput.classList.add('is-invalid');
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailInput.classList.remove('is-invalid');
            emailError.style.display = 'none';
        }

        // Validar contraseña
        if (!validatePassword(password)) {
            passwordInput.classList.add('is-invalid');
            passwordError.style.display = 'block';
            isValid = false;
        } else {
            passwordInput.classList.remove('is-invalid');
            passwordError.style.display = 'none';
        }

        if (isValid) {
            // Mostrar el spinner de carga
            loadingSpinner.style.display = 'inline-block';
            loginButtonText.textContent = 'Procesando...';

            // Simulamos la autenticación con un API (usando setTimeout)
            setTimeout(() => {
                simulateAPIAuth(email, password);
            }, 1500);
        }
    }

    // Función para simular autenticación con API
    function simulateAPIAuth(email, password) {
        // Simular una respuesta de API
        // En un caso real, esto sería una llamada fetch()
        const success = (email === "bredgrfo@gmail.com" && password === "123456");

        if (success) {
            // Guardar la sesión en localStorage
            localStorage.setItem('currentUser', JSON.stringify({
                email: email,
                loginTime: new Date().toString()
            }));

            // Mostrar mensaje de bienvenida
            showWelcomeMessage(email);
        } else {
            // Mostrar mensaje de error
            errorMessage.style.display = 'block';
            loadingSpinner.style.display = 'none';
            loginButtonText.textContent = 'Iniciar Sesión';
        }
    }

    // Función para mostrar el mensaje de bienvenida
    function showWelcomeMessage(email) {
        userWelcome.textContent = email;
        loginForm.style.display = 'none';
        welcomeMessage.style.display = 'block';
    }

    // Función para cerrar sesión
    function handleLogout() {
        localStorage.removeItem('currentUser');
        welcomeMessage.style.display = 'none';
        loginForm.style.display = 'block';
        emailInput.value = '';
        passwordInput.value = '';
        loadingSpinner.style.display = 'none';
        loginButtonText.textContent = 'Iniciar Sesión';
    }

    // Función para verificar si ya existe una sesión
    function checkSession() {
        const currentUser = localStorage.getItem('currentUser');

        if (currentUser) {
            const user = JSON.parse(currentUser);
            showWelcomeMessage(user.email);
        }
    }
});