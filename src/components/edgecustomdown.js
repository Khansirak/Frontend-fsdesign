import React from 'react';
import { ConnectionLine    } from 'reactflow';

const RightAngleConnectingDown = ({ data }) => {
    const { sourceX, sourceY, targetX, targetY } =data;
    const path = `M ${targetX+50},${targetY} V ${sourceY} `;
  
    return (
      <g>
        {/* <Edge  */}
        // <path
          fill="none"
          strokeWidth="1"
          stroke="gray"
          d={path}
          markerEnd="url(#arrowhead)"
        />
          {/* /> */}
      </g>
    );
  };
  export default RightAngleConnectingDown;