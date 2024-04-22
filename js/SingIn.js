let inputTouched = {
    email: false,
    password: false
}

const inputEmail = document.getElementById("inputEmail")
const inputPassword = document.getElementById("inputPassword")
const warningEmail = document.getElementById("warningEmail")
const warningPassword = document.getElementById("warningPassword")

const inputOnBlur = (ev) =>{
    if(inputTouched.email){
        if(!validateEmail(inputEmail.value) && !validatePhone(inputEmail.value)){
            warningEmail.style.display="block"
            inputEmail.style.borderBottom='2px solid #e87c03'
        }
        else{
            warningEmail.style.display="none"
            inputEmail.style.borderBottom="none"
        }
    }
    if(inputTouched.password){
        if(!(inputPassword.value.length >= 4 && inputPassword.value.length <= 60)){
            warningPassword.style.display="block"
            inputPassword.style.borderBottom='2px solid #e87c03'
        }
        else{
            warningPassword.style.display="none"
            inputPassword.style.borderBottom="none"
        }
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

const signIn = () => {
    let errorMessage = ""; // Initialiser un message d'erreur vide
    let hasEmptyField = false; // Initialiser un indicateur pour détecter les champs vides
    
    // Vérifier si les champs email et mot de passe sont vides
    if (!inputTouched.email || inputEmail.value.trim() === "") {
        errorMessage += "Veuillez saisir votre adresse e-mail.\n";
        warningEmail.style.display = "block";
        hasEmptyField = true;
    }
    if (!inputTouched.password || inputPassword.value.trim() === "") {
        errorMessage += "Veuillez saisir votre mot de passe.\n";
        warningPassword.style.display = "block";
        hasEmptyField = true;
    }

    // Si au moins un champ est vide, afficher tous les messages d'erreur
    if (hasEmptyField) {
        console.error("Erreur de connexion:", errorMessage);
        // Ici vous pouvez ajouter du code pour afficher le message d'erreur à l'utilisateur, par exemple :
        // alert(errorMessage);
    } else {
        // Sinon, procéder à la connexion
        // Ajoutez votre logique de connexion ici
        console.log("Tentative de connexion avec l'email:", inputEmail.value);
    }
}

// Ajouter un gestionnaire d'événements pour le clic sur le bouton "Se connecter"
document.querySelector('.signin-button').addEventListener('click', signIn);
