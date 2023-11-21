<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$idProducto = isset($_POST["idProducto"]) ? $_POST["idProducto"] : "";

if (empty($idProducto)) {
    echo "0";
    exit();
}

require 'DBManager.php';
$dbManager = new DBManager();
$resultado = $dbManager->Restar($idProducto);

echo ($resultado === true) ? "1" : "0";
?>
