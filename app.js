document.querySelector(".form").addEventListener("submit", (event) => {
    const form = event.target;
    const inputs = Array.from(form.elements).filter(element => element.tagName === 'INPUT');
    const paraError = document.querySelectorAll('.paraError');
    const password = document.getElementById('inpPassword');
    const confirmPassword = document.getElementById('inpConfirmPassword');

    // Clear previous errors
    paraError.forEach((para) => para.textContent = '');
    inputs.forEach(input => {
        input.classList.remove('valid', 'invalid');
    });

    let isValid = true;
    const phoneRegex = /^\d{3}-\d{7}$/;

    // Validate fields
    inputs.forEach((element, index) => {
        if (element.checkValidity()) {
            element.classList.add('valid');
            element.classList.remove('invalid');
        } else {
            isValid = false;
            element.classList.add('invalid');
            element.classList.remove('valid');

            if (element.value === '') {
                paraError[index].textContent = 'Error: Please fill out this field';
            } else if (element.name === 'password' || element.name === 'confirmPassword') {
                paraError[index].textContent = 'Error: Make sure your password is between 8 and 20 characters';
            } else if (element.name === 'email') {
                paraError[index].textContent = 'Error: Please ensure the provided email is valid';
            }
        }

        // Validate phone number format
        if (element.name === 'phoneNumber') {
            if (!phoneRegex.test(element.value)) {
                isValid = false;
                element.classList.add('invalid');
                element.classList.remove('valid');
                paraError[index].textContent = 'Error: The phone number format must be xxx-xxxxxxx';
            }
        }
    });

    // Validate if passwords match
    if (password.value !== confirmPassword.value) {
        paraError[paraError.length - 1].textContent = 'Error: Please ensure both passwords match'; 
        password.classList.add('invalid');
        confirmPassword.classList.add('invalid');
        isValid = false;
    } else {
        password.classList.add('valid');
        confirmPassword.classList.add('valid');
        isValid === true;
    }

    // Prevent form submission if there are errors
    if (!isValid) {
        event.preventDefault();
    }
});
