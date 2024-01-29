import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'; 
import Modal from 'react-modal';
import { ThreeDots } from  'react-loader-spinner' 
import {Navbar} from './component/Navbar';  
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
function Novedades(props){

     
    const[Nombre, setNombre] = useState(); 

 
    function Seleccionar(){  
        props.unmount("MenuPrincipal");   
    }

    return(
        <div style={{width:'100%'}}>
            <Navbar titulo="Promociones" /> 
        <div   style={{margin: 'auto', width:'80%', height: '100vh'}} align="center"> 
        
           {/*  <img alt="GasPetromar" src={process.env.REACT_APP_URL+"/images/imagen1.jpg"} style={{maxWidth:'100%'}}></img>	<br></br><br></br>
			<img alt="GasPetromar" src={process.env.REACT_APP_URL+"/images/imagen1.jpg"} style={{maxWidth:'100%'}}></img><br></br><br></br>	
			<img alt="GasPetromar" src={process.env.REACT_APP_URL+"/images/imagen1.jpg"} style={{maxWidth:'100%'}}></img>	<br></br><br></br>
            */}
            <br></br> 
            <div style={{width:'100%', maxHeight:'500px'}} >
            <Carousel autoPlay >
                <div>
                    <img src={process.env.REACT_APP_URL+"/images/Banner-320x568-02.png"} style={{maxWidth:'500px'}} />
                     
                </div>
                <div>
                    <img src={process.env.REACT_APP_URL+"/images/Banner-320x568-01.png"} style={{maxWidth:'500px'}} />
                   
                </div>
                <div>
                    <img src={process.env.REACT_APP_URL+"/images/imagen1-webp.webp"} style={{maxWidth:'500px'}} />
                   
                </div>
                {/*<div>
                    <img src={process.env.REACT_APP_URL+"/images/imagen4-webp.webp"} style={{maxWidth:'500px'}} w/>
                  
                </div>*/}
               
            </Carousel>
            <button className="buttonVerde" style={{width:'100%', marginBottom: '27px'}} onClick={() => { Seleccionar();}}>Regresar</button>
            <br></br>
            <br></br>
            </div>
        </div>
       
        </div>
    );
}

export default Novedades;