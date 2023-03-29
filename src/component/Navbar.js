import React from 'react';
  
import OpcionesMenu from './OpcionesMenu';  

export  const Navbar = (props) =>(
<div className="m-2">
  
{/* <OpcionesMenu unmount={props.cambiarSelected} nombres={props.nombres} apellidos={props.apellidos}></OpcionesMenu>*/}

  <nav style={{borderRadius:'5px', width:'100%',  position: 'relative', display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between'}}>
<div style={{width:'100%', display:'flex', paddingTop:'20px', paddingBottom: '10px',flexDirection:'row', flexWrap:'wrap', backgroundColor:'#0171CE',  borderRadius: '0px 0px 9px 9px', boxShadow: 'rgb(0 0 0 / 45%) 0px 5px 15px'}}> 
                <div style={{width:'100%', color:'white', fontSize:'20px'}} align="center">  
                <label style={{margin: '20px', fontWeight: 'bold'}}>{props.titulo}</label> <br></br> 
                </div>
                </div>  

    
 {/*  <label style={{ width:'100%', textAlign:"center", color:'white', fontFamily: "'Roboto', Sans-Serif", fontSize:'20px', fontWeight:'bold'}}>{props.titulo}</label>
  */}
  </nav> 
</div>

)
 
    export const NavbarPass = () =>(
		<div className="m-2">
			<nav style={{borderRadius:'5px', border:'2px solid #0071ce',backgroundColor:'white', position: 'relative', display: 'flex', 
			flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', paddingTop: '.3rem', paddingBottom: '.3rem'}}>
				<label style={{marginLeft:'15px', color:'#0071ce', fontFamily: "'Roboto', Sans-Serif", fontSize:'16px', fontWeight:'bold'}}>Cambiar contraseña</label>
			</nav>
		</div>
    )