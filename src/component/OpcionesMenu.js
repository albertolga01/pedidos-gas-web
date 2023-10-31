import React, { useState, useEffect } from 'react'
import NuevoPedido from '../NuevoPedido'; 
import Logo from './favicon.svg';
import LogoProp from '../resources/LogoProp.svg'
import LogoRomboGasLp from '../resources/LogoRomboGasLp.svg'
import AcercaDe from '../resources/AcercaProp.svg'
import PromocionmenuProp from '../resources/PromocionmenuProp.svg'
import Ayuda from '../resources/AyudaProp.svg'
import UsuarioProp from '../resources/UsuarioProp.svg'
import PrivacidadProp from '../resources/PrivacidadProp.svg'
import { TfiHelpAlt, TfiFile } from "react-icons/tfi";
import { CiDiscount1, CiCircleInfo } from "react-icons/ci";
    import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";

import {RiWhatsappFill, RiFacebookFill, RiInstagramFill } from "react-icons/ri";
import { IconContext } from "react-icons";
import { push as Menu } from 'react-burger-menu'

export default function OpcionesMenu(props) {

     const [isMenuOpen1, SetIsMenuOpen1] = useState(props.isMenuOpen1);
    // console.log(props.selected);
    console.log(props.dptoid);

   

    function Seleccionar(elemento){ 
        if(isMenuOpen1 == true){ 
            SetIsMenuOpen1(false); 
        }  
        props.unmount(elemento);   
    }



    var isMenuOpen = function(state) {
 
        SetIsMenuOpen1(state.isOpen);
        return state.isOpen;
      }; 

    
   
    function logOut() {
        if (window.Android){
            window.Android.showToast("", "", "", "", "", "", "0");
            //alert(res);
        }else{
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

                <IconContext.Provider value={{ size: "2.5em" }}>
                <div id="sidebtn" className='menuOption'  style={{width:'65%'}}  onClick={() => { Seleccionar("Ayuda"); }}>
                <img style={{width:'15%'}} src={Ayuda} />
                    <label style={{marginLeft:'10px', fontWeight:'bold', fontSize:'15px'}}>Ayuda</label> 
                </div>
                </IconContext.Provider> 
                <IconContext.Provider value={{ size: "2.5em" }}>
                <div id="sidebtn" className='menuOption'  style={{width:'65%'}}  onClick={() => { Seleccionar("PreguntasFrecuentes"); }}>
                <img style={{width:'15%'}} src={Ayuda} />
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
                {/*
                <IconContext.Provider   value={{ size: "2.5em" }}>
                <div  id="sidebtn" className='menuOption'  style={{width:'65%'}} onClick={() => { Seleccionar("Avisoprivacidad"); }}>
                <img style={{width:'15%'}} src={PrivacidadProp} />

                    <label style={{marginLeft:'10px', fontWeight:'bold', fontSize:'15px'}}>Aviso de privacidad</label> 
                </div>
                </IconContext.Provider>
                */}
                </center>
                <IconContext.Provider value={{ size: "2.5em" }}>
                <center>
                <div  style={{position:'absolute', marginLeft:'25%', bottom: '80px', width:'50%', display:'flex', flexDirection:'row', justifyContent:'space-between'}}  >
                    <a id="link2" className='menuOption' href='https://www.facebook.com/grupopetromar' target="_blank"> <RiFacebookFill/></a>
                    <a id="link2" className='menuOption' href='https://instagram.com/grupopetromar' target="_blank"><RiInstagramFill/></a>
                    <a id="link2"  className='menuOption' href='https://api.whatsapp.com/send/?phone=526699933030&text=Hola%21+Buen+d%C3%ADa&type=phone_number&app_absent=0' target="_blank"><RiWhatsappFill/></a>
                    
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
