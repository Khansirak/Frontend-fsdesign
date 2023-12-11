import React, { useState,useEffect } from "react";
import { Handle } from 'reactflow';


function TransitionImg({ data, isConnectable }) {  
    const [text, setText] = useState('Add Input');
    const [number, setNumber] = useState(5);
    useEffect(() => {
        // Restore saved value from localStorage on component mount
        const savedValue = localStorage.getItem('inputValue');
        if (savedValue) {
          setText(savedValue);
        }
      }, []);
    const onInputChange = (event) => {
        setText(event.target.value);
        localStorage.setItem('inputValue', event.target.value);
      };
      const onInputChange1 = (event) => {
        setNumber(event.target.value);
        
      };
  return (
    <div className='' style={{width:"100px"}}>

      <Handle type="target" position="top" id="0" style={{  top: "50%", opacity: "0",  backgroundColor:"black"}} isConnectable={isConnectable} />
      <input type="text" className='p-0 no-border' value={text}  style={{width:"46px", height:"10px", fontSize:"10px"}} onChange={onInputChange}  />
     <img src={data.image} alt="Node Image" className="img-fluid" />
     <input type="text" className='p-0 no-border' value={number}  style={{width:"15px", height:"10px", fontSize:"10px"}} onChange={onInputChange1}  />
      <Handle type="source" position="bottom" id ="1"  style={{ bottom: "40%", opacity: "0",backgroundColor: "black"}} isConnectable={isConnectable} />
 
     
    </div>
  );
}

export default TransitionImg;
