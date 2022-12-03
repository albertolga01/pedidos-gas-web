import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'; 
import Modal from 'react-modal';
import { ThreeDots } from  'react-loader-spinner'
import {Navbar} from './component/Navbar';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import CorrectoImg from './resources/Correcto.svg'
import ErrorImg from './resources/error.svg'

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


function Registro(props){

    const[passActual, setPassActual] = useState();
    const[passNueva, setPassNueva] = useState();
    const[confirmarPass, setConfirmarPass] = useState();
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
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const[Mensaje, setMensaje] = useState(); 
    const[TelefonoNC, setTelefonoNC] = useState(); 

    const [modalIsOpenError, setIsOpenLoadError] = React.useState(false);

    function openModal() { 
		setIsOpen(true); 
	}  
	   
	function closeModal() { 
		setIsOpen(false); 
        Seleccionar();
	}

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

    function Seleccionar(){  
        props.unmount(Mensaje, TelefonoNC);   
    }

    function Validador(NombreV, ApellidoV,Tel1V, CalleNumV, lat1V, long1V){
      
         if(NombreV == "" || NombreV == null ){
            return false;
         } else if (ApellidoV == "" || ApellidoV == null){
            return false;
         } else if (Tel1V == "" || Tel1V == null){
            return false;
         } else if (CalleNumV == "" || CalleNumV == null){
            return false;
         } else if (lat1V == "" || lat1V == null){
            return false;
         } else if (long1V == "" || long1V == null){
            return false;
         } else {
            return true;
         }
        
    }

    async function altaConsumidor(){   
         var valido = Validador(Nombre, Apellido, TelefonoUno, CalleNumero, lat1, long1); 
         if(valido == true){
            let fd = new FormData()   
            fd.append("id", "altaConsumidor")  
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
            fd.append("email", Email)
            fd.append("c_latitud", lat1)
            fd.append("c_longitud", long1)
            openModalLoad();
            const res = await axios.post(process.env.REACT_APP_API_URL, fd);
            closeModalLoad();
            console.log(res.data);
            var json = JSON.parse(JSON.stringify(res.data)); 
            setMensaje(json.numero_consumidor);
            setTelefonoNC(json.telefono1);
            openModal();
         }else{
            openModalLoadError();
         }
		//console.log(res.data); 
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
  
    return(
        <div className='divPrincipal'  style={{width:'100%', height: '100vh'}}> 

            

            <div style={{display:'flex', flexDirection:'column',   width: '80%'}} align="center">
            <Navbar titulo="Registro" />  <br></br><br></br>
                    <label class="idLabel">Nombre (s)*</label>
                    <input type='text' class="idInput" onChange={e => setNombre(e.target.value)}></input><br></br>
                    
                    <label class="idLabel">Apellido (s)*</label>
                    <input type='text' class="idInput" onChange={e => setApellido(e.target.value)}></input><br></br>

                    <label class="idLabel">Telefono1*</label>
                    <input type='tel' class="idInput" onChange={e => setTelUno(e.target.value)}></input><br></br>

                    <label class="idLabel">Telefono2</label>
                    <input type='tel' class="idInput" onChange={e => setTelDos(e.target.value)}></input><br></br>
                    
                    <label class="idLabel">Descripción</label>
                    <textarea class="idInput" onChange={e => setDescripcion(e.target.value)} rows="5" cols="50"></textarea><br></br>

                    <label class="idLabel">Comentarios</label>
                    <textarea class="idInput" onChange={e => setComentarios(e.target.value)} rows="5" cols="50"></textarea><br></br>
                    
                    <label class="idLabel">Calle y Número*</label>
                    <input type='text' class="idInput" onChange={e => setCalleNumero(e.target.value)}></input><br></br>
                    
                    <label class="idLabel">Colonia*</label>
                    <input type='text' class="idInput" onChange={e => setColonia(e.target.value)}></input><br></br>

                    <label class="idLabel">Ciudad</label>
                    <input type='text' class="idInput" onChange={e => setCiudad(e.target.value)}></input><br></br>

                    <label class="idLabel">Código Postal</label>
                    <input type='text' class="idInput" onChange={e => setCodigoPostal(e.target.value)}></input><br></br>

                    <label class="idLabel"  for="email">Correo Electrónico</label>
                    <input type="email" class="idInput" onChange={e => setEmail(e.target.value)} name="email"></input>

                    <label class="idLabel" >Ubicación</label><br></br>
                    <div style={{width:'100%'}}>
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
                            setLat1(latF);
                            setLong1(longF);
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
                    <br></br>
                    <div style={{justifyContent: 'space-between', columnGap:'0.875rem', width:'100%', display:'flex', flexDirection:'row'}}> 
                    <div style={{width:'50%'}} align="center"> 
                    <button className="buttonVerde" style={{width:'100%', fontWeight: 'bold'}}  onClick={() => { Seleccionar();}}>Regresar</button>
                    </div>
                    <div style={{width:'50%'}} align="center">
                        <button type='submit' className='button' style={{ fontWeight: 'bold', width:'100%'}} onClick={() => {altaConsumidor();}}>Registrarse</button> 
                        </div>
                    </div> 

              <br></br>
            </div>
            <Modal 
						isOpen={modalIsOpen}  
						onRequestClose={closeModal}   
						style={customStylesD}> 
						<div style={{width:'100%'}} align="center">  
						 <img src={CorrectoImg}></img>    <br></br>
                         <label style={{fontWeight:'bold'}}>Mensaje</label><br></br>
                         <label>Se ha registrado exitosamente, su número de consumidor es: </label><br></br>
                         <label>{Mensaje}</label>
                         <button style={{width:'100%', color:'white', backgroundColor:'#008445'}} className="buttonLogin" onClick={closeModal}>Ok</button>
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
				</Modal>
        </div>
    );
}

export default Registro;
 
