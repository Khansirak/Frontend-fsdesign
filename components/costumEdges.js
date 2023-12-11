import React from 'react';
import Edge  from 'react-flow-renderer';

const CustomEdge = (props) => {


  // Your custom styling goes here
  const edgeStyle = {
    stroke: '#ccc',         // Edge color
    strokeWidth: 3,         // Edge thickness
    cursor: 'pointer',      // Set cursor style if needed
  };

  return (
    <Edge
 

      style={edgeStyle}
    />
  );
};

export default CustomEdge;
