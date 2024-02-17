import React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import './App.css'; 
import FadeIn from 'react-fade-in'
import nivelgaslp from './resources/nivel_gas_lp.svg'
import GaugeChart from 'react-gauge-chart' 
import { ModalCarga } from "./component/ModalCarga";
import UsuariomenuProp from './resources/UsuariomenuProp.svg'
import PromocionmenuProp from './resources/PromocionProp.svg'
import Pedido from './resources/Pedido.svg'
import LogoRomboGasLp from './resources/LogoRomboGasLp.svg'
import HistorialProp from './resources/HistorialProp.svg'
import ReactWhatsappButton from 'react-whatsapp-button';
import WhatsAppButtonGreenLarge from './resources/WhatsAppButtonGreenLarge.svg'
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import ImageViewer from "react-simple-image-viewer";
import 'react-image-lightbox/style.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


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


 
function MenuPrincipal(props){

    const isMobile = window.innerWidth <= 600;
 const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: isMobile ? '90%' : 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  padding: '50px 10px'
};


const defaultImages = [
  process.env.REACT_APP_URL + "/images/Banner-APPPetromarGAS-01.png",
  process.env.REACT_APP_URL + "/images/Banner-APPPetromarGAS-02.png",
  process.env.REACT_APP_URL + "/images/Banner-APPPetromarGAS-03.png",
];
const [galleryImages, setGalleryImages] = useState(defaultImages);

const [isGalleryOpen, setIsGalleryOpen] = useState(false);

const handleGalleryChange = () => {
  setGalleryImages([
    // New set of images
    process.env.REACT_APP_URL + "/images/Banner-320x568-02.png",
    process.env.REACT_APP_URL + "/images/Banner-320x568-01.png",
    process.env.REACT_APP_URL + "/images/imagen1-webp.webp",
  ]);
};

const handleImageClick = (index) => {
  setCurrentImage(index);
  setIsViewerOpen(true);
  setIsGalleryOpen(true);
  handleGalleryChange();
};

const handleCloseGallery = () => {
  setIsGalleryOpen(false); // Set gallery open status to false
  setGalleryImages(defaultImages);
};


	useEffect(() => { 
        openModal();
        obtenerSaldo();
	},[])

    function openModal() { 
		setIsOpen(true); 
	}  
	   
	function closeModal() {
		setIsOpen(false); 
	}

	function openModalLoad() { 
		setIsOpenLoad(true); 
	}  
	   
	function closeModalLoad() { 
		setIsOpenLoad(false); 
	}
	const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);

    const [ValorTanque, setValorTanque] = useState();
    const[SaldoDisponible, setSaldo] = useState(); 

    const [modalIsOpenE, setIsOpenE] = React.useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModalE() { 
        setIsOpenE(true); 
    }  
    
    function closeModalE() { 
        setIsOpenE(false); 
    }


    const [currentImage, setCurrentImage] = useState(0); 
    const [isViewerOpen, setIsViewerOpen] = useState(false); 
    const closeImageViewer = () => { 
        setCurrentImage(0); 
        setIsViewerOpen(false); 
    }; 
    const images = [ 
        process.env.REACT_APP_URL+"/images/Banner-APPPetromarGAS-01.png", 
        process.env.REACT_APP_URL+"/images/Banner-APPPetromarGAS-02.png", 
        process.env.REACT_APP_URL+"/images/Banner-APPPetromarGAS-03.png" 
    ];
    
    const imgRef = useRef();


     
    const[Mensaje, setMensaje] = useState(); 


    async function obtenerSaldo(){    
		let fd = new FormData()    
        fd.append("id", "obtenerSaldo")   
        fd.append("noConsumidor", props.identificador_externo)   
		const res = await axios.post(process.env.REACT_APP_API_URL, fd); 
         console.log(res.data);
        setSaldo(res.data); 
        props.saldoCliente(res.data);

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
                   openModalE();
                    
                   setValorTanque(valor / 100);
                   ValorTanque(setValorTanque);
            }
        
	}


    function Seleccionar(elemento){  
        props.unmount(elemento);   
    }

 
    function logOut() {
    
        if (window.Android){
            window.Android.showToast("", "", "", "", "", "", "0");
         
        }else{
        
        try { 

                var jsonStr = '{"telefono":"","noConsumidor":"","nombres":"","apellidos":"","email":"","identificador_externo":"","loggeado":"", "tipo":"0"}';

                window.webkit.messageHandlers.callbackHandler.postMessage(jsonStr); 
            } catch (error) {
                
            }
            window.location.reload();
        }
		    	

        
    }

     
   
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
  {galleryImages.map((imageUrl, index) => (
    <div key={index} onClick={() => handleImageClick(index)}>
      <img src={imageUrl} style={{ maxWidth: '700px', cursor: 'pointer', height: '8rem' }} alt={`Image ${index + 1}`} />
    </div>
  ))}
</Carousel>
                 
{isViewerOpen && (
  <ImageViewer
    src={galleryImages}
    currentIndex={currentImage}
    onClose={() => {
      closeImageViewer();
      handleCloseGallery(); // Call handleCloseGallery when the gallery is closed
    }}
    disableScroll={false}
    backgroundStyle={{
      backgroundColor: "rgba(0,0,0,0.9)",
      zIndex: 9999,
    }}
    closeOnClickOutside={true}
  />
)}
                </div><br></br>

            </div>
                                <Modal  
                                  open={modalIsOpen}
                                  onClose={closeModal}
                                  aria-labelledby="modal-modal-title"
                                  aria-describedby="modal-modal-description"
                                >
                                  <Box sx={style}>
                                    
                                    <IconButton
                                      aria-label="close"
                                      style={{ position: 'absolute', top: 8, right: 8 }}
                                      onClick={closeModal}
                                    >
                                      <CloseIcon />
                                    </IconButton>

                                    <img src={process.env.REACT_APP_URL + "/images/GASApp-Popup.gif"} style={{ width: '100%', display:'block' }} />

                                   
                                    <Button
                                      onClick={closeModal}
                                      style={{ position: 'absolute', bottom: 8, right: 8 }}
                                    >
                                      Cerrar
                                    </Button>
                                  </Box>
                                </Modal>

  
      <Modal
        open={modalIsOpenLoad}
        onClose={closeModalLoad}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Loading...
          </Typography>
        </Box>
      </Modal>
            
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