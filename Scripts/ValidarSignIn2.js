document.addEventListener("DOMContentLoaded", function() {
    var crearCuentaButton = document.getElementById("crearCuentaButton");
    var Omitir = document.getElementById("Omitir");
    crearCuentaButton.addEventListener("click", function() {
        var Es = document.getElementById("Es");
        var Ciu = document.getElementById("Ciu");
        var Cal = document.getElementById("Cal");
        var NumEx = document.getElementById("NumEx");
        var Postal = document.getElementById("Postal");
        var camposCompletos = true;

        if (!Es.value) {
            Es.style.borderColor = "red";
            camposCompletos = false;
        } else {
            Es.style.borderColor = "";
        }
        if (!Ciu.value) {
            Ciu.style.borderColor = "red";
            camposCompletos = false;
        } else {
            Ciu.style.borderColor = "";
        }
        if (!Cal.value) {
            Cal.style.borderColor = "red";
            camposCompletos = false;
        } else {
            Cal.style.borderColor = "";
        }
        if (!NumEx.value) {
            NumEx.style.borderColor = "red";
            camposCompletos = false;
        } else {
            NumEx.style.borderColor = "";
        }
        if (!Postal.value) {
            Postal.style.borderColor = "red";
            camposCompletos = false;
        } else {
            Postal.style.borderColor = "";
        }
        if (camposCompletos) {
            redireccionarALogin();
        }
    });
});