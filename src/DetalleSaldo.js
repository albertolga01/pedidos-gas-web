import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'; 
import {Navbar} from './component/Navbar';   
import FadeIn from 'react-fade-in';
function DetalleSaldo(props){

  

    useEffect(() => {
         
        detalleSaldo();
	},[])
    const[lista, setlista] = useState([]); 
 

        

   async function detalleSaldo(){    
    let fd = new FormData()    
    fd.append("id", "detalleSaldo")   
    fd.append("noConsumidor", props.identificador_externo)   
    const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
   
     console.log(res.data);
     setlista(res.data);

   
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

    return(
        
        <div  style={{margin: 'auto', width:'80%', height: '100vh'}} align="center"> 
        <FadeIn> 
            <div style={{width:'100%'}} align="center">
            <Navbar titulo="Detalle de saldo" /> </div> <br></br><br></br><br></br>
            <div style={{width:'100%', color:'white', fontWeight: 'bold', fontSize:'15px'}} align="center" > <h2 >{FormatNumber(props.saldoCliente)}</h2> </div> 
            <div  style={{height:'100%', overflowY: 'scroll', width:'100%'}}>
					<table  style={{width:'100%'}}>
						<tr>
							<th style={{color:'white'}}>Folio</th>
							<th style={{color:'white'}}>Fecha</th>
							<th style={{color:'white'}}>Importe</th>
							<th style={{color:'white'}}>Disponible</th> 
							<th style={{color:'white'}}>Descripción</th> 
							 
						</tr>
                        
						 { lista.map(item => ( 
						<tr id="tabletr" style={{  fontSize:'15.5px', border: 'px solid #ABB2B9'}}>
							<td style={{color:'white', textAlign:'center' }}>{item.folio}</td> 
							<td style={{color:'white', textAlign:'center' }}> {(item.fechacaptura)}</td>
							<td style={{color:'white', textAlign:'center' }}> {FormatNumber(item.importe)}</td>
							<td style={{color:'white', textAlign:'center' }}> {FormatNumber(item.disponible)}</td>
							<td style={{color:'white', textAlign:'center' }}> {item.descripcion}</td>
							 
							  
						</tr> 
						))}	
					</table> 
				</div>
                <br></br>
            <br></br>
                <div style={{justifyContent: 'space-between', columnGap:'0.875rem', width:'100%', display:'flex', flexDirection:'row'}}> 
                                <div style={{width:'50%'}} align="center"> 
                                <button className="buttonVerde" style={{width:'100%'}} onClick={() => {  props.unmount("MenuPrincipal")}}>Regresar</button>
                                </div>
                                <div style={{width:'50%'}} align="center"> 
                                <button style={{ width:'100%'}} className="button" onClick={() => { Seleccionar("Abonar");}} >Abonar</button >
                                    </div>
                                </div> 
            <br></br>
            <br></br>
            <br></br> </FadeIn>
        </div>
       
    );
}

export default DetalleSaldo;