import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'; 
import {Navbar} from './component/Navbar';
import StripeContainer from './component/StripeContainer'; 
import { ModalCarga } from "./component/ModalCarga";



function BuscarServicio(props){
 
//////////////////////////////////////////////////
 
const[pagar1, setPagar1] = useState(true);
const[Cantidad, setCantidad] = useState();
const[nombres, setNombres] = useState();
    const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const[Mensaje, setMensaje] = useState(); 
    const[TelefonoNC, setTelefonoNC] = useState(); 

    const [modalIsOpenError, setIsOpenLoadError] = React.useState(false);
	   

    function openModalLoad() { 
		setIsOpenLoad(true); 
	}  
	   
	function closeModalLoad() { 
		setIsOpenLoad(false); 
	}


    function Seleccionar(){  
        props.unmount(Mensaje, TelefonoNC);   
    }
 
      async function buscarServicio(){
        let folio = document.getElementById("folio").value;
        console.log(folio);
        let fd = new FormData()   
        fd.append("id", "obtenerServicio")  
        fd.append("folio", folio)  
            openModalLoad();
           
        const res = await axios.post(process.env.REACT_APP_API_URL, fd);
            closeModalLoad();
            console.log(res.data); 
            setCantidad( (Math.round(res.data[0].importe_total * 100) / 100).toFixed(2));  
            setNombres(res.data[0].consumidor.nombres);  
            setPagar1(false);
           
      }
 
  
    
    return(
      <>

      {(pagar1) ?
      <div className='divPrincipal'  style={{width:'100%', height: '100vh'}}>  
        <div style={{display:'flex', flexDirection:'column',   width: '80%'}} align="center">
        <Navbar titulo="Buscar servicio" />  <br></br><br></br>
              <label class="idLabel">Folio</label>
              <input type='number' class="idInput" id="folio"></input><br></br>
              
             
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
     
      </div>
        :
        <>
              <div  style={{margin: 'auto', width:'80%' , height: '100vh' }} align="center"> 
                     <br></br> <br></br> <br></br>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%'}} align="center">
                             <StripeContainer unmount={props.unmount} cantidad={Cantidad} identificador_externo={props.identificador_externo} nombres={nombres} apellidos={""}/>
                             </div>
                        </div> 
        </>
      }
        


        </>
    );
}

export default BuscarServicio;
 
