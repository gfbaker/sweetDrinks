window.addEventListener("load", function(){
    let formProducts = document.querySelector("form.form-ProductoNuevo");

    formProducts.addEventListener("submit", function(e){
        let errores = [];

        let productNombre = document.querySelector("#nombre");
        
        if(productNombre.value == ""){
            document.querySelector(".mensajeNombre p").innerHTML = "Debes ingresar el nombre del producto";
            document.querySelector(".mensajeNombre p").style.color="red";
            errores.push(1);
            productNombre.onmousedown = function(e){
                document.querySelector(".mensajeNombre p").innerHTML = ""; 
            }
        }else if(productNombre.value.length < 5){
            document.querySelector(".mensajeNombre p").innerHTML = "El nombre debe tener al menos 5 carácteres";
            document.querySelector(".mensajeNombre p").style.color="red";
            errores.push(1);
            productNombre.onmousedown = function(e){
                document.querySelector(".mensajeNombre p").innerHTML = ""; 
            }
        }

        let productVolumen = document.querySelector("#volumen");
        
        if(productVolumen.value == ""){
            document.querySelector(".mensajeVolumen p").innerHTML = "No olvides ingresar el volumen del producto";
            document.querySelector(".mensajeVolumen p").style.color="red";
            errores.push(1);
            productVolumen.onmousedown = function(e){
                document.querySelector(".mensajeVolumen p").innerHTML = ""; 
            }
        }
        let productPrecio = document.querySelector("#precio");
        
        if(productPrecio.value == ""){
            document.querySelector(".mensajePrecio p").innerHTML = "No olvides ingresar el precio del producto";
            document.querySelector(".mensajePrecio p").style.color="red";
            errores.push(1);
            productPrecio.onmousedown = function(e){
                document.querySelector(".mensajePrecio p").innerHTML = ""; 
            }
        }
        
        let productAlcohol = document.querySelector("#porcentajeAlcohol");
        
        if(productAlcohol.value == ""){
            document.querySelector(".mensajeAlcohol p").innerHTML = "No olvides ingresar el porcentaje de alcohol del producto";
            document.querySelector(".mensajeAlcohol p").style.color="red";
            errores.push(1);
            productAlcohol.onmousedown = function(e){
                document.querySelector(".mensajeAlcohol p").innerHTML = ""; 
            }
        }

        let productStock = document.querySelector("#stock");
        
        if(productStock.value == ""){
            document.querySelector(".mensajeStock p").innerHTML = "No olvides ingresar la cantidad disponible";
            document.querySelector(".mensajeStock p").style.color="red";
            errores.push(1);
            productStock.onmousedown = function(e){
                document.querySelector(".mensajeStock p").innerHTML = ""; 
            }
        }

        let productDescripcion = document.querySelector("#descripcion");
        
        if(productDescripcion.value == ""){
            document.querySelector(".mensajeDescripcion p").innerHTML = "No olvides ingresar la descripción del producto";
            document.querySelector(".mensajeDescripcion p").style.color="red";
            errores.push(1);
            productDescripcion.onmousedown = function(e){
                document.querySelector(".mensajeDescripcion p").innerHTML = ""; 
            }
        }else if(productDescripcion.value.length < 20){
            document.querySelector(".mensajeDescripcion p").innerHTML = "La descripción debe contener al menos 20 carácteres";
            document.querySelector(".mensajeDescripcion p").style.color="red";
            errores.push(1);
            productDescripcion.onmousedown = function(e){
                document.querySelector(".mensajeDescripcion p").innerHTML = ""; 
            }
        }
       
        let productCategoria = document.querySelector("#categoria");

        if(productCategoria.value == ""){
            document.querySelector(".mensajeCategoria p").innerHTML = "Debes ingresar la categoria a la que pertenece el producto";
            document.querySelector(".mensajeCategoria p").style.color="red";
            errores.push(1);
            productCategoria.onmousedown= function(e){
                document.querySelector(".mensajeCategoria p").innerHTML = ""; 
            }
        } 
        
        let productImagen = document.querySelector(".imagenes");
        let nombreImagen = productImagen.value;
        /*Revisamos la extension de la imagen*/
        let extensionImagen = nombreImagen.substring(nombreImagen.lastIndexOf(".")).toLowerCase();
        /*Establecemos las extensiones permitidas*/
        let extensionesOk = [".jpg",".jpeg",".png",".gif"];       
        /* con el metodo .some() verificamos que algun elemento del array coincida con la extension de la imagen*/
        let verificacion = extensionesOk.some(e=> e == extensionImagen);

        /*Si no hay una imagen seleccionada manda este primer mensaje*/
        if(nombreImagen == ""){
            document.querySelector(".mensajeImagen p").innerHTML = "Debes ingresar al menos una imagen";
            document.querySelector(".mensajeImagen p").style.color="red";
            errores.push(1);
            productImagen.onmousedown= function(e){
                document.querySelector(".mensajeImagen p").innerHTML = ""; 
            }

        }else if(verificacion == false){
            document.querySelector(".mensajeImagen p").innerHTML = "La imágen debe ser de un formato válido(JPG, JPEG, PNG, GIF)";
            document.querySelector(".mensajeImagen p").style.color="red";
            errores.push(1);
            productImagen.onmousedown= function(e){
                document.querySelector(".mensajeImagen p").innerHTML = ""; 
            };         
                
        }

        if(errores.length != 0){
            e.preventDefault();
        }
        
       
    })
})