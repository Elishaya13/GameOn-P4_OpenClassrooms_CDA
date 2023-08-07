/**
 * Toggles the responsive navigation menu and updates the menu icon.
 *
 * When called, this function toggles the "responsive" class on the navigation menu element,
 * which controls the display of the menu on smaller screens. It also updates the menu icon
 * based on whether the navigation menu is in responsive mode or not.
 *
 * @function
 * @returns {void}
 */
function editNav() {
  const topnav = document.getElementById("myTopnav");
  topnav.classList.toggle("responsive");

  const menuIcon = document.getElementById("menuIcon");
  if (topnav.classList.contains("responsive")) {
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-times");
  } else {
    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");
  }
}

/**
 * Sets the active link in the main navigation bar based on user clicks.
 *
 * When a link in the main navigation bar is clicked, it becomes the active link
 * and gets the "active" class added to it, while the previously active link loses the class.
 *
 * @function
 * @returns {void}
 */
function setActiveLink() {
  const links = document.querySelectorAll(".main-navbar a");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Find the closest <a> element when the click occurs on a child element (<span>)
      const clickedLink = e.target.closest("a");

      if (clickedLink) {
        // Remove "active" class from the previously active link, if any
        const linkActive = document.querySelector(".main-navbar a.active");
        if (linkActive) {
          linkActive.classList.remove("active");
        }
        // Add "active" class to the clicked link
        clickedLink.classList.add("active");
      }
    });
  });
}
setActiveLink();

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector(".close");
const modalBody = document.querySelector(".modal-body");
const form = document.getElementById("modal-form");

// DOM Elements, validate function and error message for form fields
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

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalClose.addEventListener("click", closeModal);

/**
 * Open the modal and add a CSS class to indicate that it's open.
 */
function launchModal() {
  modalbg.style.display = "block";
  document.body.classList.add("modal-open");
}
/**
 * Closes the modal by changing the display style to "none" and remove the CSS.
 */
function closeModal() {
  modalbg.style.display = "none";
  document.body.classList.remove("modal-open");
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

/**
 * Validates the first name input field.
 *
 * @param {HTMLInputElement} name - The input field for the first name.
 * @returns {boolean} Returns true if the first name is valid, otherwise false.
 */
function validateFirst(name) {
  const formDataParent = name.parentNode;
  if (name.value.length < 2 || name.value === "") {
    setErrorMsg(name, "Veuillez entrer au moins 2 caractères");

    // Show the error message and add the attribute to make it visible
    formDataParent.setAttribute("data-error-visible", "true");
    return false;
  } else {
    removeErrorMsg(name);
    // Hide the error message and remove the attribute to make it invisible.
    formDataParent.removeAttribute("data-error-visible");
    return true;
  }
}

/**
 * Validates the email input field.
 *
 * @param {HTMLInputElement} email - The input field for the email address.
 * @returns {boolean} Returns true if the email is valid, otherwise false.
 */
function validateEmail(email) {
  const formDataParent = email.parentNode;
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value === "" || !emailRegex.test(email.value)) {
    setErrorMsg(email, "Veuillez entrer une adresse email valide.");

    // Show the error message and add the attribute to make it visible
    formDataParent.setAttribute("data-error-visible", "true");
    return false;
  } else {
    removeErrorMsg(email);
    // Hide the error message and remove the attribute to make it invisible.
    formDataParent.removeAttribute("data-error-visible");
    return true;
  }
}

/**
 * Validates the birthdate input field.
 *
 * @param {HTMLInputElement} birthdate - The input field for the birthdate.
 * @returns {boolean} Returns true if the birthdate is valid, otherwise false.
 */
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

/**
 * Validates the quantity input field.
 *
 * @param {HTMLInputElement} quantityField - The input field for the quantity.
 * @returns {boolean} Returns true if the quantity is valid, otherwise false.
 */
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

/**
 * Validates the location selection.
 *
 * @param {HTMLLabelElement} locationLabel - The label element for the location selection.
 * @returns {boolean} Returns true if a location is selected, otherwise false.
 */
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

/**
 * Validates the acceptance of general conditions.
 *
 * @param {HTMLInputElement} conditions - The input checkbox for accepting the conditions.
 * @returns {boolean} Returns true if the conditions are accepted, otherwise false.
 */
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
 * Resets the modal form by removing applied styles,
 * removing the close button and validation message from the modal if present,
 * and resetting the form fields.
 */
function resetForm() {
  const closeButton = document.querySelector(".btn-close");
  const validationMessage = document.querySelector(".modal-validation-msg");

  // Remove applied styles from the modal body and form.
  modalBody.removeAttribute("style");
  form.removeAttribute("style");

  // Check if the close button and validation message exist, then remove them.
  if (closeButton && validationMessage) {
    closeButton.remove();
    validationMessage.remove();
  }

  // Reset the form by clearing the input field values.
  form.reset();
}

/**
 * Displays the validation message and "Close" button in the modal body.
 */
function displayValidationMessage() {
  // Get the dimensions of the form
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

  // If there is a validation message, activate the resetForm function on the closed icon button
  if (validationMessage) {
    const closeIcon = document.querySelector(".close");
    closeIcon.addEventListener("click", resetForm);
  }

  // Apply the form dimensions to the modal body
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

  for (const fieldInfo of fieldsToValidate) {
    if (!fieldInfo.validationFunction(fieldInfo.field)) {
      isValidate = false;
    }
  }

  if (isValidate) {
    displayValidationMessage();
  }
}
