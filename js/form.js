const form = document.querySelector("#contact-form");
const fullNameInput = document.getElementById("fullname");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const messageBtn = document.getElementById("message-btn");

const loader = document.querySelector(".loader");
const alertBox = document.querySelector(".alert");

const nameRegex = /^[a-zA-Z\s'.-]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const messageRegex = /\S+/;

/* ---------- Validation ---------- */
function validateForm() {
  let isValid = true;

  // Name
  if (nameRegex.test(fullNameInput.value.trim())) {
    fullNameInput.classList.add("valid");
    fullNameInput.classList.remove("invalid");
  } else {
    fullNameInput.classList.add("invalid");
    fullNameInput.classList.remove("valid");
    isValid = false;
  }

  // Email
  if (emailRegex.test(emailInput.value.trim())) {
    emailInput.classList.add("valid");
    emailInput.classList.remove("invalid");
  } else {
    emailInput.classList.add("invalid");
    emailInput.classList.remove("valid");
    isValid = false;
  }

  // Message
  if (messageRegex.test(messageInput.value.trim())) {
    messageInput.classList.add("valid");
    messageInput.classList.remove("invalid");
  } else {
    messageInput.classList.add("invalid");
    messageInput.classList.remove("valid");
    isValid = false;
  }

  messageBtn.disabled = !isValid;
  return isValid;
}

/* ---------- Events ---------- */
["input", "blur"].forEach((evt) => {
  fullNameInput.addEventListener(evt, validateForm);
  emailInput.addEventListener(evt, validateForm);
  messageInput.addEventListener(evt, validateForm);
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
 if (!validateForm()) return;

  const data = {
    from_name: fullNameInput.value.trim(),
    from_email: emailInput.value.trim(),
    message: messageInput.value.trim(),
    to_name: "Abhijeet",
  };

  loader.classList.add("show");
  messageBtn.disabled = true;

  try {
    const response = await fetch("/.netlify/functions/send-mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log(response);

    if (!response.ok) throw new Error("Request failed");

    toast("Email sent successfully");
    form.reset();
    document
      .querySelectorAll(".valid")
      .forEach((el) => el.classList.remove("valid"));
  } catch (err) {
    console.error(err);
    toast("Failed to send email", "danger");
  } finally {
    loader.classList.remove("show");
    messageBtn.disabled = false;
  }
});

/* ---------- Toast ---------- */
function toast(message, type = "success") {
  alertBox.textContent = message;
  alertBox.className = `alert ${type} show`;

  setTimeout(() => {
    alertBox.classList.remove("show");
  }, 4000);
}
