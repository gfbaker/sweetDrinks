window.addEventListener('load', () => {

    let formulario = document.querySelector('form');

    formulario.addEventListener("submit", function(e){

        let errors = [];

        let nombre = document.querySelector('#nombre')

        if(nombre.value == ""){
            document.querySelector(".errorNombre p").innerHTML = "Debes ingresar tu nombre";
            document.querySelector(".errorNombre p").style.color="red";
            errors.push(1);
            nombre.onmousedown = function(e){
                document.querySelector(".errorNombre p").innerHTML = ""; 
                    };
            } else if (nombre.value.length < 4) {
                document.querySelector(".errorNombre p").innerHTML = "El nombre debe tener al menos 5 caracteres";
                document.querySelector(".errorNombre p").style.color="red";
                errors.push(1);
                nombre.onmousedown = function(e){
                    document.querySelector(".errorNombre p").innerHTML = ""; 
                        };
                }

        let apellido = document.querySelector('#apellido')

        if(apellido.value == ""){
            document.querySelector(".errorApellido p").innerHTML = "Debes ingresar tu apellido";
            document.querySelector(".errorApellido p").style.color="red";
            errors.push(1);
            apellido.onmousedown = function(e){
                document.querySelector(".errorApellido p").innerHTML = ""; 
                    };
            } else if (apellido.value.length < 4) {
                document.querySelector(".errorApellido p").innerHTML = "El apellido debe tener al menos 5 caracteres";
                document.querySelector(".errorApellido p").style.color="red";
                errors.push(1);
                apellido.onmousedown = function(e){
                    document.querySelector(".errorApellido p").innerHTML = ""; 
                        };
                };

        let email = document.querySelector('#email');

        function emailIsValid (e) {
            let emailRegExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
            return emailRegExp.test(e.value); 
        };

        if(email.value == ""){
            document.querySelector(".errorEmail p").innerHTML = "Debes ingresar tu e-mail";
            document.querySelector(".errorEmail p").style.color="red";
            errors.push(1);
            email.onmousedown = function(e){
                document.querySelector(".errorEmail p").innerHTML = ""; 
                    };
            } else if (emailIsValid(email) == false) {
                document.querySelector(".errorEmail p").innerHTML = "El e-mail debe tener un formato válido";
                document.querySelector(".errorEmail p").style.color="red";
                errors.push(1);
                email.onmousedown = function(){
                    document.querySelector(".errorEmail p").innerHTML = ""; 
                        };
                };

        let password = document.querySelector('#password')      
        
        if(password.value == ""){
            document.querySelector(".errorPassword p").innerHTML = "Debes ingresar una contraseña válida";
            document.querySelector(".errorPassword p").style.color="red";
            errors.push(1);
            password.onmousedown = function(e){
                document.querySelector(".errorPassword p").innerHTML = ""; 
                    };
            } else if (password.value.length < 7) {
                document.querySelector(".errorPassword p").innerHTML = "La contraseña debe tener al menos 8 caracteres";
                document.querySelector(".errorPassword p").style.color="red";
                errors.push(1);
                password.onmousedown = function(e){
                    document.querySelector(".errorPassword p").innerHTML = ""; 
                        };
                };        
 
       let confPassword = document.querySelector('#confPassword') 

        if(confPassword.value == ""){
            document.querySelector(".errorConfPassword p").innerHTML = "Debes ingresar una contraseña válida";
            document.querySelector(".errorConfPassword p").style.color="red";
            errors.push(1);
            confPassword.onmousedown = function(e){
                document.querySelector(".errorConfPassword p").innerHTML = ""; 
                    };
            }  else if(password.value != confPassword.value){

                console.log(password);
                console.log(confPassword);
                document.querySelector(".errorConfPassword p").innerHTML = "Las contraseñas no coinciden";
                document.querySelector(".errorConfPassword p").style.color="red";
                errors.push(1);
                confPassword.onmousedown = function(e){
                    document.querySelector(".errorConfPassword p").innerHTML = ""; 
                            };
                    }    

        let telefono = document.querySelector('#telefono')      
        
        if(telefono.value == ""){
            document.querySelector(".errorTelefono p").innerHTML = "Debes ingresar un teléfono válido";
            document.querySelector(".errorTelefono p").style.color="red";
            errors.push(1);
            telefono.onmousedown = function(e){
                document.querySelector(".errorTelefono p").innerHTML = ""; 
                    };
            } else if (telefono.value.length < 6) {
                document.querySelector(".errorTelefono p").innerHTML = "El teléfono debe tener al menos 5 caracteres";
                document.querySelector(".errorTelefono p").style.color="red";
                errors.push(1);
                telefono.onmousedown = function(e){
                    document.querySelector(".errorTelefono p").innerHTML = ""; 
                        };
                };     
                
        let imagen = document.querySelector("#imagen");

        let nombreImagen = imagen.value;
        /*Revisamos la extension de la imagen*/
        let extensionImagen = nombreImagen.substring(nombreImagen.lastIndexOf(".")).toLowerCase();
        /*Establecemos las extensiones permitidas*/
        let extensionesOk = [".jpg",".jpeg",".png",".gif"];       
        /* con el metodo .some() verificamos que algun elemento del array coincida con la extension de la imagen*/
        let verificacion = extensionesOk.some(e => e == extensionImagen);

        /*Si no hay una imagen seleccionada manda este primer mensaje*/
        if(imagen.value == ""){
            document.querySelector(".errorImagen p").innerHTML = "Debes ingresar al menos una imagen";
            document.querySelector(".errorImagen p").style.color="red";
            errors.push(1);
            imagen.onmousedown= function(e){
                document.querySelector(".errorImagen p").innerHTML = ""; 
            }

        }else if(verificacion == false){
            document.querySelector(".errorImagen p").innerHTML = "La imágen debe ser de un formato válido(JPG, JPEG, PNG, GIF)";
            document.querySelector(".errorImagen p").style.color="red";
            errors.push(1);
            imagen.onmousedown= function(e){
                document.querySelector(".errorImagen p").innerHTML = ""; 
            };         

        }


        /* prevent default */
        if(errors.length > 0){
            e.preventDefault();
        }

    });
});