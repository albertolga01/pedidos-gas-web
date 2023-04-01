import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'; 
import Modal from 'react-modal';
import { ThreeDots } from  'react-loader-spinner' 
import {Navbar} from './component/Navbar';  
import acerdadeUno from './resources/foto1acercade.jpg';
import acerdadeDos from './resources/foto2acercade.png';
import acerdadeTres from './resources/foto3acercade.png';
import acerdadeCuatro from './resources/foto4acercade.png';
import acerdadeCinco from './resources/foto5acercade.png';
function AcercaDe(props){

     
    const[Nombre, setNombre] = useState(); 

 
    function Seleccionar(){  
        props.unmount("MenuPrincipal");   
    }

    return(
        <div  style={{width:'100%'}}>
             <Navbar titulo="Acerca De" />
            <div   style={{margin: 'auto', width:'80%', height: '100vh'}} align="center">
                <br></br>  
               
                <div style={{width:'100%', backgroundColor: 'white', borderRadius:'5px', boxShadow: 'rgb(0 0 0 / 45%) 0px 5px 15px'  }}>
                <h2  align="left" style={{marginLeft:'5%'}} >Grupo Petromar</h2>
                <label  align="center">Somos una empresa orgullosamente sinaloense, con más de 60 años brindando servicios en la comercialización de hidrocarburos, <p> donde día a día se alcanza la vanguardia para satisfacer el bienestar y la calidad de asistencia hacia nuestros clientes.</p></label>
                
                <img style={{width:'55%'}} src={acerdadeUno} />
                <h2>Nuestro servicio Grupo Petromar División Gas</h2>
                <label  align="left"> ❯ Máxima seguridad y confianza.</label> <br></br>
                <label  align="left"> ❯ Estamos dedicados a brindarte el mejor trato, a través de: </label>  
                <br></br>
                <br></br>
                    
                    <div style={{justifyContent: 'space-between', columnGap:'0.875rem', width:'100%', display:'flex', flexDirection:'row'}}> 
                        <div style={{width:'50%'}} align="center"> 
                        <h3 align="left" style={{color: '#0071CE'}}> ATENCIÓN PERSONALIZADA</h3>
                        <label  align="left" style={{color: '#0071CE'}}>Contamos con un área de atención
                        telefónica exclusiva.</label> <br></br>
                        
                        </div>
                        <div style={{width:'50%'}} align="center">
                            <h3 align="left" style={{color: '#0071CE'}}>PROGRAMACIÓN</h3>
                        <label  align="left" style={{color: '#0071CE'}}>Automática de servicio, nuestro
                        sistema planifica tu próximo suministro.
                        </label> <br></br>
                            
                            </div>
                    </div>
                <h2  align="left" style={{marginLeft:'5%'}} > Nuestra Tecnología</h2>
                <img style={{width:'65%'}} src={acerdadeDos} />
                <h2 align="left" style={{marginLeft:'5%'}}>Seguridad Total</h2>
                <label  align="left"> ❯ Nuestra máxima prioridad es brindarte seguridad total, a través de:</label> <br></br>
                <img style={{width:'65%'}} src={acerdadeTres} /><br></br>
                <label  align="left"> En Grupo petromar División Gas:  ¡Encontrarás GAS LP al Mejor Costo! <br></br>
                    Porque somos tu mejor aliado, te damos la confianza que necesitas. <br></br>
                    ¡Carga con nosotros y notarás la diferencia!</label> <br></br>
                    

                <img style={{width:'65%'}} src={acerdadeCuatro} />
                <img style={{width:'65%'}} src={acerdadeCinco} />
                <br></br>
                <>&nbsp;</>
                </div>
                <br></br><br></br>
                 <button className="buttonVerde" style={{width:'100%'}} onClick={() => { Seleccionar();}}>Regresar</button>
                <br></br>
                <br></br>
                <br></br>
            </div>
        </div>
    );
}

export default AcercaDe;