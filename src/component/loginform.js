import React,{useState, useEffect} from 'react';  
import './styles-login.css';
import Logo from '../resources/LogoGasPetromar.png';
import axios from '../axios';
import SideMenu from './SideMenu'; 
import Registro from '../Registro';
import BuscarServicio from '../BuscarServicio';
//import 'dotenv/config';   
import Modal from 'react-modal';
import FadeIn from 'react-fade-in';
import { ModalCarga } from "./ModalCarga"; 
import logoGlp from '../resources/logoGlp.png';
import { fadeIn } from 'react-animations'
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";  
import {ThreeDots } from  'react-loader-spinner'
import BuscarConsumidor from '../BuscarConsumidor';

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

const Login = (isLoggedIna) =>  { 
	
		
	const [isLoggedIn, setisLoggedIn] = useState(isLoggedIna);  
	const [pagarServicio, setPagarServicio] = useState(false);   
	const [registrarse, setRegistrarse] = useState(false);  
 


	window.event = new Event('event');

		window.addEventListener('event', function(info) {
			console.log("aaaaaaaaaaaaaaaaaaan" + info.detail.consumidor	);
			setNuevoTelefono(info.detail.telefono);
			setNuevoConsumidor(info.detail.consumidor);
			alert("a");
		}, false);
	


	const [nombres, setnombres] = useState("null");
	const [apellidos, setapellidos] = useState("null");
	const [correo, setCorreo] = useState("null");
	const [telefono, setTelefono] = useState("null");
	const [numero_consumidor, setnumero_consumidor] = useState("null");
	const [identificador_externo, setidentificador_externo] = useState("null");
	const [nuevoConsumidor, setNuevoConsumidor] = useState();
	const [nuevoTelefono, setNuevoTelefono] = useState();
 
	const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);


	const [buscarConsumidor, setBuscarConsumidor] = useState(false); 

	function handleKeyPress  (event) {
		if(event.key === 'Enter'){ 
			Login(event);
		}
	}
	useEffect(() => { 
			/*if (navigator.geolocation) {
			  navigator.geolocation.watchPosition(function(position) {
				console.log("Latitude is :", position.coords.latitude);
				console.log("Longitude is :", position.coords.longitude);
			  });
			} */ 
	},[])
  
	 
	function openModalLoad() { 
		setIsOpenLoad(true); 
	}  
	   
	function closeModalLoad() { 
		setIsOpenLoad(false); 
	}
	
	 
	 
	async function Login(e){  
		e.preventDefault();  
		
 
		document.body.style.zoom = "100%";
		var NoConsumidor = document.getElementById("form-usuario").value;
		var telefono = document.getElementById("form-password").value;  
		let fd = new FormData()   
		fd.append("id", "obtenerConsumidor")  
		fd.append("folioconsumidor", NoConsumidor)
		fd.append("telefono", telefono) 
		//setisLoggedIn(false);
		openModalLoad();
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
		closeModalLoad();
		console.log(res.data);
		if(res.data[0].telefono1 === telefono){
			if (window.Android)
		    window.Android.showToast(telefono, NoConsumidor);
			
			setnombres(res.data[0].nombres);
			setapellidos(res.data[0].apellidos);
			setCorreo(res.data[0].email);
			setTelefono(res.data[0].telefono1);
			setnumero_consumidor(res.data[0].numero_consumidor);
			setidentificador_externo(res.data[0].identificador_externo);
			
			setisLoggedIn(false); 

		} else {
			alert("Datos de acceso incorrectos");
		} 
		//console.log(res.data); 
	}
	function cambiarSelected(nuevoConsumidor1, telefononc){ 
          setRegistrarse(false); 
          setPagarServicio(false); 
		  setNuevoConsumidor(nuevoConsumidor1);
		  setNuevoTelefono(telefononc);
    }

	function hello() { 
		alert("hello world"); 
	}

	function cambiarSelected1(){  
		setPagarServicio(false);  
  }

  function cambiarSelected2(noConsumidor){  
	setBuscarConsumidor(false);  
	//document.getElementById("form-usuario").value = noConsumidor;
	setNuevoConsumidor(noConsumidor);
}

	

	 

    if(isLoggedIn){
		return( 
			<div style={{backgroundColor:'#0171CE', height:'100vmax'}}>
				{(registrarse) ?
				<div  class="divPrincipal" align="center" style={{ height: '100vh', width: '100vw', top: '0',  position: 'sticky', display: 'flex', overflowX: 'auto'}}>
					<Registro unmount={cambiarSelected}/>
							
				</div>
				
				:
				<> 
				{(pagarServicio) ? 
					<>
					<div  class="divPrincipal" align="center" style={{ height: '100vh', width: '100vw', top: '0',  position: 'sticky', display: 'flex', overflowX: 'auto'}}>
						<BuscarServicio unmount={cambiarSelected1}/>
					</div>
					</>
				:
					<>
					{(buscarConsumidor) ?
						<>
						<div  class="divPrincipal" align="center" style={{ height: '100vh', width: '100vw', top: '0',  position: 'sticky', display: 'flex', overflowX: 'auto'}}>
						<BuscarConsumidor unmount={cambiarSelected2}/>
					</div>
						</>
					:
						<>
							<div style={{width:'100%', display:'flex', flexDirection:'row', flexWrap:'wrap', backgroundColor:'#0158A0'}}> 
										<div style={{width:'100%' }} align="right">
											<button id="form-btn" className='buttonLogin' style={{margin:'5px', width: '80px', color:'white'}} onClick={() => setPagarServicio(true)}>PAGAR</button> 
											</div>
								 

								</div>
								<div id="body-content" style={{backgroundColor:'#0171CE', display:'flex', flexDirection:'column'}}>
								<div id="div-img" style={{ margin:'15px'}}>
								
								<img src={logoGlp} style={{width:'50%', height:'50%'}}></img>
								
								</div>  
								<FadeIn  >
								<div id="div-form">
								<div style={{width:'100%'}} align="center">
								<span style={{fontSize:'30px'}}>Bienvenido,  </span><br></br>
								<span style={{width:'100%'}}>Ingresa tus datos</span>
								</div>
								
									<span>Teléfono</span>
									<input id="form-password" onKeyPress={handleKeyPress} defaultValue={nuevoTelefono} type="tel" maxlength="10" style={{height:'30px'}}  placeholder="Teléfono"/>
									<span>No. Consumidor</span>
									<input id="form-usuario" onKeyPress={handleKeyPress} defaultValue={nuevoConsumidor} type="tel" style={{height:'30px'}} placeholder="Número Consumidor"/>
									
									<button id="form-btn" className='buttonLogin' style={{backgroundColor:'#0071ce', color:'white'}} onClick={(e) => Login(e)}>INICIAR SESIÓN</button> 
									<br></br>
									<div style={{width:'100%', height:'50px', justifyContent: 'space-between', columnGap:'0.875rem', display:'flex', flexDirection:'row'}} align="center"> 
										<div style={{width:'100%', display: 'flex', flexDirection:'column'}}>
											<label>¿Olvidaste el no. de consumidor?</label>
											<u><a  id="link"   onClick={() => setBuscarConsumidor(true)}>Buscar</a> </u>
									
										</div> 
									</div>
									 
									<div style={{width:'100%', height:'50px', justifyContent: 'space-between', columnGap:'0.875rem', display:'flex', flexDirection:'row'}} align="center"> 
										<div style={{width:'100%', display: 'flex', flexDirection:'column'}}>
											<label>¿No tienes cuenta?</label>
											<u><a  id="link"   onClick={() => setRegistrarse(true)}>REGISTRATE</a> </u>
									
										</div>
										<div style={{width:'100%', display: 'flex', flexDirection:'column'}}>
											<label>¿Necesitas ayuda?</label>
											<u><a id="link" href="tel:6699842020">LLÁMANOS <br></br>(669) 984-20-20</a></u>
											
										</div>
									</div>
									
								</div>
								</FadeIn>
								<ModalCarga modalIsOpenLoad={modalIsOpenLoad} closeModalLoad={closeModalLoad}/>
							</div>
						</>
					}
					
					</>
				}
				
				</>
				}
			</div>
				
		); 
	 
	}else {
		return (
			<div >
				<SideMenu correo={correo} telefono={telefono} nombres={nombres} apellidos={apellidos} numero_consumidor={numero_consumidor} identificador_externo={identificador_externo} selected='MenuPrincipal'   />
			
				 
			</div>
		);
	}
}

export  default Login;