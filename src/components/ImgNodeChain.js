import { Handle } from 'reactflow';
import React, { useState, useEffect } from "react";

function ImgNodeChain({ data, isConnectable }) {  

  const [isNodeSelected, setIsNodeSelected] = useState(false);

  const handleNodeClick = () => {
    setIsNodeSelected(true);

    setTimeout(() => {
      setIsNodeSelected(false);
    }, 1500);
  };

  return (
    <div className=''  onClick={handleNodeClick}
    style={{
      border: isNodeSelected ? '2px solid black' : '',
      width: "100px",
    }}>
      <input
        type="text"
        className="p-0 no-border"
        defaultValue="Start"
        style={{ width: "46px", height: "20px", fontSize: "10px" }}
      />

      {/* <Handle type="target" position="top" id="0" style={{  top: "25%", opacity: "0",  backgroundColor:"black"}} isConnectable={isConnectable} /> */}
     <img src={data.image} alt="Node Image" className="img-fluid" />
      <Handle type="source" position="bottom" id ="1"  style={{ bottom: "5%", opacity: "0",backgroundColor: "black"}} isConnectable={isConnectable} />
 
    </div>
  );
}

export default ImgNodeChain;
