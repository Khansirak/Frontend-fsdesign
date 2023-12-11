import React, { useState } from "react";
import Project from './project';
import { Link } from 'react-router-dom';
import './library.css';
   //////////////TO BE DELETED /////////////
import { mockData } from './mocklibrary';

const Library = () => {

  const [name, setName] = React.useState("AND_1.png");
  const [visible, setVisible] = useState(true);
  const [visibles, setVisibles] = useState(false);
  const [active, setActive] = useState(false);
  const [active1, setActive1] = useState(false);
  const removeElement = () => {
    setVisible(() => true);
    setVisibles(() => false);
    setActive(true);
    setActive1(false);
  };
  const removeElements = () => {
    setVisible(() => false);
    setVisibles(() => true);
    setActive1(true);
    setActive(false);
  };

    return(
       <>
       
    <div className=" d-flex menu-body w-100 "  >
    <div className=" menu-body2 d-flex flex-row w-100">

    

      <div className=" d-flex row border w-100 border-info "  >

       <div className=" text-center font-weight-bold"> 
       <section className="d-flex flex-row btn-group m-1 justify-content-center navbar-nav">
       <div className =" ">
         
            <h4  className="font-weight-bold">Logic-library </h4>
        
  
          </div>
          
          </section>
      </div>

       <div className="d-flex" >
       <div className="  m-25">
          <div className="align-self-sm-center">Management</div>
            <Project />
        </div>
    
        <div className="border  border-info" > 
        jii       
        <div className=" row" >
        <nav className ="navbar ">
          <ul className ="nav m-2 d-flex  justify-content-around navbar-nav">
          <li className ="nav-item w-75 ">
            <button type="button"  className="border btn m-3 border-info" style={{backgroundColor: "#b7e778"}} >Library </button>
          </li>
          <li className ="nav-item w-75 ">
            <button type="button"  className="border  btn m-3 border-info" style={{backgroundColor: "#b7e778"}} >Connection</button>
          </li>
          <li className ="nav-item w-75">
            <button type="button" className="border btn m-3 border-info" style={{backgroundColor: "#b7e778"}}>New Input Parameter</button>
          </li>
          <li className ="nav-item w-75">
            <button type="button"  className="border btn m-3 border-info" style={{backgroundColor: "#b7e778"}}>New Output Parameter</button>
          </li>
          <li className ="nav-item w-75">
            <button type="button"  className="border btn m-3 border-info" style={{backgroundColor: "#b7e778"}}>New Graph</button>
          </li>
          <Link to="/logic">
          <li className ="nav-item pt-5 mt-5 w-75">
            <button type="button"  className="border btn m-3 border-info" style={{backgroundColor: "#b7e778"}}>Back</button>
          </li>
          </Link>
  
          </ul>
          </nav>
      </div>
        </div>


        <div className="d-flex border w-100 border-info" >        
          <div className="d-flex h-100">
          <div className=" d-flex border w-100 border-info" >        
         
          <section className="d-flex p-2 justify-content-between"> 
            <div>
            <ul className ="nav d-flex  justify-content-around navbar-nav">
          <li className ="nav-item  ">
            <button type="button"  className="border btn m-3 border-info" style={{ backgroundColor: active ? "#C0C0C0" : "#b7e778"}} onClick={removeElement}  >Logic-block </button>
          </li>
          <li className ="nav-item ">
            <button type="button"  className="border  btn m-3 border-info" style={{backgroundColor: active1 ? "#C0C0C0" : "#b7e778"}} onClick={removeElements} >Controller</button>
          </li>
          </ul>
            </div>

            {visible && 
            <div className=" forscroll border w-100   border-dark " >
              
            { mockData.map((data) => (
              
              <button className="logic-btn" onClick={() => setName(data.src)}><img className="logic-button" alt={data.src} src={require(`../images/${data.src}`)} /></button>
            ))}
          </div>
        }
        
        {visibles && 
            <div className="d-flex forscroll border w-100  align-content-center flex-wrap border-dark " >
              
            { mockData.map((data) => (
              
              <button className="logic-btn" onClick={() => setName(data.src)}><img className="logic-button" alt={data.src} src={require(`../images/AND_1.png`)} /></button>
            ))}
            
          </div>
        }
            <div>   
            <ul className ="nav m-2 d-flex w-100 justify-content-around navbar-nav">
          <li className ="nav-item  ">
            <button type="button"  className="border btn m-3 border-info" style={{backgroundColor: "#b7e778"}} >Add to Logic </button>
          </li>
          <li className ="nav-item ">
            <button type="button"  className="border w-75 btn m-3 border-info" style={{backgroundColor: "#b7e778"}} >Add input</button>
          </li>
          </ul></div>

          <div className="border w-25  border-info">
          <img className="logic-button-show  p-4"  src={require(`../images/${name}`)} />
       </div>
             </section>
        </div>
  <div >
        </div>
          </div>
       
        </div>



       </div>
      </div>
    </div>
   </div>
        </> 
    );

    };


export default Library;