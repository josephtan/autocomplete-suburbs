<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

$pdo = new PDO('mysql:host=localhost;dbname=db_postcodes', 'username', 'password', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
$statement = $pdo->prepare("SELECT * FROM postcode_db");
$statement -> execute();
$results = $statement->fetchAll(PDO::FETCH_ASSOC);
$keywords = json_encode($results);
echo $keywords;
?>