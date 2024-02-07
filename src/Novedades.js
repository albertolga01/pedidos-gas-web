import React from "react";
import { useState, useEffect } from "react";
import './App.css'; 
import {Navbar} from './component/Navbar';  
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
function Novedades(props){

 
    function Seleccionar(){  
        props.unmount("MenuPrincipal");   
    }

    return(
        <div style={{width:'100%'}}>
            <Navbar titulo="Promociones" /> 
        <div   style={{margin: 'auto', width:'80%', height: '100vh'}} align="center"> 
        
           
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