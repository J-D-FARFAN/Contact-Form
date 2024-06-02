const submit = document.querySelector(".InputSubmit");
const success = document.querySelector(".contentMessage__submit");
const inputs = document.querySelectorAll(".inputUs");
const consentCheckbox = document.querySelector(".consent input[type='checkbox']");
const radioInputs = document.querySelectorAll("input[type='radio'][name='query']");

// Objeto que mapea los nombres de los campos a sus mensajes de error
const errorMessages = {
    "First Name": "This field is required",
    "Last Name": "This field is required",
    "Email Address": "Please enter a valid email address",
    "Message": "This field is required",
    "Consent": "To submit this form, please consent to being contacted",
    "Query Type": "Please select a query type"
};

// Agregar manejadores de eventos para cada campo de entrada
inputs.forEach(input => {
    input.addEventListener("focus", () => {
        const errorSpan = input.nextElementSibling;
        errorSpan.textContent = "";
        input.classList.remove('error');
    });

    // Verificar el campo de email al perder el foco
    if (input.type === "email") {
        input.addEventListener("blur", () => {
            const email = input.value.trim();
            const isValidEmail = /\S+@\S+\.\S+/.test(email);
            if (!isValidEmail) {
                const errorSpan = input.nextElementSibling;
                errorSpan.textContent = "Please enter a valid email address";
                input.classList.add('error');
            }
        });
    }
});

consentCheckbox.addEventListener("click", () => {
    const errorSpan = consentCheckbox.parentElement.nextElementSibling;
    errorSpan.textContent = "";
});

radioInputs.forEach(input => {
    input.addEventListener("click", () => {
        const errorSpan = document.querySelector(".content__queryType .errorType");
        errorSpan.textContent = "";
    });
});

submit.addEventListener("click", SendForm);

function SendForm(event){
    event.preventDefault();

    let isEmpty = false;

    // Verificar si algún campo de entrada está vacío
    inputs.forEach(input => {
        if(input.value.trim() === '') {
            isEmpty = true;
            const fieldName = input.previousElementSibling.textContent;
            const errorSpan = input.nextElementSibling;
            errorSpan.textContent = errorMessages[fieldName];
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    if (!consentCheckbox.checked) {
        isEmpty = true;
        const fieldName = "Consent";
        const errorSpan = consentCheckbox.parentElement.nextElementSibling;
        errorSpan.textContent = errorMessages[fieldName];
    }

    let queryTypeChecked = false;
    radioInputs.forEach(input => {
        if (input.checked) {
            queryTypeChecked = true;
        }
    });
    if (!queryTypeChecked) {
        isEmpty = true;
        const fieldName = "Query Type";
        const errorSpan = document.querySelector(".content__queryType .errorType");
        errorSpan.textContent = errorMessages[fieldName];
    }

    if(isEmpty) {
        return;
    }

    success.style.display = "flex";

    setTimeout(function() {
        success.style.display = "none"; 
        inputs.forEach(input => {
            input.value = '';
        });
    
        consentCheckbox.checked = false;
    
        radioInputs.forEach(input => {
            input.checked = false;
        });
    }, 3000);

    
}
