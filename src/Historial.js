import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'; 
import {Navbar} from './component/Navbar';   
import FadeIn from 'react-fade-in';
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
    const[lista, setlista] = useState([]); 
   const [PasarelaPagos, setPasarelaPagos] = useState(false); 
   const[Cantidad, setCantidad] = useState();
   const[nombres, setNombres] = useState();

   async function detalleSaldo(){    
    let fd = new FormData()    
    fd.append("id", "historial")   
    fd.append("noConsumidor", props.identificador_externo)   
    const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
     console.log(res.data);
     setlista(res.data);
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
        setIdrespuesta(res.data.id); 
    }

   function FormatNumber(importe){
    return ((Number(importe)).toLocaleString('en-US',{
        style:'currency',
        currency:'USD',
    }));
   }


   function formatDate(date){
    let index = date.search(" ");
    date = date.substring(0, index);
    date = date.split("-");
    let formatedDate = date[2] +"/"+ date[1] +"/"+ date[0];
    return(formatedDate);
}


function unmountPasarela(){
    setPasarelaPagos(false);
}



    return(
        <div style={{width:'100%'}}>
             <Navbar titulo="Historial" />
        <>
        {(PasarelaPagos) ? 
        	<>
					 <div  style={{margin: 'auto', width:'80%' , height: '100vh' }} align="center"> 
                     <br></br> 
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%'}} align="center">
                            <PasarelaPago unmountPasarela={unmountPasarela} nombres={props.nombres} importe={"1.00"} apellidos={props.apellidos}/>
                             </div>
                        </div> 
					</>
        :
       
        <div  style={{margin: 'auto', width:'90%', height: '100vh'}} align="center"> 
             <FadeIn><div style={{width:'100%'}} align="center">
            </div> <br></br><br></br><br></br>
            
            
            <div  style={{height:'100%', overflowY: 'scroll', width:'100%'}}>
					<table  style={{width:'100%'}}>
						<tr style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
							<th style={{color:'white', padding:'2px 10px 2px 0'}}>Folio</th>
							<th style={{color:'white', padding:'2px 10px'}}>Fecha</th>
							<th style={{color:'white', padding:'2px 10px'}}>Litros</th>
							<th style={{color:'white', padding:'2px 10px'}}>Importe</th> 
							<th style={{color:'white', padding:'2px 10px'}}>Estatus</th> 
							<th style={{color:'white', padding:'2px 0 2px 10px'}} hidden>Pagar</th> 
							 
						</tr>

						 { lista.map(item => ( 
						<tr id="tabletr" style={{  fontSize:'18.5px', border: 'px solid #ABB2B9'}}>
							<td style={{color:'white', textAlign:'center', padding:'2px 10px 2px 0' }}>{item.foliopedido}</td>   
							<td style={{color:'white', textAlign:'center', padding:'2px 10px' }}> {formatDate(item.fechahorapedido)}</td>
							<td style={{color:'white', textAlign:'center', padding:'2px 10px' }}> {item.litros + " L"}</td>
							<td style={{color:'white', textAlign:'center' , padding:'2px 10px'}}> {FormatNumber(item.monto)}</td>
							<td style={{color:'white', textAlign:'center', padding:'2px 0 2px 5px' }}> {item.estatus_pedido}</td>
							<td style={{color:'white', textAlign:'center' }} hidden> <button id="form-btn" className='buttonLogin' style={{margin:'5px', width: '80px', color:'white'}} onClick={() => cambiarSelected4(item.monto)}>PAGAR</button>  </td>
							 
							  
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