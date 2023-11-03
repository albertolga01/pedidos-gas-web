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

                <p style={{padding: '10px'}} align="justify">El Gas LP es un combustible muy amigable, se debe manejar siempre con seguridad.  Aquí encontrarás más información que te ayudará a conocerlo mejor y a aclarar tus dudas.</p>
                
                <h3  align="justify">¿Qué es el Gas LP?</h3>

                <p style={{padding: '10px'}} align="justify">El Gas Licuado de Petróleo, es un hidrocarburo que se deriva del petróleo, es una mezcla de propano y butano.
                Este se produce en estado vapor, pero es convertido a líquido para que pueda ser transportado hasta las plantas de almacenamiento.  En México su uso es doméstico, comercial, industrial y automotriz.
                </p>
               
                <h3  align="left">¿Cuáles son las características que tiene el Gas LP?</h3>

                <p style={{padding: '10px', margin:'0px'}} align="justify">
                El Gas LP es incoloro e inoloro en su estado natural.  Es más pesado que el aire, por lo que al momento de escaparse se ubicará en las partes más bajas del área, como pisos o sótanos.
                Además, es un combustible más limpio que la gasolina o el Diesel.
                </p> 
                 
                <>&nbsp;</>
                <h3  align="center">Entonces, si el Gas LP es inoloro en su estado natural, ¿por qué huele?</h3>

                    <p style={{padding: '10px', margin:'0px'}} align="justify">
                    Como medida de seguridad, para poder detectar alguna fuga al Gas LP se le agrega un odorizante llamado Mercaptano, de esta manera podrás detectar cuando exista alguna fuga.
                        </p>
                    
                <h3  align="center">¿Qué debo de hacer si en mi hogar huele a gas?</h3>
                <p style={{padding: '10px', margin:'0px'}} align="justify">
                Es importante que si en tu casa huele a gas sigas las siguientes instrucciones:
                <br></br>
                - Cierra la válvula de tu tanque estacionario.
                <br></br>
                - No actives ningún interruptor de luz, de ser posible corta la energía eléctrica.
                <br></br>
                - Abre puertas y ventanas, mantén el lugar ventilado.
                <br></br>
                - Reporta la fuga a nuestros números de atención de Grupo Petromar

                </p> 
                <h3  align="center">¿Cómo sé si mi tanque estacionario ya necesita ser cambiado?</h3>
                <p style={{padding: '10px', margin:'0px'}} align="justify">
                Si tienes 10 años o más con tu tanque estacionario es necesario que lo renueves.  Pero si tu tanque estacionario tiene menos años y se encuentra oxidado, solicita una revisión de parte de nuestros técnicos en Petromar GAS LP.
                Esto es muy común sobre todo en las ciudades en las que existe mucha humedad.
                </p>  
                <h3  align="center">¿Cómo sé si mi tanque está bien instalado?</h3>
                <p style={{padding: '10px', margin:'0px'}} align="justify">
                Lo principal para saber si tu instalación es segura, es que tu tanque estacionario se encuentre instalado en un área ventilada y fuera de tu casa, es decir en el patio o en la azotea.
                También es muy importante que la instalación se encuentre hecha con material especialmente diseñado para el manejo de Gas LP, como la tubería de cobre o multicapa.
                 </p> 
                 <h3  align="center">¿Puedo solicitar tanque estacionario en Grupo Petromar?</h3>
                <p style={{padding: '10px', margin:'0px'}} align="justify">
                Por supuesto, solo debes llámar al <span style={{fontWeight:'bold'}} >669 984 2020</span>, y solicita al operador mayor información.
                 </p> 
                 <h3  align="center">¿Puedo pagar con tarjeta bancaria o trasferencia?</h3>
                <p style={{padding: '10px', margin:'0px'}} align="justify">
                Contamos con la opción de pago con terminal bancaria o transferencia bancaria, pregunta a la operadora para mayor detalle al hacer tu pedido.
                 </p> 
                 <h3  align="center">¿Cómo puedo solicitar GAS LP en Grupo Petromar?</h3>
                <p style={{padding: '10px', margin:'0px'}} align="justify">
                Es muy fácil, llámanos al <span style={{fontWeight:'bold'}} >669 984 2020</span>, solicita el servicio o bien prográmalo para otro día. También puedes hacerlo desde nuestra aplicación <span style={{fontWeight:'bold'}} >“Petromar Gas”</span> en Google Play 
                 </p> 
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