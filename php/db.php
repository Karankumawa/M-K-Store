<?php
$servername = "localhost:3306"; // Change to your MySQL server address
$username = "root"; // MySQL username
$password = "root"; // MySQL password
$dbname = "ecommerce"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
