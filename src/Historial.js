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
function Historial(props){

  

    useEffect(() => {
         
        detalleSaldo();
	},[])
    const[SaldoDisponible, setSaldo] = useState();
    const[lista, setlista] = useState([]); 
   // const[Nombre, setNombre] = useState(); 
 
   const [pagarServicio, setPagarServicio] = useState(false);  
        
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
        <>
        {(pagarServicio) ? 
        	<>
					 <div  style={{margin: 'auto', width:'80%' , height: '100vh' }} align="center"> 
                     <br></br> <br></br> <br></br>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%'}} align="center">
                             <StripeContainer unmount={props.unmount} cantidad={Cantidad} identificador_externo={props.identificador_externo} nombres={nombres} apellidos={""}/>
                             </div>
                        </div> 
					</>
        :
       
        <div  style={{margin: 'auto', width:'80%', height: '100vh'}} align="center"> 
             <FadeIn><div style={{width:'100%'}} align="center">
            <Navbar titulo="Historial" /> </div> <br></br><br></br><br></br>
            
            
            <div  style={{height:'100%', overflowY: 'scroll', width:'100%'}}>
					<table  style={{width:'100%'}}>
						<tr>
							<th style={{color:'white'}}>Folio</th>
							<th style={{color:'white'}}>Fecha</th>
							<th style={{color:'white'}}>Litros</th>
							<th style={{color:'white'}}>Importe</th> 
							<th style={{color:'white'}}>Estatus</th> 
							<th style={{color:'white'}} hidden>Pagar</th> 
							 
						</tr>

						 { lista.map(item => ( 
						<tr id="tabletr" style={{  fontSize:'15.5px', border: 'px solid #ABB2B9'}}>
							<td style={{color:'white', textAlign:'center' }}>{item.folio}</td> 
							<td style={{color:'white', textAlign:'center' }}> {formatDate(item.fechahoraservicio)}</td>
							<td style={{color:'white', textAlign:'center' }}> {FormatNumber(item.litros)}</td>
							<td style={{color:'white', textAlign:'center' }}> {FormatNumber(item.monto)}</td>
							<td style={{color:'white', textAlign:'center' }}> {item.estatus_pedido}</td>
							<td style={{color:'white', textAlign:'center' }} hidden> <button id="form-btn" className='buttonLogin' style={{margin:'5px', width: '80px', color:'white'}} onClick={() => pagarServicio1(item.monto)}>PAGAR</button>  </td>
							 
							  
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

      
    );
}

export default Historial;