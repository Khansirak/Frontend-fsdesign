import React, { useState, useEffect } from 'react';

import Addcolumn1 from './addcolumn1'
import Addrow1 from './addrow1'

const Equipement = () => {


   const [column1, setInput] = useState([<Addcolumn1 defaultValue={1} />]);
   const [column2, setInput2] = useState([<Addcolumn1 defaultValue={1} />]);
   const [row1, setInput3] = useState([]);
//Listtool
   const [visible, setVisible] = useState(true);
   const removeElement = () => {
     setVisible((prev) => !prev);
   };


//SAVE TABLE DATA 


  return (
<>

    <div className="menu-body w-100 "  >
    
    <div className=" menu-body2 d-flex flex-row">
      <div className=" row" >
        <nav className ="navbar ">
          <ul className ="nav  d-flex justify-content-start navbar-nav">
          <li className ="nav-item w-75 ">
            <button type="button"  className="border btn m-3 border-info" style={{backgroundColor: "#b7e778"}} onClick={() => {setInput3([...row1, <row1 defaultValue={row1.length + 1} />]); }}  >New entry</button>
          </li>
          <li className ="nav-item w-75">
            <button type="button"  className="border  btn m-3 border-info" style={{backgroundColor: "#b7e778"}} onClick={() => {setInput([...column1, <column1 defaultValue={column1.length + 1} />]);}}  >New column</button>
          </li>
          <li className ="nav-item w-75">
            <button type="button" className="border btn m-3 border-info" style={{backgroundColor: "#b7e778"}} onClick={() => {setInput2([...column2, <column1 defaultValue={column2.length + 1} />]);}}>New status</button>
          </li>
          <li className ="nav-item w-75 ">
            <button type="button"  className="border btn m-3 border-info" style={{backgroundColor: "#b7e778"}} onClick={() => {setInput3((prevRows) => prevRows.slice(0, -1));}} >Delete entry</button>
          </li>
          <li className ="nav-item w-75">
            <button type="button"  className="border  btn m-3 border-info" style={{backgroundColor: "#b7e778"}} onClick={() => {setInput((prevRows) => prevRows.slice(0, -1));}}>Delete column</button>
          </li>
          <li className ="nav-item w-75">
            <button type="button" className="border btn m-3 border-info" style={{backgroundColor: "#b7e778"}} onClick={() => {setInput2((prevRows) => prevRows.slice(0, -1));}}>Delete status</button>
          </li>
          </ul>
          </nav>
      </div>
      <div className=" border w-100 border-info h-100"  >
        <div className="d-flex  justify-content-between  "> 
        <div className="col text-center "><h4 className=" p-2 ">Equipement</h4></div> 
       <div> <button type="button"  className="border d-flex m-1 btn border-info" style={{backgroundColor: "#C0C0C0"}} onClick={removeElement}>List-toolbox</button></div>
        </div>
        
       <div className="d-flex h-100" >
       <div className="d-flex justify-content-center border w-100 border-info" >
        <div className=''>
          hi
       <table  className="table  mt-5  border">
    <thead>
    <tr className=''>
      <th scope="col" >Equipement modul: <input type="text" className='no-border '></input></th>
      <th scope="col"  >EM Status</th>
    
    </tr>
  </thead>
  <tbody>
    <tr scope="row">
      <td className='p-0 w-75'>
    <table id= "tb" className="table m-0 border">
    <tbody>
    <tr className='bg-light' >
    {column1.map((column1, index) => (<Addcolumn1 key={index}  />))} 

    </tr>
    {row1.map((row1, index) => (<Addrow1 key={index}  param ={column1.length} id={index} />))} 


    </tbody>
    </table>
    </td>
    <td className='p-0 w-25' >
    <table className="table m-0 border">
    <tbody>
    <tr className='bg-light'>
    {column2.map((column2, index) => (<Addcolumn1 key={index}/>))}
    </tr>
    
    {row1.map((row1, index) => (<Addrow1 key={index}  param ={column2.length}  id={index}/>))}
    </tbody>
    </table>
    </td>
    
    </tr>
  
  </tbody>
  
</table>
</div>
        </div>
        {visible && 
        <div className="border w-25 border-info">
 
  
     
        <ul className=" toolbox column d-flex p-0 ">
         <li className="border small border-info">I/O-List</li>
         <li className=" border small border-info">Signal-list</li>
         <li className=" border small border-info">Logic-In-Out</li>
         <li className=" border small border-info">Parameter</li>
         <li className=" border small border-info">EM</li>
         <li className=" border small border-info">Interlock</li>
        </ul>

       </div>
}
       </div>
      </div>

      
    </div>
   </div>

   </>

  );
};
export default Equipement;
