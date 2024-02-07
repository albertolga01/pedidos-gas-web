import React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import './App.css'; 
import {Navbar} from './component/Navbar';  
import acerdadeUno from './resources/foto1acercade.jpg';
import acerdadeDos from './resources/foto2acercade.png';
import acerdadeTres from './resources/foto3acercade.png';
import acerdadeCuatro from './resources/foto4acercade.png';
import acerdadeCinco from './resources/foto5acercade.png';

import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";

function AcercaDe(props){

    function Seleccionar(){  
        props.unmount("MenuPrincipal");   
    }

    const imgRef = useRef();
    const imgRef1 = useRef();
    const imgRef2 = useRef();

  const onUpdate = useCallback(({ x, y, scale }) => {
    const { current: img } = imgRef; 

    if (img) {
      const value = make3dTransformValue({ x, y, scale });

      img.style.setProperty("transform", value);
    } 
  }, []);


  const onUpdate1 = useCallback(({ x, y, scale }) => { 
    const { current: img1 } = imgRef1; 

    
    if (img1) {
        const value1 = make3dTransformValue({ x, y, scale });
  
        img1.style.setProperty("transform", value1);
      }
  }, []);

  const onUpdate2 = useCallback(({ x, y, scale }) => { 
    const { current: img2} = imgRef2; 

    
    if (img2) {
        const value2 = make3dTransformValue({ x, y, scale });
  
        img2.style.setProperty("transform", value2);
      }
  }, []);

  
  
  

  const IMG_URL =
   "https://user-images.githubusercontent.com/4661784/" +
   "56037265-88219f00-5d37-11e9-95ef-9cb24be0190e.png";

    return(
        <div  style={{width:'100%'}}>
             <Navbar titulo="Acerca De" />
            <div   style={{margin: 'auto', width:'90%', height: '100vh'}} align="center">
                <br></br>  
               
                <div style={{width:'100%', backgroundColor: 'white', borderRadius:'5px', boxShadow: 'rgb(0 0 0 / 45%) 0px 5px 15px'  }}>
                <h2  align="left" style={{marginLeft:'5%'}} >Grupo Petromar</h2>
                <p style={{padding: '15px'}} align="justify">Somos una empresa orgullosamente sinaloense, con más de 60 años brindando servicios en la comercialización de hidrocarburos,
                donde día a día se alcanza la vanguardia para satisfacer el bienestar y la calidad de asistencia hacia nuestros clientes.</p>
                <br></br>
                <div style={{width:'100%'}} align="left">
                <QuickPinchZoom onUpdate={onUpdate2}
                style={{width:'90%', height:'180px'}}>
                <img ref={imgRef2} src={acerdadeUno} style={{width:'85%'}}/> 
                </QuickPinchZoom>
                </div>
                <h2>Nuestro servicio Grupo Petromar División Gas</h2>
                <div style={{width:'100%'}} align="left">
                <span style={{padding: '15px'}} align="justify">❯ Máxima seguridad y confianza.</span> <br></br>
                <p style={{padding: '15px'}} align="justify">❯ Estamos dedicados a brindarte el mejor trato,  a través de:</p>
                
                </div>
                <br></br>
                <br></br>
                    
                        <div style={{width:'100%'}} align="left"> 
                            <label align="justify" style={{color: '#0071CE',  height:'40px', fontSize:'20px', padding: '15px'}}> • ATENCIÓN PERSONALIZADA</label>
                        <p style={{padding: '15px'}} align="justify">Contamos con un área de atención
                        telefónica exclusiva.</p>
                        
                            <label align="justify" style={{color: '#0071CE',  height:'40px', fontSize:'20px', padding: '15px' }}> • PROGRAMACIÓN</label>
                       
                        <p style={{padding: '15px'}} align="justify">Automática de servicio, nuestro
                        sistema planifica tu próximo suministro.</p>
                            </div>
                <h2  align="justify" style={{marginLeft:'5%'}} > Nuestra Tecnología</h2>
                <img style={{width:'65%'}} src={acerdadeDos} />
                <h2 align="justify" style={{marginLeft:'5%'}}>Seguridad Total</h2>
                <p  style={{padding: '20px'}} align="justify"> ❯ Nuestra máxima prioridad es brindarte seguridad total, a través de:</p> 
                <img style={{width:'65%'}} src={acerdadeTres} />
                <br></br>
                <br></br>
                <p style={{padding: '15px'}} align="justify"> En Grupo petromar División Gas:  ¡Encontrarás GAS LP al Mejor Costo! <br></br>
                    Porque somos tu mejor aliado, te damos la confianza que necesitas. <br></br>
                    ¡Carga con nosotros y notarás la diferencia!</p>  

                 <div style={{width:'100%'}} align="left">
                <QuickPinchZoom onUpdate={onUpdate1}
                style={{width:'90%', height:'180px'}}>
                <img ref={imgRef1} src={acerdadeCuatro} style={{width:'85%'}}/> 
                </QuickPinchZoom>
                </div>
                <br></br>
                <div style={{width:'100%'}} align="left">
                <QuickPinchZoom onUpdate={onUpdate}
                style={{width:'90%', height:'180px'}}> 
                <img ref={imgRef} src={acerdadeCinco} style={{width:'85%'}}/>
                </QuickPinchZoom>
                </div>
                <>&nbsp;</>
                </div>
                <br></br><br></br>
                 <button className="buttonVerde" style={{width:'100%'}} onClick={() => { Seleccionar();}}>Regresar</button>
                <br></br>
                <br></br>
                <br></br>
            </div>
        </div>
    );
}

export default AcercaDe;