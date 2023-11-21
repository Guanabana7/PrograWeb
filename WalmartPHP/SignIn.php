<?php
error_log("Hola, este es un mensaje de depuración!");
require 'DBManager.php';
$nombre = $_POST["nombre"];
$apellidos = $_POST["apellidos"];
$telefono = $_POST["telefono"];
$correo = $_POST["correo"];
$contrasena = $_POST["contrasena"];

$dbManager = new DBManager();
$resultado = $dbManager->registerUser($nombre, $apellidos, $telefono, $correo, $contrasena);

echo $resultado ? "Usuario registrado correctamente" : "Error al registrar usuario";
?>
