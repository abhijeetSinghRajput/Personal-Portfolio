emailjs.init('hQCOhIKpU79nR8u3x'); 

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
    return isValid;
}

messageBtn.onclick = (e) => {
    e.preventDefault();
    if (validateForm()) {
        const name = fullNameInput.value;
        const email = emailInput.value;
        const message = messageInput.value;

        emailjs.send('service_v4ojphv', 'template_qt486pa', {
            name: name,
            email: email,
            message: message,
        })
        .then(() => {
            alert('Message sent successfully!');
            form.reset();  // Reset form after successful send
        })
        .catch(() => alert('Failed to send the message.'));
    }
};