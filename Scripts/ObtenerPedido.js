document.addEventListener("DOMContentLoaded", function () {
    var contenedorPedido = document.getElementById("contenedor-pedido");
    var labelCantidad = document.getElementById("cantidad");
    var labelPrecio = document.getElementById("precio");

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://8630-2806-2f0-5040-fd02-4045-b8cf-77a4-b017.ngrok-free.app/WalmartPHP/ObtenerPedido.php", true);

    xhr.onreadystatechange = function () {
        console.log("Holaa");
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("Generando pedido");
            var pedido = JSON.parse(xhr.responseText);
    
            console.log(pedido.cantidadTotal);
            var precioTotal = parseFloat(pedido.precioTotal);

            if (!isNaN(precioTotal)) {
                console.log(precioTotal.toFixed(2));
                labelCantidad.textContent = "Cantidad: " + pedido.cantidadTotal;
                labelPrecio.textContent = "Precio Total: $" + precioTotal.toFixed(2);
            } else {
                console.error("El valor de precioTotal no es un número válido:", pedido.precioTotal);
            }
        }
    };
    

    xhr.send();
});