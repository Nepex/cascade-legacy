<?php 
    //mysqli_connect('sql9.freemysqlhosting.net', 'sql9167311', 'SGfMv349Wd', 'sql9167311');

    $username = $_GET['username'];
    $email = $_GET['email'];
    $password = $_GET['password'];

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    $conn = new mysqli('sql9.freemysqlhosting.net', 'sql9167311', 'SGfMv349Wd', 'sql9167311');

    $result = $conn->query("INSERT INTO users (username, email, password) VALUES ($username, $email, $password)");

    $conn->close();

    echo 'success';
?>