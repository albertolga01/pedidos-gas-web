import React,{useState, useEffect} from 'react';  
import './styles-login.css';
import SideMenu from './SideMenu'; 
import Registro from '../Registro';

const Novedad = (isLoggedIna) =>  {
	const [usuario, setUsuario] = useState("null");
	const [userid, setUserid] = useState("null");
	const [name, setName] = useState("null");
	const [admin, setAdmin] = useState("null");  
	const [departamento, setDepartamento] = useState("null");
	const [dptoid, setDptoid] = useState("null");
	const [tipo, setTipo] = useState("null");
	const [isLoggedIn, setisLoggedIn] = useState(isLoggedIna);  
	const [registrarse, setRegistrarse] = useState(false);  
 

    if(isLoggedIn){
		return( 
			<div>
				{(registrarse) ?
				<>
					<Registro/>
				</>
				:
				<> 
				<div id="body-content">
 
					<div id="div-form">
					<h1>Petromar Gas - Novedades</h1>
						<span>Usuario</span> 
					 
					</div>
				</div>
				</>
				}
			</div>
				
		); 
	 
	}else {
		return (
			<div >
				<SideMenu   admin={admin} departamento={departamento} usuario={usuario} userid={userid} name={name} dptoid={dptoid}  selected='Actividades' tipo={tipo} />
			</div>
		);
	}
}

export default Novedad;