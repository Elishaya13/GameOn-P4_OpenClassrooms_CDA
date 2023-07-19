function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector(".close");
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalClose.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
/**
 * Closes the modal by changing the display style to "none".
 */
function closeModal() {
  modalbg.style.display = "none";
}

/**
 *  Sets an error message for an element and inserts it into the HTML.
 *
 * @param {HTMLElement | Element} element -  The element to set the error message for.
 * @param {string} message - The error message to display.
 * @returns {void}
 */
function setErrorMsg(element, message) {
  // First, delete error messages if they exist
  removeErrorMsg(element);
  let errorMessage = document.createElement("p");
  errorMessage.innerText = message;
  errorMessage.classList.add("error-message");

  // If the element is a checkbox, get the checkbox label and add the error messager after
  if (element.type === "checkbox") {
    let label = document.querySelector("label[for=checkbox1]");
    label.insertAdjacentElement("afterend", errorMessage);
  } else {
    element.insertAdjacentElement("afterend", errorMessage);
  }
}
/**
 * Removes the error message associated with an element from the HTML.
 *
 * @param {HTMLElement | Element} element - The element to remove the error message from.
 * @returns {void}
 */
function removeErrorMsg(element) {
  let errorMessage = element.parentNode.querySelector(".error-message");
  if (errorMessage) {
    errorMessage.remove();
  }
}

// ** Validation functions by field type **
function validateFirst(name) {
  const formDataParent = name.parentNode;
  if (name.value.length < 2 || name.value === "") {
    setErrorMsg(name, "Veuillez entrer au moins 2 caractères");

    formDataParent.setAttribute("data-error-visible", "true");
    console.log(formDataParent);
    return false;
  } else {
    removeErrorMsg(name);
    formDataParent.removeAttribute("data-error-visible");
    return true;
  }
}

function validateEmail(email) {
  const formDataParent = email.parentNode;
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value === "" || !emailRegex.test(email.value)) {
    setErrorMsg(email, "Veuillez entrer une adresse email valide.");
    formDataParent.setAttribute("data-error-visible", "true");
    return false;
  } else {
    removeErrorMsg(email);
    formDataParent.removeAttribute("data-error-visible");
    return true;
  }
}

function validateBirthdate(birthdate) {
  const formDataParent = birthdate.parentNode;
  if (birthdate.value === "" || new Date(birthdate.value) >= new Date()) {
    setErrorMsg(birthdate, "Veuillez entrer une date de naissance valide");
    formDataParent.setAttribute("data-error-visible", "true");
    return false;
  } else {
    removeErrorMsg(birthdate);
    formDataParent.removeAttribute("data-error-visible");
    return true;
  }
}
function validateQuantity(quantityField) {
  const formDataParent = quantityField.parentNode;
  if (quantityField.value === "" || isNaN(quantityField.value)) {
    setErrorMsg(quantityField, "Veuillez entrer un nombre de concours valide.");
    formDataParent.setAttribute("data-error-visible", "true");
    return false;
  } else {
    removeErrorMsg(quantityField);
    formDataParent.removeAttribute("data-error-visible");
    return true;
  }
}

function validateLocation(locationLabel) {
  const isLocationSelected = document.querySelector(
    'input[name="location"]:checked'
  );
  if (!isLocationSelected) {
    setErrorMsg(locationLabel, "Veuillez sélectionner une localisation.");
    return false;
  } else {
    removeErrorMsg(locationLabel);
    return true;
  }
}

function validateConditions(conditions) {
  if (!conditions.checked) {
    setErrorMsg(conditions, "Veuillez accepter les conditions générales.");
    return false;
  } else {
    removeErrorMsg(conditions);
    return true;
  }
}

/**
 * Displays the validation message and "Close" button in the modal body.
 */
function displayValidationMessage() {
  // Get the dimensions of the form
  const form = document.getElementById("modal-form");
  const formWidth = form.clientWidth;
  const formHeight = form.clientHeight;

  // Hide the form
  form.style.display = "none";

  // Create the validation message element
  const validationMessage = document.createElement("p");
  validationMessage.textContent = "Merci pour votre inscription";
  validationMessage.classList.add("modal-validation-msg");

  // Create the "Fermer" button element
  const closeButton = document.createElement("button");
  closeButton.textContent = "Fermer";
  closeButton.classList.add("btn-close");
  closeButton.addEventListener("click", closeModal);
  closeButton.addEventListener("click", resetForm);

  // Apply the form dimensions to the modal body
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = ""; // Clear any existing content
  modalBody.style.width = formWidth + "px";
  modalBody.style.height = formHeight + "px";

  modalBody.appendChild(validationMessage);
  modalBody.appendChild(closeButton);
}

/**
 * Validates the form fields and displays error messages if necessary.
 *
 * @param {Event} event - The event object representing the form submission.
 * @returns {void}
 */
function validate(event) {
  event.preventDefault();
  let isValidate = true;

  const fieldsToValidate = [
    {
      field: document.getElementById("first"),
      validationFunction: validateFirst,
      errorMsg: "Veuillez entrer un prénom valide (au moins 2 caractères).",
    },
    {
      field: document.getElementById("last"),
      validationFunction: validateFirst,
      errorMsg: "Veuillez entrer un nom valide (au moins 2 caractères).",
    },
    {
      field: document.getElementById("email"),
      validationFunction: validateEmail,
      errorMsg: "Veuillez entrer une adresse email valide.",
    },
    {
      field: document.getElementById("birthdate"),
      validationFunction: validateBirthdate,
      errorMsg: "Veuillez entrer une date de naissance valide.",
    },
    {
      field: document.getElementById("quantity"),
      validationFunction: validateQuantity,
      errorMsg: "Veuillez entrer un nombre de concours valide.",
    },
    {
      field: document.querySelector(".text-label"),
      validationFunction: validateLocation,
      errorMsg: "Veuillez sélectionner une localisation.",
    },
    {
      field: document.getElementById("checkbox1"),
      validationFunction: validateConditions,
      errorMsg: "Veuillez accepter les conditions générales.",
    },
  ];

  for (const fieldInfo of fieldsToValidate) {
    if (!fieldInfo.validationFunction(fieldInfo.field)) {
      isValidate = false;
    }
  }

  if (isValidate) {
    displayValidationMessage();
  }
}
