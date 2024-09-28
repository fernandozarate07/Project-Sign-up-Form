document.querySelector(".form").addEventListener("submit", (event) => {
    const form = event.target;
    const inputs = Array.from(form.elements).filter(element => element.tagName === 'INPUT');
    const paraError = document.querySelectorAll('.paraError');
    const password = document.getElementById('inpPassword');
    const confirmPassword = document.getElementById('inpConfirmPassword');

    paraError.forEach((para) => para.textContent = '');
    inputs.forEach(input => {
        input.classList.remove('valid', 'invalid');
    });

    let isValid = true; 

    if (!form.checkValidity()) {
        event.preventDefault(); 
        inputs.forEach((element, index) => {
            if (element.checkValidity()) {
                element.classList.add('valid');
                element.classList.remove('invalid');
            } else {
                element.classList.add('invalid');
                element.classList.remove('valid');
                paraError[index].textContent = 'Error: Campo inválido';
                isValid = false;
            }
        });
    }

    else if (form.checkValidity() && password.value !== confirmPassword.value) {
        event.preventDefault(); 
        paraError[paraError.length - 1].textContent = 'Error: Revisa tus contraseñas'; 
        password.classList.add('invalid');
        confirmPassword.classList.add('invalid');
        isValid = false; 
    } else {
        password.classList.add('valid');
        confirmPassword.classList.add('valid');
        isValid = true;
    }

    // Prevenir el envío si hay errores
    if (isValid === false) {
        event.preventDefault();
    }
});
