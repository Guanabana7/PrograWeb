document.addEventListener("DOMContentLoaded", function () {
    var contenedorProductos = document.getElementById("contenedor-productos");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://8630-2806-2f0-5040-fd02-4045-b8cf-77a4-b017.ngrok-free.app/WalmartPHP/obtenerServicios.php", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("Generando servicios");
            var productos = JSON.parse(xhr.responseText);

            var contador = 0;

            productos.forEach(function (producto, index) {
                if (index % 3 === 0) {
                    var nuevoPanel = document.createElement("div");
                    nuevoPanel.id = "panel-productos-Ex2";
                    contenedorProductos.appendChild(nuevoPanel);
                    panelActual = nuevoPanel;
                }

                console.log(producto);

                var divProducto = document.createElement("div");
                divProducto.className = "btn-producto";

                var imgProducto = document.createElement("img");
                imgProducto.src = "Imagenes/Servicios/" + producto.direccion;
                imgProducto.alt = "Producto " + (index + 1);
                imgProducto.className = "producto-imagen";

                var btnAgregar = document.createElement("button");
                btnAgregar.className = "btn-agregar";
                btnAgregar.textContent = "Explorar >>";
                btnAgregar.addEventListener("click", function() {
                    agregarAlCarrito(producto.id);
                });

                var divMarca = document.createElement("div");
                divMarca.className = "producto-marca";
                divMarca.textContent = producto.nombre;

                var divDescripcion = document.createElement("div");
                divDescripcion.className = "producto-descripcion";
                divDescripcion.textContent = producto.descripcion;


                divProducto.appendChild(imgProducto);
                divProducto.appendChild(btnAgregar);
                divProducto.appendChild(divMarca);
                divProducto.appendChild(divDescripcion);

                panelActual.appendChild(divProducto);
            });
        }
    };
    xhr.send();
});
function agregarAlCarrito(idProducto) {
    console.log(idProducto);
    switch (idProducto) {
        case "1":
            window.location.href = "https://mibait.com/";
            break;
        case "2":
            window.location.href = "https://cashi.com.mx/";
            break;
        case "3":
            window.location.href = "https://www.sumabeneficios.com.mx/";
            break;
        case "4":
            window.location.href = "https://llevaypagadespues.com.mx/";
            break;
        case "5":
            window.location.href = "https://www.walmartmexico.com/cobro-de-envios";
            break;
        case "6":
            window.location.href = "https://www.membresiasalud.com/";
            break;
        default:
            console.error("Id de producto no reconocido:", idProducto);
    }
}
