import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'; 
import Modal from 'react-modal';
import {Navbar} from './component/Navbar';  
import Backgroundgas from './component/Background-gas.png'
import CorrectoImg from './resources/Correcto.svg'
import FadeIn from 'react-fade-in';
import ErrorImg from './resources/error.svg'
import { ModalCarga } from "./component/ModalCarga";
import { ToastContainer, toast } from 'react-toastify';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

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


////////////////////////////////////////////////// 
    const[direcciones, setDirecciones] = useState([]);
    const[Colonia, setColonia] = useState();
    const[Ciudad, setCiudad] = useState();
    const[CodigoPostal, setCodigoPostal] = useState(); 
    const[CalleNumero, setCalleNumero] = useState();

    const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalIsOpenE, setIsOpenE] = React.useState(false);
    const[Mensaje, setMensaje] = useState(); 
    const[MensajeError, setMensajeError] = useState();
    const [selectedDireccion, setSelectedDireccion] = useState({
      id: null,
      type: null,
    });
   
    const selectMainDireccion = () => {
      console.log("Selecting main address");
      setSelectedDireccion({
        id: null, 
        type: "main",
      });
    };

    const selectSecondaryDireccion = (direccionId) => {
      console.log("Selecting secondary address", direccionId);
      setSelectedDireccion({
        id: direccionId,
        type: "secondary",
      });
    };

 

 
    useEffect(() => {
      const fetchData = async () => {
        try {
          openModalLoad();
    
          await obtenerConsumidor();
          await obtenerDirecciones();
    
        } catch (error) {
          console.error("Error:", error);
        } finally {
          closeModalLoad();
        }
      };
    
      fetchData();
    }, []);

    function openModalLoad() { 
		setIsOpenLoad(true); 
	}  
	   
	function closeModalLoad() { 
		setIsOpenLoad(false); 
	}

	   
	function closeModal() {
        props.unmount("Historial");   
		setIsOpen(false); 
	}
	   
	function closeModalE() { 
		setIsOpenE(false); 
	}

    function Regresar(){  
        props.unmount("MenuPrincipal");   
    }


    async function obtenerConsumidor(){    
      let fd = new FormData()   
      fd.append("id", "obtenerConsumidor")  
      fd.append("folioconsumidor", props.numero_consumidor) 
          openModalLoad();
      const res = await axios.post(process.env.REACT_APP_API_URL, fd);
          closeModalLoad();
      console.log(res.data);
          setCalleNumero(res.data[0].calle_numero);
          setColonia(res.data[0].colonia);
          setCiudad(res.data[0].ciudad);
          setCodigoPostal(res.data[0].codigo_postal);
    }
  

    async function obtenerDirecciones(){    
		let fd = new FormData()   
		fd.append("id", "obtenerDirecciones")  
		fd.append("noconsumidor", props.numero_consumidor) 
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

function Seleccionar(elemento){  
  props.unmount(elemento);   
}

function Choose() {
  let selectedDireccionInfo;

  if (selectedDireccion.id === null) {
    selectedDireccionInfo = {
      Colonia: Colonia,
      CodigoPostal: CodigoPostal,
      CalleNumero: CalleNumero,
      Ciudad: Ciudad,
    };
  } else {
    let direccion = direcciones.find(item => item.id === selectedDireccion.id);
    selectedDireccionInfo = {
      Colonia: direccion.colonia,
      CodigoPostal: direccion.codigop,
      CalleNumero: direccion.calle_numero,
      Ciudad: direccion.ciudad,
    };
  }

  console.log("Selected Address Info:", selectedDireccionInfo);
  props.unmount("NuevoPedido", "", "", selectedDireccionInfo);
}






    return(
       <div style={{width:'100%'}}> 
         <Navbar titulo="Libreta de Direcciones" cambiarSelected={props.unmount} /> 
        <div  style={{margin: 'auto', width:'80%' , height: '100vh', backgroundImage: Backgroundgas}} align="center"> 

          <FadeIn>
         
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%'}} align="center">
                <br></br>
                <div>
                      <h3 class="idLabel">Dirección principal</h3>
                      <label style={{ ...(props.test ? { cursor: 'pointer'} : { }) }}>
                      <div style={{ border: '1px solid black', backgroundColor: 'rgba(255, 255, 255, 0.5)', fontSize: '20px',
                      display: 'flex', padding: '20px', justifyContent: 'space-between', margin: '0 0 12px 0',
                      ...(props.test ? { flexDirection: 'row-reverse', alignItems: 'center', } : { flexDirection: 'column' })}}>
                      {(props.test &&
                        <input type="radio" checked={selectedDireccion.type === "main"} onChange={selectMainDireccion} />
                      )}
                      <div style={{ textAlign: 'left', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <span style={{ margin: '0 0 8px 0' }}>Calle: {CalleNumero}</span>
                        <span style={{ margin: '0 0 8px 0' }}>Colonia: {Colonia}</span>
                        <span style={{ margin: '0 0 8px 0' }}>CP: {CodigoPostal}</span>
                        <span style={{ margin: '0 0 8px 0' }}>Ciudad: {Ciudad}</span>
                      </div>
                      {(!props.test &&
                        <div style={{ display: 'flex', justifyContent: 'flex-end', columnGap: '18px', margin: '10px 0 0' }}>
                          <span style={{ margin: '0 0 8px 0', textAlign: 'right', fontSize: '18px', display:'flex', alignItems: 'center' }} onClick={() => { Seleccionar("Usuario") }}><FaEdit />Editar</span>
                          <span style={{ margin: '0 0 8px 0', textAlign: 'right', fontSize: '18px', display:'flex', alignItems: 'center' }} onClick={() => bajaDireccion()}><MdDeleteForever />Eliminar</span>
                        </div>
                      )}
                    </div>
                    </label>
                      </div>

                <h4 class="idLabel">Direcciónes secundarias</h4>
                { direcciones.map(item => ( 
                  <label key={item.id} style={{ ...(props.test ? { cursor: 'pointer'} : { }) }}>
                     <div key={item.id} style={{ border: '1px solid black', backgroundColor: 'rgba(255, 255, 255, 0.5)', fontSize: '20px', display: 'flex', padding: '20px',
                     textAlign: 'left', margin: '0 0 12px 0', justifyContent: 'space-between',
                      ...(props.test ? { flexDirection: 'row-reverse', alignItems: 'center', } : { flexDirection: 'column' })}}>
                      {(props.test &&
                        <input
                          type="radio"
                          checked={selectedDireccion.type === "secondary" && selectedDireccion.id === item.id}
                          onChange={() => selectSecondaryDireccion(item.id)
                          }
                     />
                      )} 
                      <div style={{ textAlign: 'left', flex: 1, display: 'flex', flexDirection: 'column' }}>
                         <span style={{ margin:'0 0 8px 0'}}>Calle: {item.calle_numero}</span> 
                         <span style={{ margin:'0 0 8px 0'}}>Colonia: {item.colonia}</span> 
                         <span style={{ margin:'0 0 8px 0'}}>CP: {item.codigop}</span> 
                         <span style={{ margin:'0 0 8px 0'}}>Ciudad: {item.ciudad}</span>
                         </div>
                         {(!props.test &&
                         <div style={{ display: 'flex', justifyContent: 'flex-end', columnGap: '18px', margin: '10px 0 0' }}>
                          <span style={{ margin:'0 0 8px 0', textAlign: 'right', fontSize: '18px', display:'flex', alignItems: 'center'}} onClick={() => {  props.unmount("Direcciones", item.id)}}><FaEdit />Editar</span>
                          <span style={{ margin:'0 0 8px 0', textAlign: 'right', fontSize: '18px', display:'flex', alignItems: 'center'}} onClick={() => bajaDireccion(item.id)}><MdDeleteForever />Eliminar</span>
                         </div> 
                         )} 
                     </div> 
                    
                    </label>
                  ))}	
              
                    <div style={{justifyContent: 'space-between', columnGap:'0.875rem', width:'100%', display:'flex', flexDirection:'row'}}> 
                    <div style={{width:'50%'}} align="center"> 
                    {!props.test ? (
                        <button className="buttonVerde" style={{width:'100%', fontWeight: 'bold'}} onClick={() => { Regresar();}}>Regresar</button>
                    ) : (
                        <button className="buttonVerde" style={{width:'100%', fontWeight: 'bold'}} onClick={() => {  props.unmount("NuevoPedido");}}>Regresar</button>
                    )}
                    </div>
                    <div style={{width:'50%'}} align="center"> 
                    {!props.test ? (
                        <button type='submit' onClick={() => {  props.unmount("Direcciones")}} className='button' style={{ fontWeight: 'bold', width:'100%'}}>Añadir dirección</button>
                        ) : (
                        <button type='submit' onClick={() => {
                          
                          Choose();
                        }} className='button' style={{ fontWeight: 'bold', width:'100%'}}>Seleccionar</button>
                      )}
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
