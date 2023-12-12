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
import { fadeIn } from 'react-animations';
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";  
import {ThreeDots } from  'react-loader-spinner';
import BuscarConsumidor from '../BuscarConsumidor';
import LogoProp from '../resources/LogoProp.svg';
import LogoRomboGasLp from '../resources/LogoRomboGasLp.svg'
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";    
import descargarPlaystore from '../resources/descargarPlaystore.png';
import appgallery from '../resources/appGallery.svg';
import continuaenlaweb from '../resources/continuaenlaweb.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from 'semantic-ui-react';
import {BsWhatsapp } from "react-icons/bs";
import ReactWhatsappButton from 'react-whatsapp-button';
import SolicitudTanqueEstacionario from '../SolicitudTanqueEstacionario';


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

  const customStylesPolitica = { 	
    content: {
      width:'95%',
      height:'85%',
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
			
			if(info.detail.nombres != "" && info.detail.apellidos != ""  && info.detail.telefono != "" && info.detail.consumidor != "" && info.detail.identificador_externo != ""){
				console.log("nombre: " + info.detail.nombres);
				console.log("apellidos: " + info.detail.apellidos);
				console.log("email: " + info.detail.email);
				console.log("telefono: " + info.detail.telefono);
				console.log("consumidor: " + info.detail.consumidor);
				console.log("identificador: " + info.detail.identificador_externo); 
	
			setnombres(info.detail.nombres);
			setapellidos(info.detail.apellidos);
			setCorreo(info.detail.email);
			setTelefono(info.detail.telefono);
			setnumero_consumidor(info.detail.consumidor);
			setidentificador_externo(info.detail.identificador_externo);
			setisLoggedIn(false); 
			}else if (info.detail.telefono != "" && info.detail.consumidor){
				setNuevoTelefono(info.detail.telefono);
				setNuevoConsumidor(info.detail.consumidor);
			}


			//alert("a");
			//Login();
		//	document.getElementById("form-btn").click();
		}, false);
	


	const [nombres, setnombres] = useState("null");
	const [apellidos, setapellidos] = useState("null");
	const [correo, setCorreo] = useState("null");
	const [telefono, setTelefono] = useState("null");
	const [numero_consumidor, setnumero_consumidor] = useState("null");
	const [identificador_externo, setidentificador_externo] = useState("null");
	const [nuevoConsumidor, setNuevoConsumidor] = useState();
	const [nuevoTelefono, setNuevoTelefono] = useState("");
 
	const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);


	const [buscarConsumidor, setBuscarConsumidor] = useState(false); 
	const [TanqueEstacionario, setTanqueEstacionario] = useState(false); 

	const [modalIsOpenE, setIsOpenE] = React.useState(false);

    const [modalIsOpenPoliticaPrivacidad, setIsOpenPoliticaPrivacidad] = React.useState(false); 



	function openModalE() { 
        setIsOpenE(true); 
    }  
    
    function closeModalE() { 
        setIsOpenE(false); 
    }


	function handleKeyPress  (event) {
		if(event.key === 'Enter'){ 
			Login(event);
		}
	}
	useEffect(() => { 
		continuar();
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

	function continuar(){
		if(!window.Android){
			openModalE();
		}
	}
	
	function notify(message){
        toast(message);
    }
	 
	async function Login(e){  
		e.preventDefault();  
		
		if(document.getElementById("privacidad").checked == false){
			toast("Se requiere aceptar el aviso de privacidad para ingresar");
			return;
		  }
 
		document.body.style.zoom = "100%";
		var NoConsumidor = document.getElementById("form-usuario").value;
		var telefono = document.getElementById("form-password").value;  
		if(telefono == ""){
			notify("Ingrese su número de teléfono");
			return;
		}
		if(NoConsumidor == ""){
			notify("Ingrese su número de consumidor");
			return;
		}
		let fd = new FormData()   
		fd.append("id", "obtenerConsumidor")  
		fd.append("folioconsumidor", NoConsumidor)
		fd.append("telefono", telefono) 
		//setisLoggedIn(false);
		openModalLoad();
		const res = await axios.post(process.env.REACT_APP_API_URL, fd)
		.catch(function (error) {
			if (error.response) {  
			  notify("Error de conexión, vuelva a intentarlo");
			} else if (error.request) { 
			  notify("Error de conexión, vuelva a intentarlo");
			} else { 
			  notify("Error de conexión, vuelva a intentarlo");
			}
		//	console.log(error.config);
		  });
		closeModalLoad();
		console.log(res.data);
		if(res.data[0].telefono1 === telefono){
			if (window.Android){
		    window.Android.showToast(telefono, NoConsumidor, res.data[0].nombres, res.data[0].apellidos, res.data[0].email, res.data[0].identificador_externo, "1");
			}
			try {
				//var my_json = {tel: telefono, noconsumidor: NoConsumidor};
				//var jsonStr = '{"datos":[{"telefono":"'+telefono+'","noConsumidor":"'+NoConsumidor+'"},{"nombres":"'+res.data[0].nombres+'","apellidos":"'+res.data[0].apellidos+'"},{"email":"'+res.data[0].email+'","identificador_externo":"'+res.data[0].identificador_externo+'"},{"loggeado":"1"}]}';
				//var obj = JSON.parse(jsonStr);

				var jsonStr = '{"telefono":"'+telefono+'","noConsumidor":"'+NoConsumidor+'","nombres":"'+res.data[0].nombres+'","apellidos":"'+res.data[0].apellidos+'","email":"'+res.data[0].email+'","identificador_externo":"'+res.data[0].identificador_externo+'","loggeado":"1", "tipo":"1"}';

				window.webkit.messageHandlers.callbackHandler.postMessage(jsonStr);
				window.webkit.messageHandlers.callbackHandlerNoConsumidor.postMessage(NoConsumidor);
				window.webkit.messageHandlers.callbackHandlerNombres.postMessage(res.data[0].nombres);
				window.webkit.messageHandlers.callbackHandlerApellidos.postMessage(res.data[0].apellidos);
				window.webkit.messageHandlers.callbackHandlerEmail.postMessage(res.data[0].email);
				window.webkit.messageHandlers.callbackHandlerIdentificadorExterno.postMessage(res.data[0].identificador_externo);
				window.webkit.messageHandlers.tipo.postMessage("");
			} catch (error) {
				
			}
			 
			
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
	console.log("----tele "+telefononc);
	console.log("----nocon "+nuevoConsumidor1);

    }

	function hello() { 
		alert("hello world"); 
	}

	function cambiarSelected1(){  
		setPagarServicio(false);  
  	}

  function cambiarSelected2(telefono, noConsumidor){  
	setBuscarConsumidor(false);  
	//document.getElementById("form-usuario").value = noConsumidor;
	setNuevoTelefono(telefono);
	setNuevoConsumidor(noConsumidor);
	console.log("----nocon "+noConsumidor);
}
function cambiarSelected4(){  
	setTanqueEstacionario(false);   
}
function cambiarSelected3(telefono, noConsumidor){  
	setRegistrarse(false);  
	//document.getElementById("form-usuario").value = noConsumidor;
	setNuevoTelefono(telefono);
	setNuevoConsumidor(noConsumidor);
	console.log("----nocon "+noConsumidor);
}

function openPoliticaPrivacidad(e) { 
	e.preventDefault();
	setIsOpenPoliticaPrivacidad(true);
  }

  function noAcepto() { 
	document.getElementById("privacidad").checked = false; 
	setIsOpenPoliticaPrivacidad(false); 
  }

  function closeModalPoliticaPrivacidad() {  
	setIsOpenPoliticaPrivacidad(false); 
  }

  function Privacidad(){
       
	document.getElementById('privacidad').checked = true;
	 
	closeModalPoliticaPrivacidad();
  }

  function test1(x){
	setNuevoConsumidor(x);

  }

  window.reactFunction1 = (defTelefono, defConsumidor, defNombres, defApellidos, defEmail, defIdentificador_externo) => {
    		setnombres(defNombres);
			setapellidos(defApellidos);
			setCorreo(defEmail);
			setTelefono(defTelefono);
			setnumero_consumidor(defConsumidor);
			setidentificador_externo(defIdentificador_externo);
			setisLoggedIn(false); 
			 
			setNuevoTelefono(defTelefono);
			setNuevoConsumidor(defConsumidor);
			 
  }
  
  
  function test(){
	window.webkit.messageHandlers.instagram.postMessage("asdfgbnm");
  }

    if(isLoggedIn){
		return( 
			<div style={{backgroundColor:'#0171CE', height:'100vmax'}}>
 			 <script
          dangerouslySetInnerHTML={{ __html:
            'function test1(){setNuevoConsumidor(hola);}'
          }}
        />
 
				{(registrarse) ?
						<div  class="divPrincipal" align="center" style={{ height: '100vh', width: '100vw', top: '0',  position: 'sticky', display: 'flex', overflowX: 'auto'}}>
							<Registro unmount={cambiarSelected} unmount1={cambiarSelected3}/> 
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
									{(TanqueEstacionario) ?
										<>
										<div  class="divPrincipal" align="center" style={{ height: '100vh', width: '100vw', top: '0',  position: 'sticky', display: 'flex', overflowX: 'auto'}}>
										<SolicitudTanqueEstacionario unmount={cambiarSelected4}/>
									</div>
										</>
									:
								
								<> 
									<div  style={{width:'100%', display:'flex', flexDirection:'row', flexWrap:'wrap', backgroundColor:'#0158A0'}}> 
												<div style={{width:'100%' }} align="right">
													<button hidden id="form-btn-pagar" className='buttonLogin' style={{margin:'5px', width: '80px', color:'white'}} onClick={() => setPagarServicio(true)}>PAGAR</button> 
													</div>
										

										</div>
										<div id="body-content" style={{height:'100vh', width: '100vw', top: '0',  position: 'sticky', backgroundColor:'#0171CE', display:'flex', flexDirection:'column'}}>
										
										<div id="div-form" style={{backgroundColor:'#0171CE'}} >
										<div align="center"> 
												<img src={LogoRomboGasLp} style={{width:'250px', height:'250px'}}></img>
										</div>
										
											<FadeIn  >
										<div style={{width:'100%'}} align="center">
										<span style={{fontSize:'30px'}}>Bienvenido,  </span><br></br>
										<span style={{width:'100%'}}>Ingresa tus datos</span>
										</div>
											
											
											<div style={{width:'100%'}} align="center">
													<div style={{width:'80%'}} align="left">
											<span>Teléfono</span><br></br>
											</div>
											<Input type="tel"
														icon={{ name: 'call',   link: false }}
														placeholder='Teléfono'
														id="form-password"
														style={{width:'80%'}}
														onKeyPress={handleKeyPress}
														defaultValue={nuevoTelefono}  
														maxlength="10"
													/>
											{/* <input id="form-password" onKeyPress={handleKeyPress} defaultValue={nuevoTelefono} type="tel" maxlength="10" style={{height:'30px', width:'80%'}}  placeholder="Teléfono"/>*/}
											</div>
											<div style={{width:'100%'}} align="center">
											<div style={{width:'80%'}} align="left">
											<span>No. Consumidor</span>
											</div>
											<Input type="tel"
														icon={{ name: 'hashtag',   link: false }}
														placeholder='Número Consumidor'
														id="form-usuario"
														style={{width:'80%'}}
														onKeyPress={handleKeyPress}
														defaultValue={nuevoConsumidor}  
														maxlength="6"
													/>
											{/* <input id="form-usuario" onKeyPress={handleKeyPress} defaultValue={nuevoConsumidor} type="tel" style={{height:'30px', width:'80%'}} placeholder="Número Consumidor"/>*/}
											</div>
											<div style={{width:'100%', height:'45px'}} align="center">
											<label style={{color:'white', fontWeight: 'bold', fontSize:'20px'}}>
												<input style={{marginRight: '15px', height:'15px', width:'15px'}}  type="checkbox" id="privacidad" onClick={(e) => openPoliticaPrivacidad(e)} />
												He leído y estoy de acuerdo con la política de privacidad
											</label>

											</div>
											<div style={{width:'100%', height:'50px'}} align="center"> 
												
												<button id="form-btn" className='buttonLogin' style={{backgroundColor:'#0071ce', color:'white'}} onClick={(e) => Login(e)}>INICIAR SESIÓN</button> 
												
											</div>
											
											<br></br>
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
													<u><a id="link" href="tel:+526699842020">LLÁMANOS <br></br>(669) 984-20-20</a></u>
													
												</div>
												<br></br>
											<br></br>
											<br></br>
											<br></br>	
											</div>

											<div style={{width:'100%', height:'50px' }} align="center">
											<button hidden id="testbtn" onClick={()=>test()}>test</button> 
												<button id="form-btn" className='buttonLogin' style={{backgroundColor:'#0071ce', color:'white', fontSize:'12px'}} onClick={() => setTanqueEstacionario(true)}>SOLICITA TU TANQUE ESTACIONARIO AQUÍ</button> 
											</div>

											</FadeIn> 
											<br></br>
											<br></br> 
											<br></br>
											<br></br> 
											<br></br>
											<br></br> 
											
											<ReactWhatsappButton
											animated
											message="Hola!, Buen día"
											countryCode="52"
											phoneNumber="6699933030"
											style={{
												bottom: '5px',
												left: '10px',
												right: 'unset'
											}}
											/>
										</div>
										
										<ModalCarga modalIsOpenLoad={modalIsOpenLoad} closeModalLoad={closeModalLoad}/>
										<FadeIn  >
										<Modal 
												isOpen={modalIsOpenE}  
												onRequestClose={closeModalE}   
												style={customStyles}> 
												<div style={{width:'100%'}} align="center">  
												
												<label style={{fontWeight:'bold'}}>Descarga nuestra app</label>
												<br></br>
												<a title="Descargar en Google Play PetromarGas" href="https://play.google.com/store/apps/details?id=com.petromar.gaspetro"> <img style={{width:'80%', paddingTop:'25px'}} src={descargarPlaystore}  ></img> </a>
												<br></br>
												<a title="Exploralo en AppGallery PetromarGas" href="https://appgallery.huawei.com/app/C108121215"> <img style={{width:'80%', paddingTop:'25px'}} src={appgallery}></img></a>
												<br></br> 
												<img style={{width:'80%', paddingTop:'25px'}} onClick={closeModalE} src={continuaenlaweb}></img> 
												<button hidden style={{fontWeight:'bold', width:'80%', color:'white', backgroundColor:'#008445'}} className="button" onClick={closeModalE}>CONTINUAR EN LA WEB</button>
												</div>  
										</Modal>
										</FadeIn>
										<Modal 
												isOpen={modalIsOpenPoliticaPrivacidad}
												onRequestClose={closeModalPoliticaPrivacidad}   
												style={customStylesPolitica}> 
												<div style={{width:'100%',  fontSize:'15px', display:'flex', flexDirection:'row'}} align="center">
													<div styley={{width:'70%', overflowY:'scroll'}}>
												
														<h3>AVISO DE PRIVACIDAD</h3>
														<h4 align="left"> La identidad y domicilio del responsable </h4>
														<p style={{padding: '5px'}} align="justify">
														GAS UNION DE AMÉRICA, S.A. DE C.V. PETROMAR GAS, con domicilio en
														Plaza Santa Fe, Avenida Camarón Sábalo Número 102, local 7, Colonia Lomas
														de Mazatlán, código postal 82110, en Mazatlán, Sinaloa, es el responsable del
														tratamiento de los datos personales que nos proporcione, los cuales serán
														protegidos conforme a lo dispuesto por la Ley General de Protección de Datos
														Personales en Posesión de los Particulares y demás normatividad que resulte
														aplicable.
														</p>
														<h4 align="left">Las finalidades del tratamiento de datos</h4> 
														<p style={{padding: '5px'}} align="justify">
														Los datos personales que recabemos serán utilizados con la finalidad de
														prestarle el servicio de suministro gas licuado de petróleo, así como servicios
														relacionados.
														</p>
														<p style={{padding: '2px'}} align="justify">
														Para las finalidades antes señaladas se podrán solicitar de manera enunciativa
														los siguientes datos personales: nombre completo, domicilio, RFC, usuario,
														contraseña, correo electrónico, información societaria, datos de los
														representantes o apoderados legales, datos bancarios e información comercial
														y financiera diversa indispensable para otorgar el servicio que se solicite.
														Todos los Datos Personales proporcionados a PETROMAR GAS, serán
														considerados como información confidencial, obligación que subsistirá a pesar
														de que el titular de dicha información haya finalizado su relación con la
														sociedad. Asimismo, dichos Datos Personales no serán divulgados a terceras
														personas sin la autorización de su titular.
														</p>
														<p style={{padding: '2px'}} align="justify">
														Se informa que no se recabarán datos personales sensibles.
														Las opciones para limitar el uso o divulgación de los datos
														De igual forma, y sólo en caso de que el usuario lo autorice, los datos de
														contacto proporcionados se utilizarán para enviar por correo electrónico,
														teléfono celular, entre otros.
														</p>
														<p style={{padding: '2px'}} align="justify">
														Los medios para ejercer los derechos ARCO.
														El titular por sí o mediante representante legal debidamente acreditado, podrá
														ejercer sus derechos ARCO (acceso, rectificación, cancelación y oposición)
														sobre sus datos personales, así como de oponerse al tratamiento de los
														mismos o revocar el consentimiento que para tal fin nos haya otorgado,
														presentando su solicitud a través de escrito dirigido a GAS UNIÓN DE
														AMÉRICA, S.A. DE C.V., a la siguiente dirección de correo electrónico:
														franciscopina@grupopetromar.com.
														</p>
														<p style={{padding: '5px'}} align="justify">
														Transferencia de datos personales
														Se informa que no se realizarán transferencias de datos personales, salvo
														aquéllas que están establecidas en ley o sean necesarias para atender
														requerimientos de información de una autoridad competente.
														</p>
														<p style={{padding: '5px'}} align="justify">
														<h4 align="left">Cambios al aviso de privacidad</h4>
														PETROMAR GAS se reserva el derecho de enmendar o modificar el presente
														Aviso de Privacidad como estime conveniente, por ejemplo, para cumplir con
														cambios a la legislación sobre protección de datos o para efecto de cumplir
														con las disposiciones internas, en dado caso, se le informará y pondrá a su
														disposición el Aviso de Privacidad actualizado cuando se le hagan cambios
														significativos al mismo, así como cuando se requiera recabar su
														consentimiento.
														</p>
														<br></br>
														Fecha última actualización 22 de marzo de 2023 
														<br></br>
														<br></br>
														<div style={{justifyContent: 'space-between', columnGap:'0.875rem', width:'100%', display:'flex', flexDirection:'row'}}> 
														<div style={{width:'50%'}} align="center"> 
														<button className="buttonVerde" style={{width:'100%', fontWeight: 'bold'}} onClick={() => { noAcepto();}}>No acepto</button>
														</div>
														<div style={{width:'50%'}} align="center"> 
															<button type='submit'  onClick={() => Privacidad()} className='button' style={{ fontWeight: 'bold', width:'100%'}}>Acepto</button>
															</div>
														</div>  
													</div>
													
													</div>  
											</Modal>

										<ToastContainer 
											progressClassName="toastProgress"
											position="top-center"
											/>
									</div>
								</>
							}
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