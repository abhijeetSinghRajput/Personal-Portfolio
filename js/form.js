const form = document.querySelector("#contact-form");
const fullNameInput = document.getElementById("fullname");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const messageBtn = document.getElementById("message-btn");

const nameRegex = /^[a-zA-Z\s'-\.]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const messageRegex = /\S+/;


function validateForm() {
    let isValid = true;

    // Name validation
    if (nameRegex.test(fullNameInput.value)) {
        fullNameInput.classList.add('valid');
        fullNameInput.classList.remove('invalid');
    } else {
        fullNameInput.classList.add('invalid');
        fullNameInput.classList.remove('valid');
        isValid = false;
    }

    // Email validation
    if (emailRegex.test(emailInput.value)) {
        emailInput.classList.add('valid');
        emailInput.classList.remove('invalid');
    } else {
        emailInput.classList.add('invalid');
        emailInput.classList.remove('valid');
        isValid = false;
    }

    // Message validation
    if (messageRegex.test(messageInput.value)) {
        messageInput.classList.add('valid');
        messageInput.classList.remove('invalid');
    } else {
        messageInput.classList.add('invalid');
        messageInput.classList.remove('valid');
        isValid = false;
    }

    messageBtn.disabled = !isValid;
}

validateForm();
fullNameInput.onfocus = validateForm;
emailInput.oninput = validateForm;
fullNameInput.oninput = validateForm;
messageInput.oninput = validateForm;

messageBtn.onclick = () => {
    form.submit();
};
