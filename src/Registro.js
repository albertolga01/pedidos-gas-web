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
import { ModalCarga } from "./component/ModalCarga";
import { Input } from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const [modalIsOpenConsumidores, setIsOpenConsumidores] = React.useState(false);
    const[Mensaje, setMensaje] = useState(); 
    const[TelefonoNC, setTelefonoNC] = useState(); 

    const [modalIsOpenError, setIsOpenLoadError] = React.useState(false);

    const[lista, setlista] = useState([]); 
    const [modalIsOpenPoliticaPrivacidad, setIsOpenPoliticaPrivacidad] = React.useState(false);

    const privacidad = document.getElementById('privacidad');


    function openModal() { 
		setIsOpen(true); 
	}  
	   
	function closeModal() { 
		setIsOpen(false); 
        Seleccionar();
	}
  function openModalConsumidores() { 
		setIsOpenConsumidores(true); 
	}  
	   
	function closeModalConsumidores() { 
		setIsOpenConsumidores(false); 
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

    function SeleccionarConsumidorExistente(telefono, noconsumidor){  
      props.unmount1(telefono, noconsumidor);   
  }
    
	function notify(message){
    toast(message);
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

    function Validador(NombreV, ApellidoV,Tel1V, CalleNumV){
      
         if(NombreV == "" || NombreV == null ){
            return false;
         } else if (ApellidoV == "" || ApellidoV == null){
            return false;
         } else if (Tel1V == "" || Tel1V == null){
            return false;
         } else if (CalleNumV == "" || CalleNumV == null){
            return false;
         } else {
            return true;
         }
        
    }

    async function existeConsumidor(){
      
      setlista([]);
      var valido = Validador(Nombre, Apellido, TelefonoUno, CalleNumero); 
      if(valido == true){
        let fd = new FormData()   
        fd.append("id", "existeConsumidor")   
        fd.append("telefono", TelefonoUno)  
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
          }); 
          if(res.data.length == 0){
            altaConsumidor();
          }else if(res.data.length > 0){
            setlista(res.data);
            openModalConsumidores();
          } 
        closeModalLoad();
      }
    }
    

    function Privacidad(){
       
      document.getElementById('privacidad').checked = true;
       
      closeModalPoliticaPrivacidad();
    }

    function switchChange () { 
          let privacidadcheck = 0;
          if(privacidad.checked){
            privacidadcheck = 1;
          } 
          console.log(privacidad.checked) 
        }


    async function altaConsumidor(){

      if(document.getElementById("privacidad").checked == false){
        toast("Se requiere aceptar el aviso de privacidad");
        return;
      }
      
      
         var valido = Validador(Nombre, Apellido, TelefonoUno, CalleNumero); 
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
            fd.append("c_latitud", "2314.3201")
            fd.append("c_longitud", "10626.7197") 
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
              });
            closeModalLoad();
            
            var json = JSON.parse(JSON.stringify(res.data)); 
           console.log(json.numero_consumidor);
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
      <div style={{width:'100%'}}>
         <Navbar titulo="Registro" />  <br></br><br></br>
          <div className='divPrincipal'  style={{width:'100%', height: '100vh'}}> 

              

              <div style={{display:'flex', flexDirection:'column',   width: '80%'}} align="center">
              <br></br>
                      <label class="idLabel">Nombre (s)*</label>
                      <Input type="text" 
                            placeholder='Nombre(s)'
                            style={{width:'100%'}} 
                            onChange={e => setNombre(e.target.value)}
											/>
                      {/** 
                      <input type='text' class="idInput" onChange={e => setNombre(e.target.value)}></input><br></br>
                      */}
                      <label class="idLabel">Apellido (s)*</label>
                      <Input type="text" 
                            placeholder='Apellido'
                            style={{width:'100%'}}
                            onChange={e => setApellido(e.target.value)}
											/>
                      {/**
                      <input type='text' class="idInput" onChange={e => setApellido(e.target.value)}></input><br></br>
                      */}
                      <div style={{display:'flex',flexDirection:'row', justifyContent:'spaceBetween', gap:'6%' }}>
                            <div style={{display:'flex',flexDirection:'column', width:'47%' }}>
                                <label class="idLabel">Telefono1*</label>
                      <Input type="text" 
                            placeholder='Teléfono uno'
                            style={{width:'100%'}}
                            onChange={e => setTelUno(e.target.value)}
											/>
                                {/**
                                <input type='tel' class="idInput" onChange={e => setTelUno(e.target.value)}></input><br></br>
                             */}
                                </div>
                            <div style={{display:'flex',flexDirection:'column', width:'47%' }}>
                                <label class="idLabel">Telefono2</label>
                      <Input type="text" 
                            placeholder='Teléfono dos'
                            style={{width:'100%'}}
                            onChange={e => setTelDos(e.target.value)}
											/>
                      {/**
                                <input type='tel' class="idInput" onChange={e => setTelDos(e.target.value)}></input><br></br>
                           */}
                                </div>
                      </div>
                      

                      <div style={{display:'flex',flexDirection:'row', justifyContent:'spaceBetween', gap:'6%' }}>
                            <div style={{display:'flex',flexDirection:'column', width:'47%' }}>
                                <label class="idLabel">Ciudad</label>
                      <Input type="text" 
                            placeholder='Ciudad'
                            style={{width:'100%'}}
                            onChange={e => setCiudad(e.target.value)}
											/>
                      {/**
                                <input type='text' class="idInput" onChange={e => setCiudad(e.target.value)}></input><br></br>
                           */}
                                </div>
                            <div style={{display:'flex',flexDirection:'column', width:'47%' }}>
                                <label class="idLabel">Código Postal</label>
                      <Input type="text" 
                            placeholder='Código Postal'
                            style={{width:'100%'}}
                            onChange={e => setCodigoPostal(e.target.value)}
											/>
                                {/*
                                <input type='text' class="idInput" onChange={e => setCodigoPostal(e.target.value)}></input><br></br>
                            */}
                                </div>
                      </div>

                      <label class="idLabel">Colonia*</label>
                      <Input type="text" 
                            placeholder='Colonia'
                            style={{width:'100%'}}
                            onChange={e => setColonia(e.target.value)}
											/>
                      {/**
                      <input type='text' class="idInput" onChange={e => setColonia(e.target.value)}></input>
                       */}<br></br>
                      
                      <label class="idLabel">Calle y Número*</label>
                      <Input type="text" 
                            placeholder='Calle/Numero'
                            style={{width:'100%'}}
                            onChange={e => setCalleNumero(e.target.value)}
											/>
                      {/**
                      <input type='text' class="idInput" onChange={e => setCalleNumero(e.target.value)}></input>
                       */}<br></br>
                      
                      
                      <label class="idLabel"  for="email">Correo Electrónico</label>
                      <Input type="email" 
                            placeholder='Email'
                            style={{width:'100%'}}
                            onChange={e => setEmail(e.target.value)}
											/>
                      {/**
                      <input type="email" class="idInput" onChange={e => setEmail(e.target.value)} name="email"></input>
                      */}

                      <label class="idLabel">Descripción</label>
                      <textarea class="idInput" style={{ minHeight:'50px', resize: 'none'}} onChange={e => setDescripcion(e.target.value)} rows="5" cols="50"></textarea><br></br>

                      <label class="idLabel">Comentarios</label>
                      <textarea class="idInput"  style={{ minHeight:'50px', resize: 'none'}} onChange={e => setComentarios(e.target.value)} rows="5" cols="50"></textarea><br></br>
                      
                      
                      <label style={{color:'white', fontWeight: 'bold', fontSize:'20px'}}>
                        <input style={{marginRight: '15px', height:'15px', width:'15px'}}  type="checkbox" id="privacidad" onClick={(e) => openPoliticaPrivacidad(e)} />
                        He leído y estoy de acuerdo con la política de privacidad
                      </label>
                    

                      <label class="idLabel" hidden >Ubicación</label><br></br>
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
                            //  setLat1(latF);
                            // setLong1(longF);
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
                          <button type='submit' className='button' style={{ fontWeight: 'bold', width:'100%'}} onClick={() => {existeConsumidor();}}>Registrarse</button> 
                          </div>
                      </div> 

                <br></br>
              </div>
              <Modal 
              isOpen={modalIsOpenConsumidores}  
              onRequestClose={closeModalConsumidores}   
              style={customStylesD}> 
              <div style={{width:'100%'}} align="center">  
              <div  style={{height:'100%', overflowY: 'scroll', width:'100%'}}>
              <label style={{fontWeight:'bold', fontSize:'16px'}}>Seleccione un consumidor ó haga click en continuar para registrarse</label><br></br>
                <table  style={{width:'100%'}}>
                  <tr>
                    <th style={{color:'black'}}>Seleccionar</th>
                    <th style={{color:'black'}}>Nombre</th>
                    <th style={{color:'black'}}>Apellido</th>
                    <th style={{color:'black'}}>Dirección</th>  
                    <th style={{color:'black'}}>No. consumidor</th>  
                    
                  </tr>

                  { lista.map(item => ( 
                  <tr id="tabletr" style={{  fontSize:'15.5px', border: 'px solid #ABB2B9'}}>
                    <td style={{color:'black', textAlign:'center' }}> <button className="buttonVerde" style={{width:'89px', paddingLeft:'6px'}} onClick={() => SeleccionarConsumidorExistente(item.telefono, item.noconsumidor)}>Seleccionar</button></td> 
                    <td style={{color:'black', textAlign:'center' }}> {item.nombre}</td>
                    <td style={{color:'black', textAlign:'center' }}> {item.apellido}</td>
                    <td style={{color:'black', textAlign:'center' }}> {item.direccion}</td> 
                    <td style={{color:'black', textAlign:'center' }}> {item.noconsumidor}</td> 
                  
                  </tr> 
                  ))}	
                </table> 
                <div style={{justifyContent: 'space-between', columnGap:'0.875rem', width:'100%', display:'flex', flexDirection:'row'}}> 
                    <div style={{width:'50%'}} align="center"> 
                    <button className="buttonVerde" style={{width:'100%', fontWeight: 'bold'}} onClick={() => { closeModalConsumidores();}}>Cancelar</button>
                    </div>
                    <div style={{width:'50%'}} align="center"> 
                        <button type='submit' onClick={() => altaConsumidor()} className='button' style={{ fontWeight: 'bold', width:'100%'}}>Continuar</button>
                        </div>
                    </div>          
              </div>
              </div>  
          </Modal>
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

          <ModalCarga modalIsOpenLoad={modalIsOpenLoad} closeModalLoad={closeModalLoad}/>

          <ToastContainer 
									progressClassName="toastProgress"
									position="top-center"
									/>
          </div>
      </div>
    );
}

export default Registro;
 
