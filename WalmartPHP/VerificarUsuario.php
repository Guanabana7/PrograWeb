<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
error_log("VerificarUsuario.php - Se recibió una solicitud.");
$correo = isset($_POST["correo"]) ? $_POST["correo"] : "";
$contrasena = isset($_POST["contrasena"]) ? $_POST["contrasena"] : "";
if (empty($correo) || empty($contrasena)) {
    echo "0";
    exit();
}
require 'DBManager.php';
$dbManager = new DBManager();
$resultado = $dbManager->verificarUsuario($correo, $contrasena);
echo ($resultado === true) ? "1" : "0";
?>
