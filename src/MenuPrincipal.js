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
import nuevopedido from './resources/truck.svg'
import FadeIn from 'react-fade-in'
import nivelgaslp from './resources/nivel_gas_lp.svg'
import GaugeChart from 'react-gauge-chart' 
import historialpedidos from './resources/historialpedidos.svg'
import { ModalCarga } from "./component/ModalCarga";
const customStylesD = { 	
	content: {
        width:'30%',
	  top: '50%',
	  left: '50%',
	  right: 'auto',
	  bottom: 'auto',
	  marginRight: '-50%',
	  transform: 'translate(-50%, -50%)',
	},
  };

  const customStyles = { 	
	content: {
	  top: '50%',
	  left: '50%',
	  right: 'auto',
	  bottom: 'auto',
	  marginRight: '-50%',
	  transform: 'translate(-50%, -50%)',
	},
  };
function MenuPrincipal(props){
	useEffect(() => {
        ObtenerPrecio();
        obtenerSaldo();
	},[])


	function openModalLoad() { 
		setIsOpenLoad(true); 
	}  
	   
	function closeModalLoad() { 
		setIsOpenLoad(false); 
	}
	const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);
//////////////////////////////////////////////////
    const [ValorTanque, setValorTanque] = useState();
    const [ValorTanqueNull, setValorTanqueNull] = useState();

////////////////////////////////////////////////// 
    const[passActual, setPassActual] = useState();
    const[passNueva, setPassNueva] = useState();
    const[confirmarPass, setConfirmarPass] = useState();
//////////////////////////////////////////////////
    const[Nombre, setNombre] = useState(); 
    const[PrecioGas, setPrecioGas] = useState(); 
    const[SaldoDisponible, setSaldo] = useState(); 

//////////////////////////////////////////////////
    const [modalIsOpenE, setIsOpenE] = React.useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModalE() { 
        setIsOpenE(true); 
    }  
    
    function closeModalE() { 
        setIsOpenE(false); 
    }

    function openModal() { 
		setIsOpen(true); 
	}  
	   
     
    const[Mensaje, setMensaje] = useState(); 
    const[MensajeError, setMensajeError] = useState(); 	  

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

    async function obtenerSaldo(){    
		let fd = new FormData()    
        fd.append("id", "obtenerSaldo")   
        fd.append("noConsumidor", props.identificador_externo)   
		const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
		 //alert(res.trim);
         console.log(res.data);
        setSaldo(res.data); 
        props.saldoCliente(res.data);
        //document.getElementById("precioGas").innerHTML =  "$" +json["productos"]["GAS"].precio;
		//console.log(res.data); 
	}
    function FormatNumber(importe){
        
        return ((Number(importe)).toLocaleString('en-US',{
            style:'currency',
            currency:'USD',
        }));


       }
    async function ObtenerPorcentaje(){  
          
      
            let fd = new FormData()   
            fd.append("id", "obtenerPorcentaje") 
            fd.append("noConsumidor", props.identificador_externo)   
            openModalLoad();
            const res = await axios.post("https://monitoreogas.grupopetromar.com/apirest/index.php", fd);
            closeModalLoad();
            console.log(res.data);
            if(res.data == null){
                setMensaje("No está instalado el dispositivo en su tanque estacionario");
                 setValorTanque(0);
                openModalE();
            }else{
                var json = JSON.parse(JSON.stringify(res.data));
                var valor = json.dispositivos[0].porcentaje;
                //   console.log();
                   //setMensaje(json.dispositivos[0].porcentaje + " %");
                   openModalE();
                    
                   setValorTanque(valor / 100);
                   ValorTanque(setValorTanque);
            }
            
            //console.log(res.data); 
        
	}


    function Seleccionar(elemento){  
        props.unmount(elemento);   
    }

 
    function logOut() {
        window.location.reload();
    }

   
    return(
       
        <div className='containerMenuPrincipal' style={{margin: 'auto', width:'100%', height: '100vh', overflowX: 'scroll'}} align="center"> 
           <FadeIn>
            <div style={{width:'100%', display:'flex', flexDirection:'row', flexWrap:'wrap', backgroundColor:'#0158A0'}}> 
                <div style={{width:'50%', color:'white', fontWeight: 'bold', fontSize:'20px'}} align="left"> <h4 style={{margin: '20px'}}>Bienvenido (a): {props.nombres +" "+ props.apellidos}</h4> </div>
                 <div style={{width:'50%' }} align="right">  <button className="buttonSalir" onClick={() => {logOut()}} >SALIR</button > </div>
           </div>
         
           <div style={{width:'100%', color:'white', fontWeight: 'bold', fontSize:'15px'}} align="left" onClick={() => Seleccionar("DetalleSaldo")} saldo={SaldoDisponible}> <h4 style={{margin: '20px'}}>Saldo Disponible: {FormatNumber(SaldoDisponible)}</h4> </div> 
           </FadeIn> 
            <div style={{width:'80%'}} align="center"> 
           <FadeIn>  <img src={logoGlp} style={{width:'50%', height:'50%'}}></img>
           </FadeIn>
            <br></br>
            <br></br>
            <div style={{boxShadow: 'rgb(0 0 0 / 45%) 0px 5px 15px',backgroundColor:'white', borderRadius:'5px'}} onClick={() => { Seleccionar("NuevoPedido");}} >
            <img src={nuevopedido} style={{ margin: '5px',width:'60%', height:'60%'}}></img>
            <br></br>
            <label style={{fontWeight: 'bold'}}>NUEVO PEDIDO</label>
            <br></br>
            <br></br>
            </div><br></br>
                <div style={{justifyContent: 'space-between', columnGap:'0.875rem', borderRadius:'5px', width:'100%', display:'flex', flexDirection:'row'}}> 
                    <div style={{boxShadow: 'rgb(0 0 0 / 45%) 0px 5px 15px', width:'50%', backgroundColor:'white', borderRadius:'5px'}} align="center" onClick={() => { Seleccionar("Usuario");}}> 
                    <img src={usericon} style={{width:'100%'}}></img>
                    <br></br>
                    <label style={{fontWeight: 'bold'}}>USUARIO</label>
                    <br></br>
                    <br></br></div>
                    <div style={{boxShadow: 'rgb(0 0 0 / 45%) 0px 5px 15px',width:'50%', backgroundColor:'white', borderRadius:'5px'}} align="center" onClick={() => { Seleccionar("Novedades");}}> 
                    <img src={novedades} style={{width:'100%'}}></img>
                    <br></br>
                    <label style={{fontWeight: 'bold'}}>PROMOCIONES</label>
                    <br></br>
                    <br></br>
                    </div>
                </div>
                <br></br>
                <div style={{justifyContent: 'space-between', columnGap:'0.875rem', height: '111px', borderRadius:'5px', width:'100%', display:'flex', flexDirection:'row'}}> 
                    <div style={{boxShadow: 'rgb(0 0 0 / 45%) 0px 5px 15px',width:'50%',  height:'100%', backgroundColor:'white', borderRadius:'5px'}} align="center" onClick={() => { Seleccionar("Historial");}}> 
                    <img src={historialpedidos} style={{width:'50%'}}></img>
                    <br></br>
                    <label style={{ fontWeight:'bold'}}>Historial</label>
                    <br></br>
                    <br></br></div>
                    <div style={{boxShadow: 'rgb(0 0 0 / 45%) 0px 5px 15px', width:'50%', height:'100%', backgroundColor:'white', borderRadius:'5px'}} align="center"> 
                     <div style={{width:'100%', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', height:'30%', backgroundImage:'linear-gradient(#145e9c, #145e9c)'}}>
                        <label style={{color:'white' , fontSize:'25px'}}>Precio Gas</label>
                     
                     </div>
                     <div style={{width:'100%', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', height:'70%', backgroundImage:'linear-gradient(#115680, #2590d1)'}}>
                     <label id='precioGas' style={{color:'white', fontSize:'40px'}}>${PrecioGas}</label>
                        
                     </div> 
                    </div> 
                 
                </div>
                <br></br>
                    <div style={{boxShadow: 'rgb(0 0 0 / 45%) 0px 5px 15px',backgroundColor:'white', borderRadius:'5px'}} onClick={() => ObtenerPorcentaje()} >
                    <img src={nivelgaslp} style={{width:'25%', height:'25%'}}></img>
                    <br></br>
                    <label style={{fontWeight: 'bold'}}>Nivel de Gas Lp</label>
                    <br></br>
                    <br></br>
                    </div>
                <br></br>
                <br></br>
                <br></br>
            </div>
            <br></br>
                <br></br> 

                <Modal 
						isOpen={modalIsOpenE}  
						onRequestClose={closeModalE}   
						style={customStylesD}> 
						<div style={{width:'100%'}} align="center">  
                        <GaugeChart id="gauge-chart2" 
                        nrOfLevels={20} 
                        textColor={'black'}
                        colors={['#D02030', '#EFFA0B', '#008445']}
                         
                        percent={ValorTanque} 
                        />
                         <label style={{fontWeight:'bold'}}>Nivel de Gas LP</label><br></br> 
                          <br></br>
                           
                         <button style={{width:'100%', color:'white', backgroundColor:'#008445'}} className="buttonLogin" onClick={closeModalE}>Ok</button>
						</div>  
				</Modal>


                <ModalCarga modalIsOpenLoad={modalIsOpenLoad} closeModalLoad={closeModalLoad}/>
              
        </div>
       
    );
}

export default MenuPrincipal;