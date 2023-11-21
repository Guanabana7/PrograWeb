document.addEventListener("DOMContentLoaded", function () {
    var contenedorProductos = document.getElementById("contenedor-productos");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://192.168.100.14/WalmartPHP/obtenerProductos.php", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("Generando productos");
            var productos = JSON.parse(xhr.responseText);

            var contador = 0;

            productos.forEach(function (producto, index) {
                if (index % 6 === 0) {
                    var nuevoPanel = document.createElement("div");
                    nuevoPanel.id = "panel-productos-Ex";
                    contenedorProductos.appendChild(nuevoPanel);
                    panelActual = nuevoPanel;
                }

                console.log(producto);

                var divProducto = document.createElement("div");
                divProducto.className = "btn-producto";

                var imgProducto = document.createElement("img");
                imgProducto.src = "Imagenes/Productos/" + producto.direccion;
                imgProducto.alt = "Producto " + (index + 1);
                imgProducto.className = "producto-imagen";

                var btnAgregar = document.createElement("button");
                btnAgregar.className = "btn-agregar";
                btnAgregar.textContent = "+Agregar";
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
    console.log("Añadiendo al carrito");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://192.168.100.14/WalmartPHP/AgregarAlCarrito.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var datos = "idProducto=" + encodeURIComponent(idProducto);
    console.log(datos);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var respuesta = xhr.responseText;
            console.log("Respuesta del servidor:", respuesta);
        }
    };
    xhr.send(datos);
}