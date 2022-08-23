import React,{useState, useEffect} from 'react';  
import './styles-login.css';
import Logo from '../resources/LogoGasPetromar.png';
import axios from '../axios';
import SideMenu from './SideMenu'; 
import Registro from '../Registro';
//import 'dotenv/config';   
import Modal from 'react-modal';

//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";  
import {ThreeDots } from  'react-loader-spinner'

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
	const [registrarse, setRegistrarse] = useState(false);  


	const [nombres, setnombres] = useState("null");
	const [apellidos, setapellidos] = useState("null");
	const [numero_consumidor, setnumero_consumidor] = useState("null");
	const [identificador_externo, setidentificador_externo] = useState("null");
	const [nuevoConsumidor, setNuevoConsumidor] = useState();
	const [nuevoTelefono, setNuevoTelefono] = useState();
 
	const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);

	function handleKeyPress  (event) {
		if(event.key === 'Enter'){ 
			Login(event);
		}
	}
	useEffect(() => {
          
	},[])
  

	function openModalLoad() { 
		setIsOpenLoad(true); 
	}  
	   
	function closeModalLoad() { 
		setIsOpenLoad(false); 
	}
	
	 
	 
	async function Login(e){  
		e.preventDefault();  
	 
		var NoConsumidor = document.getElementById("form-usuario").value;
		var telefono = document.getElementById("form-password").value;  
		let fd = new FormData()   
		fd.append("id", "obtenerConsumidor")  
		fd.append("folioconsumidor", NoConsumidor)
		fd.append("telefono", telefono) 
		//setisLoggedIn(false);
		openModalLoad();
		const res = await axios.post("https://gaspetromarapp.grupopetromar.com/gasunionapi.php", fd);
		closeModalLoad();
		console.log(res.data);
		if(res.data[0].telefono1 === telefono){
			
	 
			setnombres(res.data[0].nombres);
			setapellidos(res.data[0].apellidos);
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
		  setNuevoConsumidor(nuevoConsumidor1);
		  setNuevoTelefono(telefononc);
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
				<div id="body-content" style={{backgroundColor:'#0171CE', display:'flex', flexDirection:'column'}}>
					<div id="div-img" style={{height:'30%', width:'100%'}}>
						<img alt="Logo GasPetromar" src={Logo} style={{maxWidth:'100%', maxHeight:'80%'}}></img>
						
					</div>  
					<div id="div-form">
					<h1>Bienvenido, <br></br>
					<span>Ingresa tus datos</span></h1>
						<span>Teléfono</span>
						<input id="form-password" onKeyPress={handleKeyPress} defaultValue={nuevoTelefono} type="tel" maxlength="10" style={{height:'30px'}}  placeholder="Teléfono"/>
						<span>No. Consumidor</span>
						<input id="form-usuario" onKeyPress={handleKeyPress} defaultValue={nuevoConsumidor} type="tel" style={{height:'30px'}} placeholder="Número Consumidor"/>
						
						<button id="form-btn" className='buttonLogin' style={{backgroundColor:'#0071ce', color:'white'}} onClick={(e) => Login(e)}>INICIAR SESIÓN</button> 
						<br></br>
						<div style={{width:'100%', height:'100px', justifyContent: 'space-between', columnGap:'0.875rem', display:'flex', flexDirection:'row'}} align="center"> 
                     		<div style={{width:'100%', display: 'flex', flexDirection:'column'}}>
					 			<label>¿No tienes cuenta?</label>
								<u><a  id="link"   onClick={() => setRegistrarse(true)}>REGISTRATE</a> </u>
						
                     		</div>
							 <div style={{width:'100%', display: 'flex', flexDirection:'column'}}>
					 			<label>¿Necesitas ayuda?</label>
								 <a id="link" href="tel:6699842020">LLÁMANOS (669) 984-20-20</a>
								 
                     		</div>
                    	</div>
					</div>
					<Modal 
						isOpen={modalIsOpenLoad}  
						onRequestClose={closeModalLoad}   
						style={customStyles}> 
						<div style={{width:'100%'}}>  
						<ThreeDots color="#0071ce" height={80} width={80} /> 
						</div>  
				</Modal>
				</div>
				</>
				}
			</div>
				
		); 
	 
	}else {
		return (
			<div >
				<SideMenu nombres={nombres} apellidos={apellidos} numero_consumidor={numero_consumidor} identificador_externo={identificador_externo} selected='MenuPrincipal'   />
			
				 
			</div>
		);
	}
}

export  default Login;