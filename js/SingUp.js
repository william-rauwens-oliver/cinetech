let inputTouched = {
    firstName: false,
    lastName: false,
    address: false,
    email: false,
    password: false,
    confirmPassword: false
}

const inputFirstName = document.getElementById("inputFirstName");
const inputLastName = document.getElementById("inputLastName");
const inputAddress = document.getElementById("inputAddress");
const inputEmail = document.getElementById("inputEmail");
const inputPassword = document.getElementById("inputPassword");
const inputConfirmPassword = document.getElementById("inputConfirmPassword");
const warningFirstName = document.getElementById("warningFirstName");
const warningLastName = document.getElementById("warningLastName");
const warningAddress = document.getElementById("warningAddress");
const warningEmail = document.getElementById("warningEmail");
const warningPassword = document.getElementById("warningPassword");
const warningConfirmPassword = document.getElementById("warningConfirmPassword");

const inputOnBlur = (ev) =>{
    switch(ev.name) {
        case "firstName":
            if(!inputTouched.firstName || inputFirstName.value.trim() === "") {
                warningFirstName.style.display = "block";
            } else {
                warningFirstName.style.display = "none";
            }
            break;
        case "lastName":
            if(!inputTouched.lastName || inputLastName.value.trim() === "") {
                warningLastName.style.display = "block";
            } else {
                warningLastName.style.display = "none";
            }
            break;
        case "address":
            if(!inputTouched.address || inputAddress.value.trim() === "") {
                warningAddress.style.display = "block";
            } else {
                warningAddress.style.display = "none";
            }
            break;
        case "email":
            if(!inputTouched.email || !(validateEmail(inputEmail.value) || validatePhone(inputEmail.value))) {
                warningEmail.style.display = "block";
            } else {
                warningEmail.style.display = "none";
            }
            break;
        case "password":
            if(!inputTouched.password || !(inputPassword.value.length >= 8 && inputPassword.value.length <= 16)) {
                warningPassword.style.display = "block";
            } else {
                warningPassword.style.display = "none";
            }
            break;
        case "confirmPassword":
            if(!inputTouched.confirmPassword || inputConfirmPassword.value.trim() === "") {
                warningConfirmPassword.style.display = "block";
            } else {
                warningConfirmPassword.style.display = "none";
            }
            break;
        default:
            break;
    }
}

const inputOnFocus = (ev) =>{
    inputTouched[ev.name] = true;
}

const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validatePhone = email => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(String(email).toLowerCase());
}

const createAccount = () => {
    const apiKey = "8c4b867188ee47a1d4e40854b27391ec";
    let errorMessage = ""; // Initialiser un message d'erreur vide
    let hasEmptyField = false; // Initialiser un indicateur pour détecter les champs vides
    
    // Vérifier les champs obligatoires
    if (!inputTouched.firstName || inputFirstName.value.trim() === "") {
        errorMessage += "Veuillez entrer votre prénom.\n";
        warningFirstName.style.display = "block";
        hasEmptyField = true;
    }
    if (!inputTouched.lastName || inputLastName.value.trim() === "") {
        errorMessage += "Veuillez entrer votre nom.\n";
        warningLastName.style.display = "block";
        hasEmptyField = true;
    }
    if (!inputTouched.address || inputAddress.value.trim() === "") {
        errorMessage += "Veuillez entrer votre adresse postale.\n";
        warningAddress.style.display = "block";
        hasEmptyField = true;
    }
    if (!inputTouched.email || !validateEmail(inputEmail.value)) {
        errorMessage += "Veuillez saisir une adresse e-mail valide.\n";
        warningEmail.style.display = "block";
        hasEmptyField = true;
    }
    if (!inputTouched.password || !(inputPassword.value.length >= 8 && inputPassword.value.length <= 16)) {
        errorMessage += "Le mot de passe doit contenir entre 8 et 16 caractères.\n";
        warningPassword.style.display = "block";
        hasEmptyField = true;
    }
    if (!inputTouched.confirmPassword || inputConfirmPassword.value.trim() === "") {
        errorMessage += "Veuillez confirmer votre mot de passe.\n";
        warningConfirmPassword.style.display = "block";
        hasEmptyField = true;
    }

    // Si au moins un champ est vide, afficher tous les messages d'erreur
    if (hasEmptyField) {
        console.error("Erreur de création de compte:", errorMessage);
        // Ici vous pouvez ajouter du code pour afficher le message d'erreur à l'utilisateur, par exemple :
        // alert(errorMessage);
    } else {
        // Sinon, procéder à la création du compte
        console.log("Création de compte avec la clé API:", apiKey);
        // Ici vous pouvez ajouter du code pour soumettre les données du formulaire à un serveur, etc.
    }
}
