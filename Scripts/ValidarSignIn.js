console.log("Mandando llamar Script");
document.addEventListener("DOMContentLoaded", function() {
    var crearCuentaButton = document.getElementById("crearCuentaButton");
    crearCuentaButton.addEventListener("click", function() {
        var nombre = document.getElementById("nombre");
        var apellidos = document.getElementById("apellidos");
        var telefono = document.getElementById("telefono");
        var correo = document.getElementById("correo");
        var contrasena = document.getElementById("contrasena");
        var camposCompletos = true;

        if (!nombre.value) {
            nombre.style.borderColor = "red";
            camposCompletos = false;
        } else {
            nombre.style.borderColor = "";
        }

        if (!apellidos.value) {
            apellidos.style.borderColor = "red";
            camposCompletos = false;
        } else {
            apellidos.style.borderColor = "";
        }

        if (!telefono.value) {
            telefono.style.borderColor = "red";
            camposCompletos = false;
        } else {
            telefono.style.borderColor = "";
        }

        if (!correo.value) {
            correo.style.borderColor = "red";
            camposCompletos = false;
        } else {
            correo.style.borderColor = "";
        }

        if (!contrasena.value) {
            contrasena.style.borderColor = "red";
            camposCompletos = false;
        } else {
            contrasena.style.borderColor = "";
        }

        if (camposCompletos) {
            enviarDatosAlServidor(nombre, apellidos, telefono, correo, contrasena);
            window.location.href = 'SignIn2.html';
        }
    });
    function enviarDatosAlServidor(nombre, apellidos, telefono, correo, contrasena) {
        console.log("Enviando datos al servidor");
    
        var nombreValor = nombre.value;
        var apellidosValor = apellidos.value;
        var telefonoValor = telefono.value;
        var correoValor = correo.value;
        var contrasenaValor = contrasena.value;
    
        var xhr = new XMLHttpRequest();
        var url = "http://localhost/WalmartPHP/SignIn.php";
    
        xhr.open("POST", url, true);
        
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    console.log("Respuesta del servidor:", xhr.responseText);
                } else {
                    console.error("Error en la solicitud. Código de respuesta:", xhr.status);
                }
            }
        };
        var datos = "nombre=" + encodeURIComponent(nombreValor) +
                    "&apellidos=" + encodeURIComponent(apellidosValor) +
                    "&telefono=" + encodeURIComponent(telefonoValor) +
                    "&correo=" + encodeURIComponent(correoValor) +
                    "&contrasena=" + encodeURIComponent(contrasenaValor);
    
        console.log("Datos a enviar:", datos);
        xhr.send(datos);
    }
});