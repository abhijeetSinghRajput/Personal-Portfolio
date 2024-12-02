const nameRegex = /^[a-zA-Z\s'-]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


const form = document.querySelector('#contactForm');
const fullNameInput = document.getElementById('full-name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const messageBtn = document.querySelector("#contact .message-btn");

function validateForm(){
    let isValid = true;
    // name validation
    if (nameRegex.test(fullNameInput.value)) {
        fullNameInput.classList.add('valid');
        fullNameInput.classList.remove('invalid');
    } else {
        fullNameInput.classList.add('invalid');
        fullNameInput.classList.remove('valid');
        isValid = false;
    }
    
    // email validation
    if (emailRegex.test(emailInput.value)) {
        emailInput.classList.add('valid');
        emailInput.classList.remove('invalid');
    } else {
        emailInput.classList.add('invalid');
        emailInput.classList.remove('valid');
        isValid = false;
    }
    
    // message validation
    if (messageInput.value.length) {
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

fullNameInput.oninput = validateForm;
emailInput.oninput = validateForm;
messageInput.oninput = validateForm;
messageBtn.onclick = () => {
    form.submit();
};