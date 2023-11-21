<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require('DBManager.php');
$dbManager = new DBManager();
$pedido = $dbManager->obtenerPedido();
echo json_encode($pedido);
?>