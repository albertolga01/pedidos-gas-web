import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'; 
import {Navbar} from './component/Navbar';
import { ModalCarga } from "./component/ModalCarga";
import { ToastContainer, toast } from 'react-toastify';
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";    


import { Input } from 'semantic-ui-react'

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);



function BuscarConsumidor(props){
 
//////////////////////////////////////////////////
 
 
    const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const[lista, setlista] = useState([]); 

    const [modalIsOpenError, setIsOpenLoadError] = React.useState(false);

    function notify(message){
      toast(message);
  }

    function openModalLoad() { 
		setIsOpenLoad(true); 
	}  
	   
	function closeModalLoad() { 
		setIsOpenLoad(false); 
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
        
        if(telefono.length >= 8){
          openModalLoad(); 
          const res = await axios.post(process.env.REACT_APP_API_URL, fd);
          console.log(res.data);
              closeModalLoad();
              if(res.data.length == 0){
                notify("No se encontró información");
              }else{
                setlista(res.data);  
              }
            
        }else{
          notify("Capture un teléfono válido");
        }
            

           
      }
 
  
    
    return( 
    <div style={{ width: '100%'}}>  
       <Navbar titulo="Buscar consumidor" />  <br></br><br></br>
      <>

        <div className='divPrincipal'  style={{width:'100%', height: '100vh'}}>  
              <div style={{display:'flex', flexDirection:'column',   width: '80%'}} align="center">
              
              <label class="idLabel">Teléfono</label> 
              <Input type="tel"
                  icon={{ name: 'search',   link: false }}
                  placeholder='Buscar...'
                  id="telefono"
                />
                            

                   
                    <input hidden type='text' class="idInput"></input><br></br>

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
                  
                    <div style={{justifyContent: 'space-between', columnGap:'0.875rem', width:'100%', display:'flex', flexDirection:'row', marginBottom: '27px'}}> 
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
              position="top-right"
              />
            </div>
              


              </>
    </div>

    );
}


export default BuscarConsumidor;
 
