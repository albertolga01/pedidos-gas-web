import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'; 
import Modal from 'react-modal';
import {Navbar} from './component/Navbar';  
import Backgroundgas from './component/Background-gas.png'
import CorrectoImg from './resources/Correcto.svg'
import FadeIn from 'react-fade-in';
import ErrorImg from './resources/error.svg'
import { ModalCarga } from "./component/ModalCarga";
import { Input } from 'semantic-ui-react' 
import { ToastContainer, toast } from 'react-toastify';
import { MdErrorOutline } from "react-icons/md";
 
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


function NuevoPedido(props){

    const inlineStyle = {
        input : {
          backgroundColor: '#0071ce',
        }
      };

////////////////////////////////////////////////// 
    const[Comentarios, setComentarios] = useState();
    const[CalleNumero, setCalleNumero] = useState();
    const[Ciudad, setCiudad] = useState();
    const[Colonia, setColonia] = useState();
    const[Importe, setImporte] = useState();
    const[CodigoPostal, setCodigoPostal] = useState(); 

    const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalIsOpenE, setIsOpenE] = React.useState(false);
    const[Mensaje, setMensaje] = useState(); 
    const[MensajeError, setMensajeError] = useState(); 
    const [isModalOpen, setModalOpen] = useState(false);
const [modalMessage, setModalMessage] = useState("");
    const [selectedDireccionInfo, setSelectedDireccionInfo] = useState({
        Colonia: "",
        CodigoPostal: "",
        CalleNumero: "",
        Ciudad:""
      });
 
	useEffect(() => {
        obtenerConsumidor();
        currentDate();
        tipoPedido();
        console.log(props.direccion)
    }, []);
  

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
        props.unmount("Historial");   
		setIsOpen(false); 
	}

    function openModalE() { 
		setIsOpenE(true); 
	}  
	   
	function closeModalE() { 
		setIsOpenE(false); 
	}

    function Seleccionar(){  
        props.unmount("MenuPrincipal");   
    }


    function notify(message){
        toast(message);
    }
  

    async function obtenerConsumidor() {
        if (props.direccion != undefined) {
      
          setColonia(props.direccion.Colonia);
          setCalleNumero(props.direccion.CalleNumero);
          setCodigoPostal(props.direccion.CodigoPostal);
          setCiudad(props.direccion.Ciudad);
        } else {
          
          let fd = new FormData();
          fd.append("id", "obtenerConsumidor");
          fd.append("folioconsumidor", props.numero_consumidor);
          openModalLoad();
          const res = await axios.post(process.env.REACT_APP_API_URL, fd);
          closeModalLoad();
          console.log(res.data);
          if (res.data[0].comentario !== undefined && res.data[0].comentario !== "undefined") {
            setComentarios(res.data[0].comentario);
          } else {
            setComentarios("");
          }
          setCalleNumero(res.data[0].calle_numero);
          setColonia(res.data[0].colonia);
          setCodigoPostal(res.data[0].codigo_postal);
          setCiudad(res.data[0].ciudad);
        }
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
        if(hora>= "06:00" && hora <= "19:00" ){
            return true;
        }else{
            return false;
        }
    }

    function validarHora(hora){
        var hoy = new Date()
        var horaActual = ('0' + (hoy.getHours())).slice(-2) + ':' + ('0' + hoy.getMinutes()).slice(-2);
       
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
 
    let numericValue = 0;

    async function altaPedido(){  
        var fechaValida = validarDia(document.getElementById("FechaPedido").value);
        var horaAtencion = validarHorarioAtencion(document.getElementById("HoraPedido").value);
        var domingo = validarDomingo(document.getElementById("FechaPedido").value);

        if(fechaValida == false){
            setMensajeError("No se puede programar pedido para un día y/o hora anterior al actual");
            openModalE();
            
            
        }
        if(horaAtencion == false){
            setMensajeError("No se puede programar pedido fuera del horario de atención");
            openModalE();
        }

        if(domingo == true){
    
            setMensajeError("No se puede programar pedido para día domingo");
            openModalE();
         
        }

        if(fechaValida == true && horaAtencion == true && domingo == false){ 
            let cantidadServicio = 1;
            

            let pesos = document.getElementById("tipopesos");
            let litros = document.getElementById("tipolitros"); 
            var cantidad = 0;
            var inputElementId = document.getElementById("tipopesos").checked ? "inputpesos" : "inputlitros";
            var testing = document.getElementById(inputElementId).value;
            if(pesos.checked){ 
                 cantidad = numericValue;
                 cantidad = (cantidad / props.PrecioGas).toFixed(2);
                            }
            if(litros.checked){
                cantidad = numericValue;
            }

            if(cantidad == "" || cantidad == undefined || testing == "" || testing == undefined){
                setModalMessage("Ingrese un importe o cantidad");
                setModalOpen(true);
                return false;
            }else{ 
                cantidadServicio = cantidad;
            }
            
             
           let fd = new FormData()   
            fd.append("id", "altaPedido")  
            fd.append("identificadorexterno", props.numero_consumidor) 
            fd.append("fecha", document.getElementById("FechaPedido").value)  
            fd.append("hora", document.getElementById("HoraPedido").value)  
            fd.append("comentarios", Comentarios)  
            fd.append("cantidad", cantidadServicio)  
            fd.append("consumidor_id", props.numero_consumidor)  
            fd.append("rutaid", "0")
            fd.append("correo", "0")
            fd.append("nombres", props.nombres)
            fd.append("apellidos", props.apellidos)
            fd.append("telefono", "0")
            fd.append("colonia", Colonia)
            fd.append("calle_numero", CalleNumero)
            fd.append("codigo_postal", CodigoPostal)
            fd.append("ciudad", Ciudad)
            fd.append("importe", Importe)
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
      
            
            
             if (json.folio!= undefined){
                setMensaje("folio: "+json.folio + " cantidad: "+json.cantidad+ " estatus: "+json.estatus);
                openModal();
                
                
                
            }else{ 
                openModalE();
                setMensajeError("Error"); 
                if(String(json[0].pedidopendiente).length > 1){
                    if(window.confirm("pedido pendiente editar fecha y hora folio: "+json[0].pedidopendiente) == true) {
                        props.unmount("EditarPedido", json[0].pedidopendiente); 
                      }  
                      return;
                }  
                
            } 
            
        }
	}

    function currentDate(){ 
        var hoy = new Date()
        hoy.setMinutes ( hoy.getMinutes() + 30 ); 
        var fecha = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2) ;
         var hora = ('0' + (hoy.getHours())).slice(-2) + ':' + ('0' + (hoy.getMinutes())).slice(-2);
     
        document.getElementById("FechaPedido").value = fecha;
        document.getElementById("HoraPedido").value = hora; 

	}

    

    

    function tipoPedido(){
        let pesos = document.getElementById("tipopesos");
        let litros = document.getElementById("tipolitros"); 
        document.getElementById("inputlitros").value = "";
        document.getElementById("inputpesos").value = "";

        document.getElementById('inputpesos').addEventListener('input', function(event) {
            let inputValue = event.target.value;
    
            let cleanedValue = inputValue.replace(/[^0-9]/g, '');
  
            if (!isNaN(cleanedValue)) {
                numericValue = parseInt(cleanedValue);
            }

            event.target.value = cleanedValue !== '' ? '$' + cleanedValue : '';
        });

    document.getElementById('inputlitros').addEventListener('input', function(event) {
        let inputElement = event.target;
        let inputValue = inputElement.value;
    
        let cursorPosition = inputElement.selectionStart;
    
        let cleanedValue = inputValue.replace(/[^0-9]/g, '');
    
        if (cleanedValue !== '') {
            numericValue = parseInt(cleanedValue);  // Store the numeric value
            cleanedValue += 'L';
        }
    
        inputElement.value = cleanedValue;
    
        inputElement.setSelectionRange(cursorPosition, cursorPosition);
    });
        if(pesos.checked){
      
       
            document.getElementById("divpesos").style.display = "block";
            document.getElementById("divlitros").style.display = "none";
            
             

        }
        if(litros.checked){
    
            document.getElementById("divpesos").style.display = "none";
            document.getElementById("divlitros").style.display = "block";
        }
    }


    function disabledInput(){
        notify("No es posible modificar esta información en este apartado, favor de ingresar a la sección de usuario para actualizar sus datos");
    }


    return(
       <div style={{width:'100%'}}>
         <Navbar titulo="Nuevo Pedido" cambiarSelected={props.unmount} /> 
        <div  style={{margin: 'auto', width:'80%' , height: '100vh', backgroundImage: Backgroundgas}} align="center"> 

          <FadeIn>
            
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%'}} align="center">

               
                <br></br>
                <br></br>
                      <div style={{display:'flex',flexDirection:'row', justifyContent:'spaceBetween', gap:'6%' }}>
                         <div style={{display:'flex',flexDirection:'column', width:'47%' }}>
                            <label class="idLabel">Colonia</label>
                            <Input readOnly={true}  className='input' onClick={() => disabledInput()} type="text" 
												placeholder='Colonia' 
												style={{width:'100%', inlineStyle}}
                                                value={Colonia}
                                                onChange={(e) => setSelectedDireccionInfo((prev) => ({ ...prev, Colonia: e.target.value }))}  
											/>
                            
                            </div>
                        <div style={{display:'flex',flexDirection:'column', width:'47%' }}>
                           <label class="idLabel">Código Postal</label>
                           <Input  readOnly={true}  onClick={() => disabledInput()}  type="text" 
												placeholder='Código Postal'
												style={{width:'100%',  backgroundColor: '#0071ce'}}
                                                defaultValue={CodigoPostal}
                                                onChange={e => setCodigoPostal(e.target.value)}
											/>
                                       
                           </div>
                    </div> 
                    <label class="idLabel">Calle y Número</label> 
                    <Input readOnly={true}  onClick={() => disabledInput()}  type="text" 
												placeholder='Calle/Numero' 
												style={{width:'100%'}}
                                                defaultValue={CalleNumero}
                                                onChange={e => setCalleNumero(e.target.value)}
											/>
               
                    <label class="idLabel">Ciudad</label> 
                    <Input readOnly={true}  onClick={() => disabledInput()}  type="text" 
												placeholder='Ciudad' 
												style={{width:'100%'}}
                                                defaultValue={Ciudad}
                                                onChange={e => setCiudad(e.target.value)}
											/>
                    <br></br>
                    <button className="buttonVerde" style={{width:'60%', fontWeight: 'bold',background: 'linear-gradient(#999, #666)', alignSelf : 'center'}} onClick={() => {  props.unmount1("LibretaDirecciones", "", "1")}}>Cambiar Direccion</button>
                    <br></br>
                    <div style={{display:'flex',flexDirection:'row', justifyContent:'spaceBetween', gap:'20px' }}>
                         <div style={{display:'flex',flexDirection:'column', width:'50%' }}>
                            <label class="idLabel">Fecha:</label>
	                        <input id="FechaPedido" class="idInput"   style={{width:'100%', marginTop:'5px'}} type="date"/><br></br>
                         </div>
                         <div style={{display:'flex',flexDirection:'column', width:'50%' }}>
                              <label class="idLabel">Hora:</label>
	                        <input id="HoraPedido" class="idInput"  style={{width:'100%', marginTop:'5px'}} type="time"/><br></br>
                         </div>
                    </div>

                    <div style={{display:'flex',flexDirection:'row', justifyContent:'spaceBetween', gap:'20px' }}>
                    

                    </div>
                    
                    <div style={{display:'flex',flexDirection:'row', justifyContent:'spaceBetween', gap:'6%' }}>
                   
                    <div style={{display:'flex',flexDirection:'column', width:'47%' }}  >
                    <fieldset>
                            <legend class="idLabel">Seleccione:</legend>
                            <div >
                            <input style={{marginRight: '15px', height:'15px', width:'15px'}} type="radio" id="tipopesos" name="tipopedido"  
                                     defaultChecked
                                     onClick={() => tipoPedido()}/>
                            <label class="idLabel" for="pesos">Pesos</label>
                           
                            </div>
                            <div>
                                 <input style={{marginTop:'5px',marginRight: '15px', height:'15px', width:'15px'}} type="radio" id="tipolitros" name="tipopedido"    onClick={() => tipoPedido()}/>
                            <label class="idLabel" for="litros">Litros</label>
                            </div>
  
                        </fieldset>
                        </div>
                        <div style={{display:'flex',flexDirection:'column', width:'47%' }} >
                         <div  id="divlitros" style={{display: 'none'}}>
                            <label class="idLabel">Cantidad (Lts)</label>
                            <Input type="text" 
												placeholder='Cantidad' 
												style={{width:'100%'}}
                                                id="inputlitros"  
											/>
                          
                         </div>
                         <div  id="divpesos">
                              <label class="idLabel">Importe</label> 
                              <Input type="text" 
												placeholder='Importe' 
												style={{width:'100%'}}
                                                id="inputpesos"  
											/>
                             <br></br>
                         </div>
                         </div>
                    </div>
                   
                    <br></br>
	   
                    <label class="idLabel">Comentarios</label>
                    <textarea class="idInput" onChange={e => setComentarios(e.target.value)} rows="15" cols="50" defaultValue={Comentarios} style={{minHeight:'90px', resize: 'none'}}></textarea><br></br>
                    <br></br>
                    <div style={{justifyContent: 'space-between', columnGap:'0.875rem', width:'100%', display:'flex', flexDirection:'row'}}> 
                    <div style={{width:'50%'}} align="center"> 
                    <button className="buttonVerde" style={{width:'100%', fontWeight: 'bold'}} onClick={() => { Seleccionar();}}>Regresar</button>
                    </div>
                    <div style={{width:'50%'}} align="center"> 
                        <button type='submit' onClick={() => altaPedido()} className='button' style={{ fontWeight: 'bold', width:'100%'}}>Confirmar Pedido</button>
                        </div>
                    </div>                    
                    <br></br>
  
              
            </div>

            <ModalCarga modalIsOpenLoad={modalIsOpenLoad} closeModalLoad={closeModalLoad}/>

                <Modal 
						isOpen={modalIsOpen}  
						onRequestClose={closeModal}   
						style={customStylesD}> 
						<div style={{width:'100%'}} align="center">  
						 <img src={CorrectoImg}></img>    <br></br>
                         <label style={{fontWeight:'bold'}}>Mensaje</label><br></br>
                         <label>Pedido realizado correctamente</label><br></br>
                         <label>{Mensaje}</label>
                         <button style={{width:'100%', color:'white', backgroundColor:'#008445'}} className="buttonLogin" onClick={closeModal}>Ok</button>
						</div>  
				</Modal>

                {isModalOpen && (
                    <Modal 
                        isOpen={isModalOpen}
                        onRequestClose={() => setModalOpen(false)}
                        style={customStylesD}
                    >
                        <div style={{width:'100%'}} align="center">  
                        <MdErrorOutline style={{ fontSize: '4rem', color: 'red' }} />    
                        <br></br>
                        <label style={{fontWeight:'bold'}}>{modalMessage}</label>
                        <button style={{width:'100%', color:'white', backgroundColor:'#008445', margin: '15px 0 0 0'}} className="buttonLogin" onClick={() => setModalOpen(false)}>Ok</button>
                        </div>
                    </Modal>
                    )}

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
				</Modal> </FadeIn>
        </div>
        <ToastContainer 
              progressClassName="toastProgress"
              position="top-center"
              />
        </div>
    );
}

export default NuevoPedido;

