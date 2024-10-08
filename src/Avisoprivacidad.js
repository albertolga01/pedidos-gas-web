import React from "react";
import { useState, useEffect } from "react";
import './App.css'; 
import {Navbar} from './component/Navbar';    
import { Document,Page } from 'react-pdf/dist/esm/entry.webpack';

function Avisoprivacidad(props){

 
    function Seleccionar(){  
        props.unmount("MenuPrincipal");   
    }



    
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


    return(
      <div style={{width:'100%'}}>
        <Navbar titulo="Aviso Privacidad" />
        <div   style={{margin: 'auto', width:'80%', height: '100vh'}} align="center"> 
            <div style={{width:'100%'}} align="center">   
             </div> <br></br><br></br><br></br>
 
                <header className="App-header1">
            <Document file="/AVISO DE PRIVACIDAD GAS UNIÓN.pdf" onLoadSuccess={onDocumentLoadSuccess}>
              <Page  width="345" height="600" pageNumber={pageNumber} />
            </Document>
            <p style={{color:'white'}}> Página {pageNumber} de {numPages}</p>
            { pageNumber > 1 && 
            <button className="buttonVerde" style={{width:'35%',}} onClick={changePageBack}>Anterior Página</button>
            }
            {
              pageNumber < numPages &&
              <button className="buttonVerde" style={{ width:'35%', marginLeft:'15px'}} onClick={changePageNext}>Siguiente Página</button>
            }
          
          </header>
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

export default Avisoprivacidad;