document.addEventListener("DOMContentLoaded", function () {
    var contenedorProductos = document.getElementById("contenedor-carrito");



    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/WalmartPHP/ObtenerCarrito.php", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //console.log("Generando productos");
            var productos = JSON.parse(xhr.responseText);

            var contador = 0;

            productos.forEach(function (producto, index) {
                var panelGeneralCarrito = document.createElement("div");
                panelGeneralCarrito.className = "panel-generalcarrito";

                var panelProductoCarrito = document.createElement("div");
                panelProductoCarrito.className = "panel-producto-carrito";

                var imgProductoCarrito = document.createElement("img");
                imgProductoCarrito.src = "Imagenes/Productos/" + producto.direccion;
                imgProductoCarrito.alt = "Producto " + producto.id;
                imgProductoCarrito.className = "imgp-carrito";

                panelProductoCarrito.appendChild(imgProductoCarrito);

                var panelInfoCarrito = document.createElement("div");
                panelInfoCarrito.className = "panel-producto-carrito";

                var nombreProductoCarrito = document.createElement("div");
                nombreProductoCarrito.className = "nombrep-carrito";
                nombreProductoCarrito.textContent = producto.nombre;

                var precioProductoCarrito = document.createElement("div");
                precioProductoCarrito.className = "preciop-carrito";
                precioProductoCarrito.textContent = "$" + producto.precio;

                panelInfoCarrito.appendChild(nombreProductoCarrito);
                panelInfoCarrito.appendChild(precioProductoCarrito);

                var panelCantidad = document.createElement("div");
                panelCantidad.className = "panel-cantidad";

                var panelSumarRestar = document.createElement("div");
                panelSumarRestar.className = "panel-sumar-restar";

                var labelCantidad = document.createElement("label");
                labelCantidad.className = "numero";
                labelCantidad.textContent = producto.cantidad;

                var botonRestar = document.createElement("button");
                botonRestar.className = "boton-restar";
                botonRestar.textContent = "-";
                botonRestar.addEventListener("click", function() {
                    var numeroLabel = this.parentNode.querySelector(".numero");
                    console.log(numeroLabel);
                    var cantidad = parseInt(numeroLabel.textContent);
                    if (cantidad > 1) {
                        restar(producto.id_item);
                    }
                });

                var botonSumar = document.createElement("button");
                botonSumar.className = "boton-sumar";
                botonSumar.textContent = "+";
                botonSumar.addEventListener("click", function() {
                    sumar(producto.id_item);
                });

                panelSumarRestar.appendChild(botonRestar);
                panelSumarRestar.appendChild(labelCantidad);
                panelSumarRestar.appendChild(botonSumar);

                var botonEliminar = document.createElement("button");
                botonEliminar.className = "eliminar";
                botonEliminar.textContent = "Eliminar";
                botonEliminar.addEventListener("click", function() {
                    eliminar(producto.id_item);
                });

                panelCantidad.appendChild(panelSumarRestar);
                panelCantidad.appendChild(botonEliminar);

                panelGeneralCarrito.appendChild(panelProductoCarrito);
                panelGeneralCarrito.appendChild(panelInfoCarrito);
                panelGeneralCarrito.appendChild(panelCantidad);

                contenedorProductos.appendChild(panelGeneralCarrito);
            });
        }
    };
    xhr.send();
});   
function restar(idProducto) {
    console.log("Restando");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/WalmartPHP/Restar.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var datos = "idProducto=" + encodeURIComponent(idProducto);
    console.log(datos);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var respuesta = xhr.responseText;
            console.log("Respuesta del servidor:", respuesta);
            location.reload();
        }
    };
    xhr.send(datos);
}
function sumar(idProducto) {
    console.log("Sumando");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/WalmartPHP/Sumar.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var datos = "idProducto=" + encodeURIComponent(idProducto);
    console.log(datos);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var respuesta = xhr.responseText;
            console.log("Respuesta del servidor:", respuesta);
            location.reload();
        }
    };
    xhr.send(datos);
}
function eliminar(idProducto) {
    console.log("Eliminando");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/WalmartPHP/Eliminar.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var datos = "idProducto=" + encodeURIComponent(idProducto);
    console.log(datos);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var respuesta = xhr.responseText;
            console.log("Respuesta del servidor:", respuesta);
            location.reload();
        }
    };
    xhr.send(datos);
}