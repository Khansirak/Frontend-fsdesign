
import { Line } from 'react-chartjs-2';

import React, { useRef, useState,useEffect } from 'react';
import { Stage, Layer, Text, Rect, Image } from 'react-konva';

const LineChart1 = ({lineColor}) => {
  const stageRef = useRef(null);

  useEffect(() => {
    // Create Konva stage
    const stage = new Konva.Stage({
      container: stageRef.current,
      width: 800,
      height: 600
    });

    // Create Konva layer
    const layer = new Konva.Layer();
    stage.add(layer);

    // Initialize variables
    let isDrawing = false;
    let line;
    let axes = [];
    // Event listeners
    stage.on('mousedown touchstart', (e) => {
      isDrawing = true;
      const pos = stage.getPointerPosition();
      line = new Konva.Line({
        stroke: lineColor,
        strokeWidth: 2,
        points: [pos.x, pos.y, pos.x, pos.y] // Start with a single point
      });
      layer.add(line);
    });

    stage.on('mousemove touchmove', () => {
      if (!isDrawing) return;

      const pos = stage.getPointerPosition();
      const points = line.points();
      const [startX, startY] = points.slice(0, 2); // Get the start point of the line

      // Calculate the difference between current and start positions
      const dx = pos.x - startX;
      const dy = pos.y - startY;

      // Adjust the end point based on the difference (constraining to a straight line)
      const [endX, endY] = [startX + dx, startY + dy];

      // Update the points of the line
      line.points([startX, startY, endX, endY]);
      layer.batchDraw();
    });

    stage.on('mouseup touchend', () => {
      isDrawing = false;
    });
  

/////////////SECOND  CHART/////////////////////////////
    // Create horizontal axis line
    const horizontalAxis2 = new Konva.Line({
      stroke: 'black',
      strokeWidth: 2,
      points: [150, stage.getHeight() / 2-100, stage.getWidth()/2+400, stage.getHeight() / 2-100]
    });
    layer.add(horizontalAxis2);
    axes.push(horizontalAxis2);

// Add arrowhead at the end of the horizontal axis line
const horizontalArrowhead2 = new Konva.RegularPolygon({
  x: stage.getWidth()/2+390,
  y: stage.getHeight() / 2-100,
  sides: 3,
  radius: 10,
  fill: 'black',
  rotation: 90
});
layer.add(horizontalArrowhead2);
    // Create vertical axis line
    const verticalAxis2 = new Konva.Line({
      stroke: 'black',
      strokeWidth: 2,
      points: [150, 200, 150, stage.getHeight()/2 -250]
    });
    layer.add(verticalAxis2);
    axes.push(verticalAxis2);


/////////////ThHIRD  CHART/////////////////////////////
    // Create horizontal axis line
    const horizontalAxis3 = new Konva.Line({
      stroke: 'black',
      strokeWidth: 2,
      points: [150, stage.getHeight() / 2+100, stage.getWidth()/2+400, stage.getHeight() / 2+100]
    });
    layer.add(horizontalAxis3);
    axes.push(horizontalAxis3);

// Add arrowhead at the end of the horizontal axis line
const horizontalArrowhead3 = new Konva.RegularPolygon({
  x: stage.getWidth()/2+390,
  y: stage.getHeight() / 2+100,
  sides: 3,
  radius: 10,
  fill: 'black',
  rotation: 90
});
layer.add(horizontalArrowhead3);


    // Create vertical axis line
    const verticalAxis3 = new Konva.Line({
      stroke: 'black',
      strokeWidth: 2,
      points: [150, stage.getHeight() / 2-20, 150, stage.getHeight()/2 +100 ]
    });
    layer.add(verticalAxis3);
    axes.push(verticalAxis3);


    // Clean up on component unmount
    return () => {
      stage.destroy();
    };
  }, [lineColor]);


  return (
  <>

      <div  ref={stageRef} style={{ width: '800px', height: '600px' }} />
  </>
  
  

  );
  // return <Line data={data} options={options} />;
};

export default LineChart1;
