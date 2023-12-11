import { Handle } from 'reactflow';
import React, { useState, useEffect } from "react";

function ImgNodeChainEnd({ data, isConnectable }) {  

  const [isNodeSelected, setIsNodeSelected] = useState(false);



  return (
    <div className='' 
    style={{
      border: isNodeSelected ? '2px solid black' : '',
      width: "100px",
    }}>

      <Handle type="target" position="top" id="0" style={{  top: "50%", opacity: "0",  backgroundColor:"black"}} isConnectable={isConnectable} />
     <img src={data.image} alt="Node Image" className="img-fluid" />
     <input
        type="text"
        className="p-0 no-border"
        defaultValue="End"
        style={{ width: "46px", height: "20px", fontSize: "10px" }}
      />
    </div>
  );
}

export default ImgNodeChainEnd;
