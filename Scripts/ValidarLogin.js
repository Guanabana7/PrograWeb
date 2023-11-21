console.log("Mandando llamar Script");
document.addEventListener("DOMContentLoaded", function() {
    var iniciarSesionButton = document.getElementById("iniciarSesion");
    iniciarSesionButton.addEventListener("click", function() {
        var correo = document.getElementById("correo");
        var contrasena = document.getElementById("contrasena");
        var camposCompletos = true;

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
            ingresarSesionConServidor(correo, contrasena);
        }
    });

    function ingresarSesionConServidor(correo, contrasena) {
        console.log("Enviando datos al servidor");
        var correoValor = correo.value;
        var contrasenaValor = contrasena.value;

        var xhr = new XMLHttpRequest();
        var url = "https://8630-2806-2f0-5040-fd02-4045-b8cf-77a4-b017.ngrok-free.app/WalmartPHP/VerificarUsuario.php";
    
        xhr.open("POST", url, true);

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var respuesta = xhr.responseText.trim();
                    console.log("Respuesta del servidor:", respuesta);
                    if (respuesta == "1") {
                        redireccionarALogin();
                    } else {
                        mostrarError("Correo o contraseña incorrectos");
                        console.error("Inicio de sesión fallido. Respuesta del servidor:", respuesta);
                    }
                } else {
                    console.error("Error en la solicitud. Código de respuesta:", xhr.status, "Texto:", xhr.statusText);
                }
            }
        };
    
        var datos = "correo=" + encodeURIComponent(correoValor) +
                    "&contrasena=" + encodeURIComponent(contrasenaValor);
        console.log("Datos a enviar:", datos);
        xhr.send(datos);
    }  
});
