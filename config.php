<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$db = "database.sqlite";

try {
    $pdo = new PDO("sqlite:database.sqlite");
}
catch (PDOException $e) {
    echo $e->getMessage();
}