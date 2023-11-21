<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require 'DBManager.php';
$dbManager = new DBManager();
$productos = $dbManager->obtenerProductos();
echo json_encode($productos);
?>
