import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import Modal from 'react-modal';
import CorrectoImg from '../resources/Correcto.svg'
import ErrorImg from '../resources/error.svg'
import redalerticon from '../resources/redalerticon.svg'
import { ModalCarga } from "./ModalCarga"; 


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


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentForm(props) {
    
	const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);

    const [modalIsOpenE, setIsOpenE] = React.useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalIsOpenE2, setIsOpenE2] = React.useState(false);
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    function openModal() { 
		setIsOpen(true); 
	}  
	   
	function closeModal() { 
		setIsOpen(false); 
	}
    function openModalLoad() { 
		setIsOpenLoad(true); 
	}  
	   
	function closeModalLoad() { 
		setIsOpenLoad(false); 
	}
	
	 

    //Error Mensaje
    function openModalE() { 
        setIsOpenE(true); 
    }  
    
    function closeModalE() { 
        setIsOpenE(false); 
    }

    //Error Mensaje
    function openModalE2() { 
        setIsOpenE2(true); 
    }  
    
    function closeModalE2() { 
        setIsOpenE2(false); 
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            openModalLoad();
            let cant = props.cantidad;
            if(Number.isInteger(parseInt(cant))){
                cant = cant + "00";
            }else{
                cant = cant.replace(".", "");
            }
            const {id} = paymentMethod
            const response = await axios.post("https://gaspetromarapp.grupopetromar.com/pago/payment", {
                amount: cant,
                desc: props.nombres + " " + props.apellidos + " " + props.identificador_externo + " abono gas LP" ,
                id
            })
            closeModalLoad();
            if(response.data.success && response.data.codigobd == "1") {
                console.log("Successful payment")
                setSuccess(true)
                //modal confirmacion 
                 openModal()
            }else{
                openModalE()
            }

        } catch (error) {
            // error 
            closeModalLoad();
            console.log("Error", error)
            openModalE2()
            
        }
    } else {
        console.log(error.message)
        openModalE()
    }
}

    return (
        <> 
        
        <form  > 
            <h1 style={{color:'white'}}>Formulario de pago</h1>
            <label style={{color:'white', fontSize:'24px'}}>Solicitud de pago</label>
            <br></br>
            <label class="idLabel" >Cliente: </label>
            <br></br>
            <label style={{color:'white'}}>{props.nombres + " "}</label>
            <label style={{color:'white'}}>{props.apellidos}</label>
            <br></br>
            <label  class="idLabel" >Concepto: </label>
            <br></br>
            <label style={{color:'white'}}>Abono gas LP </label>
            <br></br>
            <label  class="idLabel" >Importe: </label>
            <br></br>
            <label style={{color:'white'}}>$ {props.cantidad + " MXN"}</label>
            <br></br>
            <br></br>


            <fieldset className="FormGroup1">
                <div className="FormRow1">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
        <div style={{justifyContent: 'space-between', columnGap:'0.875rem', width:'100%', display:'flex', flexDirection:'row'}}>
                <div style={{width:'50%'}} align="center"> 
                    <button className="buttonVerde" style={{ fontWeight: 'bold', width:'100%'}}     onClick={() => props.unmount("MenuPrincipal")}>Regresar</button>
                </div>
            
                <div style={{width:'50%'}} align="center"> 
                    <button className='button' style={{ fontWeight: 'bold', width:'100%'}}  onClick={handleSubmit}>Pagar</button>  
                </div>
               
            </div>
        </form>
      
        <Modal 
						isOpen={modalIsOpen}  
						onRequestClose={closeModal}   
						style={customStylesD}> 
						<div style={{width:'100%'}} align="center">  
						 <img src={CorrectoImg}></img>    <br></br>
                         <label style={{fontWeight:'bold'}}>Mensaje</label><br></br>
                         <label>Pago realizado correctamente</label><br></br>
                         <label>Pago Aceptado</label>
                         <button style={{width:'100%', color:'white', backgroundColor:'#008445'}} className="buttonLogin" onClick={() => props.unmount("MenuPrincipal")}>Ok</button>
						</div>  
				</Modal>
          <Modal 
						isOpen={modalIsOpenE}  
						onRequestClose={closeModalE}   
						style={customStylesD}> 
						<div style={{width:'100%'}} align="center">  
						 <img src={ErrorImg}></img>    <br></br>
                         <label style={{fontWeight:'bold'}}>Mensaje</label><br></br> 
                         <label>Error al procesar el pago</label>
                         <div style={{justifyContent: 'space-between', columnGap:'0.875rem', width:'50%', display:'flex', flexDirection:'row'}}> 

                         <div style={{width:'50%'}} align="center"> 
                            <button style={{width:'100%', color:'white', backgroundColor:'#008445'}} className="buttonLogin" onClick={() => props.unmount("MenuPrincipal")}>Cancelar</button>

                                </div>
                                <div style={{width:'50%'}} align="center"> 
                                <button style={{width:'100%', color:'white', backgroundColor:'#008445'}} className="buttonLogin" onClick={closeModalE}>Reintentar</button>

                                    </div>
                                </div>  
						</div>  
				</Modal>  


                <Modal 
						isOpen={modalIsOpenE2}  
						onRequestClose={closeModalE2}   
						style={customStylesD}> 
						<div style={{width:'100%'}} align="center">  
						 <img src={redalerticon}></img>    <br></br>
                         <label style={{fontWeight:'bold'}}>Operación no realizada</label><br></br> 
                         <label>Lo sentimos, el servicio de pagos está temporalmente inactivo.</label>
                         <label>Por favor, inténtalo más tarde</label>
                         <div style={{justifyContent: 'space-between', columnGap:'0.875rem', width:'50%', display:'flex', flexDirection:'row'}}> 

                         <div style={{width:'50%'}} align="center"> 
                            <button style={{width:'100%', color:'white', backgroundColor:'#008445'}} className="buttonLogin" onClick={() => props.unmount("MenuPrincipal")}>Cancelar</button>

                                </div>
                                <div style={{width:'50%'}} align="center"> 
                                <button style={{width:'100%', color:'white', backgroundColor:'#008445'}} className="buttonLogin" onClick={closeModalE}>Reintentar</button>

                                    </div>
                                </div>  
						</div>  
				</Modal>  

					<ModalCarga modalIsOpenLoad={modalIsOpenLoad} closeModalLoad={closeModalLoad}/>

        </>
    )
}
