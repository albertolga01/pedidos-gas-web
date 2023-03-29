import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'; 
import Modal from 'react-modal';
import { ThreeDots } from  'react-loader-spinner' 
import {Navbar} from './component/Navbar';   
function AcercaDe(props){

     
    const[Nombre, setNombre] = useState(); 

 
    function Seleccionar(){  
        props.unmount("MenuPrincipal");   
    }

    return(
        <div   style={{margin: 'auto', width:'80%', height: '100vh'}} align="center"> 
            <div style={{width:'100%'}} align="center">
            <Navbar titulo="Acerca De" /> </div> <br></br><br></br><br></br>
            <img alt="GasPetromar" src={process.env.REACT_APP_URL+"/images/imagen1.jpg"} style={{maxWidth:'100%'}}></img>	<br></br><br></br>
			 <button className="buttonVerde" style={{width:'100%'}} onClick={() => { Seleccionar();}}>Regresar</button>
            <br></br>
            <br></br>
            <br></br>
        </div>
    );
}

export default AcercaDe;