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


function LibretaDirecciones(props){

    const inlineStyle = {
        input : {
          backgroundColor: '#0071ce',
        }
      };

////////////////////////////////////////////////// 
    const[direcciones, setDirecciones] = useState([]);
    const[Colonia, setColonia] = useState();

    const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalIsOpenE, setIsOpenE] = React.useState(false);
    const[Mensaje, setMensaje] = useState(); 
    const[MensajeError, setMensajeError] = useState(); 

 
	useEffect(() => {
        obtenerDirecciones();
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
  

    async function obtenerDirecciones(){    
		let fd = new FormData()   
		fd.append("id", "obtenerDirecciones")  
		fd.append("noconsumidor", props.numero_consumidor) 
		//setisLoggedIn(false);
        openModalLoad();
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
        closeModalLoad();
		console.log(res.data);  
        
        setDirecciones(res.data); 
	}

  async function bajaDireccion(idDireccionToDelete) {
    try {
      let fd = new FormData();
      fd.append("id", "bajaDireccion");
      fd.append("iddireccion", idDireccionToDelete);
      fd.append("noconsumidor", props.numero_consumidor);
  
      openModalLoad();
      const res = await axios.post(process.env.REACT_APP_API_URL, fd);
      closeModalLoad();
      console.log(res.data);
      notify("Eliminado correctamente");
  
      // After successful deletion, update the state to trigger a re-render
      obtenerDirecciones();
    } catch (error) {
      console.error("Error:", error);
      closeModalLoad();
      notify("Error al eliminar");
    }
  }

  function notify(message){
    toast(message);
}

    return(
       <div style={{width:'100%'}}> 
         <Navbar titulo="Libreta de Direcciones" cambiarSelected={props.unmount} /> 
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
                { direcciones.map(item => ( 
                     <div style={{ border: '1px solid black', backgroundColor: 'rgba(255, 255, 255, 0.5)', fontSize: '20px', display: 'flex', padding: '20px', flexDirection:'column',
                     textAlign: 'left', margin: '0 0 12px 0'}} > 
                         <span style={{ margin:'0 0 8px 0'}}>{item.calle_numero}</span> 
                         <span style={{ margin:'0 0 8px 0'}}>{item.colonia}</span> 
                         <span style={{ margin:'0 0 8px 0'}}>{item.codigop}</span> 
                         <span style={{ margin:'0 0 8px 0'}}>{item.ciudad}</span>
                         <div style={{ display: 'flex', justifyContent: 'flex-end', columnGap: '18px', margin: '10px 0 0' }}>
                          <span style={{ margin:'0 0 8px 0', textAlign: 'right', fontSize: '18px'}} onClick={() => {  props.unmount("Direcciones", item.id)}}>Editar</span>
                          <span style={{ margin:'0 0 8px 0', textAlign: 'right', fontSize: '18px'}} onClick={() => bajaDireccion(item.id)}>Eliminar</span>
                         </div>  
                     </div> 
                 
                  ))}	
             
                    <div style={{justifyContent: 'space-between', columnGap:'0.875rem', width:'100%', display:'flex', flexDirection:'row'}}> 
                    <div style={{width:'50%'}} align="center"> 
                    <button className="buttonVerde" style={{width:'100%', fontWeight: 'bold'}} onClick={() => { Seleccionar();}}>Regresar</button>
                    </div>
                    <div style={{width:'50%'}} align="center"> 
                        <button type='submit' onClick={() => {  props.unmount("Direcciones")}} className='button' style={{ fontWeight: 'bold', width:'100%'}}>Añadir dirección</button>
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

export default LibretaDirecciones;
