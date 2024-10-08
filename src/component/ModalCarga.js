import React from "react"; 
import '../App.css'; 
import Modal from 'react-modal';


const customStylesF = { 	
	content: {
	  top: '50%',
	  left: '50%',
	  right: 'auto',
	  bottom: 'auto',
	  marginRight: '-50%',
      backgroundColor: 'transparent',
      border: 'none',
	  transform: 'translate(-50%, -50%)',
	},
  }; 

export const ModalCarga = (props) =>(
	<Modal 
	isOpen={props.modalIsOpenLoad}  
	onRequestClose={props.closeModalLoad}   
	style={customStylesF}> 
	<div style={{width:'200px'}}>  
		<div class="container">
		<div class="red flame"></div>
		<div class="orange flame"></div>
		<div class="yellow flame"></div>
		<div class="white flame"></div> 
		</div>
	</div> 
		<div style={{width:'100%'}} align="center">  
						 
            <label style={{fontWeight:'bold', width:'200px', color:'white', backgroundColor:'#0171CE', borderRadius:'5px', height: '40px'}}>&nbsp; &nbsp; &nbsp; Cargando...&nbsp; &nbsp; &nbsp; </label>
                         
		</div>  
</Modal>
)