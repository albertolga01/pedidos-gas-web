<?php

require 'connector.php';
require_once('conexion.php'); 
require_once('cors.php');

	
$options = array(
    "location" =>"http://gasuniondeamerica.sgcweb.com.mx/ws/1094AEV2/v2/soap.php",
    "uri" => "", 
    "trace" => 0
       );
       $client = new SoapClient(NULL, $options);   
 
      obtenerServicios();
       
function obtenerServicios(){
    
global $connect;

    $ultimo = "SELECT MAX(folio_servicio) as folio FROM servicios_pedidos_usuarios";
         
        $resultu = $connect->query($ultimo);
        if ($resultu->num_rows > 0) {  
        
        while ($row = $resultu->fetch_assoc()) {
            $ultimoRegistrado = $row['folio'];
        }
        }


    global $client; 
    $sessionId = getSessionId();
    $ultimo_folio = lastId(); 
    //1.- Crear objeto Búsqueda   
    if(isset($_POST["folio"])){
        $busqueda->folioPosicion = $_POST["folio"]; //150
        // $busqueda->folioPosicion = $ultimoRegistrado; // 150  
        $busqueda->cantidadElementos = $_POST["cantidad"]; // 150 
        
    }else{
        $busqueda->folioPosicion = $ultimo_folio-25; //150
        // $busqueda->folioPosicion = $ultimoRegistrado; // 150  
        $busqueda->cantidadElementos = "50"; // 150 
        
    }
   
    
    $venta->folio = "";
    $venta->fecha_inicio = "";
    $venta->importe_total = "";
    $venta->producto->nombre = ""; 
    $venta->producto->identificador_externo = "";
    $venta->producto->precio_venta = "";
    $venta->producto->tasa_impuesto = "";
    $venta->consumidor->numero_consumidor = "";
    $venta->consumidor->colonia = "";
    $venta->consumidor->tipo_pago = "";
    $venta->consumidor->nombres = "";
    $venta->cliente->nombres = "";
    $venta->cliente->rfc = ""; 
    $venta->vendedor->numero_usuario = ""; 
    $venta->vendedor->nombre = ""; 
    $venta->pedido->folio = ""; 
    $venta->pedido->estatus = ""; 
    $venta->unidad->nombre = ""; 
    $venta->unidad->identificador_externo = ""; 
    $venta->cantidad = ""; 
    $venta->folio_unidad = ""; 
    $venta->facturacion->formapago = ""; 
    $venta->tipo_registro = ""; 
    $paquete->busqueda = $busqueda;
    $paquete->atributosVenta = $venta; 
    $paquete_json = json_encode($paquete); 
    $respuesta = $client->procesarPeticion(
                    $sessionId,
                    "Servicios",
                    "obtenerListaPorFolio",
                    $paquete_json
    );
    $servicios = $respuesta->informacion;
    $decoded = json_decode($servicios);
 
     getPedidos($decoded);
}


function lastId(){
    global $client;
    $sessionId = getSessionId();
    $respuesta = $client->procesarPeticion($sessionId, "Servicios", "obtenerUltimoFolio", '' );

    if($respuesta->codigo == '0000' )
    {
      $ultimo_folio = $respuesta->informacion;
    }
    return $ultimo_folio;
}





function getSessionId(){
 
    global $client;
    $userAuth = array(
        "user_name" => "administrador",
       "password" => MD5("@Grup0P3tr0#"),
       "version" => "01"
        ); 
     $objeto_respuesta = $client->login($userAuth,"pegasus"); 
     $sessionId = $objeto_respuesta->id; 
     return $sessionId;
}
function getConsumidor($numero_consumidor){
 
    global $client;
    $sessionId = getSessionId(); 
    $respuesta = $client->procesarPeticion(
    $sessionId,
    "Consumidores",
    "obtener",
    $numero_consumidor
    );
    $consumidor = $respuesta->informacion;
    $decodedcon = json_decode($consumidor);
    
    return $decodedcon;
}
function getSector($pipa){   
    global $client;
    $sessionId = getSessionId(); 
    $respuesta = $client->procesarPeticion(
    $sessionId,
    "Unidades",
    "obtener",
    $pipa
    );
     
    $sector = $respuesta->informacion;
    $decodedsec = json_decode($sector); 
    
    return $decodedsec->ruta_id;
}

function getPedidos($folioServicio){
   
    foreach($folioServicio as $s){
        $folioUsuario = "";
        
   
        global $client;
        $sessionId = getSessionId();
        $busqueda->folioPosicion = $s->pedido->folio; 
        $busqueda->cantidadElementos = 1; 
        $paquete_json = json_encode($busqueda);
        $respuesta = $client->procesarPeticion(
        $sessionId,
        "Pedidos",
        "obtenerListaPorFolio",
        $paquete_json
        );
        $pedidos = $respuesta->informacion; 
        $decoded = json_decode($pedidos);
      
        $folioUsuario = $decoded[0]->usuario_asignado_id;
       
        if($folioUsuario == " "){ 
          
        }else{ 
          
           $tipo_servicio = $s->tipo_registro;
           $cantidad = $s->cantidad;
           $forma_pago = $s->facturacion->formapago;
           $folio_unidad = $s->folio_unidad;
            $colonia = $s->consumidor->colonia;
            $tipopago = $s->consumidor->tipo_pago;
            $pipa = $s->unidad->nombre;
            $numero_consumidor = $s->consumidor->numero_consumidor; 
            $informacionConsumidor = getConsumidor($numero_consumidor);
            $categoria = $informacionConsumidor->tipo_consumidor_id;
            $sector = getSector($s->unidad->identificador_externo);
            $consumidorNombreApellido = $informacionConsumidor->nombres." ".$informacionConsumidor->apellidos;
            
            
            getUsuario($folioUsuario, $s->folio, $decoded[0], $s->vendedor->nombre, $consumidorNombreApellido, $s->cliente->nombres, $cantidad, $s->importe_total, $colonia, $tipopago, $pipa, $categoria, $sector, $s->fecha_inicio, $s->pedido->estatus, $numero_consumidor, $tipo_servicio, $forma_pago, $folio_unidad); 
        } 
    }
}

function getUsuario($folioUsuario, $folioServicio, $ped, $usuario_operador, $nombre_cte, $rzonsocial, $cantidad, $monto, $colonia, $tipopago, $pipa, $categoria, $sector, $fechaservicio, $estatus_pedido, $numero_consumidor, $tipo_servicio, $forma_pago, $folio_unidad){

  $datetimePedido = $ped->fecha_atencion;
  $datetimePedido = date('Y-m-d H:i:s', strtotime($datetimePedido. ' - 6 hour')); 
  $datetimeServicio = $fechaservicio;
  $datetimeServicio = date('Y-m-d H:i:s', strtotime($datetimeServicio. ' - 6 hour')); 
    global $client;
    
global $connect;
    $sessionId = getSessionId();
    $respuesta = $client->procesarPeticion(
    $sessionId,
    "Usuarios",
    "obtener",
    $folioUsuario
    );
    $usuario = $respuesta->informacion; 
    $decodeduser = json_decode($usuario);
    $conexion = new Conexion();
	$db = $conexion->getConexion();

        $Qexiste = "SELECT folio from servicios_pedidos_usuarios where folio_servicio = '".$folioServicio."'";
        $existe = 0;
        $resulti = $connect->query($Qexiste);
        if ($resulti->num_rows > 0) {  
            $existe = "1";
        while ($rowi = $resulti->fetch_assoc()) {
            $existe = "1";
        }
        }

        if($existe == "1"){ 
            $nombreApellido = $decodeduser->nombre." ".$decodeduser->apellido; 
            $QueryUpdate = "UPDATE servicios_pedidos_usuarios 
            set folio_servicio = '".$folioServicio."', 
            folio_pedido = '".$ped->folio."', 
            folio_usuario = '".$ped->usuario_asignado_id."', 
            nombre_usuario = '".$nombreApellido."', 
            fechahorapedido = '".$datetimePedido."',
            usuario_operador = '".$usuario_operador."',
            nombre_cte = '".$nombre_cte."',
            rzonsocial = '".$rzonsocial."',
            litros = '".$cantidad."',
            monto = '".$monto."',
            categoria = '".$categoria."',
            colonia = '".$colonia."',
            pago = '".$tipopago."',
            pipa = '".$pipa."',
            sector = '".$sector."',
            fechahoraservicio = '".$datetimeServicio."',
            estatus_pedido = '".$estatus_pedido."',
            noconsumidor = '".$numero_consumidor."',
            tipo_servicio = '".$tipo_servicio."',
            forma_pago = '".$forma_pago."',
            folio_unidad = '".$folio_unidad."'
            where folio_servicio = '".$folioServicio."'";
            $result = mysqli_query($connect,$QueryUpdate);
            if(($result)==1){
                echo "11<br>";
            }else{ 
                echo "00<br>";
            } 
        }else{
            $nombreApellido = $decodeduser->nombre." ".$decodeduser->apellido; 
            $Query = "INSERT into servicios_pedidos_usuarios 
            (folio_servicio, folio_pedido, folio_usuario, nombre_usuario, fechahorapedido, usuario_operador, nombre_cte, rzonsocial, litros, monto, categoria, colonia, pago, pipa, sector, fechahoraservicio, estatus_pedido, noconsumidor, tipo_servicio, forma_pago, folio_unidad)  
            values ('".$folioServicio."', '".$ped->folio."', '".$ped->usuario_asignado_id."', '".$nombreApellido."', '".$datetimePedido."', '".$usuario_operador."', '".$nombre_cte."', '".$rzonsocial."', '".$cantidad."', '".$monto."', '".$categoria."', '".$colonia."', '".$tipopago."', '".$pipa."', '".$sector."', '".$datetimeServicio."', '".$estatus_pedido."', '".$numero_consumidor."', '".$tipo_servicio."', '".$forma_pago."', '".$folio_unidad."')";
            $result = mysqli_query($connect,$Query);
            if(($result)==1){
                echo "1<br>";
            }else{
                echo "0<br>";
            }
            
        } 
         
       
   
}



?>