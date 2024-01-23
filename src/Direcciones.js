import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'; 
import Modal from 'react-modal';
import { ThreeDots } from  'react-loader-spinner' 
import {Navbar} from './component/Navbar';  
import Backgroundgas from './component/Background-gas.png'
import CorrectoImg from './resources/Correcto.svg'
import FadeIn from 'react-fade-in';
import ErrorImg from './resources/error.svg'
import { ModalCarga } from "./component/ModalCarga";
import { Input } from 'semantic-ui-react' 
import { ToastContainer, toast } from 'react-toastify';
 

const customStyles = { 	
	content: {
	  top: '50%',
	  left: '50%',
	  right: 'auto',
	  bottom: 'auto',
	  marginRight: '-50%',
	  transform: 'translate(-50%, -50%)',
	},
  };
  const customStylesD = { 	
	content: {
        width:'80%',
	  top: '50%',
	  left: '50%',
	  right: 'auto',
	  bottom: 'auto',
	  marginRight: '-50%',
	  transform: 'translate(-50%, -50%)',
	},
  };


function Direcciones(props){

    const inlineStyle = {
        input : {
          backgroundColor: '#0071ce',
        }
      };

    const[passActual, setPassActual] = useState();
    const[passNueva, setPassNueva] = useState();
    const[confirmarPass, setConfirmarPass] = useState();
////////////////////////////////////////////////// 
    const[Comentarios, setComentarios] = useState();
    const[CalleNumero, setCalleNumero] = useState();
    const[Colonia, setColonia] = useState();
    const[Cantidad, setCantidad] = useState();
    const[Importe, setImporte] = useState();
    const[CodigoPostal, setCodigoPostal] = useState(); 
    const [fechaHoy, setFechaHoy] = useState("null");

    const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalIsOpenE, setIsOpenE] = React.useState(false);
    const[Mensaje, setMensaje] = useState(); 
    const[MensajeError, setMensajeError] = useState(); 
 
	useEffect(() => {
        obtenerConsumidor();
        //currentDate();
	},[])
  

    function openModalLoad() { 
		setIsOpenLoad(true); 
	}  
	   
	function closeModalLoad() { 
		setIsOpenLoad(false); 
	}

    function openModal() { 
		setIsOpen(true); 
	}  
	   
	function closeModal() {
        
        //re direccionar a historial 
        props.unmount("Historial");   
		setIsOpen(false); 
	}

    //Error Mensaje
    function openModalE() { 
		setIsOpenE(true); 
	}  
	   
	function closeModalE() { 
		setIsOpenE(false); 
	}

    function Seleccionar(){  
        props.unmount("MenuPrincipal");   
    }


    function notify(message){
        toast(message);
    }
  

    async function obtenerConsumidor(){    
		let fd = new FormData()   
		fd.append("id", "obtenerConsumidor")  
		fd.append("folioconsumidor", props.numero_consumidor) 
		//setisLoggedIn(false);
        openModalLoad();
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
        closeModalLoad();
		console.log(res.data);  
        if(res.data[0].comentario != undefined && res.data[0].comentario != "undefined"){
            setComentarios(res.data[0].comentario);
        }else{
            setComentarios("");
        }
        setCalleNumero(res.data[0].calle_numero);
        setColonia(res.data[0].colonia); 
		setCodigoPostal(res.data[0].codigo_postal); 
		//console.log(res.data); 
	}
/*
    function validarDia(fecha){
        var hoy = new Date()
        var fechaHoy = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2) ;
        if(fecha==fechaHoy){
            var horaValida = validarHora(document.getElementById("HoraPedido").value);
            if(horaValida == true){
                return true;
            }else{
                return false;
            } 
        }else if(fecha>fechaHoy){ 
            return true;
        }else{
            return false;
        }
    }*/
    function validarHorarioAtencion(hora){
        if(hora>= "06:00" && hora <= "19:00" ){
            return true;
        }else{
            return false;
        }
    }

    function validarHora(hora){
        var hoy = new Date()
        var horaActual = ('0' + (hoy.getHours())).slice(-2) + ':' + ('0' + hoy.getMinutes()).slice(-2);
       //  alert(hora + " " + horaActual);
        if(hora>horaActual){ 
            return true;
        }else{  
            return false;
        } 
    }
    function validarDomingo(fecha){
        let day = new Date(fecha);
        console.log(day.getDay());
        if(day.getDay() == 6){
            return true;
        }else{
            return false;
        }
        
    }
    async function altaDireccion(){
        let fd = new FormData()   
        fd.append("id", "altaDireccion")  
        fd.append("identificadorexterno", props.numero_consumidor) //props.identificador_externo 
    }
 
/*
    async function altaPedido(){  
        var fechaValida = validarDia(document.getElementById("FechaPedido").value);
        var horaAtencion = validarHorarioAtencion(document.getElementById("HoraPedido").value);
        var domingo = validarDomingo(document.getElementById("FechaPedido").value);

        if(fechaValida == false){
            //alert("fecha invalida o anterior a la hora actual para el mismo dia");
            //modal fecha invalida
            setMensajeError("No se puede programar pedido para un día y/o hora anterior al actual");
            openModalE();
            
            
        }
        if(horaAtencion == false){
            //alert("fuera del horario de atencion");
            setMensajeError("No se puede programar pedido fuera del horario de atención");
            openModalE();
            //modal hora fuera del horario de atencion
        }

        if(domingo == true){
            //alert("fuera del horario de atencion");
            setMensajeError("No se puede programar pedido para día domingo");
            openModalE();
            //modal hora fuera del horario de atencion
        }

        if(fechaValida == true && horaAtencion == true && domingo == false){ 
            let cantidadServicio = 1;
            

            let pesos = document.getElementById("tipopesos");
            let litros = document.getElementById("tipolitros"); 
            var cantidad = 0;
            if(pesos.checked){ 
                 cantidad = document.getElementById("inputpesos").value;
                 cantidad = (cantidad / props.PrecioGas).toFixed(2);
                            }
            if(litros.checked){
                cantidad = document.getElementById("inputlitros").value;
            }

            if(cantidad == "" || cantidad == undefined){
                
            }else{ 
                cantidadServicio = cantidad;
            }
             // alert(cantidadServicio);
           let fd = new FormData()   
            fd.append("id", "altaPedido")  
            fd.append("identificadorexterno", props.numero_consumidor) //props.identificador_externo 
            fd.append("fecha", document.getElementById("FechaPedido").value)  
            fd.append("hora", document.getElementById("HoraPedido").value)  
            fd.append("comentarios", Comentarios)  
            fd.append("cantidad", cantidadServicio)  
            fd.append("consumidor_id", props.numero_consumidor)  
            fd.append("rutaid", "0")
            fd.append("correo", "0")
            fd.append("nombres", props.nombres)
            fd.append("apellidos", props.apellidos)
            fd.append("telefono", "0")
            fd.append("importe", Importe)
            openModalLoad();
            const res = await axios.post(process.env.REACT_APP_API_URL, fd)
            .catch(function (error) {
                if (error.response) {  
                  notify("Error de conexión, vuelva a intentarlo");
                } else if (error.request) { 
                  notify("Error de conexión, vuelva a intentarlo");
                } else { 
                  notify("Error de conexión, vuelva a intentarlo");
                }
              });
            closeModalLoad();
            //console.log(res.data);
            var json = JSON.parse(JSON.stringify(res.data));
            //alert(String(json[0].pedidopendiente).length);
            
            
             if (json.folio!= undefined){
                setMensaje("folio: "+json.folio + " cantidad: "+json.cantidad+ " estatus: "+json.estatus);
                openModal();
                
                
                
            }else{ 
                openModalE();
                setMensajeError("Error"); 
                if(String(json[0].pedidopendiente).length > 1){
                    if(window.confirm("pedido pendiente editar fecha y hora folio: "+json[0].pedidopendiente) == true) {
                        props.unmount("EditarPedido", json[0].pedidopendiente); 
                      }  
                      return;
                }  
                
            } 
            //console.log(json.folio); 
        }
	}
    */
/*
    function currentDate(){ 
        var hoy = new Date()
        hoy.setMinutes ( hoy.getMinutes() + 30 ); 
        var fecha = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2) ;
         var hora = ('0' + (hoy.getHours())).slice(-2) + ':' + ('0' + (hoy.getMinutes())).slice(-2);
      // console.log(hora);
        document.getElementById("FechaPedido").value = fecha;
        document.getElementById("HoraPedido").value = hora; 

	}
*/
    

    

    function tipoPedido(){
        let pesos = document.getElementById("tipopesos");
        let litros = document.getElementById("tipolitros"); 
        document.getElementById("inputlitros").value = "";
        document.getElementById("inputpesos").value = "";
        if(pesos.checked){
            //mostrar inut pesos
       
            document.getElementById("divpesos").style.display = "block";
            document.getElementById("divlitros").style.display = "none";
            
             

        }
        if(litros.checked){
            //mostrar el de litros  
            document.getElementById("divpesos").style.display = "none";
            document.getElementById("divlitros").style.display = "block";
        }
    }


    function HoraFecha(){
        var hoy = new Date()
        var fecha = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2) ;
        var hora = ('0' + hoy.getHours()).slice(-2) + ':' + ('0' + hoy.getMinutes()).slice(-2);

        var fecha_hora = fecha +':'+ hora;
        document.getElementById('FechaPedido').value = fecha_hora;
        console.log(fecha_hora);
    }
    /*
    function disabledInput(){
        notify("No es posible modificar esta información en este apartado, favor de ingresar a la sección de usuario para actualizar sus datos");
    }
    */

   //const[fecha_hora, setHoraFecha] = useState(); 

    return(
       <div style={{width:'100%'}}>
        {props.numero_consumidor}
         <Navbar titulo="Direcciones" cambiarSelected={props.unmount} /> 
        <div  style={{margin: 'auto', width:'80%' , height: '100vh', backgroundImage: Backgroundgas}} align="center"> 

          <FadeIn>
            
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%'}} align="center">
                <br></br>
                <div>
                      <h3 class="idLabel">Dirección actual</h3>
                      <label  class="idLabel" style={{textAlign:'left'}}>{Colonia}</label>
                      <br></br>
                      </div>
               
                <br></br> 
                      <div style={{display:'flex',flexDirection:'row', justifyContent:'spaceBetween', gap:'6%' }}>
                
                         <div style={{display:'flex',flexDirection:'column', width:'47%' }}>
                            <label class="idLabel">Colonia</label>
                            <Input className='input' type="text" 
												placeholder='Colonia' 
												style={{width:'100%', inlineStyle}}
                                                defaultValue={Colonia}
                                                onChange={e => setColonia(e.target.value)}
											/>
                            
                        </div>
                        <div style={{display:'flex',flexDirection:'column', width:'47%' }}>
                           <label class="idLabel">Código Postal</label>
                           <Input type="text" 
												placeholder='Código Postal'
												style={{width:'100%',  backgroundColor: '#0071ce'}}
                                                defaultValue={CodigoPostal}
                                                onChange={e => setCodigoPostal(e.target.value)}
											/>
                                            {/**
                           <input type='text' class="idInput" onChange={e => setCodigoPostal(e.target.value)} defaultValue={CodigoPostal}></input><br></br>
                        */}
                           </div>
                    </div> 
                    <label class="idLabel">Calle y Número</label> 
                    <Input type="text" 
												placeholder='Calle/Numero' 
												style={{width:'100%'}}
                                                defaultValue={CalleNumero}
                                                onChange={e => setCalleNumero(e.target.value)}
											/>
                
                    
                    <br></br>
                    <br></br>
                    <label class="idLabel">Calle y Número</label> 
                    <br></br>
                    <br></br>
                    <div style={{justifyContent: 'space-between', columnGap:'0.875rem', width:'100%', display:'flex', flexDirection:'row'}}> 
                    <div style={{width:'50%'}} align="center"> 
                    <button className="buttonVerde" style={{width:'100%', fontWeight: 'bold'}} onClick={() => { Seleccionar();}}>Regresar</button>
                    </div>
                    <div style={{width:'50%'}} align="center"> 
                        <button type='submit' onClick={() => altaDireccion()} className='button' style={{ fontWeight: 'bold', width:'100%'}}>Añadir dirección</button>
                        </div>
                    </div>                    
                    <br></br>
  
              
            </div>

            <ModalCarga modalIsOpenLoad={modalIsOpenLoad} closeModalLoad={closeModalLoad}/>

                <Modal 
						isOpen={modalIsOpen}  
						onRequestClose={closeModal}   
						style={customStylesD}> 
						<div style={{width:'100%'}} align="center">  
						 <img src={CorrectoImg}></img>    <br></br>
                         <label style={{fontWeight:'bold'}}>Mensaje</label><br></br>
                         <label>Pedido realizado correctamente</label><br></br>
                         <label>{Mensaje}</label>
                         <button style={{width:'100%', color:'white', backgroundColor:'#008445'}} className="buttonLogin" onClick={closeModal}>Ok</button>
						</div>  
				</Modal>

                <Modal 
						isOpen={modalIsOpenE}  
						onRequestClose={closeModalE}   
						style={customStylesD}> 
						<div style={{width:'100%'}} align="center">  
						 <img src={ErrorImg}></img>    <br></br>
                         <label style={{fontWeight:'bold'}}>Mensaje</label><br></br> 
                         <label>{MensajeError}</label>
                         <button style={{width:'100%', color:'white', backgroundColor:'#008445'}} className="buttonLogin" onClick={closeModalE}>Ok</button>
						</div>  
				</Modal> </FadeIn>
        </div>
        <ToastContainer 
              progressClassName="toastProgress"
              position="top-center"
              />
        </div>
    );
}

export default Direcciones;

/**
 * 
 * <label style={{TextColor:'red'}}>*</label>
*/