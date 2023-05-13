<?php
 
require_once('cors.php');
 require 'vendor/autoload.php';  
 require 'connector.php';
require_once('conexion.php'); 
 use PHPMailer\PHPMailer\PHPMailer;

$options = array(
    "location" =>"http://gasuniondeamerica.sgcweb.com.mx/ws/1094AEV2/v2/soap.php",
    "uri" => "", 
    "trace" => 0
       );
       $client = new SoapClient(NULL, $options);   
$id = $_POST["id"];
$data = json_decode(file_get_contents('php://input'), true);
 //print_r($data);
if($id == "obtenerConsumidor"){
    obtenerConsumidor();
}else if($id == "altaPedido"){
    altaPedido();
}else if($id == "cancelarPedido"){
    cancelarPedido();
}else if($id == "altaConsumidor"){
    altaConsumidor();
}else if($id == "obtnerUltimoFolioConsumidor"){
    obtnerUltimoFolioConsumidor();
}else if($id == "obtenerUltimoFolioPedido"){
    obtnerUltimoFolioPedido();
}else if($id == "obtenerSaldo"){
    obtenerSaldo();
}else if($id == "detalleSaldo"){
    detalleSaldo();
}else if($data["id"] == "abonarSaldo"){
    abonarSaldo();
}else if($id == "obtenerServicio"){
    obtenerServicio();
}else if($id == "Notificacion"){
    Notificacion($_POST["mensaje"]);
}else if($id == "historial"){
    historial();
}else if($id == "obtenerCliente"){
  obtenerCliente();
}else if($id == "registrarCliente"){
  registrarCliente();
}else if($id == "buscarConsumidor"){
  buscarConsumidor();
}

function registrarCliente(){
  global $client;
  $sessionId = getSessionId();

   
  
$cliente->numero_cliente = "481";//Dejar vacio ya que es asignado por SGC Web
$cliente->identificador_externo = "481";
$cliente->nombre = "cliente de prueba";
$cliente->rfc = "XAXX010101000";
$cliente->calle = "Paseo del Norte";
$cliente->no_exterior = "5600";
$cliente->no_interior = "";
$cliente->colonia = "Fraccionamiento Guadalajara Technology Park";
$cliente->localidad = "Zapopan";
$cliente->referencia = "Fraccionamiento Guadalajara Technology Park";
$cliente->ciudad = "Zapopan";
$cliente->estado = "Jalisco";
$cliente->codigo_postal = "45010";
$cliente->pais = "México";
$cliente->telefono1 = "Industrial";
$cliente->telefono2 = "";
$cliente->activo = 1;
$cliente->email = "cliente@corporativosade.com.mx";

 
$consumidor->email = "consumidores@corporativosade.com.mx|consumer@corporativosade.com.mx"; 
 

$cliente->observaciones = [
  'observacion1' => 'Ejemplo de observación',
  'observacion2' => '',
  'observacion3' => '',
  'observacion4' => '',
  'observacion5' => 'Observación ya guardada',
  'observacion6' => '',
  'observacion7' => '',
  'observacion8' => '',
  'observacion9' => '',
  'observacion10' => '',
];



$cliente->saldo = 0;
$cliente->politica_venta_id = "";
$cliente->regimenfiscal = "601";
$cliente->usocfdi = "G03";

$cliente_json = json_encode($cliente);

$respuesta = $client->procesarPeticion(
            	$sessionId,
            	"Clientes",
            	"registrar",
            	$cliente_json );

              print_r($respuesta);
}


function obtenerCliente(){
  global $client;
  $sessionId = getSessionId();

  $busqueda->folioPosicion = $_POST["foliocliente"]; 
$busqueda->cantidadElementos = 1; 
$paquete_json = json_encode($busqueda);

$respuesta = $client->procesarPeticion(
            	$sessionId,
            	"Clientes",
            	"obtenerListaPorFolio",
            	$paquete_json
        	);

print_r($respuesta->informacion);


$sessionId = getSessionId();
$decodedsec = json_decode($respuesta->informacion);
//print_r($decodedsec);
//echo $decodedsec[0]->numero_cliente;
     
  
$cliente->numero_cliente = $decodedsec[0]->numero_cliente;//Dejar vacio ya que es asignado por SGC Web
$cliente->identificador_externo = $decodedsec[0]->identificador_externo;
$cliente->nombre = $decodedsec[0]->nombre;
$cliente->rfc = $decodedsec[0]->rfc;
$cliente->calle = $decodedsec[0]->calle;
$cliente->no_exterior = $decodedsec[0]->no_exterior;
$cliente->no_interior = $decodedsec[0]->no_interior;
$cliente->colonia = $decodedsec[0]->colonia;
$cliente->localidad = $decodedsec[0]->localidad;
$cliente->referencia = $decodedsec[0]->referencia;
$cliente->ciudad = $decodedsec[0]->ciudad;
$cliente->estado = $decodedsec[0]->estado;
$cliente->codigo_postal = $decodedsec[0]->codigo_postal;
$cliente->pais = $decodedsec[0]->pais;
$cliente->telefono1 = $decodedsec[0]->telefono1;
$cliente->telefono2 = $decodedsec[0]->telefono2;
$cliente->activo = 1;
$cliente->email = str_replace(",", "|", $decodedsec[0]->email);

 
//$consumidor->email = "consumidores@corporativosade.com.mx|consumer@corporativosade.com.mx"; 

//print_r($decodedsec[0]->observaciones); 

//print_r($decodedsec[0]->observaciones[0]); 


$cliente->observaciones = [
  'observacion1' => '',
  'observacion2' => '',
  'observacion3' => '',
  'observacion4' => '',
  'observacion5' => '',
  'observacion6' => '',
  'observacion7' => '',
  'observacion8' => '',
  'observacion9' => '',
  'observacion10' => '',
];



$cliente->saldo = $decodedsec[0]->saldo;
$cliente->politica_venta_id = $decodedsec[0]->politica_venta_id;
$cliente->regimenfiscal = '626';
//$cliente->usocfdi = $decodedsec[0]->usocfdi;      G03 
$cliente->usocfdi = "G03";   

$cliente_json = json_encode($cliente);

print_r($cliente_json);
/*
$respuesta = $client->procesarPeticion(
            	$sessionId,
            	"Clientes",
            	"registrar",
            	$cliente_json );

              print_r($respuesta);
*/
}

function buscarConsumidor(){
   
  global $connect; 
      $requisiciones = array(); 
     
      if($_POST["telefono"] != "6699842020"){
      $sqld = "SELECT telefono1, noconsumidor, nombre, apellido, direccion
        FROM consumidores where telefono1 = '".$_POST["telefono"]."' or telefono2 = '".$_POST["telefono"]."'
        or  telefono1 LIKE '".$_POST["telefono"]."%'
        or  telefono2 LIKE '".$_POST["telefono"]."%' 
        limit 10
        ";  
      $resultu = $connect->query($sqld);
      if ($resultu->num_rows > 0) {   
      while ($row = $resultu->fetch_assoc()) {
          $requisiciones[] = array(  
              "noconsumidor" => $row['noconsumidor'],
              "nombre" => $row['nombre'],
              "apellido" => $row['apellido'],
              "direccion" => $row['direccion'],
              "telefono" => $row['telefono1']
            );
        }
      }
    }

      echo json_encode($requisiciones);

  } 


function historial(){
   
    global $connect; 
        $requisiciones = array(); 
       
        
        $sqld = "SELECT folio_servicio, monto, litros, fechahoraservicio, estatus_pedido
          FROM servicios_pedidos_usuarios where noconsumidor = '".$_POST["noConsumidor"]."'";  
        $resultu = $connect->query($sqld);
        if ($resultu->num_rows > 0) {   
        while ($row = $resultu->fetch_assoc()) {
            $requisiciones[] = array(  
                "folio" => $row['folio_servicio'],
                "litros" => $row['litros'],
                "monto" => $row['monto'],
                "fechahoraservicio" => $row['fechahoraservicio'],
                "estatus_pedido" => $row['estatus_pedido'] 
              );
          }
        }

        echo json_encode($requisiciones);
  
    } 
   



 function Notificacion($mensaje){  
    //equire './vendor/autoload.php'; 
    //require('./vendor/autoload.php');
    require __DIR__ . '/vendor/autoload.php';
      $options = array( 
        'cluster' => 'us3', 
        'useTLS' => true  
      ); 
      $pusher = new Pusher\Pusher( 
        '5238df05729a28dcfb1a', 
        '2cd372e2b9cdf259db92', 
        '1438005', 
        $options  
      ); 

      //tipo pedidos
      $tipo = "pedido";
      $data['mensaje'] = $mensaje; 
      $data['tipo'] = $tipo; 
     
      $pusher->trigger('my-channel', 'my-event', $data); 
    }



function obtenerServicio(){
    global $client;
    $sessionId = getSessionId();

        $busqueda->folioPosicion = $_POST["folio"]; // 150  
        $busqueda->cantidadElementos = "1"; // 150
        
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
        $venta->unidad->nombre = ""; 
        $venta->cantidad = ""; 
        $paquete->busqueda = $busqueda;
        $paquete->atributosVenta = $venta; 
        $paquete_json = json_encode($paquete);  
        $respuesta = $client->procesarPeticion(
                        $sessionId,
                        "Servicios",
                        "obtenerListaPorFolio",
                        $paquete_json
        );
        
        print_r($respuesta->informacion);
                 
    }
 

function abonarSaldo(){ 
    global $connect;
    $data1 = json_decode(file_get_contents('php://input'), true);
    $Query = "INSERT into abonos 
            (noconsumidor, importe, disponible, referencia, descripcion)  
            values ('".$data1["noconsumidor"]."', '".($data1["importe"] / 100)."', '".($data1["importe"] / 100)."', '', '".$data1["descripcion"]."')";
            $result = mysqli_query($connect,$Query); 
            if(($result)==1){
                echo "1";
            }else{
                echo "0";
            }
}


function detalleSaldo(){
   
    global $connect; 
        $requisiciones = array(); 
       
        
        $sqld = "SELECT folio, noconsumidor, DATE_FORMAT(fechacaptura, '%d/%m/%Y %H:%i:%s') as fechacaptura, importe, disponible, referencia, descripcion  FROM abonos where noconsumidor = '".$_POST["noConsumidor"]."'"; 
        $resultu = $connect->query($sqld);
        if ($resultu->num_rows > 0) {   
        while ($row = $resultu->fetch_assoc()) {
            $requisiciones[] = array(  
                "folio" => $row['folio'],
                "noconsumidor" => $row['noconsumidor'],
                "fechacaptura" => $row['fechacaptura'],
                "importe" => $row['importe'],
                "disponible" => $row['disponible'],
                "referencia" => $row['referencia'],
                "descripcion" => $row['descripcion']
              );
          }
        }

        echo json_encode($requisiciones);
  
    } 
   


function obtenerSaldo(){
    
global $connect;

$ultimo = "SELECT sum(disponible) as saldo FROM abonos where noconsumidor = '".$_POST["noConsumidor"]."'";
     
    $resultu = $connect->query($ultimo);
    if ($resultu->num_rows > 0) {   
    while ($row = $resultu->fetch_assoc()) {
        $saldo = $row['saldo'];
    }
    }
    echo $saldo;
}

function obtenerConsumidor(){
    
    global $client;
    $sessionId = getSessionId();
    $busqueda->folioPosicion = $_POST["folioconsumidor"];  
    $busqueda->cantidadElementos = 1; 
    $paquete_json = json_encode( $busqueda );
    
    $respuesta = $client->procesarPeticion(
                    $sessionId,
                    "Consumidores",
                    "obtenerListaPorFolio",
                    $paquete_json
                );
                //echo $respuesta->informacion->numero_consumidor;
               
    print_r($respuesta->informacion); 
}


function cancelarPedido(){
    
    global $client;
    $sessionId = getSessionId();  
    $identificador_externo = $_POST['foliopedido'];
    echo $identificador_externo;
    
    $respuesta = $client->procesarPeticion($sessionId, "Pedidos", "cancelar", $identificador_externo);
    
    print_r($respuesta); 
    

}


function altaConsumidor(){
    
    global $client;
    $sessionId = getSessionId();  
    if($_POST["noConsumidor"] != ""){
        $id_externo = $_POST["noConsumidor"];
        
    }else{
       $id_externo = obtnerUltimoFolioConsumidor();
     //   $id_externo = "3410";
    } 
    $consumidor->numero_consumidor = ""; 
    if($_POST["noConsumidor"] != ""){
        $consumidor->identificador_externo = $id_externo; //obtener el ultimos  814525
    }else{
        $consumidor->identificador_externo = $id_externo + 1; //obtener el ultimos  814525
    } 
    
    $consumidor->nombres = $_POST["nombres"];
    $consumidor->apellidos = $_POST["apellidos"];
    $consumidor->telefono1 = $_POST["telefono1"];
    if($_POST["telefono2"] == "undefined" || $_POST["telefono2"] == "null"){
      $consumidor->telefono2 = "";
    }else{
      $consumidor->telefono2 = $_POST["telefono2"];
    }
    if($_POST["descripcion"] == "undefined" || $_POST["descripcion"] == "null"){
      $consumidor->descripcion = "";
    }else{
      $consumidor->descripcion = $_POST["descripcion"];
    }
    if($_POST["comentario"] == "undefined" || $_POST["comentario"] == "null"){
      $consumidor->comentario = "";
    }else{
      $consumidor->comentario = $_POST["comentario"];
    }
    
    
    $consumidor->calle_numero = $_POST["calle_numero"];
    $consumidor->colonia = $_POST["colonia"];
    $consumidor->ciudad = $_POST["ciudad"];
    $consumidor->estado = "Sinaloa";
    $consumidor->pais = "México";
    $consumidor->codigo_postal = $_POST["codigo_postal"];
    $consumidor->tipo_consumidor_id = "DOMESTICO"; 
    $consumidor->politica_consumo_id = "polVPG"; 
    $consumidor->cliente_id = "1-VPG"; 
    $consumidor->email = $_POST["email"]; 
    $consumidor->saldo = "";
    $consumidor->capacidad = "";
    $consumidor->numero_verificador = "";
    if($_POST["c_latitud"] && $_POST["c_longitud"]){
    $consumidor->posicion_gps->latitud_indicador = "N";
    $consumidor->posicion_gps->latitud_grados_decimales = $_POST["c_latitud"];
    
    $consumidor->posicion_gps->longitud_indicador = "W";
    $consumidor->posicion_gps->longitud_grados_decimales = $_POST["c_longitud"]; 
    }
    $consumidor_json = json_encode($consumidor); 
  // print_r($consumidor_json);
    $respuesta = $client->procesarPeticion(
                    $sessionId,
                    "Consumidores",
                    "registrar",
                    $consumidor_json);
       //  print_r($respuesta);
                     print_r($respuesta->informacion); 
                   // $decoded = json_decode($respuesta->informacion);
                    //  print_r($decoded);
                     // $noCon = $decoded[0]->numero_consumidor;
                     // echo $folioUsuario; 
                    if($_POST["noConsumidor"] != ""){
                        //correo de actualizacion de datos 
                        correoNotificacionActualizacionConsumidor();
                    }else{
                        correoNotificacionNuevoConsumidor();
                        correoAltaConsumidor($_POST["email"], $_POST["nombres"], $_POST["apellidos"], $id_externo + 1, $_POST["telefono1"]);
                    } 

}     


function altaPedido(){
    global $client;
    $sessionId = getSessionId();

   
    $fecha = $_POST['fecha'];  
    $hora = $_POST['hora'];
    
    $date = str_replace('/', '-', $fecha); 
    $fechayhora = date('Y-m-d', strtotime($date))." ".$hora.":00";
 
    $fechayhorafinal = date('Y-m-d H:i:s', strtotime($fechayhora));
    $newDate = date('Y-m-d H:i:s', strtotime($fechayhorafinal. ' + 7 hours')); 
    //echo $newDate;

    $cantidad = $_POST["cantidad"];
    if($cantidad == ""){
        $cantidad = 1;
    }
    $fo = obtnerUltimoFolioPedido();  
    $pedido->folio = $fo + 1;//Generado por SGCWEB 
    $pedido->fecha_servicio = "";//Generado por SGCWEB 
    $pedido->estatus = "";//Generado por SGCWEB 
    $pedido->identificador_externo  = $fo+1;  
    $pedido->fecha_atencion = $newDate; //yyyy-mm-dd hh:mm:ss
    if($_POST["comentarios"] == "undefined" || $_POST["comentarios"] == "null"){
      $pedido->comentarios = "";
    }else{
      $pedido->comentarios = $_POST['comentarios'];
    }
    //$pedido->cantidad = $cantidad;
    $pedido->cantidad = 1;
    $pedido->producto_id = "idextproductobase"; // 00001 || idextproductobase
    //$pedido->precio_id = "00001"; // ???  
    $pedido->usuario_asignado_id = "";//Si no se define el sistema asigna el usuario con el que se conecta la aplicación externa
    $pedido->consumidor_id = $_POST['consumidor_id'];
    $pedido->ruta_id = $_POST["rutaid"]; // ??? 8 por ejemplo
   // $pedido->lista_unidades_id = array("01"); //??  

    $pedido_json = json_encode($pedido); 
  //  print_r($pedido_json);
  
   $result = $client->procesarPeticion(
                    $sessionId,
                    "Pedidos",
                    "registrar",
                    $pedido_json);
                    //print_r($result);
                 print_r($result->informacion);   

               //  print_r($result);

            correoNuevoPedido($_POST["correo"], $_POST["nombres"], $_POST["apellidos"], $_POST["telefono"], $fo+1, $fecha, $hora, $_POST['consumidor_id'], $cantidad, $_POST['comentarios']);
                 //obtener ultimo folio +1;
}

function obtnerUltimoFolioConsumidor(){
    global $client;
    $sessionId = getSessionId();

    $respuesta = $client->procesarPeticion($sessionId, "Consumidores", "obtenerUltimoFolio", "" );

    if( $respuesta->codigo == "0000" )
    {
    $ultimo_folio = $respuesta->informacion;
    }
    return $ultimo_folio;

}


function obtnerUltimoFolioPedido(){
    global $client;
    $sessionId = getSessionId();
    $datehoy = date('Y-m-d H:i:s');
    $dateayer = date('Y-m-d H:i:s', strtotime($datehoy. ' - 7 hours')); 
    $datemañana = date('Y-m-d H:i:s', strtotime($datehoy. ' + 1 year')); 
   
    $busqueda->metodoBusqueda = "fecha_creacion";
    $busqueda->fechaInicio= $dateayer; 
    $busqueda->fechaFinal= $datemañana;  
    $paquete_json = json_encode( $busqueda );


    $respuesta = $client->procesarPeticion($sessionId, "Pedidos", "obtenerUltimoFolio" );
    
    if( $respuesta->codigo == "0000" )
    {
    $array = json_decode($respuesta->informacion);
    }

    /*$i = sizeof($array);
    print_r($array);
    $ultimo_folio = $array[$i - 1]->folio;
    */
  //  echo $array;
    return $array;

}




function getSessionId(){
 
     global $client;
     $userAuth = array(
 		"user_name" => "aplicaciongas", //administrador 
		"password" => MD5("@aplicaciongas"), //@Grup0P3tr0#
		"version" => "01"
	     ); 
      $objeto_respuesta = $client->login($userAuth,"pegasus"); 
      $sessionId = $objeto_respuesta->id; 
      return $sessionId;
}

            
    function correoNotificacionActualizacionConsumidor(){
 
        $address = array('desarrollosistemas@grupopetromar.com','auxdesarrollo@grupopetromar.com','atenciongas@grupopetromar.com', 'callcentergas@grupopetromar.com');
			 
		//$recipient = "desarrollosistemas@grupopetromar.com"; 
		//Instantiation and passing true enables exceptions 
		$mail = new PHPMailer(true); 
		$mail->SMTPDebug;      
		$mail->CharSet = 'UTF-8'; 
		$mail->Encoding = 'base64'; 
		$mail->SetLanguage("es", 'includes/phpMailer/language/');  

    if($_POST["telefono2"] == "undefined" || $_POST["telefono2"] == "null"){
      $telefono2_c = "";
    }else{
      $telefono2_c = $_POST["telefono2"];
    }
    if($_POST["descripcion"] == "undefined" || $_POST["descripcion"] == "null"){
      $descripcion_c = "";
    }else{
      $descripcion_c = $_POST["descripcion"];
    }
    if($_POST["comentario"] == "undefined" || $_POST["comentario"] == "null"){
      $comentario_c = "";
    }else{
      $comentario_c = $_POST["comentario"];
    }
	  
		try {  
			$mail->IsMail();  
			$mail->SMTPAuth   = TRUE; 
			$mail->SMTPSecure = "ssl"; 
			$mail->Port       = 465; 
			$mail->Host       = "mail.grupopetromar.com"; 
			$mail->Username   = "desarrollosistemas@grupopetromar.com"; 
			$mail->Password   = "nAUZ3N4zMw&E"; 
	  
			$mail->setFrom('desarrollosistemas@competro.mx', 'Grupo Petromar S.A. DE C.V'); 
			  
	 // foreach ($address as $valor) { 
	   //$mail->AddAddress($correo);
	   foreach ($address as $valor) { 
		$mail->AddAddress($valor); 
	   } 
	  //} auxdesarrollo
	 // $mail->addAddress('desarrollosistemas@grupopetromar.com', ' ');     // Add a recipient 
			$mail->isHTML(true);                                  // Set email format to HTML 
			$mail->Subject = 'Actualización de consumidor'; 
			$mail->Body    = '  <div style="width:200px">
            <label>Se actualizó la información del consumidor: '.$_POST['noConsumidor'].' </label><br><br>
            <label> Nombre (s): '.$_POST['nombres'].'</label> <br>
            <label> Apellido (s): '.$_POST['apellidos'].'</label> <br>
            <label> Telefono 1: '.$_POST['telefono1'].'</label> <br>
            <label> Telefono 2: '.$telefono2_c.'</label> <br>
            <label> Descripcion: '.$descripcion_c.'</label> <br>
            <label> Comentario: '.$comentario_c.'</label> <br>
            <label> Calle y número: '.$_POST['calle_numero'].'</label> <br>
            <label> Colonia: '.$_POST['colonia'].'</label> <br> 
            <label> Ciudad: '.$_POST['ciudad'].'</label> <br>
		<span>*Generado automaticamente</span>			
				  </div>'; 
			$mail->AltBody = ' ---- '; 
	 
			if (!$mail->send()) { 
		//		echo 'Mailer Error: ' . $mail->ErrorInfo; 
			} else { 
			//	echo 'Message sent!'; 
			} 
	 
		} catch (Exception $e) { 
		//	echo $e; 
		} 
	


    }


    function correoNotificacionNuevoConsumidor(){
 
        $address = array('desarrollosistemas@grupopetromar.com','auxdesarrollo@grupopetromar.com','atenciongas@grupopetromar.com', 'callcentergas@grupopetromar.com', 'marketingdigital@grupopetromar.com');
			 
		//$recipient = "desarrollosistemas@grupopetromar.com"; 
		//Instantiation and passing true enables exceptions 
		$mail = new PHPMailer(true); 
		$mail->SMTPDebug;      
		$mail->CharSet = 'UTF-8'; 
		$mail->Encoding = 'base64'; 
		$mail->SetLanguage("es", 'includes/phpMailer/language/');  
    if($_POST["telefono2"] == "undefined" || $_POST["telefono2"] == "null"){
      $telefono2_c = "";
    }else{
      $telefono2_c = $_POST["telefono2"];
    }
    if($_POST["descripcion"] == "undefined" || $_POST["descripcion"] == "null"){
      $descripcion_c = "";
    }else{
      $descripcion_c = $_POST["descripcion"];
    }
    if($_POST["comentario"] == "undefined" || $_POST["comentario"] == "null"){
      $comentario_c = "";
    }else{
      $comentario_c = $_POST["comentario"];
    }
	 
		try {  
			$mail->IsMail();  
			$mail->SMTPAuth   = TRUE; 
			$mail->SMTPSecure = "ssl"; 
			$mail->Port       = 465; 
			$mail->Host       = "mail.grupopetromar.com"; 
			$mail->Username   = "desarrollosistemas@grupopetromar.com"; 
			$mail->Password   = "nAUZ3N4zMw&E"; 
	  
			$mail->setFrom('desarrollosistemas@competro.mx', 'Grupo Petromar S.A. DE C.V'); 
			  
	 // foreach ($address as $valor) { 
	   //$mail->AddAddress($correo);
	   foreach ($address as $valor) { 
		$mail->AddAddress($valor); 
	   } 
	  //} auxdesarrollo
	 // $mail->addAddress('desarrollosistemas@grupopetromar.com', ' ');     // Add a recipient 
			$mail->isHTML(true);                                  // Set email format to HTML 
			$mail->Subject = 'Nuevo consumidor'; 
			$mail->Body    = '  <div style="width:200px">
            <label>Se registró un nuevo consumidor consumidor: '.$_POST['noConsumidor'].' </label><br><br>
            <label> Nombre (s): '.$_POST['nombres'].'</label> <br>
            <label> Apellido (s): '.$_POST['apellidos'].'</label> <br>
            <label> Telefono 1: '.$_POST['telefono1'].'</label> <br>
            <label> Telefono 2: '.$telefono2_c.'</label> <br>
            <label> Descripcion: '.$descripcion_c.'</label> <br>
            <label> Comentario: '.$comentario_c.'</label> <br>
            <label> Calle y número: '.$_POST['calle_numero'].'</label> <br>
            <label> Colonia: '.$_POST['colonia'].'</label> <br> 
            <label> Ciudad: '.$_POST['ciudad'].'</label> <br>
		<span>*Generado automaticamente</span>			
				  </div>'; 
			$mail->AltBody = ' ---- '; 
	 
			if (!$mail->send()) { 
		//		echo 'Mailer Error: ' . $mail->ErrorInfo; 
			} else { 
			//	echo 'Message sent!'; 
			} 
	 
		} catch (Exception $e) { 
		//	echo $e; 
		} 
	


    }



    function correoAltaConsumidor($correo, $nombres, $apellidos, $noConsumidor, $telefono){
 
        $address = array('desarrollosistemas@grupopetromar.com','auxdesarrollo@grupopetromar.com','atenciongas@grupopetromar.com','callcentergas@grupopetromar.com', 'marketingdigital@grupopetromar.com');
			 
		//$recipient = "desarrollosistemas@grupopetromar.com"; 
		//Instantiation and passing true enables exceptions 
		$mail = new PHPMailer(true); 
		$mail->SMTPDebug;      
		$mail->CharSet = 'UTF-8'; 
		$mail->Encoding = 'base64'; 
		$mail->SetLanguage("es", 'includes/phpMailer/language/');  
	 
		try {  
			$mail->IsMail();  
			$mail->SMTPAuth   = TRUE; 
			$mail->SMTPSecure = "ssl"; 
			$mail->Port       = 465; 
			$mail->Host       = "mail.grupopetromar.com"; 
			$mail->Username   = "desarrollosistemas@grupopetromar.com"; 
			$mail->Password   = "nAUZ3N4zMw&E"; 
	  
			$mail->setFrom('desarrollosistemas@competro.mx', 'Grupo Petromar S.A. DE C.V'); 
			  
	 // foreach ($address as $valor) { 
	   //$mail->AddAddress($correo); 
		$mail->AddAddress($correo);  
	  //} auxdesarrollo
	 // $mail->addAddress('desarrollosistemas@grupopetromar.com', ' ');     // Add a recipient 
			$mail->isHTML(true);                                  // Set email format to HTML 
			$mail->Subject = 'Registro consumidor'; 
			$mail->Body    = '
            
            <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title></title>
  
    <style type="text/css">
      @media only screen and (min-width: 570px) {
  .u-row {
    width: 550px !important;
  }
  .u-row .u-col {
    vertical-align: top;
  }

  .u-row .u-col-100 {
    width: 550px !important;
  }

}

@media (max-width: 570px) {
  .u-row-container {
    max-width: 100% !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .u-row .u-col {
    min-width: 320px !important;
    max-width: 100% !important;
    display: block !important;
  }
  .u-row {
    width: 100% !important;
  }
  .u-col {
    width: 100% !important;
  }
  .u-col > div {
    margin: 0 auto;
  }
}
body {
  margin: 0;
  padding: 0;
}

table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}

p {
  margin: 0;
}

.ie-container table,
.mso-container table {
  table-layout: fixed;
}

* {
  line-height: inherit;
}

 

table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_content_heading_3 .v-font-size { font-size: 22px !important; } #u_content_text_7 .v-container-padding-padding { padding: 0px 120px 20px 15px !important; } #u_content_button_1 .v-container-padding-padding { padding: 10px 10px 30px !important; } #u_content_button_1 .v-padding { padding: 13px 40px !important; } #u_content_divider_1 .v-container-padding-padding { padding: 50px !important; } }
    </style>
  
  

<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Cabin:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->
    

<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 550px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:550px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="550" style="background-color: #0071ce;width: 550px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 550px;display: table-cell;vertical-align: top;">
  <div style="background-color: #0071ce;height: 100%;width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px;font-family:Cabin,sans-serif;" align="left">
        
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding-right: 0px;padding-left: 0px;" align="center">
      
      <img align="center" border="0" src="https://gaspetromarapp.grupopetromar.com/images/LogoPetromarGas.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 52%;max-width: 275.6px;" width="275.6"/>
      
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 550px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #0171CE;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:550px;"><tr style="background-color: #0171CE;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="550" style="width: 550px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 550px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 15px;font-family:Cabin,sans-serif;" align="left">
        
  <h1 class="v-font-size" style="margin: 0px; color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: Cabin,sans-serif; font-size: 27px;">¡Bienvenido a Gas Petromar!</h1>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 15px;font-family:Cabin,sans-serif;" align="left">
        
  <div style="color: #ffffff; line-height: 160%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 20px; line-height: 32px;"><strong>Hola '.$nombres.' '.$apellidos.'!</strong></span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 550px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #0171CE;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:550px;"><tr style="background-color: #0171CE;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="550" style="width: 550px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 550px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 15px 25px;font-family:Cabin,sans-serif;" align="left">
        
  <div style="color: #ffffff; line-height: 160%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 160%;">Gracias por elegir Gas Petromar. Nos alegra que estés aquí, gas petromar te ofrece el mejor precio de Gas L.P. en la ciudad.</p>
<p style="font-size: 14px; line-height: 160%;"> </p>
<p style="font-size: 14px; line-height: 160%;">Para acceder a tu cuenta, y crear pedidos y ver nuestras promociones, haz clic en el botón azul:</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 30px;font-family:Cabin,sans-serif;" align="left">
        
  <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
<div align="center">
  <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://petromargas.com/" style="height:43px; v-text-anchor:middle; width:271px;" arcsize="9.5%"  stroke="f" fillcolor="#0071ce"><w:anchorlock/><center style="color:#FFFFFF;font-family:Cabin,sans-serif;"><![endif]-->  
    <a href="http://petromargas.com/" target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;font-family:Cabin,sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #000000; background-color: #ffffff; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
      <span class="v-padding" style="display:block;padding:13px 30px;line-height:120%;"><span style="font-size: 14px; line-height: 16.8px;">INICIAR SESIÓN EN TU CUENTA 🡪</span></span>
    </a>
  <!--[if mso]></center></v:roundrect><![endif]-->
</div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 550px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #0171CE;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:550px;"><tr style="background-color: #0171CE;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="550" style="width: 550px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 550px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
   
<table style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
<tbody>
  <tr>
    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:25px 10px 10px;font-family:Cabin,sans-serif;" align="left">
      
<h1 class="v-font-size" style="margin: 0px; color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: Cabin,sans-serif; font-size: 24px;">Datos de tu cuenta</h1>

    </td>
  </tr>
</tbody>
</table>

<table style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
<tbody>
  <tr>
    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 5px;font-family:Cabin,sans-serif;" align="left">
      
<div style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
  <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 16px; line-height: 22.4px;">Teléfono : '.$telefono.'</span></p>
</div>

    </td>
  </tr>
</tbody>
</table>

<table style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
<tbody>
  <tr>
    <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 5px;font-family:Cabin,sans-serif;" align="left">
      
<div style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
  <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 16px; line-height: 22.4px;">Consumidor: '.$noConsumidor.'</span></p>
</div>

    </td>
  </tr>
</tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 550px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:550px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="550" style="width: 550px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 550px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:Cabin,sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 550px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-image: url("https://gaspetromarapp.grupopetromar.com/images/image-4.png");background-repeat: no-repeat;background-position: center top;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:550px;"><tr style="background-image: url("https://gaspetromarapp.grupopetromar.com/images/image-4.png");background-repeat: no-repeat;background-position: center top;background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="550" style="width: 550px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 550px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:Cabin,sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_heading_3" style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:15px 10px 10px 15px;font-family:Cabin,sans-serif;" align="left">
        
  <h1 class="v-font-size" style="margin: 0px; color: #21a70a; line-height: 140%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: Cabin,sans-serif; font-size: 24px;">Estamos aquí para ayudarte</h1>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_text_7" style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 15px 10px;font-family:Cabin,sans-serif;" align="left">
        
  <div style="color: #6e7172; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;">Comunícate con nosotros si presentas algún error,</span></p>
<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;">estamos listos para recibir tu llamada</span></p>
<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;">y abastecer tu casa o negocio siempre</span></p>
<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;">con nuestro mejor <span style="line-height: 19.6px; font-size: 14px;">servicio.</span></span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_button_1" style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 30px 15px;font-family:Cabin,sans-serif;" align="left">
        
  <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
<div align="left">
  <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="tel: 6699842020 " style="height:43px; v-text-anchor:middle; width:231px;" arcsize="9.5%"  stroke="f" fillcolor="#3AAEE0"><w:anchorlock/><center style="color:#FFFFFF;font-family:Cabin,sans-serif;"><![endif]-->  
    <a href="tel: 6699842020 " target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;font-family:Cabin,sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #3AAEE0; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
      <span class="v-padding" style="display:block;padding:13px 50px;line-height:120%;"><span style="font-size: 14px; line-height: 16.8px;">H A Z   C L I C   A Q U I</span></span>
    </a>
  <!--[if mso]></center></v:roundrect><![endif]-->
</div>

      </td>
    </tr>
  </tbody>
</table>
<img src="https://gaspetromarapp.grupopetromar.com/images/image-4.png" style="width:100%"/>  

<table id="u_content_divider_1" style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:80px;font-family:Cabin,sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 550px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:550px;"><tr style="background-color: #ffffff;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="550" style="background-color: #0071ce;width: 550px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 550px;display: table-cell;vertical-align: top;">
  <div style="background-color: #0071ce;height: 100%;width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 10px;font-family:Cabin,sans-serif;" align="left">
        
<div align="center">
  <div style="display: table; max-width:155px;">
  <!--[if (mso)|(IE)]><table width="155" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:155px;"><tr><![endif]-->
  
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 20px;" valign="top"><![endif]-->
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 20px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://www.facebook.com/grupopetromar" title="Facebook" target="_blank">
          <img src="https://gaspetromarapp.grupopetromar.com/images/image-3.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 20px;" valign="top"><![endif]-->
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 20px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://api.whatsapp.com/send/?phone=526699933030&text=Hola%21+Buen+d%C3%ADa&type=phone_number&app_absent=0" title="WhatsApp" target="_blank">
          <img src="https://gaspetromarapp.grupopetromar.com/images/image-1.png" alt="WhatsApp" title="WhatsApp" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://instagram.com/" title="Instagram" target="_blank">
          <img src="https://gaspetromarapp.grupopetromar.com/images/image-2.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    
    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
  </div>
</div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:Cabin,sans-serif;" align="left">
        
  <div style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 18px; line-height: 25.2px;">w w w . p e t r o m a r g a s . c o m</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 15px;font-family:Cabin,sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #ced4d9;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:Cabin,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:Cabin,sans-serif;" align="left">
        
  <div style="color: #ffffff; line-height: 180%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 180%;"><span style="font-size: 12px; line-height: 21.6px;">© 2022 Grupo Petromar. All Rights Reserved.</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>


    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
    </td>
  </tr>
  </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>

</html>

            
            
            '; 
			$mail->AltBody = ' ---- '; 
	 
			if (!$mail->send()) { 
		//		echo 'Mailer Error: ' . $mail->ErrorInfo; 
			} else { 
			//	echo 'Message sent!'; 
			} 
	 
		} catch (Exception $e) { 
		//	echo $e; 
		} 
	


    }



    function correoNuevoPedido($correo, $nombres, $apellidos, $telefono, $folio, $fecha, $hora, $consumidor, $cantidad, $comentarios){
 
        $address = array('desarrollosistemas@grupopetromar.com','auxdesarrollo@grupopetromar.com', 'marketingdigital@grupopetromar.com');
			 
		//$recipient = "desarrollosistemas@grupopetromar.com"; 
		//Instantiation and passing true enables exceptions 
		$mail = new PHPMailer(true); 
		$mail->SMTPDebug;      
		$mail->CharSet = 'UTF-8'; 
		$mail->Encoding = 'base64'; 
		$mail->SetLanguage("es", 'includes/phpMailer/language/');  
	 
		try {     
			$mail->IsMail();  
			$mail->SMTPAuth   = TRUE; 
			$mail->SMTPSecure = "ssl"; 
			$mail->Port       = 465; 
			$mail->Host       = "mail.grupopetromar.com"; 
			$mail->Username   = "desarrollosistemas@grupopetromar.com"; 
			$mail->Password   = "nAUZ3N4zMw&E"; 
	    
			$mail->setFrom('desarrollosistemas@grupopetromar.com', 'Grupo Petromar S.A. DE C.V'); 
			    
	 // foreach ($address as $valor) { 
	   //$mail->AddAddress($correo); 
		$mail->AddAddress('desarrollo@grupopetromar.com');  
		$mail->AddAddress('desarrollosoftware@grupopetromar.com');  
		$mail->AddAddress('atenciongas@grupopetromar.com');  
		$mail->AddAddress('callcentergas@grupopetromar.com');  
	  //} auxdesarrollo
	 // $mail->addAddress('desarrollosistemas@grupopetromar.com', ' ');     // Add a recipient 
			$mail->isHTML(true);                                  // Set email format to HTML 
			$mail->Subject = 'Confirmación de pedido'; 
			$mail->Body    = '
      <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
      <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="x-apple-disable-message-reformatting">
        <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
        <title></title>
        
          <style type="text/css">
            @media only screen and (min-width: 570px) {
        .u-row {
          width: 550px !important;
        }
        .u-row .u-col {
          vertical-align: top;
        }
      
        .u-row .u-col-100 {
          width: 550px !important;
        }
      
      }
      
      @media (max-width: 570px) {
        .u-row-container {
          max-width: 100% !important;
          padding-left: 0px !important;
          padding-right: 0px !important;
        }
        .u-row .u-col {
          min-width: 320px !important;
          max-width: 100% !important;
          display: block !important;
        }
        .u-row {
          width: 100% !important;
        }
        .u-col {
          width: 100% !important;
        }
        .u-col > div {
          margin: 0 auto;
        }
      }
      body {
        margin: 0;
        padding: 0;
      }
      
      table,
      tr,
      td {
        vertical-align: top;
        border-collapse: collapse;
      }
      
      p {
        margin: 0;
      }
      
      .ie-container table,
      .mso-container table {
        table-layout: fixed;
      }
      
      * {
        line-height: inherit;
      }
      
      a[x-apple-data-detectors="true"] {
        color: inherit !important;
        text-decoration: none !important;
      }
      
      table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_content_heading_3 .v-font-size { font-size: 22px !important; } #u_content_text_7 .v-container-padding-padding { padding: 0px 120px 20px 15px !important; } #u_content_button_1 .v-container-padding-padding { padding: 10px 10px 30px !important; } #u_content_button_1 .v-padding { padding: 13px 40px !important; } #u_content_divider_1 .v-container-padding-padding { padding: 50px !important; } }
          </style>
        
        
      
      <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Cabin:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->
      
      </head>
      
      <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
        <!--[if IE]><div class="ie-container"><![endif]-->
        <!--[if mso]><div class="mso-container"><![endif]-->
        <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
        <tbody>
        <tr style="vertical-align: top">
          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->
          
      
      <div class="u-row-container" style="padding: 0px;background-color: transparent">
        <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 550px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
          <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:550px;"><tr style="background-color: transparent;"><![endif]-->
            
      <!--[if (mso)|(IE)]><td align="center" width="550" style="background-color: #0071ce;width: 550px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
      <div class="u-col u-col-100" style="max-width: 320px;min-width: 550px;display: table-cell;vertical-align: top;">
        <div style="background-color: #0071ce;height: 100%;width: 100% !important;">
        <!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
        
      <table style="font-family:"Cabin",sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
          <tr>
            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px;font-family:"Cabin",sans-serif;" align="left">
              
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding-right: 0px;padding-left: 0px;" align="center">
            
            <img align="center" border="0" src="https://gaspetromarapp.grupopetromar.com/images/LogoPetromarGas.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 52%;max-width: 275.6px;" width="275.6"/>
            
          </td>
        </tr>
      </table>
      
            </td>
          </tr>
        </tbody>
      </table>
      
        <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
        </div>
      </div>
      <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
      </div>
      
      
      
      <div class="u-row-container" style="padding: 0px;background-color: transparent">
        <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 550px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #0071ce;">
          <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:550px;"><tr style="background-color: #0071ce;"><![endif]-->
            
      <!--[if (mso)|(IE)]><td align="center" width="550" style="width: 550px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
      <div class="u-col u-col-100" style="max-width: 320px;min-width: 550px;display: table-cell;vertical-align: top;">
        <div style="height: 100%;width: 100% !important;">
        <!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
        
      <table style="font-family:"Cabin",sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
          <tr>
            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 15px;font-family:"Cabin",sans-serif;" align="left">
           
            </td>
          </tr>
        </tbody>
      </table>
      
      <table style="font-family:"Cabin",sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
          <tr>
            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 15px;font-family:"Cabin",sans-serif;" align="left">
              
        <div style="color: #ffffff; line-height: 160%; text-align: center; word-wrap: break-word;">
          <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 20px; line-height: 32px;"><strong>'.$nombres.' '.$apellidos.' realizó un nuevo pedido</strong></span></p>
        </div>
      
            </td>
          </tr>
        </tbody>
      </table>
      
        <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
        </div>
      </div>
      <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
      </div>
      
      
      
      <div class="u-row-container" style="padding: 0px;background-color: transparent">
        <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 550px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #0071ce;">
          <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:550px;"><tr style="background-color: #0071ce;"><![endif]-->
            
      <!--[if (mso)|(IE)]><td align="center" width="550" style="width: 550px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
      <div class="u-col u-col-100" style="max-width: 320px;min-width: 550px;display: table-cell;vertical-align: top;">
        <div style="height: 100%;width: 100% !important;">
        <!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
        
      <table style="font-family:"Cabin",sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
          <tr>
            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 15px 25px;font-family:"Cabin",sans-serif;" align="left">
              
        <div style="color: #ffffff; line-height: 160%; text-align: center; word-wrap: break-word;">
          <p style="font-size: 14px; line-height: 160%;">Fecha y hora: '.$fecha.' '.$hora.'</p>
      <p style="font-size: 14px; line-height: 160%;">Consumidor: '.$consumidor.'</p> 
      <p style="font-size: 14px; line-height: 160%;">Cantidad: '.$cantidad.'</p> 
      <p style="font-size: 14px; line-height: 160%;">Comentarios: '.$comentarios.'</p> 
        </div>
      
            </td>
          </tr>
        </tbody>
      </table>
      
       
      
        <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
        </div>
      </div>
      <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
      </div>
      
      
      
      <div class="u-row-container" style="padding: 0px;background-color: transparent">
        <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 550px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #0071ce;">
          <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:550px;"><tr style="background-color: #0071ce;"><![endif]-->
            
      <!--[if (mso)|(IE)]><td align="center" width="550" style="width: 550px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
      <div class="u-col u-col-100" style="max-width: 320px;min-width: 550px;display: table-cell;vertical-align: top;">
        <div style="height: 100%;width: 100% !important;">
        <!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
        
      
      
      <table style="font-family:"Cabin",sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
          <tr>
            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 5px;font-family:"Cabin",sans-serif;" align="left">
              
      
            </td>
          </tr>
        </tbody>
      </table>
      
        <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
        </div>
      </div>
      <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
      </div>
      
      
      
      <div class="u-row-container" style="padding: 0px;background-color: transparent">
        <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 550px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
          <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:550px;"><tr style="background-color: transparent;"><![endif]-->
            
      <!--[if (mso)|(IE)]><td align="center" width="550" style="width: 550px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
      <div class="u-col u-col-100" style="max-width: 320px;min-width: 550px;display: table-cell;vertical-align: top;">
        <div style="height: 100%;width: 100% !important;">
        <!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
        
      <table style="font-family:"Cabin",sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
           
        </tbody>
      </table>
      
        <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
        </div>
      </div>
      <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
      </div>
      
      
      
      <div class="u-row-container" style="padding: 0px;background-color: transparent">
        <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 550px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
          <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-image: url("https://gaspetromarapp.grupopetromar.com/images/image-4.png");background-repeat: no-repeat;background-position: center top;background-color: transparent;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:550px;"><tr style="background-image: url("https://gaspetromarapp.grupopetromar.com/images/image-4.png");background-repeat: no-repeat;background-position: center top;background-color: transparent;"><![endif]-->
            
      <!--[if (mso)|(IE)]><td align="center" width="550" style="width: 550px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
      <div class="u-col u-col-100" style="max-width: 320px;min-width: 550px;display: table-cell;vertical-align: top;">
        <div style="height: 100%;width: 100% !important;">
        <!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
         
           
      
      
      
      <div class="u-row-container" style="padding: 0px;background-color: transparent">
        <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 550px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
          <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:550px;"><tr style="background-color: #ffffff;"><![endif]-->
            
      <!--[if (mso)|(IE)]><td align="center" width="550" style="background-color: #0071ce;width: 550px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
      <div class="u-col u-col-100" style="max-width: 320px;min-width: 550px;display: table-cell;vertical-align: top;">
        <div style="background-color: #0071ce;height: 100%;width: 100% !important;">
        <!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
        
      <table style="font-family:"Cabin",sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
          <tr>
            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 10px;font-family:"Cabin",sans-serif;" align="left">
              
      <div align="center">
        <div style="display: table; max-width:155px;">
        <!--[if (mso)|(IE)]><table width="155" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:155px;"><tr><![endif]-->
        
          
          <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 20px;" valign="top"><![endif]-->
          <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 20px">
            <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
              <a href="https://www.facebook.com/grupopetromar" title="Facebook" target="_blank">
                <img src="https://gaspetromarapp.grupopetromar.com/images/image-3.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
              </a>
            </td></tr>
          </tbody></table>
          <!--[if (mso)|(IE)]></td><![endif]-->
          
          <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 20px;" valign="top"><![endif]-->
          <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 20px">
            <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
              <a href="https://api.whatsapp.com/send/?phone=526699933030&text=Hola%21+Buen+d%C3%ADa&type=phone_number&app_absent=0" title="WhatsApp" target="_blank">
                <img src="https://gaspetromarapp.grupopetromar.com/images/image-1.png" alt="WhatsApp" title="WhatsApp" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
              </a>
            </td></tr>
          </tbody></table>
          <!--[if (mso)|(IE)]></td><![endif]-->
          
          <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
          <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
            <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
              <a href="https://instagram.com/" title="Instagram" target="_blank">
                <img src="https://gaspetromarapp.grupopetromar.com/images/image-2.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
              </a>
            </td></tr>
          </tbody></table>
          <!--[if (mso)|(IE)]></td><![endif]-->
          
          
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
      
            </td>
          </tr>
        </tbody>
      </table>
      
      <table style="font-family:"Cabin",sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
          <tr>
            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:"Cabin",sans-serif;" align="left">
              
        <div style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
          <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 18px; line-height: 25.2px;">w w w . p e t r o m a r g a s . c o m</span></p>
        </div>
      
            </td>
          </tr>
        </tbody>
      </table>
      
      <table style="font-family:"Cabin",sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
          <tr>
            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 15px;font-family:"Cabin",sans-serif;" align="left">
              
        <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #ced4d9;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <tbody>
            <tr style="vertical-align: top">
              <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                <span>&#160;</span>
              </td>
            </tr>
          </tbody>
        </table>
      
            </td>
          </tr>
        </tbody>
      </table>
      
      <table style="font-family:"Cabin",sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
          <tr>
            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:"Cabin",sans-serif;" align="left">
              
        <div style="color: #ffffff; line-height: 180%; text-align: center; word-wrap: break-word;">
          <p style="font-size: 14px; line-height: 180%;"><span style="font-size: 12px; line-height: 21.6px;">© 2022 Grupo Petromar. All Rights Reserved.</span></p>
        </div>
      
            </td>
          </tr>
        </tbody>
      </table>
      
        <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
        </div>
      </div>
      <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
      </div>
      
      
          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          </td>  
        </tr>
        </tbody>
        </table>
        <!--[if mso]></div><![endif]-->
        <!--[if IE]></div><![endif]-->
      </body>
      
      </html>
      

            
            
            '; 
			$mail->AltBody = ' ---- '; 
	 
			if (!$mail->send()) { 
		//		echo 'Mailer Error: ' . $mail->ErrorInfo; 
			} else { 
			//	echo 'Message sent!'; 
			} 
	 
		} catch (Exception $e) { 
		//	echo $e; 
		} 
	


    }
?>