<?php
error_log("VerificarUsuario.php - Se recibió una solicitud.");
require 'DBManager.php';
$correo = isset($_GET["correo"]) ? $_GET["correo"] : "";
$contrasena = isset($_GET["contrasena"]) ? $_GET["contrasena"] : "";
if (empty($correo) || empty($contrasena)) {
    echo "0";
    exit();
}
$dbManager = new DBManager();
$resultado = $dbManager->verificarUsuario($correo, $contrasena);
echo ($resultado === true) ? "1" : "0";
?>

