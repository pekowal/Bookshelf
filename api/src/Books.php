<?php
require_once "connect.php";
require_once "Book.php";

if($_SERVER["REQUEST_METHOD"] === "POST"){
    $newBook = new Book();
    $newBook->setAuthor($_POST['author']);
    $newBook->setDescription($_POST['description']);
    $newBook->setName($_POST['name']);

    echo $newBook->saveToDB($conn);
}

if($_SERVER['REQUEST_METHOD'] === "GET"){
    $allBooks = Book::GetAllBook($conn);

    echo json_encode($allBooks);
}
if($_SERVER['REQUEST_METHOD'] === "DELETE"){
    parse_str(file_get_contents("php://input"), $put_vars);

    $deletedBook = new Book();
    $deletedBook->loadFromDB($conn, $put_vars['id']);
    //echo json_encode($deletedBook);
    $deletedBook->deleteFromDB($conn);
}