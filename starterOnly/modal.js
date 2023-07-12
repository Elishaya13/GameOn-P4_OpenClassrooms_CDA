let isValidate = true;

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

function setErrorMsg(message) {
  isValidate = false;
  console.log(message);
}

// **  Form Data Validation** //
function validate(event) {
  // Retrieve form field values
  let firstName = document.getElementById("first").value.trim();
  let lastName = document.getElementById("last").value.trim();
  let email = document.getElementById("email").value.trim();
  let birthdate = document.getElementById("birthdate").value.trim();
  let tournamentQuantity = document.getElementById("quantity").value.trim();
  let location = document.querySelector('input[name="location"]:checked');
  let conditionsChecked = document.getElementById("checkbox1").checked;

  // Check if the first name has at least 2 characters and is not empty
  if (firstName.length < 2 || firstName === "") {
    setErrorMsg("Veuillez entrer un prénom valide (au moins 2 caractères).");
  }

  // Check if the last name has at least 2 characters and is not empty
  if (lastName.length < 2 || lastName === "") {
    setErrorMsg("Veuillez entrer un nom valide (au moins 2 caractères).");
  }

  // Ckeck if the email is empty or invalid
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "" || !emailRegex.test(email)) {
    setErrorMsg("Veuillez entrer une adresse email valide.");
  }

  // Check if the birthdate is not empty and is less than today's date
  if (birthdate === "" || new Date(birthdate) >= new Date()) {
    setErrorMsg(
      "Veuillez entrer une date de naissance antèrieure à la date du jour"
    );
  }

  // Check if the quantity is not empty or not numeric
  if (tournamentQuantity === "" || isNaN(tournamentQuantity)) {
    setErrorMsg("Veuillez entrer un nombre de concours valide.");
  }

  // Check if a location is selected
  if (!location) {
    setErrorMsg("Veuillez sélectionner une localisation.");
  }
  // Check if the terms and conditions are checked
  if (!conditionsChecked) {
    setErrorMsg("Veuillez accepter les conditions générales.");
  }
  event.preventDefault(); // Prevent form submission
  return isValidate;
}
