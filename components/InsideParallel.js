import React, { useState, useEffect } from "react";
import { Handle } from "reactflow";

function InsideParallel({ data, isConnectable }) {
  const [text, setText] = useState("Add Input");
  const [number, setNumber] = useState(5);
  useEffect(() => {
    // Restore saved value from localStorage on component mount
    const savedValue = localStorage.getItem("inputValue");
    if (savedValue) {
      setText(savedValue);
    }
  }, []);
  const onInputChange = (event) => {
    setText(event.target.value);
    localStorage.setItem("--", event.target.value);
  };
  const onInputChange1 = (event) => {
    setNumber(event.target.value);
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
      className=""
      onClick={handleNodeClick}
      style={{
        border: isNodeSelected ? "2px solid black" : "",
        width: "100px",
      }}
    >
      <Handle
        type="target"
        position="top"
        id="0"
        style={{ top: "50%", opacity: "0", backgroundColor: "black" }}
        isConnectable={isConnectable}
      />
      <input
        type="text"
        className="p-0 no-border"
        value={text}
        style={{ width: "48px", height: "10px", fontSize: "8px" }}
        onChange={onInputChange}
      />
      <img src={data.image} alt="Node Image" className="img-fluid" />
      <input
        type="text"
        className="p-0 no-border"
        value={data.inputValue}
        style={{ width: "25px", height: "10px", fontSize: "7px" }}
        onChange={onInputChange1}
      />
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

export default InsideParallel;
