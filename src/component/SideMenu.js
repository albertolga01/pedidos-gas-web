import React, { useState, useEffect, useSyncExternalStore } from 'react'
import NuevoPedido from '../NuevoPedido';
import Usuario from '../Usuario';
import axios from "axios";
import Novedades from '../Novedades';
import OpcionesMenu from './OpcionesMenu';  
import MenuPrincipal from '../MenuPrincipal';  
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
    const [isMenuOpen1, SetIsMenuOpen1] = useState(false); 
    const [saldo, setSaldo] = useState(); 
    const [folio_pedido, setFolio_Pedido] = useState(); 
    const [Cantidad, setCantidad] = useState(); 
  
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
        setPrecioGas(json.precio_venta.slice(0,-2)); 

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
                         <Element  selected={selected} style={{backgroundColor:'red'}} />   
                    </div>
                )
        }
        
  
}
