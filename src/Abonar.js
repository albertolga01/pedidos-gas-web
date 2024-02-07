import React from "react";
import { useState, useEffect } from "react";
import './App.css'; 
import {Navbar} from './component/Navbar';  
import Backgroundgas from './component/Background-gas.png'
import StripeContainer from './component/StripeContainer'; 
 

function Abonar(props){

    const[pagar, setPagar] = useState(true);
////////////////////////////////////////////////// 
    const[Cantidad, setCantidad] = useState();

    const [modalIsOpenLoad, setIsOpenLoad] = React.useState(false);

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalIsOpenE, setIsOpenE] = React.useState(false);
 
	useEffect(() => {
        setCantidad(50); 
        
	},[])

    function Seleccionar(){  
        props.unmount("MenuPrincipal");   
    }
 

 
    
        return(
          <>

                {(pagar) ?
                    
                    <div   style={{margin: 'auto', width:'80%' , height: '100vh', backgroundImage: Backgroundgas}} align="center"> 
    
                         <div style={{ display: 'flex', flexDirection: 'column', width: '100%'}} align="center">
    
                            <Navbar titulo="Abonar" />
                            <br></br>
                            <br></br>
                            <label class="idLabel">Seleccionar Cantidad</label>
                            <select  id="cantidadf" onChange={e => setCantidad(e.target.value)} className="select-css"  style={{width:'100%', marginTop:'5px'}}>
                                        <option value="50">50 Pesos</option>
                                        <option value="100">100 Pesos</option>
                                        <option value="200">200 Pesos</option>
                                        <option value="300">300 Pesos</option>
                                        <option value="500">500 Pesos</option>
                                        
                                </select>
                            <br></br>   
                            <label class="idLabel">Cantidad (Importe) </label>
                            <input type='number' class="input-css" onChange={e => setCantidad(e.target.value)}></input><br></br>

                                <br></br>
                                <div style={{justifyContent: 'space-between', columnGap:'0.875rem', width:'100%', display:'flex', flexDirection:'row'}}> 
                                <div style={{width:'50%'}} align="center"> 
                                <button className="buttonVerde" style={{width:'100%', fontWeight: 'bold'}} onClick={() => { Seleccionar();}}>Regresar</button>
                                </div>
                                <div style={{width:'50%'}} align="center"> 
                                    <button type='submit' className='button' style={{ fontWeight: 'bold', width:'100%'}} onClick={() => setPagar(false)}>Confirmar Abono</button>
                                    </div>
                                </div>                    
                                <br></br>

                        
                        </div>
                        </div> 
                :
                    <>
                     <div  style={{margin: 'auto', width:'80%' , height: '100vh', backgroundImage: Backgroundgas}} align="center"> 
                     <br></br> <br></br> <br></br>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%'}} align="center">
                             <StripeContainer unmount={props.unmount} cantidad={Cantidad} identificador_externo={props.identificador_externo} nombres={props.nombres} apellidos={props.apellidos}/>
                             </div>
                        </div> 
                    </>
                }
             
                
             </>
    
                
            
        );
    
     

}

export default Abonar;
