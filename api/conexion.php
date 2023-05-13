<?php 



class Conexion {

public function getConexion(){

$host = "localhost";

$db = "jkmpg7ol_SistemaGas";

$user = "jkmpg7ol_sistemas"; 

$password = "5R3U6vvQWI0a";



$db = new PDO("mysql:host=$host;dbname=$db;", $user, $password);



return $db;



}





}







?>