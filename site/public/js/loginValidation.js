window.addEventListener('load', () => {

    let formulario = document.querySelector('form');

    formulario.addEventListener("submit", function(e){

        let errors = [];

        let emailUser = document.querySelector('#emailUser')

        function emailIsValid (e) {
            let emailRegExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
            return emailRegExp.test(e.value); 
        };

        if(emailUser.value == ""){
            document.querySelector(".errorEmail p").innerHTML = "Debes ingresar tu e-mail";
            document.querySelector(".errorEmail p").style.color="red";
            errors.push(1);
            emailUser.onmousedown = function(e){
                document.querySelector(".errorEmail p").innerHTML = ""; 
                    };
            } else if (emailIsValid(email) == false) {
                document.querySelector(".errorEmail p").innerHTML = "El e-mail debe tener un formato válido";
                document.querySelector(".errorEmail p").style.color="red";
                errors.push(1);
                emailUser.onmousedown = function(){
                    document.querySelector(".errorEmail p").innerHTML = ""; 
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