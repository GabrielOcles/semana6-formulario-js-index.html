// ====== Referencias ======
const form = document.getElementById("registerForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const ageInput = document.getElementById("age");

const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");

const successBox = document.getElementById("successBox");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const ageError = document.getElementById("ageError");

// ====== Reglas (regex) ======
// Email: básico y correcto para tarea
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Password: mínimo 8 caracteres, al menos 1 número y 1 carácter especial
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[{\]};:'",.<>/?\\|`~]).{8,}$/;

// ====== Helpers ======
function setInvalid(input, errorEl, message) {
  input.classList.remove("valid");
  input.classList.add("invalid");
  errorEl.textContent = message;
}

function setValid(input, errorEl) {
  input.classList.remove("invalid");
  input.classList.add("valid");
  errorEl.textContent = "";
}

// Devuelve true/false según validación de cada campo
function validateName() {
  const value = nameInput.value.trim();
  if (value.length === 0) {
    setInvalid(nameInput, nameError, "El nombre es obligatorio.");
    return false;
  }
  if (value.length < 3) {
    setInvalid(nameInput, nameError, "Mínimo 3 caracteres.");
    return false;
  }
  setValid(nameInput, nameError);
  return true;
}

function validateEmail() {
  const value = emailInput.value.trim();
  if (value.length === 0) {
    setInvalid(emailInput, emailError, "El correo es obligatorio.");
    return false;
  }
  if (!emailRegex.test(value)) {
    setInvalid(emailInput, emailError, "Formato de correo inválido.");
    return false;
  }
  setValid(emailInput, emailError);
  return true;
}

function validatePassword() {
  const value = passwordInput.value;
  if (value.length === 0) {
    setInvalid(passwordInput, passwordError, "La contraseña es obligatoria.");
    return false;
  }
  if (!passwordRegex.test(value)) {
    setInvalid(
      passwordInput,
      passwordError,
      "Debe tener mínimo 8 caracteres, 1 número y 1 carácter especial."
    );
    return false;
  }
  setValid(passwordInput, passwordError);
  return true;
}

function validateConfirmPassword() {
  const pass = passwordInput.value;
  const confirm = confirmPasswordInput.value;

  if (confirm.length === 0) {
    setInvalid(confirmPasswordInput, confirmPasswordError, "Confirma tu contraseña.");
    return false;
  }
  if (confirm !== pass) {
    setInvalid(confirmPasswordInput, confirmPasswordError, "No coincide con la contraseña.");
    return false;
  }
  setValid(confirmPasswordInput, confirmPasswordError);
  return true;
}

function validateAge() {
  const raw = ageInput.value.trim();

  if (raw.length === 0) {
    setInvalid(ageInput, ageError, "La edad es obligatoria.");
    return false;
  }

  const age = Number(raw);

  if (Number.isNaN(age) || !Number.isFinite(age)) {
    setInvalid(ageInput, ageError, "Ingresa una edad válida.");
    return false;
  }

  // Evita decimales
  if (!Number.isInteger(age)) {
    setInvalid(ageInput, ageError, "La edad debe ser un número entero.");
    return false;
  }

  if (age < 18) {
    setInvalid(ageInput, ageError, "Debes tener 18 años o más.");
    return false;
  }

  setValid(ageInput, ageError);
  return true;
}

function validateAll() {
  const okName = validateName();
  const okEmail = validateEmail();
  const okPass = validatePassword();

  // Importante: confirmar depende de password
  const okConfirm = validateConfirmPassword();
  const okAge = validateAge();

  const allValid = okName && okEmail && okPass && okConfirm && okAge;
  submitBtn.disabled = !allValid;

  return allValid;
}

// ====== Eventos (validación en tiempo real) ======
[nameInput, emailInput, passwordInput, confirmPasswordInput, ageInput].forEach((input) => {
  input.addEventListener("input", () => {
    successBox.textContent = ""; // limpia mensaje de éxito al editar
    validateAll();
  });

  input.addEventListener("blur", () => {
    validateAll();
  });
});

// Revalidar confirmación si cambia la contraseña
passwordInput.addEventListener("input", () => {
  // si el usuario ya escribió confirmación, revalida de inmediato
  if (confirmPasswordInput.value.length > 0) {
    validateConfirmPassword();
  }
  validateAll();
});

// ====== Submit ======
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const allValid = validateAll();
  if (!allValid) return;

  // Mensaje/alerta de éxito
  alert("✅ Formulario validado correctamente. ¡Listo para enviar!");
  successBox.textContent = "✅ Todo correcto: validación exitosa.";
});

// ====== Reset ======
form.addEventListener("reset", () => {
  // Limpia estilos y errores
  [nameInput, emailInput, passwordInput, confirmPasswordInput, ageInput].forEach((input) => {
    input.classList.remove("valid", "invalid");
  });

  [nameError, emailError, passwordError, confirmPasswordError, ageError].forEach((err) => {
    err.textContent = "";
  });

  successBox.textContent = "";
  submitBtn.disabled = true;
});
