import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Line } from "react-konva";
import { useParams } from "react-router-dom";
import { fetchProjectSuccess } from "../redux/slices/projectReducerGet";
import { useDispatch, useSelector } from "react-redux";

const staticLines = [];

const DrawingComponent = ({ inputFields }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const storedData = localStorage.getItem("therecipe");
  // const desiredRecipe = JSON.parse(storedData);
  // const desiredRecipe = parsedData.find((recipe) => recipe.id === id);


  const data = useSelector((state) => state.project);
  const desiredRecipe=data.projectdata;
  
  const urlRecipe = `http://localhost:8080/api/project/recipe/${id}`;
  async function fetchData() {
    try {
      const response = await fetch(urlRecipe);
      const data = await response.json();
      dispatch(fetchProjectSuccess(data));
      // setProjects(data);
      // localStorage.setItem("therecipe", JSON.stringify(data));
    
    } catch (error) {
      console.error("Error fetching missions:", error);
    }
  }
  useEffect(() => {
    fetchData();
  
  }, [dispatch]);


  const [lineType, setLineType] = useState(null); // or useState("")
  const [color, setColor] = useState("black");
  const [lines, setLines] = useState([]);
  const [startPoint, setStartPoint] = useState(null);
  const isDrawing = useRef(false);
  const [linesVisible, setLinesVisible] = useState(true); // State to control line visibility
  const layerRef = useRef(null); // Create a ref for the Layer

  useEffect(() => {
    // Render static lines and axes only once
    const layer = layerRef.current; // Access the Layer with the ref

    // Create horizontal axis line
    const horizontalAxis = new Konva.Line({
      stroke: "black",
      strokeWidth: 2,
      points: [
        20,
        window.innerHeight / 2 - 200,
        window.innerWidth / 2 - 300,
        window.innerHeight / 2 - 200,
      ],
    });

    layer.add(horizontalAxis);

    // Add arrowhead at the end of the horizontal axis line
    const horizontalArrowhead = new Konva.RegularPolygon({
      x: window.innerWidth / 2 - 300,
      y: window.innerHeight / 2 - 200,
      sides: 3,
      radius: 10,
      fill: "black",
      rotation: 90,
    });

    layer.add(horizontalArrowhead);

    // Create vertical axis line
    const verticalAxis = new Konva.Line({
      stroke: "black",
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
      fill: "black",
      rotation: -360,
    });

    layer.add(verticalArrowhead);

    // Second Chart
    // Create horizontal axis line
    const horizontalAxis2 = new Konva.Line({
      stroke: "black",
      strokeWidth: 2,
      points: [
        20,
        window.innerHeight / 2 + 50,
        window.innerWidth / 2 - 300,
        window.innerHeight / 2 + 50,
      ],
    });

    layer.add(horizontalAxis2);

    // Add arrowhead at the end of the horizontal axis line
    const horizontalArrowhead2 = new Konva.RegularPolygon({
      x: window.innerWidth / 2 - 300,
      y: window.innerHeight / 2 + 50,
      sides: 3,
      radius: 10,
      fill: "black",
      rotation: 90,
    });

    layer.add(horizontalArrowhead2);

    // Create vertical axis line
    const verticalAxis2 = new Konva.Line({
      stroke: "black",
      strokeWidth: 2,
      points: [20, 471, 20, window.innerHeight / 2 - 100],
    });

    layer.add(verticalAxis2);

    // Third Chart
    // Create horizontal axis line
    const horizontalAxis3 = new Konva.Line({
      stroke: "black",
      strokeWidth: 2,
      points: [
        20,
        window.innerHeight / 2 + 250,
        window.innerWidth / 2 - 300,
        window.innerHeight / 2 + 250,
      ],
    });

    layer.add(horizontalAxis3);

    // Add arrowhead at the end of the horizontal axis line
    const horizontalArrowhead3 = new Konva.RegularPolygon({
      x: window.innerWidth / 2 - 300,
      y: window.innerHeight / 2 + 250,
      sides: 3,
      radius: 10,
      fill: "black",
      rotation: 90,
    });

    layer.add(horizontalArrowhead3);

    // Create vertical axis line
    const verticalAxis3 = new Konva.Line({
      stroke: "black",
      strokeWidth: 2,
      points: [
        20,
        window.innerHeight / 2 + 100,
        20,
        window.innerHeight / 2 + 250,
      ],
    });

    layer.add(verticalAxis3);

    // if (horizontalLine ) {
    //   // const layer = layerRef.current;
    //   layer.add(horizontalLine);
    //   // layer.batchDraw();

    // }

    layer.batchDraw(); // Make sure to redraw the layer after adding the shapes
    handleLoad();
  }, []); // Empty dependency array to ensure it runs only once

  const executeFunctionInChild = () => {
    // setLines([...updatedLines, newHorizontalLine]);
    setLines([
      ...lines,
      {
        points: [
          10,
          window.innerHeight / 2 + 100,
          window.innerWidth / 2 - 250,
          window.innerHeight / 2 + 100,
        ],
        color: color,
        dash: [13, 6, 2, 6],
        draggable: true,
      },
    ]);
    // console.log(newHorizontalLine)
    setStartPoint(null);
    console.log("Child function executed in ChildComponent");
  };

  // Assign the function to the ref in the parent
  // childFunctionRef.current = executeFunctionInChild;

  const [linePositions, setLinePositions] = useState([]);
  const handleLineDrag = (event) => {
    const line = event.target; // Assuming 'event.target' is your Konva.Line instance
    const newPosition = line.position();
    const horizontalPosition = horizontalLine.getPoints();
    // Calculate the new position based on the drag event
    newPosition.x += event.evt.movementX;
    newPosition.y += event.evt.movementY;
    // Set the new position for the line
    horizontalLine.position(newPosition);

    var newX1 = newPosition.x + horizontalPosition[0];
    var newY1 = newPosition.y + horizontalPosition[1];
    var newX2 = newPosition.x + horizontalPosition[2];
    var newY2 = newPosition.y + horizontalPosition[3];
    const newLinePosition = [newX1, newY1, newX2, newY2];
    setLinePositions(newLinePosition);
  };

  const handleMouseDown = (event) => {
    isDrawing.current = true;
    const pos = event.target.getStage().getPointerPosition();

    if (lineType === "freehand") {
      setLines([
        ...lines,
        { points: [pos.x, pos.y], type: lineType, color: color },
      ]);
    } else {
      setStartPoint({ x: pos.x, y: pos.y });
    }
  };

  const handleMouseMove = (event) => {
    if (!isDrawing.current || lineType !== "freehand") return;
    const pos = event.target.getStage().getPointerPosition();
    const updatedLines = lines.slice();
    const lastLine = updatedLines[updatedLines.length - 1];
    lastLine.points = lastLine.points.concat([pos.x, pos.y]);
    setLines(updatedLines);
  };

  const handleMouseUp = (event) => {
    if (lineType === "straight" && startPoint) {
      const pos = event.target.getStage().getPointerPosition();
      const updatedLines = lines.slice();
      const newLine = {
        points: [startPoint.x, startPoint.y, pos.x, pos.y],
        type: lineType,
        color: color,
      };
      setLines([...updatedLines, newLine]);
      setStartPoint(null);
    } else if (lineType === "dashed-straight" && startPoint) {
      const pos = event.target.getStage().getPointerPosition();
      const updatedLines = lines.slice();
      const newLine = {
        points: [startPoint.x, startPoint.y, pos.x, pos.y],
        type: lineType,
        color: color,
        dash: [10, 5], // Define the dash pattern here, [dashLength, gapLength]
      };
      setLines([...updatedLines, newLine]);
      setStartPoint(null);
    } else if (lineType === "dashed-dotted-straight" && startPoint) {
      const pos = event.target.getStage().getPointerPosition();
      const updatedLines = lines.slice();
      const newLine = {
        points: [startPoint.x, startPoint.y, pos.x, pos.y],
        type: lineType,
        color: color,
        dash: [13, 6, 2, 6], // Define the dash pattern here, [dashLength, gapLength, dotLength, gapLength]
      };
      setLines([...updatedLines, newLine]);
      setStartPoint(null);
    }
    // else if (linePositions.length > 0){
    //       const updatedLines = lines.slice();
    // const newLine = {
    //   points: [linePositions[0], linePositions[1], linePositions[2], linePositions[3]], // Include newPosition in the points array
    //   type: lineType,

    //   color: color,
    //   dash: [13, 6, 2, 6], // Define the dash pattern here, [dashLength, gapLength, dotLength, gapLength]
    // };
    // setLines([...updatedLines, newLine]); // Add newLine to the updatedLines array
    // setLinePositions([]);
    // }

    isDrawing.current = false;
  };
  const [selectedLineIndex, setSelectedLineIndex] = useState(null);

  const handleLineClick = (index) => {
    setSelectedLineIndex(index);
  };

  const handleDeleteLine = () => {
    if (selectedLineIndex !== null) {
      const updatedLines = [...lines];
      updatedLines.splice(selectedLineIndex, 1);
      setLines(updatedLines);
      setSelectedLineIndex(null);
    }
  };

  const handleClear = () => {
    // Clear the last line and toggle the visibility state
    setLines((prevLines) => prevLines.slice(0, -1));
    setLinesVisible(true);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const colorOptions = ["black", "red", "blue", "green", "yellow", "purple"]; // You can add more colors if needed

  const handleSubmit = async () => {
    try {
      const data = {
        lines: lines, // Assuming 'lines' is your array
      };
      const requestData = {
        flow: JSON.stringify(data),
        chainArray: JSON.stringify(inputFields),
      };
      const response = await fetch(
        `http://localhost:8080/api/project/recipe/graph/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        console.log("Data sent to server successfully");
      } else {
        console.error("Error sending data to server");
      }
    } catch (error) {
      console.error("Error sending data to server", error);
    }
  };

  const handleLoad = () => {
    const flow = desiredRecipe?.graphRecipe?.graph?.lines || [];
    if (flow) {
      setLines(flow);
    }
  };
console.log(desiredRecipe)
  return (
    <div style={{ width: "800px", height: "800px" }}>
      <div>
        <select className="" value={color} onChange={handleColorChange}>
          {colorOptions.map((option) => (
            <option key={option} value={option}>
              Color: {option}
            </option>
          ))}
        </select>
        <button
          style={{ fontSize: "13px" }}
          onClick={() => {
            handleSubmit();
          }}
        >
          Save
        </button>

        <button style={{ fontSize: "13px" }} onClick={handleDeleteLine}>
          {linesVisible ? "Clear" : "Show Lines"}
        </button>
        <button
          style={{ fontSize: "13px" }}
          onClick={() => {
            setLineType("dashed-dotted-straight");
          }}
        >
          Auxiliary Line horizontal
        </button>
        <button
          style={{ fontSize: "13px" }}
          onClick={() => {
            setLineType("dashed-straight");
          }}
        >
          Auxiliary Line vertical
        </button>
        <button
          style={{ fontSize: "13px" }}
          onClick={() => {
            setLineType("straight");
          }}
        >
          Straight Line
        </button>
        <button
          style={{ fontSize: "13px" }}
          onClick={() => {
            setLineType("freehand");
          }}
        >
          Handfree Line
        </button>
      </div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight - 50}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onDragMove={handleLineDrag}
      >
        <Layer ref={layerRef}>
          {lines.map((line, index) => {
            const points =
              line.type === "straight"
                ? [
                    line.points[0],
                    line.points[1],
                    line.points[2],
                    line.points[3],
                  ]
                : line.points;

            const strokeWidth =
              line.type === "dashed-straight" ||
              line.type === "dashed-dotted-straight"
                ? 1
                : 3;

            return (
              <Line
                key={`line-${index}`}
                points={points}
                stroke={line.color}
                strokeWidth={strokeWidth}
                tension={0.5}
                lineCap="round"
                dash={line.dash}
                onClick={() => handleLineClick(index)}
                draggable={true} // Add this line to make it draggable
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default DrawingComponent;
