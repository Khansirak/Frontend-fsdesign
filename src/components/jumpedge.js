// CustomEdge.js
import React from 'react';

const Jumpedge = ({ sourceX, sourceY, targetX, targetY,data }) => {
    const bendPointX = sourceX;
    const bendPointY = targetY;
    const { moves } = data;
    const path = `M${sourceX},${sourceY} L${bendPointX},${bendPointY-50} L${targetX},${targetY-50}`;
  
    const markerX = sourceX;
    const markerY = sourceY;
  
    // Calculate the position of the arrowhead tip based on the direction of the edge
    const arrowTipX = sourceX - 10;
    const arrowTipY = sourceY - 10;
  
  return (
    <g>
      {/* Customize the appearance of the edge using SVG */}
      <path d={path} stroke="gray" strokeWidth="1" fill="none" />
      

{/* 
      <path d={`M${arrowTipX},${arrowTipY+20} L${markerX},${markerY}`} stroke="gray" strokeWidth={2}  />
      <path d={`M${arrowTipX+10},${arrowTipY+10 } L${markerX+10},${markerY+10}`} stroke="gray" strokeWidth={2}  /> */}

    </g>
  );
};

export default Jumpedge;