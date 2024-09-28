document.querySelector(".form").addEventListener("submit", (event) => {
    const form = event.target;

    if (!form.checkValidity()) {
        event.preventDefault();
    }

    const inputs = Array.from(form.elements).filter(element => element.tagName === 'INPUT');
    console.log(inputs.length);
    const paraError = document.querySelectorAll('.paraError');

    inputs.forEach((element, index) => {
        if (element.tagName === 'INPUT') {
            if (element.checkValidity()) {
                element.classList.add('valid');
                element.classList.remove('invalid');
                paraError[index].textContent = '';
            } else {
                element.classList.add('invalid');
                element.classList.remove('valid');
                paraError[index].textContent = 'Error: Campo inválido';
            }
        }
    });
});
