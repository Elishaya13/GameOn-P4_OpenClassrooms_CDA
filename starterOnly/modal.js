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
// Change the display style to "none" for close the modal
function closeModal() {
  modalbg.style.display = "none";
}

function setErrorMsg(element, message) {
  removeErrorMsg(element);
  let errorMessage = document.createElement("p");
  errorMessage.innerText = message;
  errorMessage.classList.add("error-message");

  if (element.nextSibling) {
    element.parentNode.insertBefore(errorMessage, element.nextSibling);
  } else {
    element.insertAdjacentElement("afterend", errorMessage);
  }
}
function removeErrorMsg(element) {
  let errorMessage = element.parentNode.querySelector(".error-message");
  if (errorMessage) {
    errorMessage.remove();
  }
}

// **  Form Data Validation** //
function validate(event) {
  let isValidate = true;

  event.preventDefault();
  // Retrieve form field
  let firstName = document.getElementById("first");
  let lastName = document.getElementById("last");
  let email = document.getElementById("email");
  let birthdate = document.getElementById("birthdate");
  let tournamentQuantity = document.getElementById("quantity");
  let locationLabel = document.querySelector(".text-label");

  let isLocationSelected = document.querySelector(
    'input[name="location"]:checked'
  );

  let conditionsChecked = document.getElementById("checkbox1");
  console.log(conditionsChecked.checked);

  conditionsChecked.addEventListener("change", function () {
    if (this.checked) {
      this.setAttribute("checked", true);
    } else {
      this.removeAttribute("checked");
    }
  });

  // Check if a location is selected

  if (!isLocationSelected) {
    setErrorMsg(locationLabel, "Veuillez sélectionner une localisation.");
    isValidate = false;
    console.log(locationLabel.querySelector("p"));
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
  if (!conditionsChecked.checked) {
    setErrorMsg(
      conditionsChecked,
      "Veuillez accepter les conditions générales."
    );
    isValidate = false;
  } else {
    removeErrorMsg(conditionsChecked);
  }
  console.log("Form is valid: ", isValidate);

  if (isValidate) {
    alert("formulaire validé");
  }
}
