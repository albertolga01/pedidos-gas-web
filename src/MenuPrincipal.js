import React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import './App.css'; 
import Modal from 'react-modal';
import { ThreeDots } from  'react-loader-spinner' 
import {Navbar} from './component/Navbar';   
import bgprincipal from './resources/bg-principal.png'
import logoGlp from './resources/logoGlp.png'
import usericon from './resources/usericon.svg'
import novedades from './resources/novedades.svg'
import nuevopedido from './resources/truck.svg'
import FadeIn from 'react-fade-in'
import nivelgaslp from './resources/nivel_gas_lp.svg'
import GaugeChart from 'react-gauge-chart' 
import historialpedidos from './resources/historialpedidos.svg'
import { ModalCarga } from "./component/ModalCarga";
import NuevoPedido from "./NuevoPedido";

import UsuarioProp from './resources/usericon.svg'
import UsuariomenuProp from './resources/UsuariomenuProp.svg'
import PromocionProp from './resources/usericon.svg'
import PromocionmenuProp from './resources/PromocionProp.svg'
import PrivacidadProp from './resources/usericon.svg'
import PedidoProp from './resources/PedidoProp.svg'
import Pedido from './resources/Pedido.svg'
import LogoProp from './resources/LogoProp.svg'
import LogoRomboGasLp from './resources/LogoRomboGasLp.svg'
import HistorialProp from './resources/HistorialProp.svg'
import ConfiguracionProp from './resources/usericon.svg'
import CerrarProp from './resources/usericon.svg'
import AyudaProp from './resources/usericon.svg'
import AcercaProp from './resources/usericon.svg'
import ReactWhatsappButton from 'react-whatsapp-button';
import WhatsAppButtonGreenLarge from './resources/WhatsAppButtonGreenLarge.svg'
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import ImageViewer from "react-simple-image-viewer";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";

import Zoom from "react-img-zoom-gdn";
const customStylesD = { 	
	content: {
        width:'30%',
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
function MenuPrincipal(props){
	useEffect(() => { 
        obtenerSaldo();
	},[])


	function openModalLoad() { 
		setIsOpenLoad(true); 
	}  
	   
	function closeModalLoad() { 
		setIsOpenLoad(false); 
	}
	const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);
//////////////////////////////////////////////////
    const [ValorTanque, setValorTanque] = useState();
    const [ValorTanqueNull, setValorTanqueNull] = useState();

////////////////////////////////////////////////// 
    const[passActual, setPassActual] = useState();
    const[passNueva, setPassNueva] = useState();
    const[confirmarPass, setConfirmarPass] = useState();
//////////////////////////////////////////////////
    const[Nombre, setNombre] = useState(); 
    const[PrecioGas, setPrecioGas] = useState(); 
    const[SaldoDisponible, setSaldo] = useState(); 

//////////////////////////////////////////////////
    const [modalIsOpenE, setIsOpenE] = React.useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModalE() { 
        setIsOpenE(true); 
    }  
    
    function closeModalE() { 
        setIsOpenE(false); 
    }

    function openModal() { 
		setIsOpen(true); 
	}  
	

    const [currentImage, setCurrentImage] = useState(0); 
    const [isViewerOpen, setIsViewerOpen] = useState(false); 
    const closeImageViewer = () => { 
        setCurrentImage(0); 
        setIsViewerOpen(false); 
    }; 
    const images = [ 
        process.env.REACT_APP_URL+"/images/Anuncios-Aplicacion-02.png", 
        process.env.REACT_APP_URL+"/images/Anuncios-Aplicacion-02.png", 
        process.env.REACT_APP_URL+"/images/Anuncios-Aplicacion-04.png" 
    ];

    const imgRef = useRef();

    const onUpdate = useCallback(({ x, y, scale }) => {
        const { current: img } = imgRef; 
    
        if (img) {
          const value = make3dTransformValue({ x, y, scale });
    
          img.style.setProperty("transform", value);
        } 
      }, []);
     
    const[Mensaje, setMensaje] = useState(); 
    const[MensajeError, setMensajeError] = useState(); 	  

    

    async function obtenerSaldo(){    
		let fd = new FormData()    
        fd.append("id", "obtenerSaldo")   
        fd.append("noConsumidor", props.identificador_externo)   
		const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
		 //alert(res.trim);
         console.log(res.data);
        setSaldo(res.data); 
        props.saldoCliente(res.data);
        //document.getElementById("precioGas").innerHTML =  "$" +json["productos"]["GAS"].precio;
		//console.log(res.data); 
	}
    function FormatNumber(importe){
        
        return ((Number(importe)).toLocaleString('en-US',{
            style:'currency',
            currency:'USD',
        }));


       }
    async function ObtenerPorcentaje(){  
          
      
            let fd = new FormData()   
            fd.append("id", "obtenerPorcentaje") 
            fd.append("noConsumidor", props.identificador_externo)   
            openModalLoad();
            const res = await axios.post("https://monitoreogas.grupopetromar.com/apirest/index.php", fd);
            closeModalLoad();
            console.log(res.data);
            if(res.data == null){
                setMensaje("No está instalado el dispositivo en su tanque estacionario");
                 setValorTanque(0);
                openModalE();
            }else{
                var json = JSON.parse(JSON.stringify(res.data));
                var valor = json.dispositivos[0].porcentaje;
                //   console.log();
                   //setMensaje(json.dispositivos[0].porcentaje + " %");
                   openModalE();
                    
                   setValorTanque(valor / 100);
                   ValorTanque(setValorTanque);
            }
            
            //console.log(res.data); 
        
	}


    function Seleccionar(elemento){  
        props.unmount(elemento);   
    }

 
    function logOut() {
        /*if (window.Android){
            window.Android.showToast("", "", "", "", "", "", "0");
            //alert(res);
        }else{
            window.location.reload();
        }
		    
		*/
        if (window.Android){
            window.Android.showToast("", "", "", "", "", "", "0");
            //alert(res);
        }else{
        
        try { 

                var jsonStr = '{"telefono":"","noConsumidor":"","nombres":"","apellidos":"","email":"","identificador_externo":"","loggeado":"", "tipo":"0"}';

                window.webkit.messageHandlers.callbackHandler.postMessage(jsonStr); 
            } catch (error) {
                
            }
            window.location.reload();
        }
		    	

        
    }

    const ImageCarousel = () => {
        const [lightboxIndex, setLightboxIndex] = useState(0);
        const [isViewerOpen, setIsViewerOpen] = useState(false);
      
        const images = [
          process.env.REACT_APP_URL + '/images/Anuncios-Aplicacion-02.png',
          process.env.REACT_APP_URL + '/images/Anuncios-Aplicacion-03.png',
          process.env.REACT_APP_URL + '/images/Anuncios-Aplicacion-04.png',
          // Add more image URLs as needed
        ];
      
        const openLightbox = (index) => {
          setLightboxIndex(index);
          setIsViewerOpen(true);
        };
      
        return (
          <>
            <Carousel autoPlay interval="5000" showThumbs={false}>
              {images.map((imageUrl, index) => (
                <div key={index} onClick={() => openLightbox(index)}>
                  <img src={imageUrl} style={{ maxWidth: '700px' }} alt={`Image ${index + 1}`} />
                </div>
              ))}
            </Carousel>
      
            {isViewerOpen && (
              <Lightbox
                mainSrc={images[lightboxIndex]}
                nextSrc={images[(lightboxIndex + 1) % images.length]}
                prevSrc={images[(lightboxIndex + images.length - 1) % images.length]}
                onCloseRequest={() => setIsViewerOpen(false)}
                onMovePrevRequest={() => setLightboxIndex((lightboxIndex + images.length - 1) % images.length)}
                onMoveNextRequest={() => setLightboxIndex((lightboxIndex + 1) % images.length)}
              />
            )}
          </>
        );
      };
      
   
    return(
       
        <div className='containerMenuPrincipal' style={{margin: 'auto', width:'100%', height: '100vh', overflowX: 'scroll'}} align="center"> 
           <FadeIn>
            <div style={{width:'100%', display:'flex', flexDirection:'row', flexWrap:'wrap', backgroundColor:'#0158A0',  borderRadius: '0px 0px 9px 9px', boxShadow: 'rgb(0 0 0 / 45%) 0px 5px 15px', position:'fixed'}}> 
                <div style={{width:'100%', color:'white', fontSize:'20px'}} align="left"> 
                <br></br>
                <label style={{margin: '20px', fontWeight: 'bold'}}>Bienvenido (a):</label> <br></br>
                <label style={{margin: '20px'}}>{props.nombres} </label>  <br></br>
                <label style={{margin: '20px'}}>{ props.apellidos}</label> 
                <br></br><label>&nbsp; </label>
                </div>
                 
                 
           </div>
         
           <div hidden style={{width:'100%', color:'white', fontWeight: 'bold', fontSize:'15px'}} align="left" onClick={() => Seleccionar("DetalleSaldo")} saldo={SaldoDisponible}> <h4 style={{margin: '20px'}}>Saldo Disponible: {FormatNumber(SaldoDisponible)}</h4> </div> 
           <br></br>
           <br></br>
           <br></br>
           <br></br>
           <br></br>
           <br></br>
           <br></br>
           </FadeIn> 
            <div style={{width:'80%'}} align="center"> 
           <FadeIn>  <img src={LogoRomboGasLp} style={{width:'50%', height:'50%'}}></img>    
           </FadeIn>
            <br></br>
            <br></br>
            <div style={{boxShadow: 'rgb(0 0 0 / 45%) 0px 5px 15px',backgroundColor:'white', borderRadius:'5px'}} onClick={() => { Seleccionar("NuevoPedido");}} >
            <img style={{width:'25%', paddingTop:'25px'}} src={Pedido} ></img>
            <br></br>
            <label style={{fontWeight: 'bold'}}>NUEVO PEDIDO</label>
            <br></br>
            <br></br>
            </div><br></br>
                <div style={{justifyContent: 'space-between', columnGap:'0.875rem', borderRadius:'5px', width:'100%', display:'flex', flexDirection:'row'}}> 
                    <div style={{boxShadow: 'rgb(0 0 0 / 45%) 0px 5px 15px', width:'50%', backgroundColor:'white', borderRadius:'5px'}} align="center" onClick={() => { Seleccionar("Usuario");}}> 
                    <img style={{width:'25%', paddingTop:'25px'}} src={UsuariomenuProp}  ></img>
                    <br></br>
                    <label style={{fontWeight: 'bold'}}>USUARIO</label>
                    <br></br>
                    <br></br></div>
                    <div style={{boxShadow: 'rgb(0 0 0 / 45%) 0px 5px 15px',width:'50%', backgroundColor:'white', borderRadius:'5px'}} align="center" onClick={() => { Seleccionar("Novedades");}}> 
                    <img style={{width:'25%', paddingTop:'25px'}} src={PromocionmenuProp} ></img>
                    <br></br>
                    <label style={{fontWeight: 'bold'}}>PROMOCIONES</label>
                    <br></br>
                    <br></br>
                    </div>
                </div>
                <br></br>
                <div style={{justifyContent: 'space-between', columnGap:'0.875rem', height: '103px', borderRadius:'5px', width:'100%', display:'flex', flexDirection:'row'}}> 
                    <div style={{boxShadow: 'rgb(0 0 0 / 45%) 0px 5px 15px',width:'50%', backgroundColor:'white', borderRadius:'5px'}} align="center" onClick={() => { Seleccionar("Historial");}}> 
                    <img style={{width:'25%', paddingTop:'25px'}} src={HistorialProp}  ></img>
                    <br></br> 
                    <label style={{ fontWeight:'bold'}}>HISTORIAL</label> 
                    <br></br>
                    <br></br>
                    </div>
                    <br></br>
                    <div style={{boxShadow: 'rgb(0 0 0 / 45%) 0px 5px 15px', width:'50%', height:'100%', backgroundColor:'white', borderRadius:'5px'}} align="center"> 
                     <div style={{width:'100%', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', height:'30%', backgroundImage:'linear-gradient(#145e9c, #145e9c)'}}>
                        <label style={{color:'white' , fontSize:'25px'}}>Precio Gas</label>
                     
                     </div>
                     <div style={{width:'100%', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', height:'70%', backgroundImage:'linear-gradient(#115680, #2590d1)'}}>
                    <br></br>
                     <label id='precioGas' style={{color:'white', fontSize:'40px'}}>${props.PrecioGas}</label>
                     </div> 
                     <label style={{color:'black', fontSize:'8px'}}>Precio sujeto a cambios sin previo aviso*</label>
                    </div> 
                 
                </div>
                <br></br>
                    <div hidden style={{boxShadow: 'rgb(0 0 0 / 45%) 0px 5px 15px',backgroundColor:'white', borderRadius:'5px'}} onClick={() => ObtenerPorcentaje()} >
                    <img src={nivelgaslp} style={{width:'25%', height:'25%'}}></img>
                    <br></br>
                    <label style={{fontWeight: 'bold'}}>Nivel de Gas Lp</label>
                    <br></br>
                    <br></br>
                    </div>

                    <div>
                    <Carousel autoPlay interval={5000} showThumbs={false}>
                    {images.map((imageUrl, index) => (
                        <div key={index} onClick={() => setIsViewerOpen(true)}>
                            <img src={imageUrl} style={{ maxWidth: '700px', cursor: 'pointer' }} alt={`Image ${index + 1}`} />
                        </div>
                    ))}
                </Carousel>
                
    {/*<ImageViewer
        src={images}
        currentIndex={currentImage}
        onClose={() => setIsViewerOpen(false)}
        backgroundStyle={{
            backgroundColor: "rgba(0, 0, 0, 0.9)"
        }}
    />
    */} 
                    
{isViewerOpen && ( 
                        <ImageViewer 
                        src={images} 
                        currentIndex={0} 
                        onClose={closeImageViewer} 
                        disableScroll={false} 
                        backgroundStyle={{ 
                            backgroundColor: "rgba(0,0,0,0.9)" 
                        }} 
                        closeOnClickOutside={true} 
                        /> 
                    )}
                </div><br></br>

            </div>
            
                <Modal 
						isOpen={modalIsOpenE}  
						onRequestClose={closeModalE}   
						style={customStylesD}> 
						<div style={{width:'100%'}} align="center">  
                        <GaugeChart id="gauge-chart2" 
                        nrOfLevels={20} 
                        textColor={'black'}
                        colors={['#D02030', '#EFFA0B', '#008445']}
                         
                        percent={ValorTanque} 
                        />
                         <label style={{fontWeight:'bold'}}>Nivel de Gas LP</label><br></br> 
                          <br></br>
                           
                         <button style={{width:'100%', color:'white', backgroundColor:'#008445'}} className="buttonLogin" onClick={closeModalE}>Ok</button>
						</div>  
				</Modal>

               

                <ModalCarga modalIsOpenLoad={modalIsOpenLoad} closeModalLoad={closeModalLoad}/>
               
                <div style={{width:'80%' }} align="right">  <button style={{boxShadow: 'rgb(0 0 0 / 45%) 0px 5px 15px'}} className="buttonSalir" onClick={() => {logOut()}} >SALIR</button > </div>
                <br></br>
                <div hidden style={{width:'85%'}} align="left">
						
						<a href="whatsapp://send?text=Hola!,%20Buen%20d%C3%ADa&phone=+526699933030"> <img style={{width:'60%', paddingBottom:'5px', paddingLeft:'15px'}} alt="Chat on WhatsApp" src={WhatsAppButtonGreenLarge} />  </a>		
                         
					</div>

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
                <br></br>
                    <br></br>
              
        </div>
       
    );
}

export default MenuPrincipal;