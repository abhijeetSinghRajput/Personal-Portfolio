const form = document.querySelector("#contact-form");
const fullNameInput = document.getElementById("fullname");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const messageBtn = document.getElementById("message-btn");

const loader = document.querySelector('.loader');
const alertBox = document.querySelector('.alert');

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
    return isValid;
}

validateForm();
fullNameInput.onfocus = validateForm;
emailInput.oninput = validateForm;
fullNameInput.oninput = validateForm;
messageInput.oninput = validateForm;

messageBtn.onclick = async () => {
    const data = {
        name: fullNameInput.value,
        email: emailInput.value,
        message: messageInput.value,
    };
    loader.classList.add('show');

    
    fullNameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";
    messageBtn.disabled = true;

    try {
        const response = await fetch('/.netlify/functions/send-mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert("Email sent successfully");
        } else {
            alert("Failed to send email", "danger");
        }
    } catch (error) {
        console.error('Error: ', error);
        alert("Failed to send email", "danger");
    } finally {
        loader.classList.remove('show');
    }
};

function alert(message, type = "success") {
    alertBox.textContent = message;
    alertBox.className = `${type} alert show`;

    setTimeout(() => {
        alertBox.classList.remove('show');
    }, 4000);
}