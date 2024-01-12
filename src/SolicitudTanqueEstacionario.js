import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'; 
import Modal from 'react-modal';
import { ThreeDots } from  'react-loader-spinner' 
import {Navbar} from './component/Navbar';  
import Backgroundgas from './component/Background-gas.png'
import CorrectoImg from './resources/Correcto.svg'
import FadeIn from 'react-fade-in';
import ErrorImg from './resources/error.svg'
import { ModalCarga } from "./component/ModalCarga";
import { Input } from 'semantic-ui-react' 
import { ToastContainer, toast } from 'react-toastify';
import { SliderThumb } from "@mui/material";
 

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


function SolicitudTanqueEstacionario(props){

    const inlineStyle = {
        input : {
          backgroundColor: '#0071ce',
        }
      };

    const[passActual, setPassActual] = useState();
    const[passNueva, setPassNueva] = useState();
    const[confirmarPass, setConfirmarPass] = useState();
////////////////////////////////////////////////// 
    const[Apellidos, setApellidos] = useState();
    const[Nombre, setNombre] = useState();
    const[Comentarios, setComentarios] = useState();
    const[CalleNumero, setCalleNumero] = useState();
    const[Colonia, setColonia] = useState();
    const[Cantidad, setCantidad] = useState();
    const[Importe, setImporte] = useState();
    const[capacidad, setCapacidad] = useState();
    const[CodigoPostal, setCodigoPostal] = useState(); 
    const [fechaHoy, setFechaHoy] = useState("null");

    const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalIsOpenE, setIsOpenE] = React.useState(false);
    const[Mensaje, setMensaje] = useState(); 
    const[MensajeError, setMensajeError] = useState(); 
 ////////////////////////////////////////////////// 
 const[Apellido, setApellido] = useState();
 const[TelefonoUno, setTelUno] = useState();
 const[TelefonoDos, setTelDos] = useState();
 const[Descripcion, setDescripcion] = useState(); 
 const[Ciudad, setCiudad] = useState(); 
 const[Email, setEmail] = useState();

	useEffect(() => {
        //obtenerConsumidor();
        //currentDate();
	},[])
  

    function openModalLoad() { 
		setIsOpenLoad(true); 
	}  
	   
	function closeModalLoad() { 
		setIsOpenLoad(false); 
	}

    function openModal() { 
		setIsOpen(true); 
	}  
	   
	function closeModal() {
        
        //re direccionar a historial   
		setIsOpen(false); 
	}

    //Error Mensaje
    function openModalE() { 
		setIsOpenE(true); 
	}  
	   
	function closeModalE() { 
		setIsOpenE(false); 
	}



    function notify(message){
        toast(message);
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
        if(res.data[0].comentario != undefined && res.data[0].comentario != "undefined"){
            setComentarios(res.data[0].comentario);
        }else{
            setComentarios("");
        }
        setCalleNumero(res.data[0].calle_numero);
        setColonia(res.data[0].colonia); 
		setCodigoPostal(res.data[0].codigo_postal); 
		//console.log(res.data); 
	}

    function validarDia(fecha){
        var hoy = new Date()
        var fechaHoy = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2) ;
        if(fecha==fechaHoy){
            var horaValida = validarHora(document.getElementById("HoraPedido").value);
            if(horaValida == true){
                return true;
            }else{
                return false;
            } 
        }else if(fecha>fechaHoy){ 
            return true;
        }else{
            return false;
        }
    }
    function validarHorarioAtencion(hora){
        if(hora>= "06:00" && hora <= "18:30" ){
            return true;
        }else{
            return false;
        }
    }

    function validarHora(hora){
        var hoy = new Date()
        var horaActual = ('0' + (hoy.getHours())).slice(-2) + ':' + ('0' + hoy.getMinutes()).slice(-2);
       //  alert(hora + " " + horaActual);
        if(hora>horaActual){ 
            return true;
        }else{  
            return false;
        } 
    }
    function validarDomingo(fecha){
        let day = new Date(fecha);
        console.log(day.getDay());
        if(day.getDay() == 6){
            return true;
        }else{
            return false;
        }
        
    }

    function Validador(NombreV, ApellidoV,Tel1V, CalleNumV, ColoniaV, CiudadV){
      
        if(NombreV == "" || NombreV == null ){
           return false;
        } else if (ApellidoV == "" || ApellidoV == null){
           return false;
        } else if (Tel1V == "" || Tel1V == null){
           return false;
        } else if (CalleNumV == "" || CalleNumV == null){
           return false;
        } else if (ColoniaV == "" || ColoniaV == null){
            return false;
        } else if (CiudadV == "" || CiudadV == null){
            return false;
        } else {
           return true;
        }
       
   }
 

    async function altaSolicitudTanque(){  
           
            

        var valido = Validador(Nombre, Apellido, TelefonoUno, CalleNumero, Colonia, Ciudad);   

           
        
            //alert(cantidadServicio);
            if(valido != true){
                notify("Complete los datos para continuar");
                return;
            }
            let fd = new FormData()   
            fd.append("id", "altaSolicitudTanque") 
            fd.append("nombre", Nombre)
            fd.append("apellidos", Apellido)
            fd.append("telefono1", TelefonoUno)
            fd.append("ciudad", Ciudad)
            fd.append("cp", CodigoPostal)
            fd.append("colonia", Colonia)
            fd.append("calle_numero", CalleNumero)
            fd.append("correo", Email)
            fd.append("comentarios", Comentarios)
            fd.append("capacidad", capacidad)
            
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
            //console.log(res.data);
           // var json = JSON.parse(JSON.stringify(res.data));
             if(res.data == "1"){ 
                setMensaje("");
                openModal();
            }else{
                openModalE();
                setMensajeError("Error");
            }
            //console.log(json.folio); 
	}

    function currentDate(){ 
        var hoy = new Date()
        hoy.setMinutes ( hoy.getMinutes() + 30 ); 
        var fecha = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2) ;
         var hora = ('0' + (hoy.getHours())).slice(-2) + ':' + ('0' + (hoy.getMinutes())).slice(-2);
      // console.log(hora);
        document.getElementById("FechaPedido").value = fecha;
        document.getElementById("HoraPedido").value = hora; 

	}

    

    const handleChange = (e) => { 
        setCapacidad(e.target.value); 
      };

    function tipoPedido(){
       
        let pesos = document.getElementById("tipopesos");
        let litros = document.getElementById("tipolitros"); 
        document.getElementById("inputlitros").value = "";
        document.getElementById("inputpesos").value = "";
        if(pesos.checked){
            //mostrar inut pesos
       
            document.getElementById("divpesos").style.display = "block";
            document.getElementById("divlitros").style.display = "none";
            
             

        }
        if(litros.checked){
            //mostrar el de litros  
            document.getElementById("divpesos").style.display = "none";
            document.getElementById("divlitros").style.display = "block";
        }
    }


    function HoraFecha(){
        var hoy = new Date()
        var fecha = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2) ;
        var hora = ('0' + hoy.getHours()).slice(-2) + ':' + ('0' + hoy.getMinutes()).slice(-2);

        var fecha_hora = fecha +':'+ hora;
        document.getElementById('FechaPedido').value = fecha_hora;
        console.log(fecha_hora);
    }
    function disabledInput(){
        notify("No es posible modificar esta información en este apartado, favor de ingresar a la sección de usuario para actualizar sus datos");
    }

    const[fecha_hora, setHoraFecha] = useState(); 

    return(
       <div style={{width:'100%'}}>
         <Navbar titulo="Solicitud de tanque estacionario"  />
        <div  style={{margin: 'auto', width:'80%' , height: '100vh', backgroundImage: Backgroundgas}} align="center"> 

          <FadeIn>
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
                                 
                                <label class="idLabel">Teléfono*</label>
                                <Input type="text" 
                                    placeholder='Teléfono'
                                    style={{width:'100%'}}
                                    onChange={e => setTelUno(e.target.value)}
                                                    />
                                        {/**
                                         <input type='tel' class="idInput" onChange={e => setTelUno(e.target.value)}></input><br></br>
                                    */}
                                         

                                <div style={{display:'flex',flexDirection:'row', justifyContent:'spaceBetween', gap:'6%' }}>
                                    <div style={{display:'flex',flexDirection:'column', width:'47%' }}>
                                        <label class="idLabel">Ciudad</label>
                                        <select
                                            id="form-tanque"
                                            style={{ width: '100%' }}
                                            value={Ciudad}
                                            onChange={e => setCiudad(e.target.value)}
                                        >
                                            <option value="" disabled selected hidden>Ciudad</option>
                                            <option value="MAZATLÁN">MAZATLÁN</option>
                                            <option value="VILLA UNIÓN">VILLA UNIÓN </option>
                                            <option value="AGUA VERDE">AGUA VERDE</option>
                                            <option value="AGUA CALIENTE DE GÁRATE">AGUA CALIENTE DE GÁRATE</option>
                                        </select>
                                            
                                        </div>
                                    <div style={{display:'flex',flexDirection:'column', width:'47%' }}>
                                        <label class="idLabel">Código Postal</label>
                                            <Input type="text" 
                                                placeholder='Código Postal'
                                                style={{width:'100%'}}
                                                onChange={e => setCodigoPostal(e.target.value)}
                                                                />
                                         
                                        </div>
                                </div>

                                <label class="idLabel">Colonia*</label>
                                <Input type="text" 
                                    placeholder='Colonia'
                                    style={{width:'100%'}}
                                    onChange={e => setColonia(e.target.value)}
                                                    />
                                <br></br>
                                
                                <label class="idLabel">Calle y Número*</label>
                                <Input type="text" 
                                    placeholder='Calle/Numero'
                                    style={{width:'100%'}}
                                    onChange={e => setCalleNumero(e.target.value)}
                                                    />
                                <br></br>
                                
                                
                                <label class="idLabel"  for="email">Correo Electrónico</label>
                                <Input type="email" 
                                    placeholder='Email'
                                    style={{width:'100%'}}
                                    onChange={e => setEmail(e.target.value)}
                                                    />
                          
                                <label class="idLabel">Comentarios</label>
                                <textarea class="idInput"  style={{ minHeight:'50px', resize: 'none'}} onChange={e => setComentarios(e.target.value)} rows="5" cols="50"></textarea><br></br>
                                
                                <fieldset>
                                    <legend class="idLabel">Seleccione una capacidad de tanque:</legend>

                                    <div style={{display:'flex',flexDirection:'row', justifyContent:'spaceBetween', gap:'6%' }}>
                                        <div style={{display:'flex',flexDirection:'column', width:'47%' }}>
                                            <div>
                                                    <input style={{marginTop:'5px',marginRight: '15px', height:'15px', width:'15px'}} type="radio" id="180" name="tipopedido"  value="180"  onClick={(e) => handleChange(e)}/>
                                                    <label class="idLabel" for="litros"> 180 LTS</label>
                                            </div>
                                                
                                        </div>
                                        <div style={{display:'flex',flexDirection:'column', width:'47%' }}>
                                             <div>
                                                <input style={{marginTop:'5px',marginRight: '15px', height:'15px', width:'15px'}} type="radio" id="300" name="tipopedido"  value="300"  onClick={(e) => handleChange(e)}/>
                                                <label class="idLabel" for="litros"> 300 LTS</label>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div style={{display:'flex',flexDirection:'row', justifyContent:'spaceBetween', gap:'6%' }}>
                                        <div style={{display:'flex',flexDirection:'column', width:'47%' }}>
                                            <div>
                                                <input style={{marginTop:'5px',marginRight: '15px', height:'15px', width:'15px'}} type="radio" id="500" name="tipopedido"  value="500"  onClick={(e) => handleChange(e)}/>
                                                <label class="idLabel" for="litros"> 500 LTS</label>
                                            </div>
                                        </div>
                                        <div style={{display:'flex',flexDirection:'column', width:'47%' }}>
                                            <div>
                                                <input style={{marginTop:'5px',marginRight: '15px', height:'15px', width:'15px'}} type="radio" id="1000" name="tipopedido" value="1000"   onClick={(e) => handleChange(e)}/>
                                                <label class="idLabel" for="litros"> 1000 LTS</label>
                                            </div>
                                        </div>
                                    </div>
                                  
                                    
                                    
                                  
        
                                </fieldset>
                                <br></br>
                                <br></br>
                                <div style={{justifyContent: 'space-between', columnGap:'0.875rem', width:'100%', display:'flex', flexDirection:'row'}}> 
                                <div style={{width:'50%'}} align="center"> 
                                <button className="buttonVerde" style={{width:'100%', fontWeight: 'bold'}}  onClick={() => { props.unmount();}}>Regresar</button>
                                </div>
                                <div style={{width:'50%'}} align="center">
                                    <button type='submit' className='button' style={{ fontWeight: 'bold', width:'100%'}} onClick={() => {altaSolicitudTanque();}}>SOLICITAR TANQUE</button> 
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
                        </div> 
       
                        <ModalCarga modalIsOpenLoad={modalIsOpenLoad} closeModalLoad={closeModalLoad}/>

                            <Modal 
                                    isOpen={modalIsOpen}  
                                    onRequestClose={closeModal}   
                                    style={customStylesD}> 
                                    <div style={{width:'100%'}} align="center">  
                                    <img src={CorrectoImg}></img>    <br></br>
                                    <label style={{fontWeight:'bold'}}>Mensaje</label><br></br>
                                    <label>Solicitud enviada correctamente</label><br></br>
                                    <label>{Mensaje}</label>
                                    <button style={{width:'100%', color:'white', backgroundColor:'#008445'}} className="buttonLogin" onClick={closeModal}>Ok</button>
                                    </div>  
                            </Modal>

                            <Modal 
                                    isOpen={modalIsOpenE}  
                                    onRequestClose={closeModalE}   
                                    style={customStylesD}> 
                                    <div style={{width:'100%'}} align="center">  
                                    <img src={ErrorImg}></img>    <br></br>
                                    <label style={{fontWeight:'bold'}}>Mensaje</label><br></br> 
                                    <label>{MensajeError}</label>
                                    <button style={{width:'100%', color:'white', backgroundColor:'#008445'}} className="buttonLogin" onClick={closeModalE}>Ok</button>
                                    </div>  
                            </Modal> 
                </FadeIn>
            
        </div>
        <ToastContainer 
              progressClassName="toastProgress"
              position="top-center"
              />
        </div>
    );
}

export default SolicitudTanqueEstacionario;

/**
 * 
 * <label style={{TextColor:'red'}}>*</label>
*/