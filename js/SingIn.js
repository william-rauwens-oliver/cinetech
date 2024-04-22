let inputTouched = {
    email: false,
    password: false
};

const inputEmail = document.getElementById("inputEmail");
const inputPassword = document.getElementById("inputPassword");
const warningEmail = document.getElementById("warningEmail");
const warningPassword = document.getElementById("warningPassword");

const inputOnBlur = (ev) =>{
    if(inputTouched.email){
        if(!validateEmail(inputEmail.value) && !validatePhone(inputEmail.value)){
            warningEmail.style.display="block";
            inputEmail.style.borderBottom='2px solid #e87c03';
        }
        else{
            warningEmail.style.display="none";
            inputEmail.style.borderBottom="none";
        }
    }
    if(inputTouched.password){
        if(!(inputPassword.value.length >= 4 && inputPassword.value.length <= 60)){
            warningPassword.style.display="block";
            inputPassword.style.borderBottom='2px solid #e87c03';
        }
        else{
            warningPassword.style.display="none";
            inputPassword.style.borderBottom="none";
        }
    }
};

const inputOnFocus = (ev) =>{
    inputTouched[ev.name] = true;
};

const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validatePhone = email => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(String(email).toLowerCase());
};

const signIn = (event) => {
    event.preventDefault(); // Empêcher le comportement par défaut du formulaire

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
        // Récupérer les données du formulaire d'inscription depuis le localStorage
        const formDataString = localStorage.getItem('formData');
        if (formDataString) {
            const formData = JSON.parse(formDataString);
            // Comparer les données saisies avec celles du formulaire d'inscription
            if (formData.email === inputEmail.value.trim() && formData.password === inputPassword.value.trim()) {
                // Connexion réussie
                console.log("Connexion réussie avec l'email:", inputEmail.value);
                // Ajoutez votre logique de redirection ou de traitement ici
            } else {
                // Email ou mot de passe incorrect
                console.error("Erreur de connexion: Email ou mot de passe incorrect.");
                // Ajoutez votre logique pour afficher un message d'erreur à l'utilisateur
            }
        } else {
            // Aucun formulaire d'inscription trouvé dans le localStorage
            console.error("Erreur de connexion: Aucun formulaire d'inscription trouvé.");
            // Ajoutez votre logique pour afficher un message d'erreur à l'utilisateur
        }
    }
};

// Ajouter un gestionnaire d'événements pour le clic sur le bouton "Se connecter"
document.querySelector('.signin-button').addEventListener('click', signIn);
