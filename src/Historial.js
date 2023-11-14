import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'; 
import Modal from 'react-modal';
import { ThreeDots } from  'react-loader-spinner' 
import {Navbar} from './component/Navbar';   
import Abonar from "./Abonar";
import FadeIn from 'react-fade-in';
import Usuario from "./Usuario";
import StripeContainer from './component/StripeContainer'; 

import BuscarServicio from './BuscarServicio';
import PasarelaPago from './PasarelaPago';

 
function Historial(props){
    
    useEffect(()=> {
    
       checkoutID();
        
        const script = document.createElement("script")
        script.src="https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId={B6CADF88A556C4758A143FC11C54B045.uat01-vm-tx01}";
        document.body.appendChild(script);
        
        return () => {
        document.body.removeChild(script);
        };
    }, []);


  
    
    useEffect(() => {

         detalleSaldo();
	},[])

    const [idrespuesta, setIdrespuesta] = useState();
    const[SaldoDisponible, setSaldo] = useState();
    const[lista, setlista] = useState([]); 
   // const[Nombre, setNombre] = useState(); 
 
   const [pagarServicio, setPagarServicio] = useState(false);  
   const [PasarelaPagos, setPasarelaPagos] = useState(false); 

        
   const[Cantidad, setCantidad] = useState();
   const[nombres, setNombres] = useState();

   async function detalleSaldo(){    
    let fd = new FormData()    
    fd.append("id", "historial")   
    fd.append("noConsumidor", props.identificador_externo)   
    const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
     //alert(res.trim);
     console.log(res.data);
     setlista(res.data);
   //  setSaldo(res.data);  
   
    } 


    function cambiarSelected4(monto){   
        setPasarelaPagos(true); 
        setCantidad(monto);
        setNombres(props.nombres);  
    }

   async function checkoutID(){
        let fd = new FormData()   
		fd.append("id", "checkoutID")  
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
        //console.log(res.data.id);
        setIdrespuesta(res.data.id); 
    }

    function Seleccionar(){  
        props.unmount("Abonar");    
    }
   function FormatNumber(importe){
    return ((Number(importe)).toLocaleString('en-US',{
        style:'currency',
        currency:'USD',
    }));
   }

   function pagarServicio1(monto){
    setPagarServicio(true);
    setCantidad(monto);
    setNombres(props.nombres);
   }

   function formatDate(date){
    let index = date.search(" ");
    date = date.substring(0, index);
    date = date.split("-");
    let formatedDate = date[2] +"/"+ date[1] +"/"+ date[0];
    return(formatedDate);
}



    return(
        <div style={{width:'100%'}}>
             <Navbar titulo="Historial" />
             {/*idrespuesta*/}
        <>
        {(PasarelaPagos) ? 
        	<>
					 <div  style={{margin: 'auto', width:'80%' , height: '100vh' }} align="center"> 
                     <br></br> <br></br> <br></br>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%'}} align="center">
                            <PasarelaPago unmount={cambiarSelected4}/>
                             </div>
                        </div> 
					</>
        :
       
        <div  style={{margin: 'auto', width:'80%', height: '100vh'}} align="center"> 
             <FadeIn><div style={{width:'100%'}} align="center">
            </div> <br></br><br></br><br></br>
            
            
            <div  style={{height:'100%', overflowY: 'scroll', width:'100%'}}>
					<table  style={{width:'100%'}}>
						<tr>
							<th style={{color:'white'}}>Folio</th>
							<th style={{color:'white'}}>Fecha</th>
							<th style={{color:'white'}}>Litros</th>
							<th style={{color:'white'}}>Importe</th> 
							<th style={{color:'white'}}>Estatus</th> 
							<th style={{color:'white'}} >Pagar</th> 
							 
						</tr>

						 { lista.map(item => ( 
						<tr id="tabletr" style={{  fontSize:'15.5px', border: 'px solid #ABB2B9'}}>
							<td style={{color:'white', textAlign:'center' }}>{item.foliopedido}</td>   
							<td style={{color:'white', textAlign:'center' }}> {formatDate(item.fechahorapedido)}</td>
							<td style={{color:'white', textAlign:'center' }}> {item.litros + " L"}</td>
							<td style={{color:'white', textAlign:'center' }}> {FormatNumber(item.monto)}</td>
							<td style={{color:'white', textAlign:'center' }}> {item.estatus_pedido}</td>
							<td style={{color:'white', textAlign:'center' }} > <button id="form-btn" className='buttonLogin' style={{margin:'5px', width: '80px', color:'white'}} onClick={() => cambiarSelected4(item.monto)}>PAGAR</button>  </td>
							 
							  
						</tr> 
						))}	
					</table> 
				</div>
                <br></br>
            <br></br>
                <div style={{justifyContent: 'space-between', columnGap:'0.875rem', width:'100%', display:'flex', flexDirection:'row'}}> 
                                <div style={{width:'100%'}} align="center"> 
                                <button className="buttonVerde" style={{width:'100%'}} onClick={() => {  props.unmount("MenuPrincipal")}}>Regresar</button>
                                </div>
                                
                                </div> 
            <br></br>
            <br></br>
            <br></br></FadeIn>
        </div>
        }

</>
</div>
      
    );
}

export default Historial;