import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'; 
import Modal from 'react-modal';
import { ThreeDots } from  'react-loader-spinner' 
import {Navbar} from './component/Navbar';   

import { Document,Page } from 'react-pdf/dist/esm/entry.webpack';
import loginscreen from './resources/login.png';
import buscarConsumidor from './resources/buscarConsumidor.png';
import registrarse from './resources/registrarse.png';
import menuPrincipal from './resources/menuPrincipal.png';
import altaPedido from './resources/altaPedido.png';
import pedidoRealizado from './resources/pedidoRealizado.png';
import actualizarDatos from './resources/actualizarDatos.png';
import notificacionActualizar from './resources/notificacionActualizar.png';

function PreguntasFrecuentes(props){

       
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({numPages}){
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offSet){
    setPageNumber(prevPageNumber => prevPageNumber + offSet);
  }

  function changePageBack(){
    changePage(-1)
  }

  function changePageNext(){
    changePage(+1)
  }

  
    const[Nombre, setNombre] = useState(); 

 
    function Seleccionar(){  
        props.unmount("MenuPrincipal");   
    }

    

    return(
        <div style={{width:'100%'}}>
            <Navbar titulo="Preguntas Frecuentes" />
            <div   style={{margin: 'auto', width:'90%', height: '100vh'}} align="center"> 
                <div style={{width:'100%'}} align="center">
                </div> <br></br><br></br><br></br>
                <div style={{width:'100%', backgroundColor: 'white', borderRadius:'5px', boxShadow: 'rgb(0 0 0 / 45%) 0px 5px 15px'  }}>
                <br></br>

                <h3  align="center">Buscar consumidor</h3>
                
                <div style={{justifyContent: 'space-between', columnGap:'0.875rem', width:'65%', display:'flex', flexDirection:'row'}}> 
                        <div style={{width:'90%'}} align="center"> 
                            <img style={{width:'100%', borderRadius:'5px', boxShadow: 'rgb(0 0 0 / 45%) 0px 5px 15px' }} src={loginscreen}/>
                        </div>
                        <div style={{width:'90%'}} align="center">
                            <img style={{width:'100%', borderRadius:'5px', boxShadow: 'rgb(0 0 0 / 45%) 0px 5px 15px' }} src={buscarConsumidor}/>
                        </div>
                </div>
                <p style={{padding: '10px'}} align="justify">Haga clic en <span style={{fontWeight:'bold', textDecoration: 'underline'}} >Buscar</span>, se
                 mostrará la pantalla donde solo debe ingresar su número teléfonico y seleccionar su consumidor registrado.</p>
               
                <h3  align="center">Registrarse</h3>

                <div style={{justifyContent: 'space-between', columnGap:'0.875rem', width:'65%', display:'flex', flexDirection:'row'}}> 
                        <div style={{width:'90%'}} align="center"> 
                            <img style={{width:'100%', borderRadius:'5px', boxShadow: 'rgb(0 0 0 / 45%) 0px 5px 15px' }} src={loginscreen}/>
                        </div>
                        <div style={{width:'90%'}} align="center">
                            <img style={{width:'100%', borderRadius:'5px', boxShadow: 'rgb(0 0 0 / 45%) 0px 5px 15px' }} src={registrarse}/>
                        </div>
                </div>
                <p style={{padding: '10px', margin:'0px'}} align="justify">
                Haga clic en <span style={{fontWeight:'bold', textDecoration: 'underline'}} >Registrate</span>, se 
                mostrará la pantalla donde 
                tiene que ingresar todos sus 
                datos. Una vez concluido el 
                registro al momento de dar 
                regístrate se mostrará un 
                mensaje con su consumidor
                asignado el momento de 
                terminar su registro.
                </p> 
                <p style={{fontWeight:'bold', padding: '10px'}} align="justify">Los campos marcados con un 
                * son obligatorios y no pueden 
                quedar vacíos.</p>
                <>&nbsp;</>
                <h3  align="center">Alta Pedido</h3>
                  <div style={{justifyContent: 'space-between', columnGap:'0.875rem', width:'65%', display:'flex', flexDirection:'row'}}> 
                          <div style={{width:'90%'}} align="center"> 
                              <img style={{width:'100%', borderRadius:'5px', boxShadow: 'rgb(0 0 0 / 45%) 0px 5px 15px' }} src={menuPrincipal}/> 
                          </div>
                          <div style={{width:'90%'}} align="center">
                              <img style={{width:'100%', borderRadius:'5px', boxShadow: 'rgb(0 0 0 / 45%) 0px 5px 15px' }} src={altaPedido}/>
                          </div> 
                  </div>
                  <img style={{width:'35%', borderRadius:'5px', boxShadow: 'rgb(0 0 0 / 45%) 0px 5px 15px' }} src={pedidoRealizado}/> 

                              <p style={{padding: '10px', margin:'0px'}} align="justify">
                                  En el menú principal hacemos clic en <span style={{fontWeight:'bold', textDecoration: 'underline'}} >Nuevo Pedido</span>, se 
                                  nos cargaran nuestros datos previamente registrados.</p>
                              <p style={{padding: '10px'}} align="justify">
                              Seleccionamos la fecha y hora 
                              para la entrega, además de 
                              indicar si nuestro pedido es en 
                              pesos (importe) o litros 
                              (Cantidad Lts) y dejar un 
                              comentario en caso de tener 
                              instrucciones a seguir para 
                              llegar o entrar al domicilio.
                              Al confirmar un pedido se 
                              muestra el siguiente mensaje
                              </p>
                <h3  align="center">Actualizar Datos - Usuario</h3>
                <img style={{width:'35%', borderRadius:'5px', boxShadow: 'rgb(0 0 0 / 45%) 0px 5px 15px' }} src={actualizarDatos}/>
                <p style={{padding: '10px', margin:'0px'}} align="justify">
                Al acceder al apartado de usuario 
                se pueden modificar datos que 
                estén erróneos y/o mal escritos al 
                momento de registrarse.
                Una vez corregidos los datos 
                hacemos clic en el botón de 
                actualizar.
                </p> 
                <img style={{width:'35%', borderRadius:'5px', boxShadow: 'rgb(0 0 0 / 45%) 0px 5px 15px' }} src={notificacionActualizar}/> 
                <p style={{fontWeight:'bold', padding: '10px'}} align="justify">Los campos marcados con un 
                * son obligatorios y no pueden 
                quedar vacíos.</p>
                <>&nbsp;</>
                  
                </div>
                <br></br>
                <br></br> 
                <br></br>
                <button className="buttonVerde" style={{width:'100%'}} onClick={() => { Seleccionar();}}>Regresar</button>


                <br></br>
                <br></br>
                <br></br>
            </div>
        </div>
    );
}

export default PreguntasFrecuentes;