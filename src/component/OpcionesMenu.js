import React, { useState, useEffect } from 'react'
import LogoRomboGasLp from '../resources/LogoRomboGasLp.svg'
import AcercaDe from '../resources/AcercaProp.svg'
import PromocionmenuProp from '../resources/PromocionmenuProp.svg'
import Ayuda from '../resources/AyudaProp.svg'
import UsuarioProp from '../resources/UsuarioProp.svg'
import tanque from '../resources/tanque.svg'
import { FiLogOut } from "react-icons/fi";

import {RiWhatsappFill, RiFacebookFill, RiInstagramFill } from "react-icons/ri";
import { IconContext } from "react-icons";
import { push as Menu } from 'react-burger-menu'
import { TbDirections } from "react-icons/tb";
import { TbMessageCircleQuestion } from "react-icons/tb";

export default function OpcionesMenu(props) {

     const [isMenuOpen1, SetIsMenuOpen1] = useState(props.isMenuOpen1);
    console.log(props.dptoid);

   

    function Seleccionar(elemento){ 
        if(isMenuOpen1 == true){ 
            SetIsMenuOpen1(false); 
        }  
        props.unmount(elemento);   
    }

    function instagram(){
        
        window.webkit.messageHandlers.instagram.postMessage("");
      }

      function facebook(){
       
        window.webkit.messageHandlers.facebook.postMessage("");
      }

      function whatsapp(){

        if (!window.Android){
            window.webkit.messageHandlers.whatsapp.postMessage("");
        }
        
        
        
      }


    var isMenuOpen = function(state) {
 
        SetIsMenuOpen1(state.isOpen);
        return state.isOpen;
      }; 

    
   
    function logOut() {
        if (window.Android){
            window.Android.showToast("", "", "", "", "", "", "0");
           
        }else{
        
        try { 

                var jsonStr = '{"telefono":"","noConsumidor":"","nombres":"","apellidos":"","email":"","identificador_externo":"","loggeado":"", "tipo":"0"}';

                window.webkit.messageHandlers.callbackHandler.postMessage(jsonStr); 
            } catch (error) {
                
            }
            window.location.reload();
        }
		    
			
    }


    

   

    return (

     
          <Menu right   isOpen={ isMenuOpen1 } onStateChange={ isMenuOpen } >          
            <div id="sidepanel" style={{width:'100%'}}>
                <br></br>
                <div style={{width:'100%'}} align="center">
                <img style={{width:'50%'}}  src={LogoRomboGasLp} alt="Logo" />
                </div>
                <hr></hr>
                <center>
                <IconContext.Provider value={{ size: "2.5em" }}>
                <div id="sidebtn" className='menuOption' style={{width:'65%', marginBottom:'50px'}}  onClick={() => { Seleccionar("Usuario"); }}>
                <img style={{width:'15%'}} src={UsuarioProp} />
                <div align="left">
                <label style={{marginLeft:'10px', fontWeight:'bold', fontSize:'17px'}}>Bienvenido (a):</label> <br></br>
                <label style={{marginLeft:'10px',  fontSize:'15px' }}> {props.nombres + " " + props.apellidos}</label> 
                </div>
                </div>
                </IconContext.Provider> 
                {/*
                <IconContext.Provider value={{ size: "2.5em" }}>
                <div id="sidebtn" className='menuOption'  style={{width:'65%'}}  onClick={() => { Seleccionar("LibretaDirecciones"); }}>
                <TbDirections />
                    <label style={{marginLeft:'10px', fontWeight:'bold', fontSize:'15px'}}>Mis direcciones</label> 
                </div>
                </IconContext.Provider> 
                */}
                <IconContext.Provider value={{ size: "2.5em" }}>
                <div id="sidebtn" className='menuOption'  style={{width:'65%'}}  onClick={() => { Seleccionar("Ayuda"); }}>
                <img style={{width:'15%'}} src={Ayuda} />
                    <label style={{marginLeft:'10px', fontWeight:'bold', fontSize:'15px'}}>Ayuda</label> 
                </div>
                </IconContext.Provider> 
                <IconContext.Provider value={{ size: "2.5em" }}>
                <div id="sidebtn" className='menuOption'  style={{width:'65%'}}  onClick={() => { Seleccionar("PreguntasFrecuentes"); }}>
                <TbMessageCircleQuestion />
                    <label style={{marginLeft:'3px', fontWeight:'bold', fontSize:'15px'}}>Preguntas Frecuentes</label> 
                </div>
                </IconContext.Provider> 
                <IconContext.Provider value={{ size: "2.5em" }}>
                <div id="sidebtn" className='menuOption'  style={{width:'65%'}} onClick={() => { Seleccionar("Novedades"); }}>
                <img style={{width:'15%'}} src={PromocionmenuProp} />

                    <label style={{marginLeft:'10px', fontWeight:'bold', fontSize:'15px'}}>Promociones</label> 
                </div>
                </IconContext.Provider> 
                <IconContext.Provider value={{ size: "2.5em" }}>
                <div id="sidebtn"  className='menuOption' style={{width:'65%'}} onClick={() => { Seleccionar("AcercaDe"); }}>
                <img style={{width:'15%'}} src={AcercaDe} />
                    <label style={{marginLeft:'10px', fontWeight:'bold', fontSize:'15px'}}>Acerca de</label>
                </div>
                </IconContext.Provider>
                <IconContext.Provider value={{ size: "2.5em" }}>
                <div id="sidebtn"  className='menuOption' style={{width:'65%'}} onClick={() => { Seleccionar("SolicitudTanqueEstacionario"); }}>
                <img style={{width:'25%'}} src={tanque} />
                    <label style={{marginLeft:'10px', fontWeight:'bold', fontSize:'15px'}}>Solicita tu tanque estacionario aquí</label>
                </div>
                </IconContext.Provider>
                
                </center>
                <IconContext.Provider value={{ size: "2.5em" }}>
                <center>
                    <button hidden onClick={()=>instagram()}>instagram</button>
                <div  style={{position:'absolute', marginLeft:'25%', bottom: '80px', width:'50%', display:'flex', flexDirection:'row', justifyContent:'space-between'}}  >
                    <a id="link2" className='menuOption' href='https://www.facebook.com/grupopetromar' target="_blank" onClick={()=>facebook()}> <RiFacebookFill/></a>
                    <a id="link2" className='menuOption' href='https://instagram.com/grupopetromar' target="_blank" onClick={()=>instagram()}><RiInstagramFill/></a>
                    <a id="link2"  className='menuOption' href='https://api.whatsapp.com/send/?phone=526699933030&text=Hola%21+Buen+d%C3%ADa&type=phone_number&app_absent=0' target="_blank" onClick={()=>whatsapp()}><RiWhatsappFill/></a>
                    
                </div>
                </center>
                </IconContext.Provider> 
                
                <IconContext.Provider value={{ size: "2.5em" }}>
                <center>
                <div id="sidebtn" className='menuOption' style={{position:'absolute', bottom: '0', left:'17.5%', bottom:'20px', width:'65%'}} onClick={() => logOut()}>
                 
                    <FiLogOut/>
                    <label style={{marginLeft:'10px', fontWeight:'bold', fontSize:'15px'}}>Cerrar sesión</label>
                </div> 
                </center>
                </IconContext.Provider> 

            </div>

            </Menu>      
           

 
    )
}
