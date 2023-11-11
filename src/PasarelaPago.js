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


function PasarelaPago(props){

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
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
        closeModalLoad();
		console.log(res.data);  
        setComentarios(res.data[0].comentario);
        setCalleNumero(res.data[0].calle_numero);
        setColonia(res.data[0].colonia); 
		setCodigoPostal(res.data[0].codigo_postal); 
		//console.log(res.data); 
	}

     

    return(
        <div   style={{margin: 'auto', width:'80%' , height: '100vh', backgroundImage: Backgroundgas}} align="center"> 

         
            
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', }} align="center">

                <Navbar titulo="Pagar" />
                <br></br>
                <br></br>
                      <div class="pymnts">
                          <form action="#" method="POST" id="payment-form">
                              <input type="hidden" name="token_id" id="token_id"/>
                              <div class="pymnt-itm card active">
                                  <h2>Tarjeta de crédito o débito</h2>
                                  <div class="pymnt-cntnt">
                                      <div class="card-expl">
                                          <div class="credit"><h4>Tarjetas de crédito</h4></div>
                                          <div class="debit"><h4>Tarjetas de débito</h4></div>
                                      </div>
                                      <div class="sctn-row">
                                          <div class="sctn-col l">
                                              <label>Nombre del titular</label><input type="text" placeholder="Como aparece en la tarjeta" autocomplete="off" data-openpay-card="holder_name"/>
                                          </div>
                                          <div class="sctn-col">
                                              <label>Número de tarjeta</label><input type="text" autocomplete="off" data-openpay-card="card_number"/></div>
                                          </div>
                                          <div class="sctn-row">
                                              <div class="sctn-col l">
                                                  <label>Fecha de expiración</label>
                                                  <div class="sctn-col half l"><input type="text" placeholder="Mes" data-openpay-card="expiration_month"/></div>
                                                  <div class="sctn-col half l"><input type="text" placeholder="Año" data-openpay-card="expiration_year"/></div>
                                              </div>
                                              <div class="sctn-col cvv"><label>Código de seguridad</label>
                                                  <div class="sctn-col half l"><input type="text" placeholder="3 dígitos" autocomplete="off" data-openpay-card="cvv2"/></div>
                                              </div>
                                          </div>
                                          <div class="openpay"><div class="logo">Transacciones realizadas vía:</div>
                                          <div class="shield">Tus pagos se realizan de forma segura con encriptación de 256 bits</div>
                                      </div>
                                      <div class="sctn-row">
                                              <a class="button rght" id="pay-button">Pagar</a>
                                      </div>
                                  </div>
                              </div>
                          </form>
                      </div>
                    <br></br>
                    <br></br>
                    <div style={{justifyContent: 'space-between', columnGap:'0.875rem', width:'100%', display:'flex', flexDirection:'row'}}> 
                    <div style={{width:'50%'}} align="center"> 
                    <button className="buttonVerde" style={{width:'100%', fontWeight: 'bold'}} onClick={() => { Seleccionar();}}>Regresar</button>
                    </div>
                    <div style={{width:'50%'}} align="center"> 
                        <button type='submit' className='button' style={{ fontWeight: 'bold', width:'100%'}}>Confirmar Abono</button>
                        </div>
                    </div>                    
                    <br></br>
  
              
            </div>

            <Modal 
						isOpen={modalIsOpenLoad}  
						onRequestClose={closeModalLoad}   
						style={customStyles}> 
						<div style={{width:'100%'}}>  
						<ThreeDots color="#0071ce" height={80} width={80} /> 
						</div>  
				</Modal>

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

export default PasarelaPago;

/**
 * 
 * <label style={{TextColor:'red'}}>*</label>
*/