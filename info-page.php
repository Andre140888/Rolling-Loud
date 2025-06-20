<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require("config.php");

$requestUri = $_SERVER['REQUEST_URI'];
$parts = explode('/', $requestUri);
$building = end($parts);

try {
    $query = "SELECT * FROM data WHERE building = :building";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':building', $building);
    $statement->execute();

    $result = $statement->fetchAll(PDO::FETCH_ASSOC);

} catch(PDOException $e) {
    $error = "Foutmelding: " . $e->getMessage();
}

include("View/info_page_view.php");
?>
