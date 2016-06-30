<?php
/*
$post = [
    'id' => 5,
    'user' => 'Janusz',
    'text' => 'Nowy post Janusza'
];


$postJSON = json_encode($post);

echo $postJSON;
*/

if($_SERVER['REQUEST_METHOD'] === "GET"){
    $getJSON = json_encode($_GET);
    echo "GET<br>";
    echo $getJSON;
}else if($_SERVER['REQUEST_METHOD'] === "POST"){
    $postJSON = json_encode($_POST);
    echo "POST";
    echo $postJSON;
}else if($_SERVER['REQUEST_METHOD'] === "PUT"){
    echo "PUT";
    parse_str(file_get_contents("php://input"),$putVars);
    $putJSON = json_encode($putVars);
    echo $putJSON;
}else if($_SERVER['REQUEST_METHOD'] === "DELETE"){
    echo "DELETE";
    parse_str(file_get_contents("php://input"),$deleteVars);
    $deleteJSON = json_encode($deleteVars);
    echo $deleteJSON;
}