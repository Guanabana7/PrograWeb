<?php
class DBManager {
    private $db;
	private $host;
	private $user;
	private $pass;
    private $port;

    public function __construct() {
        $this->db = "walmart";
        $this->host = "localhost";
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
}
?>