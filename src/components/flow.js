import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Line,Shape } from 'react-konva';

const staticLines = [
  { points: [100, 100, 200, 200], type: 'straight', color: 'red' },
  { points: [300, 300, 400, 400], type: 'straight', color: 'blue' },
];

const DrawingComponent = () => {
  const [lineType, setLineType] = useState('freehand');
  const [color, setColor] = useState('black');
  const [lines, setLines] = useState([]);
  const [startPoint, setStartPoint] = useState(null);
  const isDrawing = useRef(false);

  const layerRef = useRef(null); // Create a ref for the Layer

  useEffect(() => {
    // Render static lines and axes only once
    const layer = layerRef.current; // Access the Layer with the ref

    // Create horizontal axis line
    const horizontalAxis = new Konva.Line({
      stroke: 'black',
      strokeWidth: 2,
      points: [20, window.innerHeight / 2 - 200, window.innerWidth / 2 , window.innerHeight / 2 - 200],
    });

    layer.add(horizontalAxis);

    // Add arrowhead at the end of the horizontal axis line
    const horizontalArrowhead = new Konva.RegularPolygon({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 - 200,
      sides: 3,
      radius: 10,
      fill: 'black',
      rotation: 90,
    });

    layer.add(horizontalArrowhead);

    // Create vertical axis line
    const verticalAxis = new Konva.Line({
      stroke: 'black',
      strokeWidth: 2,
      points: [20, 50, 20, window.innerHeight / 2 - 200],
    });

    layer.add(verticalAxis);

    // Add arrowhead at the end of the vertical axis line
    const verticalArrowhead = new Konva.RegularPolygon({
      x: 20,
      y: 50,
      sides: 3,
      radius: 10,
      fill: 'black',
      rotation: -360,
    });

    layer.add(verticalArrowhead);

    layer.batchDraw(); // Make sure to redraw the layer after adding the shapes
  }, []); // Empty dependency array to ensure it runs only once

  const handleMouseDown = (event) => {
    isDrawing.current = true;
    const pos = event.target.getStage().getPointerPosition();

    if (lineType === 'freehand') {
      setLines([...lines, { points: [pos.x, pos.y], type: lineType, color: color }]);
    } else {
      setStartPoint({ x: pos.x, y: pos.y });
    }
  };

  const handleMouseMove = (event) => {
    if (!isDrawing.current || lineType !== 'freehand') return;
    const pos = event.target.getStage().getPointerPosition();
    const updatedLines = lines.slice();
    const lastLine = updatedLines[updatedLines.length - 1];
    lastLine.points = lastLine.points.concat([pos.x, pos.y]);
    setLines(updatedLines);
  };

  const handleMouseUp = (event) => {
    if (lineType === 'straight' && startPoint) {
      const pos = event.target.getStage().getPointerPosition();
      const updatedLines = lines.slice();
      const newLine = {
        points: [startPoint.x, startPoint.y, pos.x, pos.y],
        type: lineType,
        color: color,
      };
      setLines([...updatedLines, newLine]);
      setStartPoint(null);
    } else if (lineType === 'dashed-straight' && startPoint) {
      const pos = event.target.getStage().getPointerPosition();
      const updatedLines = lines.slice();
      const newLine = {
        points: [startPoint.x, startPoint.y, pos.x, pos.y],
        type: lineType,
        color: color,
        dash: [12, 10], // Define the dash pattern here, [dashLength, gapLength]
      };
      setLines([...updatedLines, newLine]);
      setStartPoint(null);
    } else if (lineType === 'dashed-dotted-straight' && startPoint) {
      const pos = event.target.getStage().getPointerPosition();
      const updatedLines = lines.slice();
      const newLine = {
        points: [startPoint.x, startPoint.y, pos.x, pos.y],
        type: lineType,
        color: color,
        dash: [12, 8, 2, 8], // Define the dash pattern here, [dashLength, gapLength, dotLength, gapLength]
      };
      setLines([...updatedLines, newLine]);
      setStartPoint(null);
    }

    isDrawing.current = false;
  };

  const handleSave = () => {
    // Save the lines (e.g., send them to a server or store them in state)
    console.log(lines);
  };

  const handleClear = () => {
    setLines(staticLines.slice()); // Reset lines to only the static lines
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const colorOptions = ['black', 'red', 'blue', 'green', 'yellow', 'purple']; // You can add more colors if needed

  return (
    <div style={{ width: '800px', height: '900px' }}>
      <div>
        <button onClick={() => setLineType('freehand')}>Freehand</button>
        <button onClick={() => setLineType('straight')}>Straight</button>
        <button onClick={() => setLineType('dashed-straight')}>Dashed-Straight</button>
        <button onClick={() => setLineType('dashed-dotted-straight')}>Dashed-Dotted-Straight</button>
        <select value={color} onChange={handleColorChange}>
          {colorOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleClear}>Clear</button>
      </div>
      <Stage 
        width={window.innerWidth}
        height={window.innerHeight - 50}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer ref={layerRef}>
          {lines.map((line, index) => {
            const points =
              line.type === 'straight'
                ? [line.points[0], line.points[1], line.points[2], line.points[3]]
                : line.points;
            return <Line key={`line-${index}`} points={points} stroke={line.color} strokeWidth={2} tension={0.5} lineCap="round" dash={line.dash} />;
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default DrawingComponent;
