const form = document.getElementById('form');
const passw1El = document.getElementById('password1');
const passw2El = document.getElementById('password2');
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');
let isValid = false;
let passwsMatch = false;

function validateForm() {
    isValid = form.checkValidity();
    if (!isValid) {
        message.textContent = "Fill out all fields";
        message.style.color = "#ff6666";
        return;
    }

    if (passw1El.value === passw2El.value) {
        passwsMatch = true;
    } else {
        passwsMatch = false;
        message.textContent = "Make sure passwords match";
        message.style.color = "#ff6666";
        passw1El.setCustomValidity('Passwords must match');
        passw1El.focus();
        passw2El.setCustomValidity('Passwords must match');
        return;
    }
    if (isValid && passwsMatch) {
        message.textContent = "Great succes!";
        message.style.color = "#66ff66";
        storeData();
    }
}

function storeData() {
    const user = {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
        website: form.website.value,
        password: form.password2.value
    }
    console.log(user);
}

function processFormData(e) {
    e.preventDefault();
    validateForm();
}

form.addEventListener('submit', processFormData);