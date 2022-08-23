import React, { useState, useEffect, useSyncExternalStore } from 'react'
import App from '../App'; 
import NuevoPedido from '../NuevoPedido';
import Usuario from '../Usuario';
import Novedades from '../Novedades';
import OpcionesMenu from './OpcionesMenu';  
import MenuPrincipal from '../MenuPrincipal';  
import { push as Menu } from 'react-burger-menu'
import Backgroundgas from './Background-gas.png'

export default function SideMenu(props) {

 

    const [selected, setSelect] = useState(props.selected);
    const [usuario, setUsuario] = useState(props.userid);
    const [isMenuOpen1, SetIsMenuOpen1] = useState(false); 
    const [ref, setRef] = useState(false); 
    const [title, setTitle] = useState("titul"); 
    const [n, setN] = useState(); 
    // console.log(props.selected); 
  
  

    function close(selected){
        setSelect(selected);
        if(isMenuOpen1 == true){
            SetIsMenuOpen1(false);
        } 
    }

    

    function cambiarSelected(selected){ 
          
        close(selected);  
    }

   
    var isMenuOpen = function(state) {
 
        SetIsMenuOpen1(state.isOpen);
        return state.isOpen;
      }; 

    const Element = () => {

          if (selected === 'NuevoPedido') {
            return <NuevoPedido unmount={cambiarSelected} nombres={props.nombres} apellidos={props.apellidos} numero_consumidor={props.numero_consumidor} identificador_externo={props.identificador_externo} />;
        } else if (selected === 'Usuario') {
            return <Usuario unmount={cambiarSelected}  nombres={props.nombres} apellidos={props.apellidos} numero_consumidor={props.numero_consumidor} identificador_externo={props.identificador_externo} />;
        }else if (selected === 'Novedades') {
            return <Novedades  unmount={cambiarSelected} nombres={props.nombres} apellidos={props.apellidos} numero_consumidor={props.numero_consumidor} identificador_externo={props.identificador_externo} />;
        }else {
            return (<div style={{ width: '100%', textAlign: 'center', backgroundColor: '', margin: 'auto' }}><h1>Error al Cargar</h1></div>);
        } 
    }

    useEffect(() => {
          
		// eslint-disable-next-line
	},[])
  

    function logOut() {
        window.location.reload();
    }

   
    /*
        function Not(data, user){
            
            console.log(data.mensaje+ " " + data.userid + " " + props.userid);
    if(data.userid === props.userid && data.tipo === "act"){   
                Push.create("Notificación: ", { 
                body:  data.mensaje, 
                icon: 'https://actividades.grupopetromar.com/favicon.png', 
                timeout: 5000, 
                onClick: function () { 
                window.focus(); 
                this.close(); 
            } 
        });      
    }
    }

    function notificaciones(){

    var pusher = new Pusher('5238df05729a28dcfb1a', { 
    cluster: 'us3' 
    }); 
    var channel = pusher.subscribe('my-channel'); 
        channel.bind('my-event', function(data) { 
            //	alert(data.mensaje + " " + data.userid + " " + JSON.stringify(data)); 
            //console.log(usuario);
        

            Not(data, props.userid);

        
    });

    }*/


   
        if(selected == "MenuPrincipal"){
            return (
                <div  class="containerMenuP" style={{ height: '100vh', width: '100vw', top: '0',  position: 'sticky', display: 'flex', overflowX: 'auto'}}>
            <MenuPrincipal unmount={cambiarSelected}   isMenuOpen1={isMenuOpen1} nombres={props.nombres} apellidos={props.apellidos} numero_consumidor={props.numero_consumidor} identificador_externo={props.identificador_externo}></MenuPrincipal>
            </div>
            )
        }else{
            return (
            <div  class="divPrincipal" style={{ height: '100vh', width: '100vw', top: '0',  position: 'sticky', display: 'flex', overflowX: 'auto'}}>
                     {/*   <OpcionesMenu unmount={cambiarSelected}   isMenuOpen1={isMenuOpen1} nombres={props.nombres} apellidos={props.apellidos} numero_consumidor={props.numero_consumidor} identificador_externo={props.identificador_externo}></OpcionesMenu>*/}
                        <Element selected={selected} style={{backgroundColor:'red'}} />   
                    </div>
                )
        }
        
  
}
