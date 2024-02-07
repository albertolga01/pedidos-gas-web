import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'; 
import Modal from 'react-modal';
import FadeIn from 'react-fade-in';
import {Navbar} from './component/Navbar';  

import {Gmaps, Marker, Circle} from 'react-gmaps';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ErrorImg from './resources/error.svg'

import { ModalCarga } from "./component/ModalCarga";
import { Input } from 'semantic-ui-react' 
import LogoRomboGasLp from '../src/resources/LogoRomboGasLp.svg'



const customStylesPolitica = { 	
    content: {
      width:'85%',
      height:'40%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)', 
    },
    };

    const customStylesEliminarCuenta = { 	
        content: {
          width:'75%',
          height:'80%',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)', 
        },
        };

const customStylesD = { 	
	content: {
      width:'80%',
	  top: '50%',
	  left: '50%',
	  right: 'auto',
	  bottom: 'auto',
	  marginRight: '-50%',
	  transform: 'translate(-50%, -50%)',
	},
  };

function Usuario(props){
 

    function notify(message){
        toast(message);
    }
//////////////////////////////////////////////////
    const[Nombre, setNombre] = useState();
    const[Apellido, setApellido] = useState();
    const[TelefonoUno, setTelUno] = useState();
    const[TelefonoDos, setTelDos] = useState();
    const[Descripcion, setDescripcion] = useState();
    const[Comentarios, setComentarios] = useState();
    const[CalleNumero, setCalleNumero] = useState();
    const[Colonia, setColonia] = useState();
    const[Ciudad, setCiudad] = useState();
    const[CodigoPostal, setCodigoPostal] = useState();
    const[Email, setEmail] = useState();
    const[lat, setLat] = useState();
    const[lat1, setLat1] = useState();
    const[long, setLong] = useState();
    const[long1, setLong1] = useState();

    const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);
    const [modalIsOpenError, setIsOpenLoadError] = React.useState(false);

    const [modalIsOpenPoliticaPrivacidad, setIsOpenPoliticaPrivacidad] = React.useState(false); 
    const [modalIsOpenEliminarCuenta, setIsOpenEliminarCuenta] = React.useState(false); 


   
	useEffect(() => {
        obtenerConsumidor();
	},[])
  
    function openModalLoad() { 
		setIsOpenLoad(true); 
	}  
	   
	function closeModalLoad() { 
		setIsOpenLoad(false); 
	}


    function openModalLoadError() { 
		setIsOpenLoadError(true); 
	}  
	   
	function closeModalLoadError() { 
		setIsOpenLoadError(false); 
	}

    function getDecimalPart(num) {
        if (Number.isInteger(num)) {
          return 0;
        }
      
        const decimalStr = num.toString().split('.')[1];
        return Number(decimalStr);
      }

    function Seleccionar(){  
        props.unmount("MenuPrincipal");   
    }

    async function obtenerConsumidor(){    
		let fd = new FormData()   
		fd.append("id", "obtenerConsumidor")  
		fd.append("folioconsumidor", props.numero_consumidor) 
		//setisLoggedIn(false);
        openModalLoad();
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
        closeModalLoad();
		console.log(res.data);
        setNombre(res.data[0].nombres);
        setApellido(res.data[0].apellidos);
        setTelUno(res.data[0].telefono1);
        if(res.data[0].telefono2 != "null"){
            setTelDos(res.data[0].telefono2);
        }
        setDescripcion(res.data[0].descripcion);
        setComentarios(res.data[0].comentario);
        setCalleNumero(res.data[0].calle_numero);
        setColonia(res.data[0].colonia);
        setCiudad(res.data[0].ciudad);
		setCodigoPostal(res.data[0].codigo_postal);
        setEmail(res.data[0].email);
       
        setLat1(res.data[0]["posicion_gps"].latitud_grados_decimales);
        setLong1(res.data[0]["posicion_gps"].longitud_grados_decimales);
 
	}

   

    async function ActualizarConsumidor(){    
        var valido = Validador(Nombre, Apellido, TelefonoUno, CalleNumero); 
        if(valido == true){
		let fd = new FormData()   
		fd.append("id", "altaConsumidor")  
		fd.append("noConsumidor", props.numero_consumidor) 
		fd.append("nombres", Nombre) 
		fd.append("apellidos", Apellido) 
		fd.append("telefono1", TelefonoUno) 
		fd.append("telefono2", TelefonoDos) 
		fd.append("descripcion", Descripcion)  
		fd.append("comentario", Comentarios)
		fd.append("calle_numero", CalleNumero)
		fd.append("colonia", Colonia) 
		fd.append("ciudad", Ciudad)
		fd.append("codigo_postal", CodigoPostal)
        fd.append("c_latitud", lat1)
        fd.append("c_longitud", long1)
 
        openModalLoad();
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
        closeModalLoad();
		console.log(res.data); 
        notify("Actualizado correctamente");

        }else{
            openModalLoadError();
        }
	}


    const coords = { 
        lat: 23.235668,
        lng: -106.423103
      };
       
      const params = {v: '3.exp', key: 'AIzaSyCbZpk2TtvK4RmixX7_WM-QNWxT8sU9Ld4', querystring: false};
      function getDecimalPart(num) {
        if (Number.isInteger(num)) {
          return 0;
        }
      
        const decimalStr = num.toString().split('.')[1];
        return Number(decimalStr);
      }
      function Validador(NombreV, ApellidoV,Tel1V, CalleNumV){
      
        if(NombreV == "" || NombreV == null ){
           return false;
        } else if (ApellidoV == "" || ApellidoV == null){
           return false;
        } else if (Tel1V == "" || Tel1V == null){
           return false;
        } else if (CalleNumV == "" || CalleNumV == null){
           return false;
        }  else {
           return true;
        }
       
   }


   async function eliminarCuenta(){
    let fd = new FormData()   
    fd.append("id", "bajaConsumidor")  
    fd.append("noConsumidor", props.numero_consumidor)  
    openModalLoad();
    const res = await axios.post(process.env.REACT_APP_API_URL, fd);
    closeModalLoad();
    if ( res.data == '1'){

        notify("Eliminado correctamente"); 
        if (window.Android){
            window.Android.showToast("", "", "", "", "", "", "0");
           
        }else{
            window.location.reload();
        }
    }else{

        notify("No se pudo eliminar usuario"); 
    } 

    closeModalEliminarCuenta();
   }

   function closeModalEliminarCuenta() {  
	setIsOpenEliminarCuenta(false); 
    closeModalPoliticaPrivacidad();
  }

  function openEliminarCuenta( ) {  
	setIsOpenEliminarCuenta(true);
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


    return(
        <div style={{width:'100%'}}>
             <Navbar titulo="Usuario" cambiarSelected={props.unmount} />
        <div   style={{margin: 'auto', width:'80%', height: '100vh'}} align="center"> 
 <FadeIn>

            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }} align="center">
           
            <br></br>
                <br></br>
                
                    <label class="idLabel">Nombre (s)*</label>
                    <Input type="text" 
												placeholder='Nombre'
												id="form-usuario"
												style={{width:'100%'}}
                                                defaultValue={Nombre}
                                                onChange={e => setNombre(e.target.value)}
											/>
                   
                    <label class="idLabel">Apellido (s)*</label>
                    <Input type="text" 
												placeholder='Apellido'
												id="form-usuario"
												style={{width:'100%'}}
                                                defaultValue={Apellido}
                                                onChange={e => setApellido(e.target.value)}
											/>
                    
                    <div style={{display:'flex',flexDirection:'row', justifyContent:'spaceBetween', gap:'6%' }}>
                         <div style={{display:'flex',flexDirection:'column', width:'47%' }}>
                            <label class="idLabel">Telefono1*</label>
                            <Input type="tel" 
												placeholder='Teléfono uno'
												id="form-usuario"
												style={{width:'100%'}}
                                                defaultValue={TelefonoUno}
                                                onChange={e => setTelUno(e.target.value)}
											/>
                 
                        </div>
                         <div style={{display:'flex',flexDirection:'column', width:'47%' }}>
                            <label class="idLabel">Telefono2*</label>
                            <Input type="tel" 
												placeholder='Teléfono dos'
												id="form-usuario"
												style={{width:'100%'}}
                                                defaultValue={TelefonoDos}
                                                onChange={e => setTelDos(e.target.value)}
											/>
                            
                            </div>
                    </div> 
                    <div style={{display:'flex',flexDirection:'row', justifyContent:'spaceBetween', gap:'6%' }}>
                         <div style={{display:'flex',flexDirection:'column', width:'47%' }}>
                            <label class="idLabel">Ciudad*</label>
                            <Input type="text" 
												placeholder='Ciudad'
												id="form-usuario"
												style={{width:'100%'}}
                                                defaultValue={Ciudad}
                                                onChange={e => setCiudad(e.target.value)}
											/>
                                           
                            </div>
                       <div style={{display:'flex',flexDirection:'column', width:'47%' }}>
                            <label class="idLabel">Código Postal*</label>
                            <Input type="text" 
												placeholder='Codigo Postal'
												id="form-usuario"
												style={{width:'100%'}}
                                                defaultValue={CodigoPostal}
                                                onChange={e => setCodigoPostal(e.target.value)}
											/>
                            
                            </div>
                    </div>
                    <label class="idLabel">Colonia*</label>
                    <Input type="text" 
												placeholder='Colonia'
												id="form-usuario"
												style={{width:'100%'}}
                                                defaultValue={Colonia}
                                                onChange={e => setColonia(e.target.value)}
											/>
                   
                    <label class="idLabel">Calle y Número*</label>
                    <Input type="text" 
												placeholder='Calle/Numero'
												id="form-usuario"
												style={{width:'100%'}}
                                                defaultValue={CalleNumero}
                                                onChange={e => setCalleNumero(e.target.value)}
											/>
                   
                    <label class="idLabel">Correo Electrónico</label>
                    
                    <Input type="email" 
												placeholder='Email'
												id="form-usuario"
												style={{width:'100%'}}
                                                defaultValue={Email}
                                                onChange={e => setEmail(e.target.value)}
											/>
                    <br></br>
                    <label class="idLabel">Descripción*</label>
                    <textarea class="idInput" style={{minHeight:'90px', resize: 'none'}} onChange={e => setDescripcion(e.target.value)} rows="15" cols="50" defaultValue={Descripcion}></textarea><br></br>

                    <label class="idLabel">Comentarios*</label>
                    <textarea class="idInput" style={{minHeight:'90px', resize: 'none'}} onChange={e => setComentarios(e.target.value)} rows="15" cols="50" defaultValue={Comentarios}></textarea><br></br>
                    
                    <label class="idLabel" hidden >Ubicación</label ><br></br>
                    <div style={{width:'100%'}} hidden>
                        <Gmaps
                        width={'100%'}
                        height={'500px'}
                        lat={coords.lat}
                        lng={coords.lng}
                        zoom={12} 
                        params={params} 
                        onClick={ev => {
                            var latInt = parseInt(ev.latLng.lat());
                            var longInt = parseInt(ev.latLng.lng());
                            longInt = longInt * -1;
                            var decimalsLat =  getDecimalPart(ev.latLng.lat());
                            var decimalsLong = getDecimalPart(ev.latLng.lng());
                            decimalsLat = "0."+decimalsLat;
                            decimalsLong = "0."+decimalsLong;
                            decimalsLat = ((decimalsLat * 60) * 100) / 100;
                            decimalsLong = ((decimalsLong * 60)* 100) / 100;
                            var latF = ""+latInt + decimalsLat;
                            var longF = ""+longInt + decimalsLong;
                            latF = Math.trunc(latF*100)/100;
                            longF = Math.trunc(longF*100)/100;
                            console.log("Latitud decimals: " + latF);
                            console.log("longitud decimals: " + longF);
                         
                            setLat(ev.latLng.lat());
                            setLong(ev.latLng.lng());
                          
                          }}
                       >
                        <Marker
                            lat={lat}
                            lng={long}
                            draggable={false}  />
                       
                        <Circle
                            lat={lat}
                            lng={long}
                            radius={100}  />
                        </Gmaps>
                    </div>
                    <br></br>
                    <div style={{justifyContent: 'space-between', columnGap:'0.875rem', width:'100%', display:'flex', flexDirection:'row'}}> 
                    <div style={{width:'50%'}} align="center"> 
                    <button className="buttonVerde" style={{width:'100%', fontWeight: 'bold'}} onClick={() => { Seleccionar();}}>Regresar</button>
                    </div>
                    <div style={{width:'50%'}} align="center"> 
                        <button type='submit' onClick={() => ActualizarConsumidor()} className='button' style={{ fontWeight: 'bold', width:'100%'}}>Actualizar</button>
                        </div>
                    </div>                    
                    <br></br>
                    <br></br> 
                    <br></br>
                    <div style={{width:'100%', height:'45px'}} >
						<label style={{color:'white', fontWeight: 'bold', fontSize:'20px'}}>Eliminar Cuenta</label>
                    <br></br>
						<button type='submit' style={{width:'100%', fontWeight: 'bold'}} id="privacidad"  className='buttonRojo' onClick={(e) => openPoliticaPrivacidad(e)}>
                        Eliminar definitivamente mi cuenta
                        </button>
											</div>
                    <br></br>
                    <br></br>
            </div>

            <ToastContainer 
				progressClassName="toastProgress"
				position="top-center"
				/>

                <ModalCarga modalIsOpenLoad={modalIsOpenLoad} closeModalLoad={closeModalLoad}/>


                <Modal 
					isOpen={modalIsOpenPoliticaPrivacidad}
					onRequestClose={closeModalPoliticaPrivacidad}   
					style={customStylesPolitica}> 
							<div style={{width:'100%',  fontSize:'15px', display:'flex', flexDirection:'column'}} align="center">
								<div styley={{width:'70%', overflowY:'scroll'}}> 
										<h4 align="left"> ¿Seguro que quieres borrar tu cuenta? </h4>
														<p style={{padding: '5px'}} align="justify">
														Si eliminas tu cuenta, perderas tu perfil, los pedidos realizados para siempre.
                                                        </p>
                                                        <p style={{padding: '5px'}} align="justify">
                                                        Si eliminas tu cuenta, esta acción no se puede deshacer. 
														</p> 
														<br></br>
														<div style={{justifyContent: 'space-between', columnGap:'0.875rem', width:'100%', display:'flex', flexDirection:'row'}}> 
														<div style={{width:'50%'}} align="center"> 
														<button className="buttonVerde" style={{width:'100%', fontWeight: 'bold'}} onClick={() => { noAcepto();}}>Cancelar</button>
														</div>
														<div style={{width:'50%'}} align="center"> 
															<button type='submit'  onClick={() => openEliminarCuenta()} className='buttonRojo' style={{ fontWeight: 'bold', width:'100%'}}>Eliminar mi cuenta</button>
															</div>
														</div>  
													</div>
													
													</div>  
											</Modal>
                    <Modal 
					isOpen={modalIsOpenEliminarCuenta}
					onRequestClose={closeModalEliminarCuenta}   
					style={customStylesEliminarCuenta}> 
							<div style={{width:'100%',  fontSize:'15px', display:'flex', flexDirection:'column'}} align="center">
								<div styley={{width:'70%', overflowY:'scroll'}}>

                                        <div align="center"> 
												<img src={LogoRomboGasLp} style={{width:'250px', height:'250px'}}></img>
										</div>
									<h3>ELIMINAR TU CUENTA</h3> 
														<p style={{padding: '5px'}} align="justify">
														¿Estás seguro de eliminar tu cuenta de Petromar Gas?
                                                        </p>
                                                        <p style={{padding: '5px'}} align="justify">
                                                        Si eliminas tu cuenta, esta acción no se puede deshacer. 
														</p> 
														<br></br>
														 
														<div style={{width:'100%'}} align="center"> 
															<button type='submit'  onClick={() => eliminarCuenta()} className='buttonRojo' style={{ fontWeight: 'bold', width:'100%'}}>Sí, eliminar mi cuenta</button>
															</div>
														</div>   
													
													</div>  
											</Modal>

                <Modal 
						isOpen={modalIsOpenError}
						onRequestClose={closeModalLoadError}   
						style={customStylesD}> 
						<div style={{width:'100%'}} align="center">  
						 <img src={ErrorImg}></img>    <br></br>
                         <label style={{fontWeight:'bold'}}>Mensaje</label><br></br>
                         <label>Complete todos los campos</label><br></br> 
                         <button style={{width:'100%', color:'white', backgroundColor:'#008445'}} className="buttonLogin" onClick={closeModalLoadError}>Ok</button>
						</div>  
				</Modal></FadeIn>
        </div>
        </div>
    );
}

export default Usuario;
 