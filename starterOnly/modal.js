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
  validationMessage.style.cssText = `
     text-align: center;
     margin-top: 50%;
     font-size: 36px;
   `;

  // Create the "Fermer" button element
  const closeButton = document.createElement("button");
  closeButton.textContent = "Fermer";
  closeButton.classList.add("btn-close");
  closeButton.addEventListener("click", closeModal);
  closeButton.style.cssText = `
     position: absolute;
     bottom: 20px;
     left: 50%;
     transform: translateX(-50%);
   `;

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
  let isValidate = true;

  event.preventDefault();
  // Retrieve form field
  const firstName = document.getElementById("first");
  const lastName = document.getElementById("last");
  const email = document.getElementById("email");
  const birthdate = document.getElementById("birthdate");
  const tournamentQuantity = document.getElementById("quantity");
  const locationLabel = document.querySelector(".text-label");
  const conditions = document.getElementById("checkbox1");

  // Check if a location is selected
  // First we try to get a checked element
  const isLocationSelected = document.querySelector(
    'input[name="location"]:checked'
  );
  console.log(isLocationSelected);
  // If element is null it means no option has been selected
  if (!isLocationSelected) {
    setErrorMsg(locationLabel, "Veuillez sélectionner une localisation.");
    isValidate = false;
  } else {
    removeErrorMsg(locationLabel);
  }

  // Check if the first name has at least 2 characters and is not empty
  if (firstName.value.length < 2 || firstName.value === "") {
    setErrorMsg(
      firstName,
      "Veuillez entrer un prénom valide (au moins 2 caractères)."
    );
    isValidate = false;
  } else {
    removeErrorMsg(firstName);
  }
  // Check if the last name has at least 2 characters and is not empty
  if (lastName.value.length < 2 || lastName.value === "") {
    setErrorMsg(
      lastName,
      "Veuillez entrer un nom valide (au moins 2 caractères)."
    );
    isValidate = false;
  } else {
    removeErrorMsg(lastName);
  }
  // Ckeck if the email is empty or invalid
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value === "" || !emailRegex.test(email.value)) {
    setErrorMsg(email, "Veuillez entrer une adresse email valide.");
    isValidate = false;
  } else {
    removeErrorMsg(email);
  }

  // Check if the birthdate is not empty and is less than today's date
  if (birthdate.value === "" || new Date(birthdate.value) >= new Date()) {
    setErrorMsg(birthdate, "Veuillez entrer une date de naissance valide");
    isValidate = false;
  } else {
    removeErrorMsg(birthdate);
  }

  // Check if the quantity is not empty or not numeric
  if (tournamentQuantity.value === "" || isNaN(tournamentQuantity.value)) {
    setErrorMsg(
      tournamentQuantity,
      "Veuillez entrer un nombre de concours valide."
    );
    isValidate = false;
  } else {
    removeErrorMsg(tournamentQuantity);
  }

  // Check if the terms and conditions are checked
  if (!conditions.checked) {
    setErrorMsg(conditions, "Veuillez accepter les conditions générales.");
    isValidate = false;
  } else {
    removeErrorMsg(conditions);
  }

  if (isValidate) {
    // Validation succeeded, hide the form and display the validation message with the "Fermer" button
    displayValidationMessage();

    // Prevent form submission
    event.preventDefault();
  } else {
    // Validation failed, prevent form submission
    event.preventDefault();
  }
}
