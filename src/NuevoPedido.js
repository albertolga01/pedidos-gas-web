import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'; 
import Modal from 'react-modal';
import { ThreeDots } from  'react-loader-spinner' 
import {Navbar} from './component/Navbar';  
import Backgroundgas from './component/Background-gas.png'
import CorrectoImg from './resources/Correcto.svg'
import ErrorImg from './resources/error.svg'
import { ModalCarga } from "./component/ModalCarga";
 
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


function NuevoPedido(props){

    const[passActual, setPassActual] = useState();
    const[passNueva, setPassNueva] = useState();
    const[confirmarPass, setConfirmarPass] = useState();
////////////////////////////////////////////////// 
    const[Comentarios, setComentarios] = useState();
    const[CalleNumero, setCalleNumero] = useState();
    const[Colonia, setColonia] = useState();
    const[Cantidad, setCantidad] = useState();
    const[CodigoPostal, setCodigoPostal] = useState(); 
    const [fechaHoy, setFechaHoy] = useState("null");

    const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalIsOpenE, setIsOpenE] = React.useState(false);
    const[Mensaje, setMensaje] = useState(); 
    const[MensajeError, setMensajeError] = useState(); 
 
	useEffect(() => {
        obtenerConsumidor();
        currentDate();
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

    async function obtenerConsumidor(){    
		let fd = new FormData()   
		fd.append("id", "obtenerConsumidor")  
		fd.append("folioconsumidor", props.numero_consumidor) 
		//setisLoggedIn(false);
        openModalLoad();
		const res = await axios.post("https://gaspetromarapp.grupopetromar.com/gasunionapi.php", fd);
        closeModalLoad();
		console.log(res.data);  
        setComentarios(res.data[0].comentario);
        setCalleNumero(res.data[0].calle_numero);
        setColonia(res.data[0].colonia); 
		setCodigoPostal(res.data[0].codigo_postal); 
		//console.log(res.data); 
	}

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
    }
    function validarHorarioAtencion(hora){
        if(hora>= "06:00" && hora <= "18:30" ){
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
 

    async function altaPedido(){  
        var fechaValida = validarDia(document.getElementById("FechaPedido").value);
        var horaAtencion = validarHorarioAtencion(document.getElementById("HoraPedido").value);

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

        if(fechaValida == true && horaAtencion == true){ 
            let cantidadServicio = 1;
            if(Cantidad == "" || Cantidad == undefined){
                
            }else{ 
                cantidadServicio = Cantidad;
            }
            let fd = new FormData()   
            fd.append("id", "altaPedido")  
            fd.append("identificadorexterno", props.numero_consumidor) //props.identificador_externo 
            fd.append("fecha", document.getElementById("FechaPedido").value)  
            fd.append("hora", document.getElementById("HoraPedido").value)  
            fd.append("comentarios", Comentarios)  
            fd.append("cantidad", cantidadServicio)  
            fd.append("consumidor_id", props.numero_consumidor)  
            fd.append("rutaid", "0")
            openModalLoad();
            const res = await axios.post("https://gaspetromarapp.grupopetromar.com/gasunionapi.php", fd);
            closeModalLoad();
            console.log(res.data);
            var json = JSON.parse(JSON.stringify(res.data));
            if (json.folio== undefined){
                openModalE();
                setMensajeError("Error");
            }else{ 
                setMensaje("folio: "+json.folio + " cantidad: "+json.cantidad+ " estatus: "+json.estatus);
                openModal();
            }
            //console.log(res.data); 
        }
	}

    function currentDate(){ 
        var hoy = new Date()
        var fecha = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2) ;
         var hora = ('0' + (hoy.getHours()+1)).slice(-2) + ':' + ('0' + hoy.getMinutes()).slice(-2);
       console.log(hora);
        document.getElementById("FechaPedido").value = fecha;
        document.getElementById("HoraPedido").value = hora;

	}


    function HoraFecha(){
        var hoy = new Date()
        var fecha = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2) ;
        var hora = ('0' + hoy.getHours()).slice(-2) + ':' + ('0' + hoy.getMinutes()).slice(-2);

        var fecha_hora = fecha +':'+ hora;
        document.getElementById('FechaPedido').value = fecha_hora;
        console.log(fecha_hora);
    }

    const[fecha_hora, setHoraFecha] = useState(); 

    return(
        <div  style={{margin: 'auto', width:'80%' , height: '100vh', backgroundImage: Backgroundgas}} align="center"> 

         
            
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%'}} align="center">

                <Navbar titulo="Nuevo Pedido" />
                <br></br>
                <br></br>
                    <label class="idLabel">Calle y Número</label> 
                    <input type='text' class="idInput" onChange={e => setCalleNumero(e.target.value)} defaultValue={CalleNumero}></input><br></br>
                    
                    <label class="idLabel">Colonia</label>
                    <input type='text' class="idInput" onChange={e => setColonia(e.target.value)} defaultValue={Colonia}></input><br></br>

                    <label class="idLabel">Código Postal</label>
                    <input type='text' class="idInput" onChange={e => setCodigoPostal(e.target.value)} defaultValue={CodigoPostal}></input><br></br>

                    <label class="idLabel">Fecha:</label>
	                <input id="FechaPedido" class="idInput"   style={{width:'100%', marginTop:'5px'}} type="date"/><br></br>

                    <label class="idLabel">Hora:</label>
	                <input id="HoraPedido" class="idInput"  style={{width:'100%', marginTop:'5px'}} type="time"/><br></br>

                    <label class="idLabel">Cantidad (Lts)</label>
                    <input type='text' class="idInput" onChange={e => setCantidad(e.target.value)}></input><br></br>
	   
                    <label class="idLabel">Comentarios</label>
                    <textarea class="idInput" onChange={e => setComentarios(e.target.value)} rows="15" cols="50" defaultValue={Comentarios}></textarea><br></br>
                    <br></br>
                    <div style={{justifyContent: 'space-between', columnGap:'0.875rem', width:'100%', display:'flex', flexDirection:'row'}}> 
                    <div style={{width:'50%'}} align="center"> 
                    <button className="buttonVerde" style={{width:'100%', fontWeight: 'bold'}} onClick={() => { Seleccionar();}}>Regresar</button>
                    </div>
                    <div style={{width:'50%'}} align="center"> 
                        <button type='submit' onClick={() => altaPedido()} className='button' style={{ fontWeight: 'bold', width:'100%'}}>Confirmar Pedido</button>
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
				</Modal>
        </div>
    );
}

export default NuevoPedido;

/**
 * 
 * <label style={{TextColor:'red'}}>*</label>
*/