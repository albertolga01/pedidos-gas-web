import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'; 
import Modal from 'react-modal';
import { ThreeDots } from  'react-loader-spinner' 
import {Navbar} from './component/Navbar';   
import bgprincipal from './resources/bg-principal.png'
import logoGlp from './resources/logoGlp.png'
import usericon from './resources/usericon.svg'
import novedades from './resources/novedades.svg'
import nuevopedido from './resources/nuevopedido.svg'

function MenuPrincipal(props){
	useEffect(() => {
        ObtenerPrecio();
	},[])
  
    const[passActual, setPassActual] = useState();
    const[passNueva, setPassNueva] = useState();
    const[confirmarPass, setConfirmarPass] = useState();
//////////////////////////////////////////////////
    const[Nombre, setNombre] = useState(); 
    const[PrecioGas, setPrecioGas] = useState(); 

    	  

    async function ObtenerPrecio(){    
		let fd = new FormData()    
        fd.append("id", "ObtenerPrecio")   
		const res = await axios.post("https://grupopetromar.com/db/scripts/get_productos.php", fd); 
		var json = JSON.parse(JSON.stringify(res.data));
		var precio = json["productos"]["GAS"].precio;
        setPrecioGas(precio); 
        //document.getElementById("precioGas").innerHTML =  "$" +json["productos"]["GAS"].precio;
		//console.log(res.data); 
	}

    function Seleccionar(elemento){  
        props.unmount(elemento);   
    }

 
    function logOut() {
        window.location.reload();
    }

   
    return(
        <div className='containerMenuPrincipal' style={{margin: 'auto', width:'100%', height: '100vh'}} align="center"> 
            <div style={{width:'100%', display:'flex', flexDirection:'row'}}> 
            <div style={{width:'50%', color:'white', fontWeight: 'bold', fontSize:'20px'}} align="left"> <h4 style={{margin: '20px'}}>Bienvenido (a): {props.nombres +" "+ props.apellidos}</h4> </div>
            <div style={{width:'50%' }} align="right">  <button className="buttonSalir" onClick={() => {logOut()}} >SALIR</button > </div>
            </div>
            <div style={{width:'80%'}} align="center"> 
            <img src={logoGlp} style={{width:'50%', height:'50%'}}></img>
            <br></br>
            <br></br>
            <div style={{backgroundColor:'white', borderRadius:'5px'}} onClick={() => { Seleccionar("NuevoPedido");}} >
            <img src={nuevopedido} style={{width:'50%', height:'50%'}}></img>
            <br></br>
            <label style={{fontWeight: 'bold'}}>NUEVO PEDIDO</label>
            <br></br>
            <br></br>
            </div><br></br>
                <div style={{justifyContent: 'space-between', columnGap:'0.875rem', borderRadius:'5px', width:'100%', display:'flex', flexDirection:'row'}}> 
                    <div style={{width:'50%', backgroundColor:'white', borderRadius:'5px'}} align="center" onClick={() => { Seleccionar("Usuario");}}> 
                    <img src={usericon} style={{width:'100%'}}></img>
                    <br></br>
                    <label style={{fontWeight: 'bold'}}>USUARIO</label>
                    <br></br>
                    <br></br></div>
                    <div style={{width:'50%', backgroundColor:'white', borderRadius:'5px'}} align="center" onClick={() => { Seleccionar("Novedades");}}> 
                    <img src={novedades} style={{width:'100%'}}></img>
                    <br></br>
                    <label style={{fontWeight: 'bold'}}>NOVEDADES</label>
                    <br></br>
                    <br></br>
                    </div>
                </div>
                <br></br>
                <div style={{justifyContent: 'space-between', columnGap:'0.875rem', borderRadius:'5px', width:'100%', display:'flex', flexDirection:'row'}}> 
                    <div style={{width:'50%', backgroundColor:'white', borderRadius:'5px'}} align="center"> 
                    
                    <br></br>
                    <label style={{color:'#008445' , fontSize:'25px', fontWeight:'bold'}}>Nuestro precio</label>
                    <br></br>
                    <br></br></div>
                    <div style={{width:'50%', height:'100px', backgroundColor:'white', borderRadius:'5px'}} align="center"> 
                     <div style={{width:'100%', height:'35%', backgroundImage:'linear-gradient(#145e9c, #145e9c)'}}>
                        <label style={{color:'white' , fontSize:'25px'}}>Precio Gas</label>
                     
                     </div>
                     <div style={{width:'100%', height:'70%', backgroundImage:'linear-gradient(#115680, #2590d1)'}}>
                     <label id='precioGas' style={{color:'white', fontSize:'40px'}}>${PrecioGas}</label>
                        
                     </div> 
                    </div>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
            <br></br>
                <br></br> 
        </div>
    );
}

export default MenuPrincipal;