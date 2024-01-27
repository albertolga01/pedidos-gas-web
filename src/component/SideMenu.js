import React, { useState, useEffect, useSyncExternalStore } from 'react'
import App from '../App'; 
import NuevoPedido from '../NuevoPedido';
import Usuario from '../Usuario';
import axios from "axios";
import Novedades from '../Novedades';
import OpcionesMenu from './OpcionesMenu';  
import MenuPrincipal from '../MenuPrincipal';  
import { push as Menu } from 'react-burger-menu';
import Backgroundgas from './Background-gas.png';
import DetalleSaldo from '../DetalleSaldo';
import Historial from '../Historial';
import Abonar from '../Abonar';
import BuscarConsumidor from '../BuscarConsumidor';
import Avisoprivacidad from '../Avisoprivacidad';
import AcercaDe from '../AcercaDe';
import Ayuda from '../Ayuda';
import PreguntasFrecuentes from '../PreguntasFrecuentes';
import SolicitudTanqueEstacionario from '../SolicitudTanqueEstacionario';
import EditarPedido from '../EditarPedido';
import PasarelaPago from '../PasarelaPago';
import Direcciones from '../Direcciones';
import LibretaDirecciones from '../LibretaDirecciones';

export default function SideMenu(props) {
    window.event = new Event('event');

    window.addEventListener('event', function() {
        console.log("evento menu"); 
        setSelect("MenuPrincipal");
    }, false);
 

    const [selected, setSelect] = useState(props.selected);
    const [usuario, setUsuario] = useState(props.userid);
    const [isMenuOpen1, SetIsMenuOpen1] = useState(false); 
    const [ref, setRef] = useState(false); 
    const [title, setTitle] = useState("titul"); 
    const [n, setN] = useState(); 
    const [saldo, setSaldo] = useState(); 
    const [folio_pedido, setFolio_Pedido] = useState(); 
    const [Cantidad, setCantidad] = useState(); 
    // console.log(props.selected); 
  
    const[PrecioGas, setPrecioGas] = useState(); 
    const[idDireccion, setIdDireccion] = useState(); 
    const [idTest, setTest] = useState([]);
    const [direccion, setDireccion] = useState([]);

    function close(selected){
        setSelect(selected);
        if(isMenuOpen1 == true){
            SetIsMenuOpen1(false);
        } 
    } 
        useEffect(() => {
            ObtenerPrecio(); 
        },[])
    
    async function ObtenerPrecio(){    
		let fd = new FormData()    
        fd.append("id", "ObtenerPrecios")   
		const res = await axios.post("https://sistemagas.grupopetromar.com/scripts/obtenerPrecioGPLP.php", fd); 
		var json = JSON.parse(JSON.stringify(res.data));
		console.log(json.precio_venta); 
        //var precio = json["precio_venta"].precio;
        setPrecioGas(json.precio_venta.slice(0,-2)); 
        //document.getElementById("precioGas").innerHTML =  "$" +json["productos"]["GAS"].precio;
		//console.log(res.data); 
	}

    

    function cambiarSelected(selected, iddireccion, test, direccion){ 
        setIdDireccion(iddireccion)
        setTest(test)
        close(selected);  
        setDireccion(direccion);  

    }

    function cambiarSelectedEditar(selected, folio_pedido){ 
        setFolio_Pedido(folio_pedido);
        close(selected);  
    }

    function saldoCliente(saldoc){
        setSaldo(saldoc);
    }
   
    var isMenuOpen = function(state) {
 
        SetIsMenuOpen1(state.isOpen);
        return state.isOpen;
      }; 

    const Element = () => {

          if (selected === 'NuevoPedido') {
            return <NuevoPedido direccion={direccion} PrecioGas={PrecioGas} unmount={cambiarSelectedEditar} unmount1={cambiarSelected} correo={props.correo} telefono={props.telefono} nombres={props.nombres} apellidos={props.apellidos} numero_consumidor={props.numero_consumidor} identificador_externo={props.identificador_externo}  />;
        } else if (selected === 'Usuario') {
            return <Usuario unmount={cambiarSelected}  nombres={props.nombres} apellidos={props.apellidos} numero_consumidor={props.numero_consumidor} identificador_externo={props.identificador_externo} />;
        }else if (selected === 'Novedades') {
            return <Novedades  unmount={cambiarSelected} nombres={props.nombres} apellidos={props.apellidos} numero_consumidor={props.numero_consumidor} identificador_externo={props.identificador_externo} />;
        }else if (selected === 'DetalleSaldo') {
            return <DetalleSaldo  saldoCliente={saldo} unmount={cambiarSelected} nombres={props.nombres} apellidos={props.apellidos} numero_consumidor={props.numero_consumidor} identificador_externo={props.identificador_externo} saldo={props.saldo}/>;
        }else if (selected === 'Abonar') {
            return <Abonar  unmount={cambiarSelected} nombres={props.nombres} apellidos={props.apellidos} numero_consumidor={props.numero_consumidor} identificador_externo={props.identificador_externo} />;
        }else if (selected === 'Historial') {
            return <Historial  unmount={cambiarSelected} nombres={props.nombres} apellidos={props.apellidos} numero_consumidor={props.numero_consumidor} identificador_externo={props.identificador_externo} />;
        }else if (selected === 'BuscarConsumidor') {
            return <BuscarConsumidor  unmount={cambiarSelected} nombres={props.nombres} apellidos={props.apellidos} numero_consumidor={props.numero_consumidor} identificador_externo={props.identificador_externo} />;
        }else if (selected === 'Avisoprivacidad') {
            return <Avisoprivacidad  unmount={cambiarSelected} nombres={props.nombres} apellidos={props.apellidos} numero_consumidor={props.numero_consumidor} identificador_externo={props.identificador_externo} />;
        }else if (selected === 'AcercaDe') {
            return <AcercaDe  unmount={cambiarSelected} nombres={props.nombres} apellidos={props.apellidos} numero_consumidor={props.numero_consumidor} identificador_externo={props.identificador_externo} />;
        }else if (selected === 'PreguntasFrecuentes') {
            return <PreguntasFrecuentes  unmount={cambiarSelected} nombres={props.nombres} apellidos={props.apellidos} numero_consumidor={props.numero_consumidor} identificador_externo={props.identificador_externo} />;
        }else if (selected === 'SolicitudTanqueEstacionario') {
            return <SolicitudTanqueEstacionario  unmount={()=>SolicitudTanqueEstacionario>cambiarSelected('MenuPrincipal')} nombres={props.nombres} apellidos={props.apellidos} numero_consumidor={props.numero_consumidor} identificador_externo={props.identificador_externo} />;
        }else if (selected === 'Ayuda') {
            return <Ayuda  unmount={cambiarSelected} nombres={props.nombres} apellidos={props.apellidos} numero_consumidor={props.numero_consumidor} identificador_externo={props.identificador_externo} />;
        }else if (selected === 'EditarPedido') {
            return <EditarPedido  folio_pedido={folio_pedido} unmount={cambiarSelected} nombres={props.nombres} apellidos={props.apellidos} numero_consumidor={props.numero_consumidor} identificador_externo={props.identificador_externo} />;
        }else if (selected === 'PasarelaPago') {
            return <PasarelaPago cantidad={Cantidad} folio_pedido={folio_pedido} unmount={cambiarSelected} nombres={props.nombres} apellidos={props.apellidos} numero_consumidor={props.numero_consumidor} identificador_externo={props.identificador_externo} />;
        }else if (selected === 'Direcciones') {
            return <Direcciones  iddireccion={idDireccion}  unmount={cambiarSelected} correo={props.correo} telefono={props.telefono} nombres={props.nombres} apellidos={props.apellidos} numero_consumidor={props.numero_consumidor} identificador_externo={props.identificador_externo}  />;
        }else if (selected === 'LibretaDirecciones') {
            return <LibretaDirecciones test={idTest} unmount={cambiarSelected} correo={props.correo} telefono={props.telefono} nombres={props.nombres} apellidos={props.apellidos} numero_consumidor={props.numero_consumidor} identificador_externo={props.identificador_externo}  />;
        }else {
            return (<div style={{ width: '100%', textAlign: 'center', backgroundColor: '', margin: 'auto' }}><h1>Error al Cargar</h1></div>);
        } 
    }

    useEffect(() => {
          
		// eslint-disable-next-line
	},[])
  
 
   
    /*
        function Not(data, user){
            
            console.log(data.mensaje+ " " + data.userid + " " + props.userid);
    if(data.userid === props.userid && data.tipo === "act"){   
                Push.create("Notificación: ", { 
                body:  data.mensaje, 
                icon: 'https://actividades.grupopetromar.com/favicon.png', 
                timeout: 5000, 
                onClick: function () { 
                window.focus(); 
                this.close(); 
            } 
        });      
    }
    }

    function notificaciones(){

    var pusher = new Pusher('5238df05729a28dcfb1a', { 
    cluster: 'us3' 
    }); 
    var channel = pusher.subscribe('my-channel'); 
        channel.bind('my-event', function(data) { 
            //	alert(data.mensaje + " " + data.userid + " " + JSON.stringify(data)); 
            //console.log(usuario);
        

            Not(data, props.userid);

        
    });

    }*/

 


   
        if(selected == "MenuPrincipal"){
            return (
                <div  class="containerMenuP" style={{ height: '100vh', width: '100vw', top: '0',  position: 'sticky', display: 'flex', overflowX: 'auto'}}>
                 <OpcionesMenu unmount={cambiarSelected} nombres={props.nombres} apellidos={props.apellidos}></OpcionesMenu>
            <MenuPrincipal PrecioGas={PrecioGas} saldoCliente={saldoCliente} unmount={cambiarSelected}   isMenuOpen1={isMenuOpen1} nombres={props.nombres} apellidos={props.apellidos} numero_consumidor={props.numero_consumidor} identificador_externo={props.identificador_externo} saldo={props.saldo}></MenuPrincipal>
            </div>
            )
        }else{
            return (
           
           <div  class="divPrincipal" style={{ height: '100vh', width: '100vw', top: '0',  position: 'sticky', display: 'flex', flexDirection:'column', overflowX: 'auto'}}>
                     {/*   <OpcionesMenu unmount={cambiarSelected}   isMenuOpen1={isMenuOpen1} nombres={props.nombres} apellidos={props.apellidos} numero_consumidor={props.numero_consumidor} identificador_externo={props.identificador_externo}></OpcionesMenu>
                     <div style={{width:'100%', display:'flex', flexDirection:'row', flexWrap:'wrap', backgroundColor:'#0158A0',  borderRadius: '0px 0px 9px 9px', boxShadow: 'rgb(0 0 0 / 45%) 0px 5px 15px'}}> 
                <div style={{width:'100%', color:'white', fontSize:'20px'}} align="center"> 
                <br></br>
                <br></br>
                <label style={{margin: '20px', fontWeight: 'bold'}}>Nuevo Pedido</label> <br></br>
                <br></br>
                </div>
                 
                 
           </div>
               */}         <Element  selected={selected} style={{backgroundColor:'red'}} />   
                    </div>
                )
        }
        
  
}
