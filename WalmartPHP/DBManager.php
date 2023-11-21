<?php
class DBManager {
    private $db;
	private $host;
	private $user;
	private $pass;
    private $port;

    public function __construct() {
        $this->db = "walmart";
        $this->host = "192.168.100.14";
        $this->user = "root";
        $this->pass = null;
        $this->port = 3306;
    }
    private function open()
    {
        $link = mysqli_connect(
            $this->host, $this->user, $this->pass, $this->db, $this->port
        ) or die('Error al abrir conexion');

        return $link;
    }
    private function close($link)
    {
        mysqli_close($link);
    }
    public function registerUser($nombre, $apellidos, $telefono, $correo, $contrasena)
    {
        $link = $this->open();
        $stmt = mysqli_prepare($link, "INSERT INTO Usuarios (nombre, apellidos, telefono, correo, contrasena) VALUES (?, ?, ?, ?, ?)");
        mysqli_stmt_bind_param($stmt, "sssss", $nombre, $apellidos, $telefono, $correo, $contrasena);
        $resultado = mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);

        $this->close($link);

        return $resultado;
    }
    public function verificarUsuario($correo, $contrasena) {
        $link = $this->open();
        $stmt = mysqli_prepare($link, "SELECT 1 FROM Usuarios WHERE correo = ? AND contrasena = ?");
        mysqli_stmt_bind_param($stmt, "ss", $correo, $contrasena);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_store_result($stmt);
        $count = mysqli_stmt_num_rows($stmt);
        mysqli_stmt_close($stmt);

        $this->close($link);

        return ($count > 0);
    }
    public function obtenerProductos() {
        $link = $this->open();
        $query = "SELECT * FROM productos";
        $result = mysqli_query($link, $query);
        $productos = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $productos[] = $row;
        }
        $this->close($link);
        return $productos;
    }
    public function obtenerServicios() {
        $link = $this->open();
        $query = "SELECT * FROM servicios";
        $result = mysqli_query($link, $query);
        $productos = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $productos[] = $row;
        }
        $this->close($link);
        return $productos;
    }
    public function obtenerCarrito() {
        $link = $this->open();
        $query = "SELECT * FROM productos
            INNER JOIN carrito WHERE productos.id=carrito.id_item";
        $result = mysqli_query($link, $query);
        $productos = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $productos[] = $row;
        }
        $this->close($link);
        return $productos;
    }
    public function agregarAlCarrito($idProducto) {
        $link = $this->open();
        $stmt = mysqli_prepare($link, "INSERT INTO carrito (id_item, cantidad) VALUES (?, 1)");
        mysqli_stmt_bind_param($stmt, "i", $idProducto);
        
        $resultado = mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);

        $this->close($link);

        return $resultado;
    }
    public function Restar($idProducto) {
        $link = $this->open();

        $queryCantidadActual = "SELECT cantidad FROM carrito WHERE id_item = ?";
        $stmtCantidadActual = mysqli_prepare($link, $queryCantidadActual);
        mysqli_stmt_bind_param($stmtCantidadActual, "i", $idProducto);
        mysqli_stmt_execute($stmtCantidadActual);
        mysqli_stmt_bind_result($stmtCantidadActual, $cantidadActual);
        mysqli_stmt_fetch($stmtCantidadActual);
        mysqli_stmt_close($stmtCantidadActual);
    
        $nuevaCantidad = max(0, $cantidadActual - 1);
    
        $queryActualizarCantidad = "UPDATE carrito SET cantidad = ? WHERE id_item = ?";
        $stmtActualizarCantidad = mysqli_prepare($link, $queryActualizarCantidad);
        mysqli_stmt_bind_param($stmtActualizarCantidad, "ii", $nuevaCantidad, $idProducto);
        $resultado = mysqli_stmt_execute($stmtActualizarCantidad);
        mysqli_stmt_close($stmtActualizarCantidad);
    
        $this->close($link);
    
        return $resultado;
    }
    public function Sumar($idProducto) {
        $link = $this->open();
    
        $queryCantidadActual = "SELECT cantidad FROM carrito WHERE id_item = ?";
        $stmtCantidadActual = mysqli_prepare($link, $queryCantidadActual);
        mysqli_stmt_bind_param($stmtCantidadActual, "i", $idProducto);
        mysqli_stmt_execute($stmtCantidadActual);
        mysqli_stmt_bind_result($stmtCantidadActual, $cantidadActual);
        mysqli_stmt_fetch($stmtCantidadActual);
        mysqli_stmt_close($stmtCantidadActual);
    
        $nuevaCantidad = $cantidadActual + 1;
    
        $queryActualizarCantidad = "UPDATE carrito SET cantidad = ? WHERE id_item = ?";
        $stmtActualizarCantidad = mysqli_prepare($link, $queryActualizarCantidad);
        mysqli_stmt_bind_param($stmtActualizarCantidad, "ii", $nuevaCantidad, $idProducto);
        $resultado = mysqli_stmt_execute($stmtActualizarCantidad);
        mysqli_stmt_close($stmtActualizarCantidad);
    
        $this->close($link);
    
        return $resultado;
    }
    public function Eliminar($idProducto) {
        $link = $this->open();
    
        $queryEliminar = "DELETE FROM carrito WHERE id_item = ?";
        $stmtEliminar = mysqli_prepare($link, $queryEliminar);
        mysqli_stmt_bind_param($stmtEliminar, "i", $idProducto);
        $resultado = mysqli_stmt_execute($stmtEliminar);
        mysqli_stmt_close($stmtEliminar);
    
        $this->close($link);

        return $resultado;
    }
    public function obtenerPedido() {
        $link = $this->open();
        $query = "SELECT SUM(c.cantidad) as cantidadTotal, SUM(p.precio * c.cantidad) as precioTotal
                  FROM carrito c
                  INNER JOIN productos p ON c.id_item = p.id";
                  
        $result = mysqli_query($link, $query);

        $pedido = mysqli_fetch_assoc($result);

        $this->close($link);

        return $pedido;
    }
}
?>