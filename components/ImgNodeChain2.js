import React, { useState, useEffect } from "react";
import { Handle } from "reactflow";

function ImgNodeChain2({ data, text, isConnectable }) {
  // const [text, setText] = useState("hello");

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    data.text = newValue; // Update the inputValue in node data
  };

  const handleInputChange1 = (event) => {
    const newValue = event.target.value;
    data.inputValue1 = newValue;
  };
  const nodeStyle = {
    width: "100px",
    // border: "solid 2px"
  };

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
      border: isNodeSelected ? '2px solid black' : '',
      width: "100px",
    }}
    >
      <Handle
        type="target"
        position="top"
        id="0"
        key="0"
        style={{ top: "50%", opacity: "0", backgroundColor: "black" }}
        isConnectable={isConnectable}
      />
            <textarea
        type="text"
        className="p-0 no-border"
        defaultValue={data.text}
        onChange={handleInputChange}
        style={{ width: "48px", height: "20px" ,fontSize: "8px",resize: "none" }}
      />
        <textarea
        type="text"
        className="p-0 no-border offset-md-3"
        value="Action"
        style={{ width: "24px", height: "20px", fontSize: "8px",resize: "none" }}
      />


      <img src={data.image} alt="Node Image" className="img-fluid" />

      <input
        type="text"
        className="p-0 no-border"
        value={"Step-no: " + data.inputValue}
        style={{ width: "42px", height: "10px", fontSize: "6px" }}
      />
      <input
        type="text"
        className="p-0 no-border offset-md-5"
        defaultValue={data.inputValue1}
        onChange={handleInputChange1}
        style={{ width: "14px", height: "10px", fontSize: "6px" }}
      />
      <Handle
        type="source"
        position="bottom"
        id="1"
        key="1"
        style={{ bottom: "40%", opacity: "0", backgroundColor: "black" }}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default ImgNodeChain2;
