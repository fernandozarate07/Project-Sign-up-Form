document.querySelector(".form").addEventListener("submit", (event) => {
    const form = event.target;
    const inputs = Array.from(form.elements).filter(element => element.tagName === 'INPUT');
    const paraError = document.querySelectorAll('.paraError');
    const password = document.getElementById('inpPassword');
    const confirmPassword = document.getElementById('inpConfirmPassword');

    // limpiamos iterando 
    paraError.forEach((para) => para.textContent = '');
    inputs.forEach(input => {
        input.classList.remove('valid', 'invalid');
    });

    let isValid = true; 
    const phoneRegex = /^\d{3}-\d{7}$/;

    // Validar campos
    inputs.forEach((element, index) => {
        if (element.checkValidity()) {
            element.classList.add('valid');
            element.classList.remove('invalid');
        } else {
            isValid = false;
            element.classList.add('invalid');
            element.classList.remove('valid');

            if (element.value === '') {
                paraError[index].textContent = 'Error: Complete el campo';
            } else if (element.name === 'password' || element.name === 'confirmPassword') {
                paraError[index].textContent = 'Error: Asegúrece que la contraseña tenga entre 8 y 20 caracteres';
            } else if (element.name === 'email') {
                paraError[index].textContent = 'Error: Asegúrece que el email que proporciono sea valido';
            }
        }

        // Validar formato del número de teléfono
        if (element.name === 'phoneNumber') {
            if (!phoneRegex.test(element.value)) {
                isValid = false;
                element.classList.add('invalid');
                element.classList.remove('valid');
                paraError[index].textContent = 'Error: El formato del número de teléfono debe ser xxx-xxxxxxx';
            }
        }
    });

    // Validar si las contraseñas coinciden
    if (password.value !== confirmPassword.value) {
        paraError[paraError.length - 1].textContent = 'Error: Revisa tus contraseñas para que ambas coincidan'; 
        password.classList.add('invalid');
        confirmPassword.classList.add('invalid');
        isValid = false;
    } else {
        password.classList.add('valid');
        confirmPassword.classList.add('valid');
        isValid === true;
    }

    // Prevenir el envío si hay errores
    if (!isValid) {
        event.preventDefault();
    }
});
