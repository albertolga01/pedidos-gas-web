import React, { useState, useEffect } from 'react'
import NuevoPedido from '../NuevoPedido'; 
import Logo from './favicon.svg';

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
        window.location.reload();
    }

   

    return (

     
          <Menu left   isOpen={ isMenuOpen1 } onStateChange={ isMenuOpen } >
                
            <div id="sidepanel" style={{width:'100%'}}>
                <img id="sidepanel-logo"  src={Logo}alt="Logo" />

                <span id="top-menu" style={{ textAlign: 'center', color: 'white', fontSize: '12px', paddingBottom: '.4rem', paddingTop: '.4rem' }}>
                    <b>Bienvenido:</b> {props.nombres + " " + props.apellidos} <br /> 
 
                    </span>

                <hr></hr>
                { (props.admin == 1) ? 
						 <div id="sidebtn" onClick={() => { Seleccionar("GrupoTrabajo"); }}>
                         <img id="sideimggrupo" alt="" />
                         <span>Grupo de Trabajo</span>
                     </div>
                         : <label></label>
							}


                { (props.admin == 1) ? 
							<div id="sidebtn" onClick={() => { Seleccionar("Proyectos"); }}>
                            <img id="sideimg3" alt="" />
                            <span>Proyectos</span>
                        </div>
                         : <label></label>
							}
                
                <div id="sidebtn" onClick={() => { Seleccionar("NuevoPedido"); }}>
                    <img id="sideimg2" alt="" />
                    <span>Nuevo Pedido</span> 
                </div>
                <div id="sidebtn" onClick={() => { Seleccionar("Usuario"); }}>
                    <img id="sideimg1" alt="" />
                    <span>Usuario</span> 
                </div>
                
                <div id="sidebtn" onClick={() => { Seleccionar("Novedades"); }}>
                    <img id="sideimg3" alt="" />
                    <span>Novedades</span> 
                </div>
               
                
                
               
                <div id="sidebtn" onClick={() => logOut()}>
                    <img id="sideimg5" alt="" />
                    <span>Cerrar sesión</span>
                </div> 

            </div>

            </Menu>      
           

 
    )
}
