import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'; 
import Modal from 'react-modal';
import { ThreeDots } from  'react-loader-spinner'
import {Navbar} from './component/Navbar';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import CorrectoImg from './resources/Correcto.svg'
import ErrorImg from './resources/error.svg'
import StripeContainer from './component/StripeContainer'; 
import { ModalCarga } from "./component/ModalCarga";
import { ToastContainer, toast } from 'react-toastify';

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


function BuscarConsumidor(props){
 
//////////////////////////////////////////////////
 
 
    const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const[Mensaje, setMensaje] = useState(); 
    const[TelefonoNC, setTelefonoNC] = useState(); 
    const[lista, setlista] = useState([]); 

    const [modalIsOpenError, setIsOpenLoadError] = React.useState(false);

    function notify(message){
      toast(message);
  }

    function openModal() { 
		setIsOpen(true); 
	}  
	   
	function closeModal() { 
		setIsOpen(false); 
        Seleccionar();
	}

    function openModalLoad() { 
		setIsOpenLoad(true); 
	}  
	   
	function closeModalLoad() { 
		setIsOpenLoad(false); 
	}

    function openModalLoadError() { 
		setIsOpenLoadError(true); 
	}  
	   
	function closeModalLoadError() { 
		setIsOpenLoadError(false); 
	}

    function Seleccionar(telefono, noconsumidor){  
        props.unmount(telefono, noconsumidor);   
    }
 
      async function buscarServicio(){
        setlista([]);
        let telefono = document.getElementById("telefono").value;
        
        let fd = new FormData()   
        fd.append("id", "buscarConsumidor")  
        fd.append("telefono", telefono)  
            openModalLoad();
           
        const res = await axios.post(process.env.REACT_APP_API_URL, fd);
        console.log(res.data);
            closeModalLoad();
            if(res.data.length == 0){
              notify("No se encontró información");
            }else{
              setlista(res.data);  
            }
            

           
      }
 
  
    
    return(
      <>
 
      <div className='divPrincipal'  style={{width:'100%', height: '100vh'}}>  
        <div style={{display:'flex', flexDirection:'column',   width: '80%'}} align="center">
        <Navbar titulo="Buscar consumidor" />  <br></br><br></br>
              <label class="idLabel">Teléfono</label>
              <input type='text' class="idInput" id="telefono"></input><br></br>

              <div  style={{height:'100%', overflowY: 'scroll', width:'100%'}}>
					<table  style={{width:'100%'}}>
						<tr>
							<th style={{color:'white'}}>Seleccionar</th>
							<th style={{color:'white'}}>Nombre</th>
							<th style={{color:'white'}}>Apellido</th>
							<th style={{color:'white'}}>Dirección</th>  
							<th style={{color:'white'}}>No. consumidor</th>  
							 
						</tr>

						 { lista.map(item => ( 
						<tr id="tabletr" style={{  fontSize:'15.5px', border: 'px solid #ABB2B9'}}>
							<td style={{color:'white', textAlign:'center' }}> <button className="buttonVerde" style={{width:'89px', paddingLeft:'6px'}} onClick={() => Seleccionar(item.telefono, item.noconsumidor)}>Seleccionar</button></td> 
							<td style={{color:'white', textAlign:'center' }}> {item.nombre}</td>
							<td style={{color:'white', textAlign:'center' }}> {item.apellido}</td>
							<td style={{color:'white', textAlign:'center' }}> {item.direccion}</td> 
							<td style={{color:'white', textAlign:'center' }}> {item.noconsumidor}</td> 
						
							 
							  
						</tr> 
						))}	
					</table> 
				</div>
        <br></br> 
             
              <div style={{justifyContent: 'space-between', columnGap:'0.875rem', width:'100%', display:'flex', flexDirection:'row'}}> 
                  <div style={{width:'50%'}} align="center"> 
                     <button className="buttonVerde" style={{width:'100%', fontWeight: 'bold'}}  onClick={() => { Seleccionar();}}>Regresar</button>
                  </div>
                 <div style={{width:'50%'}} align="center">
                     <button type='submit' className='button' style={{ fontWeight: 'bold', width:'100%'}} onClick={() => {buscarServicio();}}>Buscar</button> 
                  </div>
              </div> 
 
       </div>

       <ModalCarga modalIsOpenLoad={modalIsOpenLoad} closeModalLoad={closeModalLoad}/>
       <ToastContainer 
				progressClassName="toastProgress"
				position="top-center"
				/>
      </div>
         


        </>
    );
}

export default BuscarConsumidor;
 
