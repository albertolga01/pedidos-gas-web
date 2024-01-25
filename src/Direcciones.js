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
    const[direcciones, setDirecciones] = useState([props.iddireccion]);
    const[calleNumero, setCalleNumero] = useState("");
    const[colonia, setColonia] = useState("");
    const [ciudad, setCiudad] = useState(props.iddireccion ? "" : "MAZATLAN");
    const[codigoPostal, setCodigoPostal] = useState(""); 
    const [fechaHoy, setFechaHoy] = useState("null");

    const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalIsOpenE, setIsOpenE] = React.useState(false);
    const[Mensaje, setMensaje] = useState(); 
    const[MensajeError, setMensajeError] = useState(); 
    const [modalIsOpenError, setIsOpenLoadError] = React.useState(false);
 
	useEffect(() => {
        obtenerDirecciones()
    }, []);
  
    function openModalLoadError() { 
		setIsOpenLoadError(true); 
	}  

    async function obtenerDirecciones() {
        try {
          let fd = new FormData();
          fd.append("id", "obtenerDirecciones");
          fd.append("noconsumidor", props.numero_consumidor);
      
          openModalLoad();
          const res = await axios.post(process.env.REACT_APP_API_URL, fd);
          closeModalLoad();
      
          console.log("test", res.data);
      
         
          const selectedObject = res.data.find(item => item.id === props.iddireccion);
      
          if (selectedObject) {
            setColonia(selectedObject.colonia);
            setCalleNumero(selectedObject.calle_numero);
            setCiudad(selectedObject.ciudad);
            setCodigoPostal(selectedObject.codigop);
          } else {
            console.log(`Object with id ${props.iddireccion} not found`);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      async function actualizarDirecciones(){    
        var valido = Validador(calleNumero, colonia, codigoPostal); 
        if(valido == true){
		let fd = new FormData()   
		fd.append("id", "actualizarDirecciones")  
        fd.append("iddireccion", props.iddireccion) 
		fd.append("noconsumidor", props.numero_consumidor) 
		fd.append("calle_numero", calleNumero)
		fd.append("colonia", colonia) 
		fd.append("ciudad", ciudad)
		fd.append("codigop", codigoPostal)
        openModalLoad();
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
        closeModalLoad();
		console.log(res.data); 
        notify("Actualizado correctamente");
		//console.log(res.data); 
        }else{
            openModalLoadError();
        }
	}

    async function addDirecciones(){    
        var valido = Validador(calleNumero, colonia, codigoPostal); 
        if(valido == true){
		let fd = new FormData()   
		fd.append("id", "addDirecciones")  
		fd.append("noconsumidor", props.numero_consumidor) 
		fd.append("calle_numero", calleNumero)
		fd.append("colonia", colonia) 
		fd.append("ciudad", ciudad)
		fd.append("codigop", codigoPostal)
        //setisLoggedIn(false);
        openModalLoad();
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
        closeModalLoad();
		console.log(res.data); 
        notify("Agregado correctamente");
		//console.log(res.data); 
        }else{
            openModalLoadError();
        }
	}

    function Validador(CalleNumV, ColoniaV, CodigoV ){
      
        if(CalleNumV == "" || CalleNumV == null ){
           return false;
        } else if (ColoniaV == "" || ColoniaV == null){
           return false;
        } else if (CodigoV == "" || CodigoV == null){
           return false;
        }  else {
           return true;
        }
       
   }

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

    return(
        
       <div style={{width:'100%'}}>
        {(props.iddireccion)?
         <Navbar titulo="Editar dirección" cambiarSelected={props.unmount} />
         :
         <Navbar titulo="Nueva dirección" cambiarSelected={props.unmount} />
         }
        
        <div  style={{margin: 'auto', width:'80%' , height: '100vh', backgroundImage: Backgroundgas}} align="center"> 

          <FadeIn>
            
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%'}} align="center">
                <br></br>
                <div>
                      <h3 class="idLabel">Dirección actual</h3>
                      <label  class="idLabel" style={{textAlign:'left'}}>{colonia}</label>
                      <br></br>
                      </div>
               
                <br></br> 
                      <div style={{display:'flex',flexDirection:'row', justifyContent:'spaceBetween', gap:'6%' }}>
                
                         <div style={{display:'flex',flexDirection:'column', width:'47%' }}>
                            <label class="idLabel">Colonia</label>
                            <Input className='input' type="text" 
												placeholder='Colonia' 
												style={{width:'100%', inlineStyle}}
                                                defaultValue={colonia}
                                                onChange={e => setColonia(e.target.value)}
											/>
                            
                        </div>
                        <div style={{display:'flex',flexDirection:'column', width:'47%' }}>
                           <label class="idLabel">Código Postal</label>
                           <Input type="text" 
												placeholder='Código Postal'
												style={{width:'100%',  backgroundColor: '#0071ce'}}
                                                defaultValue={codigoPostal}
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
                                                defaultValue={calleNumero}
                                                onChange={e => setCalleNumero(e.target.value)}
											/>
                    <div style={{display:'flex',flexDirection:'column' }}>
                                <label class="idLabel">Ciudad</label>
                                <select
                                  id="form-tanque"
                                  style={{ width: '100%' }}
                                  value={ciudad}
                                  onChange={e => setCiudad(e.target.value)}
                                > 
                                  <option value="MAZATLÁN">MAZATLÁN</option>
                                  <option value="VILLA UNIÓN">VILLA UNIÓN </option>
                                  <option value="AGUA VERDE">AGUA VERDE</option>
                                  <option value="AGUA CALIENTE DE GÁRATE">AGUA CALIENTE DE GÁRATE</option>
                                  <option value="ROSARIO">ROSARIO</option>
                                </select>
                                </div>
                
                    
                    <br></br>
                    <br></br>
                    <div style={{justifyContent: 'space-between', columnGap:'0.875rem', width:'100%', display:'flex', flexDirection:'row'}}> 
                    <div style={{width:'50%'}} align="center"> 
                    <button className="buttonVerde" style={{width:'100%', fontWeight: 'bold'}} onClick={() => {  props.unmount("LibretaDirecciones");}}>Regresar</button>
                    </div>
                    <div style={{width:'50%'}} align="center">
                    {(props.iddireccion)?
                        <button type='submit' onClick={() => actualizarDirecciones()} className='button' style={{ fontWeight: 'bold', width:'100%'}}>Actualizar</button>
                            :
                        <button type='submit' onClick={() => addDirecciones()} className='button' style={{ fontWeight: 'bold', width:'100%'}}>Agregar</button>
                    } 
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
