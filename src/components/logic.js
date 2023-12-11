import React, { useState, useRef, createContext, useContext,useEffect } from "react";
import Menu from "./menu";
import { v4 as uuidv4 } from "uuid";
import "./phase.css";
import "./library.css";
import "reactflow/dist/style.css";
import "./logic.css";
import { mockData } from "./mocklibrary";
import { mockDataController } from "./mocklibrarycontroller";
import TextUpdaterNode from "./TextUpdaterNode.js";
import TextUpdaterNodeOutput from "./TextUpdaterNodeOutput.js";
import ImgNode from "./ImgNode.js";
import ImgNodeController from "./ImgNodeUpdController.js";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProjectSuccess } from "../redux/slices/projectReducerGet";
import { toPng } from "html-to-image";
import { fetchRecipeSuccess } from "../redux/slices/recipeReducerget";

import ReactFlow, {
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  StepEdge,
  useReactFlow,
  Panel,
  getTransformForBounds,
  getRectOfNodes,
} from "reactflow";

//NEED TO STAY OUTSIDE
const getNodeId = () => `random${+new Date()}`;
const initialNodes = [];
const initialEdges = [];
const nodeTypes = {
  textUpdater: TextUpdaterNode,
  ImgNodeUpd: ImgNode,
  ImgNodeUpdController: ImgNodeController,
  textUpdaterO: TextUpdaterNodeOutput,
};

/////

const Logic = () => {
  const dispatch = useDispatch();
  //for the libary
  const [name, setName] = React.useState("AND_1.png");
  const [visible1, setVisible1] = useState(true);
  const [visibles, setVisibles] = useState(false);
  const [visibles2, setVisibles2] = useState(false);
  const [active, setActive] = useState(false);
  const [active1, setActive1] = useState(false);
  const removeElement1 = () => {
    setVisible1(() => true);
    setVisibles(() => false);
    setActive(true);
    setActive1(false);
  };
  const removeElements = () => {
    setVisible1(() => false);
    setVisibles(() => true);
    setActive1(true);
    setActive(false);
  };
  const removeElement = () => {
    setVisible((prev) => !prev);
  };
  const removeElement2 = () => {
    setVisibles2((prev) => !prev);
  };

  //////// FOR THE DIAGRAM LOGIC

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  /////SAVE TO MONGODB
  const { id } = useParams();
  const storedData = localStorage.getItem("therecipe");
  // const desiredRecipe = JSON.parse(storedData);
  // const desiredRecipe = parsedData.find((recipe) => recipe.id === id);

  // const {theRecipe} = useData();
  const logicData = useSelector((state) => state.logicsave);
  ////SAVING THE DATA
  const data = useSelector((state) => state.recipe);
  const desiredRecipe=data.projectdata;
  const handleSubmit = async () => {
    const flow = rfInstance.toObject();
    try {
      const response = await fetch(
        `http://localhost:8080/api/project/recipe/logic/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(flow),
        }
      );

      if (response.ok) {
        console.log("Data sent to server successfully");
      } else {
        console.error("Error sending data to server");
      }
      fetchData();
    } catch (error) {
      console.error("Error sending data to server", error);
    }
  };
  /////FOR THE LOGIC DIAGRAM PERSITENCE MEMORY

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      // const flow = JSON.parse(localStorage.getItem("flow"));
      const flow = desiredRecipe.logicChain.logic;

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };
    restoreFlow();
  }, [setNodes, setViewport, logicData]);

  ///////////////////////
  const Addnode = useCallback(() => {
    const generatedNodeId = getNodeId();
    const node = {
      id: generatedNodeId,
      targetPosition: "left",
      sourcePosition: "right",
      type: "textUpdater",
      data: { name: generatedNodeId, value: "input" },
      position: { x: 0, y: 0 },
    };
    setNodes([...nodes, node]);
  }, [nodes]);

  const AddnodeOutput = useCallback(() => {
    const generatedNodeId = getNodeId();
    const node = {
      id: generatedNodeId,
      targetPosition: "left",
      sourcePosition: "right",
      type: "textUpdaterO",
      data: { name: generatedNodeId, value: "output" },
      position: { x: 600, y: -100 },
    };
    setNodes([...nodes, node]);
  }, [nodes]);

  const getImg = useCallback(
    (e) => {
      const btnId = e.target.id;
      const node = {
        id: getNodeId(),
        sourcePosition: "right",
        targetPosition: "left",
        position: { x: 100, y: 0 },
        type: "ImgNodeUpdController",
        data: { image: require(`../images/${btnId}`) },
      };
      setNodes([...nodes, node]);
    },
    [nodes]
  );

  const getImg2 = useCallback(
    (e) => {
      const btnId = e.target.id;
      const node = {
        id: getNodeId(),
        sourcePosition: "right",
        targetPosition: "left",
        position: { x: 100, y: 0 },
        type: "ImgNodeUpd",
        data: { image: require(`../images/${btnId}`) },
      };
      setNodes([...nodes, node]);
    },
    [nodes]
  );

  ///for LIST-TOOLBOX
  const [visible, setVisible] = useState(false);

  //logic/libary change display
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(true);
  const showElement = () => {
    setShow((prev) => !prev);
    setShow1((prev) => !prev);
  };

  // const url = "http://localhost:8080/api/project/recipeids";
  // async function fetchData() {
  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     dispatch(fetchProjectSuccess(data));
  //     localStorage.setItem("RecipesFetched", JSON.stringify(data));
  //   } catch (error) {
  //     console.error("Error fetching missions:", error);
  //   }
  // }

  const [projects, setProjects] = useState();
  const urlRecipe = `http://localhost:8080/api/project/recipe/${id}`;
  async function fetchData() {
    try {
      const response = await fetch(urlRecipe);
      const data = await response.json();
      dispatch(fetchRecipeSuccess(data));
      // setProjects(data);
      // localStorage.setItem("therecipe", JSON.stringify(data));
    
    } catch (error) {
      console.error("Error fetching missions:", error);
    }
  }
  useEffect(() => {
    fetchData();
  
  }, [dispatch]);


  useEffect(() => {
    fetchData();
    onRestore();
  }, []);

  
  const containerRef = useRef();
  // const handleDownloadPDF = () => {
  //   // const clonedContainer = containerRef.current;
  //   const clonedContainer = containerRef.current.cloneNode(true);
  //   const miniMapElement = clonedContainer.querySelector(
  //     ".react-flow__panel.react-flow__minimap.bottom.right"
  //   );
  //   const controlsElement = clonedContainer.querySelector(
  //     ".react-flow__panel.react-flow__controls.bottom.left"
  //   );
  //   const atributeElement = clonedContainer.querySelector(
  //     ".react-flow__panel.react-flow__attribution.bottom.left"
  //   );
  //   const panelElement = clonedContainer.querySelector(
  //     ".react-flow__panel.top.right"
  //   );

  //   const edges = clonedContainer.querySelectorAll(".react-flow__edge");
  //   console.log("Number of edges:", edges.length);
  //   edges.forEach((edge, index) => {
  //     console.log(`Edge ${index + 1}:`, edge);
  //   });
  //   if (miniMapElement) {
  //     miniMapElement.parentNode.removeChild(miniMapElement);
  //   }

  //   if (controlsElement) {
  //     controlsElement.parentNode.removeChild(controlsElement);
  //   }
  //   if (atributeElement) {
  //     atributeElement.parentNode.removeChild(atributeElement);
  //   }
  //   if (panelElement) {
  //     panelElement.parentNode.removeChild(panelElement);
  //   }

  //   const inoutDiv = clonedContainer.querySelector(".inout");
  //   if (inoutDiv) {
  //     inoutDiv.parentNode.removeChild(inoutDiv);
  //   }
  //   //download the node as png. Image (2019-12-01).png

  //   html2canvas(clonedContainer).then((canvas) => {
  //     const pdf = new jsPDF("p", "mm", "a4"); // 'a4' sets the page size to A4
  //     const imgData = canvas.toDataURL("image/png");

  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = pdf.internal.pageSize.getHeight();

  //     const widthRatio = pdfWidth / canvas.width;
  //     const heightRatio = pdfHeight / canvas.height;
  //     const ratio = Math.min(widthRatio, heightRatio);

  //     const imgWidth = canvas.width * ratio;
  //     const imgHeight = canvas.height * ratio;

  //     pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  //     pdf.save("diagram.pdf");
  //     clonedContainer.parentNode.removeChild(clonedContainer);
  //   });
  // };

  ///////////////////////////

  // function downloadImage(dataUrl) {
  //   const a = document.createElement("a");

  //   a.setAttribute("download", "reactflow.png");
  //   a.setAttribute("href", dataUrl);
  //   a.click();
  // }

  const { getNodes } = useReactFlow();
  const imageWidth = 1024;
  const imageHeight = 768;
  // const { setImageData } = useImageContext();

 const onClick = () => {
    const nodesBounds = getRectOfNodes(getNodes());
    const transform = getTransformForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2
    );

    toPng(document.querySelector('.react-flow__viewport'), {
      backgroundColor: 'white',
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth,
        height: imageHeight,
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    }).then((dataUrl) => {
      console.log('Setting imageData:', { data: dataUrl });
      // setImageData(dataUrl);
    });
  };
  
  console.log("test",data.projectdata)
  return (
    <>
      <div className=" d-flex menu-body w-100 ">
        <div className=" menu-body2 d-flex flex-row w-100">
          <div className=" d-flex row  m-0 w-100 ">
            <div className=" d-flex p-2  justify-content-between ">
              <button
                type="button"
                className="border m-1 btn border-info"
                style={{ backgroundColor: "#C0C0C0" }}
                onClick={removeElement2}
              >
                Management
              </button>

              <button
                type="button"
                className="border m-1 btn border-info"
                style={{ backgroundColor: "#C0C0C0" }}
                onClick={removeElement}
              >
                List-toolbox
              </button>
            </div>
            <div className="d-flex p-0 h-100 border border-info">
              {visibles2 && (
                <div className=" m-0" style={{ width: "15%" }}>
                  <Menu showPart={false} />
                </div>
              )}
              <div className="d-flex w-100 h-100">
                <div
                  className="row text-center m-0 border border-info"
                  style={{ width: "10%" }}
                >
                  <nav className="navbar  ">
                    <ul className="nav d-flex  text-center justify-content-around navbar-nav">
                      <li
                        className="nav-item "
                        style={{ height: "80px", width: "55px" }}
                      >
                        <button
                          type="button"
                          className="border btn btn-rounded m-4 border-info"
                          style={{
                            backgroundColor: "#b7e778",
                            fontSize: "12px",
                            height: "100%",
                            width: "70px",
                          }}
                          onClick={showElement}
                        >
                          Library{" "}
                        </button>
                      </li>

                      <li
                        className="nav-item pt-2 "
                        style={{ height: "80px", width: "55px" }}
                      >
                        <button
                          type="button"
                          className="border btn btn-rounded m-4 border-info "
                          style={{
                            backgroundColor: "#b7e778",
                            fontSize: "12px",
                            height: "100%",
                            width: "70px",
                          }}
                          onClick={Addnode}
                        >
                          New Input Parameter
                        </button>
                      </li>
                      <li
                        className="nav-item pt-2 "
                        style={{ height: "80px", width: "55px" }}
                      >
                        <button
                          type="button"
                          className="border btn btn-rounded m-4  border-info"
                          style={{
                            backgroundColor: "#b7e778",
                            fontSize: "12px",
                            height: "100%",
                            width: "70px",
                          }}
                          onClick={AddnodeOutput}
                        >
                          New Output Parameter
                        </button>
                      </li>
                      <Link to="/graph">
                        <li
                          className="nav-item pt-2 "
                          style={{ height: "80px", width: "55px" }}
                        >
                          <button
                            type="button"
                            className="border btn btn-rounded m-4  border-info"
                            style={{
                              backgroundColor: "#b7e778",
                              fontSize: "12px",
                              height: "100%",
                              width: "70px",
                            }}
                          >
                            New Graph
                          </button>
                        </li>
                      </Link>
                      <Link to={`/phase/${id}`}>
                        <li
                          className="nav-item pt-5"
                          style={{ height: "80px", width: "55px" }}
                        >
                          <button
                            type="button"
                            className="border btn btn-rounded m-4  border-info"
                            style={{
                              backgroundColor: "#b7e778",
                              fontSize: "12px",
                              width: "70px",
                            }}
                          >
                            Back
                          </button>
                        </li>
                      </Link>
                    </ul>
                  </nav>
                </div>
                {show && (
                  <div className="d-flex border w-100 border-info">
                    <div className="d-flex h-100">
                      <div className=" d-flex border w-100 border-info">
                        <section className="d-flex p-2 justify-content-between">
                          <div>
                            <ul
                              className="nav d-flex text-center justify-content-around navbar-nav"
                              style={{ marginRight: "50px" }}
                            >
                              <li
                                className="nav-item mt-2 "
                                style={{ height: "60px", width: "60px" }}
                              >
                                <button
                                  type="button"
                                  className="border btn btn-rounded m-4 border-info"
                                  style={{
                                    backgroundColor: active
                                      ? "#C0C0C0"
                                      : "#b7e778",
                                    fontSize: "11px",
                                    height: "100%",
                                    width: "65px",
                                  }}
                                  onClick={removeElement1}
                                >
                                  Logic-block{" "}
                                </button>
                              </li>
                              <li
                                className="nav-item mt-2 "
                                style={{ height: "60px", width: "60px" }}
                              >
                                <button
                                  type="button"
                                  className="border  btn  btn-rounded m-4  border-info"
                                  style={{
                                    backgroundColor: active1
                                      ? "#C0C0C0"
                                      : "#b7e778",
                                    fontSize: "11px",
                                    height: "100%",
                                    width: "65px",
                                  }}
                                  onClick={removeElements}
                                >
                                  Controller
                                </button>
                              </li>
                            </ul>
                          </div>

                          {visible1 && (
                            <div className=" forscroll border w-100  border-dark ">
                              {mockData.map((data) => (
                                <button
                                  className="logic-btn"
                                  onClick={() => setName(data.src)}
                                >
                                  <img
                                    className="logic-button"
                                    alt={data.src}
                                    src={require(`../images/${data.src}`)}
                                  />
                                </button>
                              ))}
                            </div>
                          )}

                          {visibles && (
                            <div className="d-flex forscroll border w-100   align-content-start flex-wrap border-dark ">
                              {mockDataController.map((data) => (
                                <button
                                  className="logic-btn  w-25"
                                  onClick={() => setName(data.src)}
                                >
                                  <img
                                    className="logic-button w-75 "
                                    alt={data.src}
                                    src={require(`../images/${data.src}`)}
                                  />
                                </button>
                              ))}
                            </div>
                          )}
                          {/* <div>
                              <ul className="nav m-2 d-flex w-100 text-center justify-content-around navbar-nav">
                                <li className="nav-item ">
                                  <button
                                    type="button"
                                    className="border w-75 btn m-3 border-info"
                                    style={{ backgroundColor: "#b7e778" }}
                                  >
                                    Add input
                                  </button>
                                </li>
                              </ul>
                            </div> */}

                          <div className="border w-25  border-info">
                            <img
                              className="logic-button-show  p-2"
                              src={require(`../images/${name}`)}
                            />
                            {visible1 && (
                              <button
                                type="button"
                                className="border btn m-4 border-info"
                                style={{ backgroundColor: "#b7e778" }}
                                id={name}
                                onClick={getImg2}
                              >
                                Add Logic Block
                              </button>
                            )}
                            {visibles && (
                              <button
                                type="button"
                                className="border btn m-4 border-info"
                                style={{ backgroundColor: "#b7e778" }}
                                id={name}
                                onClick={getImg}
                              >
                                Add Controller Block
                              </button>
                            )}
                          </div>
                        </section>
                      </div>
                      <div></div>
                    </div>
                  </div>
                )}
                {show1 && (
                  <div className="border w-100 border-info">
                    <button className="download-btn" onClick={onClick}>
                      Download Image
                    </button>
{/* 
                    <button
                      onClick={() => {
                        handleDownloadPDF(), exportComponentAsPNG(containerRef);
                      }}
                    >
                      Download as PDF
                    </button> */}
                    <div className="d-flex h-100">
                      <div className="border w-100 ">
                        <section className="d-flex h-100 justify-content-between">
                          <div className="border w-100">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                width: "100%",
                                height: "100hv",
                              }}
                            >
                              <div
                                className=" w-100 "
                                style={{ height: "95vh", width: "90em" }}
                              >
                                <ReactFlow
                                  id="flow-container"
                                  ref={containerRef}
                                  nodes={nodes}
                                  edges={edges}
                                  onNodesChange={onNodesChange}
                                  onEdgesChange={onEdgesChange}
                                  onConnect={onConnect}
                                  onInit={setRfInstance}
                                  nodeTypes={nodeTypes}
                                  fitView
                                  attributionPosition="bottom-left"
                                  edgeTypes={{
                                    default: { ...StepEdge, strokeWidth: 10 },
                                  }}
                                  // zoomOnScroll={false}
                                  zoomOnDoubleClick={false}
                                >
                                  <MiniMap />
                                  <Controls />
                                  <div className="inout d-flex h-100 justify-content-between ">
                                    <div
                                      className=" border text-center  border-info"
                                      style={{ width: "15%" }}
                                    >
                                      {" "}
                                      <h4 className="border-bottom border-info">
                                        Inputs
                                      </h4>
                                    </div>
                                    <div
                                      className=" border text-center  border-info"
                                      style={{ width: "15%" }}
                                    >
                                      {" "}
                                      <h4 className="border-bottom border-info">
                                        Outputs
                                      </h4>
                                    </div>
                                  </div>

                                  <Panel
                                    style={{ paddingRight: "210px" }}
                                    position="top-right"
                                  >
                                    <button
                                      onClick={() => {
                                        handleSubmit();
                                      }}
                                    >
                                      save
                                    </button>
                                    {/* <button onClick={onRestore}>restore</button> */}
                                  </Panel>
                                </ReactFlow>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                      <div></div>
                    </div>
                  </div>
                )}

                {visible && (
                  <div className="border w-25 border-info">
                    <ul className=" toolbox column d-flex p-0 ">
                      <li className="border small border-info">I/O-List</li>
                      <li className=" border small border-info">Signal-list</li>
                      <li className=" border small border-info">
                        Logic-In-Out
                      </li>
                      <li className=" border small border-info">Parameter</li>
                      <li className=" border small border-info">EM</li>
                      <li className=" border small border-info">Interlock</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logic;
