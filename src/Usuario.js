import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'; 
import Modal from 'react-modal';
import { ThreeDots } from  'react-loader-spinner'
import FadeIn from 'react-fade-in';
import {Navbar} from './component/Navbar';  

import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CorrectoImg from './resources/Correcto.svg'
import ErrorImg from './resources/error.svg'

import { ModalCarga } from "./component/ModalCarga";
import { Input } from 'semantic-ui-react'


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

    async function postChangePass(postbody){
        const rese = await axios.post('https://compras.grupopetromar.com/apirest/', postbody);
        alert(rese.data);
    }
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
        /*
        var latU = res.data[0]["posicion_gps"].latitud_grados_decimales;
        var longU = res.data[0]["posicion_gps"].longitud_grados_decimales;

        var latIntU = parseInt((latU/100));
        var longIntU = parseInt((longU/100));
        
        latU = latU / 100;
        
        longU = longU / 100;
        var latFU =  latU - latIntU;
        
        var longFU =  longU -longIntU ;
        latFU = (latFU / 60) * 100;
        
        longFU = (longFU / 60) * 100;
        latFU = getDecimalPart(latFU);
        longFU = getDecimalPart(longFU);
        latFU = ""+latIntU +"."+ latFU; 
        
        longFU = ""+longIntU +"."+ longFU;
        console.log(latFU);
        console.log(longFU * -1);
        setLat(latFU);
        setLong(longFU * -1);

        setLat1(latFU);
        setLong1(longFU * -1);
*/
        setLat1(res.data[0]["posicion_gps"].latitud_grados_decimales);
        setLong1(res.data[0]["posicion_gps"].longitud_grados_decimales);
 
		//console.log(res.data); 
	}

    function Regresar(){  
        props.unmount("MenuPrincipal");   
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
        //setisLoggedIn(false);
        openModalLoad();
		const res = await axios.post(process.env.REACT_APP_API_URL, fd);
        closeModalLoad();
		console.log(res.data); 
        notify("Actualizado correctamente");
		//console.log(res.data); 
        }else{
            openModalLoadError();
        }
	}


    function mapOnClick(e) {
        console.log('onClick', e);
      }

      function mapOnCloseClick() {
        console.log('onCloseClick');
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
                    {/*<input hidden type='text' class="idInput" onChange={e => setNombre(e.target.value)} defaultValue={Nombre}></input><br></br>
                    */}
                    <label class="idLabel">Apellido (s)*</label>
                    <Input type="text" 
												placeholder='Apellido'
												id="form-usuario"
												style={{width:'100%'}}
                                                defaultValue={Apellido}
                                                onChange={e => setApellido(e.target.value)}
											/>
                    {/*}
                    <input hidden type='text' class="idInput" onChange={e => setApellido(e.target.value)} defaultValue={Apellido}></input><br></br>
                    */}
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
                    {/*
                            <input type='tel' class="idInput" onChange={e => setTelUno(e.target.value)} defaultValue={TelefonoUno}></input><br></br>
                    */}
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
                            {/*
                            <input type='tel' class="idInput" onChange={e => setTelDos(e.target.value)} defaultValue={TelefonoDos}></input><br></br>
                         **/}
                            </div>
                    </div>
                   
                    
                    <div style={{display:'flex',flexDirection:'row', justifyContent:'spaceBetween', gap:'6&' }}>
                         <div style={{display:'flex',flexDirection:'column', width:'47%' }}>
                            <label class="idLabel">Ciudad*</label>
                            <Input type="text" 
												placeholder='Ciudad'
												id="form-usuario"
												style={{width:'100%'}}
                                                defaultValue={Ciudad}
                                                onChange={e => setCiudad(e.target.value)}
											/>
                                            {/*
                            <input type='text' class="idInput" onChange={e => setCiudad(e.target.value)} defaultValue={Ciudad}></input><br></br>
                        * */}
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
                                            {/** 
                            <input type='text' class="idInput" onChange={e => setCodigoPostal(e.target.value)} defaultValue={CodigoPostal}></input><br></br>
                        */}
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
                    {/*
                    <input type='text' class="idInput" onChange={e => setColonia(e.target.value)} defaultValue={Colonia}></input><br></br>
                     */}
                    <label class="idLabel">Calle y Número*</label>
                    <Input type="text" 
												placeholder='Calle/Numero'
												id="form-usuario"
												style={{width:'100%'}}
                                                defaultValue={CalleNumero}
                                                onChange={e => setCalleNumero(e.target.value)}
											/>
                    {/**
                    <input type='text' class="idInput" onChange={e => setCalleNumero(e.target.value)} defaultValue={CalleNumero}></input><br></br>
                     */}
                     {/** onChange={e => setEmail(e.target.value)} for="email" defaultValue={Email} */}
                    <label class="idLabel">Correo Electrónico</label>
                    {/*<input type="email" class="idInput" name="email"></input>*/}
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
                         //   setLat1(latF);
                          //  setLong1(longF);
                            setLat(ev.latLng.lat());
                            setLong(ev.latLng.lng());
                          //  console.log("latitide = ", ev.latLng.lat());
                           // console.log("longitude = ", ev.latLng.lng());
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
                    <br></br>
            </div>

            <ToastContainer 
				progressClassName="toastProgress"
				position="top-center"
				/>

                <ModalCarga modalIsOpenLoad={modalIsOpenLoad} closeModalLoad={closeModalLoad}/>

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
 