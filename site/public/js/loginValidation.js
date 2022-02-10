window.addEventListener('load', () => {

    let formulario = document.querySelector('form');

    formulario.addEventListener("submit", function(e){

        let errors = [];

        let emailUser = document.querySelector('#emailUser')

        if(emailUser.value == ""){
            document.querySelector(".errorEmailUser p").innerHTML = "Debes ingresar tu e-mail";
            document.querySelector(".errorEmailUser p").style.color="red";
            errors.push(1);
            emailUser.onmousedown = function(e){
                document.querySelector(".errorEmailUser p").innerHTML = ""; 
                    };
            };

        let passwordUser = document.querySelector('#passwordUser')

        if(passwordUser.value == ""){
            document.querySelector(".errorPasswordUser p").innerHTML = "Debes ingresar tu contraseña";
            document.querySelector(".errorPasswordUser p").style.color="red";
            errors.push(1);
            passwordUser.onmousedown = function(e){
                document.querySelector(".errorPasswordUser p").innerHTML = ""; 
                    };
            }; 

        /* prevent default */
        if(errors.length > 0){
            e.preventDefault();
        }

    });
});