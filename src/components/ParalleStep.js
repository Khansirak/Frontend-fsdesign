import React, { useState, useEffect } from "react";
import { Handle } from "reactflow";

function ParallelImg({ data, isConnectable }) {
  const [isNodeSelected, setIsNodeSelected] = useState(false);

  const handleNodeClick = () => {
    setIsNodeSelected(true);

    setTimeout(() => {
      setIsNodeSelected(false);
    }, 1500);
  };
  return (
    <div
      onClick={handleNodeClick}
      style={{
        border: isNodeSelected ? "2px solid black" : "",
        width:data.width, 
        height:"20px" 
      }}
    >
      <Handle
        type="target"
        position="top"
        id="0"
        style={{ top: "50%", opacity: "0", backgroundColor: "black" }}
        isConnectable={isConnectable}
      />

      <img src={data.image} alt="Node Image" className="img-fluid "  style={{  width:"2100px", height:"20px" }} />

      <Handle
        type="source"
        position="bottom"
        id="1"
        style={{ bottom: "40%", opacity: "0", backgroundColor: "black" }}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default ParallelImg;
