
import { Line } from 'react-chartjs-2';

import React, { useRef, useState,useEffect } from 'react';
import { Stage, Layer, Text, Rect, Image } from 'react-konva';

const CustomAxisChart = ({lineColor}) => {
  const stageRef = useRef(null);

  useEffect(() => {
    // Create Konva stage
    const stage = new Konva.Stage({
      container: stageRef.current,
      width: 800,
      height: 500
    });

    // Create Konva layer
    const layer = new Konva.Layer();
    stage.add(layer);

    // Initialize variables
    let isDrawing = false;
    let line;
    let axes = [];
    // Event listeners
    // Event listeners
    // Event listeners
    stage.on('mousedown touchstart', (e) => {
      isDrawing = true;
      const pos = stage.getPointerPosition();
      line = new Konva.Line({
        stroke: lineColor,
        strokeWidth: 2,
        points: [pos.x, pos.y]
      });
      layer.add(line);
    });

    stage.on('mousemove touchmove', () => {
      if (!isDrawing) return;
      const pos = stage.getPointerPosition();
      const newPoints = line.points().concat([pos.x, pos.y]);
      line.points(newPoints);
      layer.batchDraw();
    });

    stage.on('mouseup touchend', () => {
      isDrawing = false;
    });

////FIRST CHART
    // Create horizontal axis line
    const horizontalAxis = new Konva.Line({
      stroke: 'black',
      strokeWidth: 2,
      points: [150, stage.getHeight() / 2+100, stage.getWidth()/2+400, stage.getHeight() / 2+100]
    });
    layer.add(horizontalAxis);
    axes.push(horizontalAxis);

// Add arrowhead at the end of the horizontal axis line
const horizontalArrowhead = new Konva.RegularPolygon({
  x: stage.getWidth()/2+390,
  y: stage.getHeight() / 2+100,
  sides: 3,
  radius: 10,
  fill: 'black',
  rotation: 90
});

layer.add(horizontalArrowhead);
    // Create vertical axis line
    const verticalAxis = new Konva.Line({
      stroke: 'black',
      strokeWidth: 2,
      points: [150, 50, 150, stage.getHeight()/2+100]
    });
    layer.add(verticalAxis);
    axes.push(verticalAxis);



    // Add arrowhead at the end of the horizontal axis line
const verticalArrowhead = new Konva.RegularPolygon({
  x: 150,
  y: 50 ,
  sides: 3,
  radius: 10,
  fill: 'black',
  rotation: -360
});      
layer.add(verticalArrowhead);



    // Clean up on component unmount
    return () => {
      stage.destroy();
    };
  }, [lineColor]);

  return (
    <div>
       <div style={{ float: 'left' }}>
        <button onClick={handleAddTextField}>Add Text Field</button>
        {textFields.map((textField) => (
          <input
            key={textField.id}
            id={`textInput_${textField.id}`}
            type="text"
            value={textField.value}
            onChange={(e) => handleTextFieldChange(e, textField.id)}
          />
        ))}
      </div>
  <div ref={stageRef} style={{ width: '800px', height: '500px' }} />
  </div>

  );
  // return <Line data={data} options={options} />;
};

export default CustomAxisChart;
