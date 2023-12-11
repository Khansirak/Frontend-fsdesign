import React from 'react';


const RightAngleConnecting = ({ data }) => {
    const { sourceX, sourceY, targetX, targetY } =data;

    const path = `M ${targetX+50},${targetY} V ${targetY - 20} H ${targetX+50 } V ${targetY +25}`;
  
    return (
      <g>
        <path
          fill="none"
          strokeWidth="1"
          stroke="gray"
          d={path}
          markerEnd="url(#arrowhead)"
        />
      </g>
    );
  };
  export default RightAngleConnecting;