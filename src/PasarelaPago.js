import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'; 
import './OpenPay.css'; 
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
    const[tokenId, setTokenId] = useState(); 
    const[hiddenId, setHiddenId] = useState(); 
    const [fechaHoy, setFechaHoy] = useState("null");

    const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalIsOpenE, setIsOpenE] = React.useState(false);
    const[Mensaje, setMensaje] = useState(); 
    const[MensajeError, setMensajeError] = useState(); 
 
	useEffect(() => {
        loadOpenPay();
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

    function loadOpenPay(){
        window.OpenPay.setId('mq63xhurcngj88wral19');
        window.OpenPay.setApiKey('pk_c2209ef4c4f74a6dabc718cf819b0619');
        
        var deviceSessionId = window.OpenPay.deviceData.setup("payment-form", "deviceIdHiddenFieldName");
        setHiddenId(deviceSessionId);
        window.OpenPay.setSandboxMode(true);
    }

    async function openPay(token_id){    
		let fd = new FormData()   
		fd.append("id", "openPay")  
		fd.append("name", "Alberto") 
		fd.append("last_name", "Lizarraga") 
		fd.append("phone_number", "6693259307") 
		fd.append("email", "desarrollo@grupopetromar.com") 
		fd.append("token_id", token_id) 
		fd.append("amount", "1.00") 
		fd.append("description", "Compra Gas LP") 
		fd.append("deviceIdHiddenFieldName", hiddenId) 
        openModalLoad();
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
        closeModalLoad();
		console.log(res.data);   
		//console.log(res.data); 
	}

    var success_callbak = function(response) {
        var token_id = response.data.id;
        setTokenId(token_id);
        alert(token_id);
        //$('#token_id').val(token_id);
        openPay(token_id);
    };

    function Submit(e){
        alert("submit");
        e.preventDefault();
        document.getElementById("pay-button").setAttribute("disabled", true);
        //$("#pay-button").prop( "disabled", true);
       
        window.OpenPay.token.extractFormAndCreate('payment-form', success_callbak, error_callbak); 

    }

    var error_callbak = function(response) {
    var desc = response.data.description != undefined ?
    response.data.description : response.message;
    alert("ERROR [" + response.status + "] " + desc);
    //$("#pay-button").prop("disabled", false);
    document.getElementById("pay-button").setAttribute("disabled", false);
    };

     

    return(
        <div   style={{margin: 'auto', width:'100%' , height: '100vh', backgroundImage: Backgroundgas}} align="center"> 

         
            
                <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '100%', }} align="center">
                    {tokenId}
                      <div  style={{alignSelf:'center'}}>
                          <form action="#" method="POST" id="payment-form" class="pymnts">
                              <input type="hidden" name="token_id" id="token_id"/>
                              <div class="pymnt-itm card active">
                                    
                                  <div class="pymnt-cntnt" style={{width:'344px', height:'950px'}}>
                                  <div class="card-expl">
                                        <h2 style={{width:'344px'}}>Tarjeta de crédito o débito</h2>
                                    </div>
                                      <div class="card-expl">
                                          <div class="credit"><h4>Tarjetas de crédito</h4></div>
                                      </div>
                                      <div class="card-expl">
                                          <div class="debit"><h4>Tarjetas de débito</h4></div>
                                      </div>

                                      <div class="sctn-row">
                                          <div class="sctn-col l">
                                              <label>Nombre del titular</label><input type="text" placeholder="Como aparece en la tarjeta" autocomplete="off" data-openpay-card="holder_name"/>
                                            </div>
                                       </div>

                                       <div class="sctn-row">
                                          <div class="sctn-col l">
                                          <label>Número de tarjeta</label><input type="text" autocomplete="off" data-openpay-card="card_number"/>                                               
                                          </div>
                                        </div>


                                        <div class="sctn-row">
                                          <div class="sctn-col l">
                                          <label>Fecha de expiración</label>
                                                        <div class="sctn-col half l"><input type="text" placeholder="Mes" data-openpay-card="expiration_month"/></div>
                                                        <div class="sctn-col half l"><input type="text" placeholder="Año" data-openpay-card="expiration_year"/></div>
                                          </div>
                                        </div>


                                        <div class="sctn-row">
                                          <div class="sctn-col l">
                                          <div class="sctn-col cvv"><label>Código de seguridad</label>
                                                        <div class="sctn-col half l"><input type="text" placeholder="3 dígitos" autocomplete="off" data-openpay-card="cvv2"/></div>
                                                    </div>

                                          </div>
                                        </div>

                                        

                                        <div class="sctn-row">
                                            <div class="sctn-col l">
                                                <div class="sctn-row">
                                                  <div class="openpay">
                                                    <div class="logo">Transacciones realizadas vía:</div>
                                                 </div>
                                            </div>
                                        </div>
                                        </div>

                                        <div class="sctn-row">
                                            <div class="sctn-col l">
                                                <div class="sctn-row">
                                                     <div class="shield">Tus pagos se realizan de forma segura con encriptación de 256 bits</div>
                                                </div>
                                            </div>
                                        </div>
                                   
                                        <div class="sctn-row">
                                            <div class="sctn-col l">
                                                <div class="sctn-row">
                                                            <a class="button rght" id="pay-button" onClick={(e) => Submit(e)}>Pagar</a>
                                                </div>
                                            </div>
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
                        <button   className='button' style={{ fontWeight: 'bold', width:'100%'}} onClick={() => Submit()}>Confirmar Abono</button>
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