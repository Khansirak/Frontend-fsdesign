// CustomEdge.js
import React from 'react';

const JumpedgeDown = ({ sourceX, sourceY, targetX, targetY,data }) => {
    const bendPointX = sourceX;
    const bendPointY = targetY;
    const { moves } = data;
    const path = `M${sourceX},${sourceY-150} L${targetX},${sourceY-150} L${targetX},${targetY}`;
  
    const markerX = sourceX;
    const markerY = sourceY;
  
    // Calculate the position of the arrowhead tip based on the direction of the edge
    const arrowTipX = sourceX - 10;
    const arrowTipY = sourceY - 10;
  
    const angle = -90; // Rotation angle in degrees
    const rotationCenterX = (arrowTipX + markerX) / 2; // Compute the center of rotation
    const rotationCenterY = (arrowTipY + markerY) / 2;
    
    // Define the transformation string
    const transform = `rotate(${angle}, ${rotationCenterX-70}, ${rotationCenterY-70})`;
    


  return (
    <g>
      {/* Customize the appearance of the edge using SVG */}
      <path d={path} stroke="gray" strokeWidth="1" fill="none" />
      


      <path d={`M${arrowTipX},${arrowTipY+20} L${markerX},${markerY}`} stroke="gray" strokeWidth={2} transform={transform} />
      <path d={`M${arrowTipX+10},${arrowTipY+10 } L${markerX+10},${markerY+10}`} stroke="gray" strokeWidth={2} transform={transform}  />
    </g>
  );
};

export default JumpedgeDown;