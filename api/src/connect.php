<?php

$host = 'localhost';
$user = 'root';
$password = 'coderslab';
$database = 'Bookshelf';

$conn = new mysqli($host,$user,$password,$database);

if($conn->connect_error != 0){
    die("Błąd połączenia bazy danych {$conn->error}");
}
