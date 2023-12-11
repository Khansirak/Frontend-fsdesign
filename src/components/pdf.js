import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import { Document, Page, pdfjs } from "react-pdf";
import BackerHicksLogoPDF from "../images/BackerHicksLogoPDF.PNG";
import ClientLogoPDF from "../images/ClientLogoPDF.PNG";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useImageContext } from "./ImageContex";
import { useDispatch, useSelector } from "react-redux";
// import PDFDocument from './PDFDocument';
import "jspdf-autotable";
import { Link, useParams } from "react-router-dom";
import { useCallback } from "react";
import TextUpdaterNode from "./TextUpdaterNode.js";
import TextUpdaterNodeOutput from "./TextUpdaterNodeOutput.js";
import ImgNode from "./ImgNode.js";
import ImgNodeController from "./ImgNodeUpdController.js";
import { toPng } from "html-to-image";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const nodeTypes = {
  textUpdater: TextUpdaterNode,
  ImgNodeUpd: ImgNode,
  ImgNodeUpdController: ImgNodeController,
  textUpdaterO: TextUpdaterNodeOutput,
};

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
const PDFPreview = () => {
  const { id } = useParams();
  // const storedData = localStorage.getItem("RecipesFetched");
  // const parsedData = JSON.parse(storedData);
  const data = useSelector((state) => state.recipe);
  const desiredRecipe = data.projectdata;
    const [logic, setImageDataLogic] = useState(null);
  console.log(desiredRecipe);
  const dispatch = useDispatch();
  const urlRecipe = `http://localhost:8080/api/project/recipe/${id}`;
  async function fetchData() {
    try {
      const response = await fetch(urlRecipe);
      const data = await response.json();
      dispatch(fetchRecipeSuccess(data));
    } catch (error) {
      console.error("Error fetching missions:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, [dispatch]);
  // const desiredRecipe = parsedData.find((recipe) => recipe.id === id);
  // const { image } = useImageContext();
  const parameterData = (rowCount, columnCount) => {
    const data = [];
    const keys = Object.keys(
      desiredRecipe?.parameterTables?.parameterData?.tableP || {}
    );

    for (let i = 0; i < rowCount; i++) {
      const row = [];
      for (let j = 0; j < columnCount; j++) {
        // Randomly select a key from the keys array
        const randomIndex = i * columnCount + j;
        const randomKey = keys[randomIndex];
        // console.log("index", randomKey);
        if (randomKey === "parametColumn" || randomKey === "parametRow") {
          continue;
        }
        // Push the corresponding value to the row
        row.push(
          desiredRecipe?.parameterTables?.parameterData?.tableP?.[randomKey] ||
            " "
        );
      }
      data.push(row);
      // console.log("data", data);
    }
    // Create an array of keys from table1

    return data;
  };
  const signalData = (rowCount, columnCount) => {
    const data = [];
    // Create an array of keys from table1
    const keys = Object.keys(
      desiredRecipe?.signalData?.signalData?.table1 || {}
    );
    console.log(keys);
    for (let i = 0; i < rowCount; i++) {
      const row = [];
      for (let j = 0; j < columnCount; j++) {
        // Randomly select a key from the keys array
        const randomIndex = i * columnCount + j;
        const randomKey = keys[randomIndex];
        console.log("index", randomIndex);
        if (randomKey === "parametColumnSig" || randomKey === "parametRowSig") {
          continue;
        }
        // Push the corresponding value to the row
        row.push(
          desiredRecipe?.signalData?.signalData?.table1?.[randomKey] || ""
        );
      }
      console.log("data", data);
      data.push(row);
    }
    return data;
  };
  const alarmpropsData = (rowCount, columnCount) => {
    const data = [];
    // Create an array of keys from table1
    const keys = Object.keys(
      desiredRecipe?.alarmPropsData?.alarmpropsData?.table || {}
    );
    console.log(keys);
    for (let i = 0; i < rowCount; i++) {
      const row = [];
      for (let j = 0; j < columnCount; j++) {
        // Randomly select a key from the keys array
        const randomIndex = i * columnCount + j;
        const randomKey = keys[randomIndex];
        if (
          randomKey === "parametRowAlarm" ||
          randomKey === "parametColumnAlarm"
        ) {
          continue;
        }
        // Push the corresponding value to the row
        row.push(
          desiredRecipe?.alarmPropsData?.alarmpropsData?.table?.[randomKey] ||
            ""
        );
      }
      data.push(row);
    }
    return data;
  };

  const [pdfData, setPdfData] = useState(null);
  const pdfRef = useRef();

  const handleGeneratePDF = () => {
    ////MAIN PAGE
    const doc = new jsPDF();
    function addHeader() {
      doc.setFontSize(40); // Set the font size for the header
      doc.setFont("helvetica", "bold"); // Set the font family and style to bold
      doc.text("FUNKTIONSSPEZIFIKATION", 10, 40); // Adjust the position as needed
      doc.setFont("helvetica", "normal"); // Reset font style to normal
    }
    function addSubHeader() {
      doc.setFontSize(30); // Set the font size for the header
      doc.setFont("helvetica", "bold"); // Set the font family and style to bold
      doc.text("PHASEXX", 10, 60); // Adjust the position as needed
      doc.setFont("helvetica", "normal"); // Reset font style to normal
    }

    addHeader();
    addSubHeader();
    // Left Logo

    doc.addImage(BackerHicksLogoPDF, "PNG", 10, 90, 80, 55); // Adjust the position and dimensions as needed

    // Right Logo

    doc.addImage(
      ClientLogoPDF,
      "PNG",
      doc.internal.pageSize.getWidth() - 80,
      90,
      80,
      55
    ); // Adjust the position and dimensions as needed

    // Define your table data
    const tableData = [
      ["Projekt Titel", "PLEX"],
      ["Projektnummer (Kunde)", "Pas2021_001"],
      ["Bakerhicks Projektnummer", "AT-213575-001"],
      ["Dokumententype", "Funktionsspezifikation"],
      ["Bereich", "Automatisierung"],
      ["Projekt Dokumentennummer", "Pas2021_001-01-Rev206_V01.2"],
    ];

    // Create the table
    doc.autoTable({
      body: tableData,
      startY: 220, // Set the Y coordinate for the table
      margin: { left: 10, right: 10 }, // Set margins to center the table horizontally
      tableWidth: "auto",
    });
    //////////////nEW PAGE
    doc.addPage();
    const tableData2 = [
      [
        {
          content: "Authored by",
          styles: {
            fontStyle: "bold",
            fontSize: 16,
            border: [true, true, true, true],
          },
        },
        {
          content: "Date/Name/Signum",
          styles: { fontStyle: "bold", fontSize: 16 },
        },
      ],
      [
        "Department: Automation (BAH) Responsibility: The requirements in this protocol represent the business needs and manufacturing requirements of the site to be served by this equipment or system. This document is technically sound with respect to the operation or use of the equipment",
        "",
      ],
      [
        {
          content: "Reviewed by",
          styles: {
            fontStyle: "bold",
            fontSize: 16,
            border: [true, true, true, true],
          },
        },
        {
          content: "Date/Name/Signum",
          styles: { fontStyle: "bold", fontSize: 16 },
        },
      ],
      [
        "Department: Process (BAH) Responsibility: The requirements in this protocol represent the business needs and manufacturing requirements of the site to be served by this equipment or system. This document is technically sound with respect to the operation or use of the equipment.",
        "",
      ],
      [
        {
          content: "Approved by",
          styles: {
            fontStyle: "bold",
            fontSize: 16,
            border: [true, true, true, true],
          },
        },

        {
          content: "Date/Name/Signum",
          styles: { fontStyle: "bold", fontSize: 16 },
        },
      ],
      [
        "Department: Manufacturing Engineering (CYT) Responsibility: The requirements in this protocol represent the business needs and manufacturing requirements of the site to be served by this equipment or system. This document is technically sound with respect to the operation or use of the equipment",
        "",
      ],
      [
        "Department: Quality Engineering (CYT) Responsibility: The requirements in this protocol represent the business needs and manufacturing requirements of the site to be served by this equipment or system. This document is technically sound with respect to the operation or use of the equipment.",
        "",
      ],
      [
        "Department: Quality Assurance (CYT) Responsibility: This document is in compliance with current local GMP- regulatory requirements and conforms to the applicable Cell Culture quality standards and work instruction documents.  Equipment satisfying these qualification and validation requirements will be suitable for its intended use.",
        "",
      ],
    ];

    doc.autoTable({
      body: tableData2,
      startY: 25, // Set the Y coordinate for the table
      margin: { left: 10, right: 10 }, // Set margins to center the table horizontally
      tableWidth: "auto",
      tableLineColor: [0, 0, 0], // Border color (black in RGB)
      tableLineWidth: 0.4,
    });
    doc.addPage();
    doc.setFontSize(14);
    doc.setFont("times");
    const introduction =
      JSON.parse(desiredRecipe?.description || "{}")?.content ?? "";
    doc.text(introduction, 10, 10, { align: "left", maxWidth: 190 });
    ///////////////////NEW PAGE
    // Add a new page
    doc.addPage();

    ////Parameters
    doc.setFontSize(12);
    doc.text(" Prozessparameter", 10, 10);
    const paramC =
      desiredRecipe?.parameterTables?.parameterData?.tableP?.parametColumn || 1;
    const paramR =
      desiredRecipe?.parameterTables?.parameterData?.tableP?.parametRow || 1;
    const data = parameterData(paramR, paramC);
    // Define the table headers
    console.log("table", data);
    function customizeRow(row, data) {
      if (row.index === 0) {
        // First row (index 0) will have gray background color
        row.styles.fillColor = [200, 250, 200]; // RGB color for gray
      }
    }
    doc.autoTable({
      body: data,
      didDrawRow: customizeRow,
    });

    const startY = doc.autoTable.previous.finalY + 20; // Move the second table 20 units down

    //////Ssignals

    doc.text("Schnittstellensignale", 10, startY);
    const paramCS =
      desiredRecipe?.signalData?.signalData?.table1?.parametColumnSig || 1;
    const paramRS =
      desiredRecipe?.signalData?.signalData?.table1?.parametRowSig || 1;
    const dataS = signalData(paramRS, paramCS);
    // Define the table headers

    function customizeRow(row, data) {
      if (row.index === 0) {
        // First row (index 0) will have gray background color
        row.styles.fillColor = [200, 250, 200]; // RGB color for gray
      }
    }
    doc.autoTable({
      body: dataS,
      didDrawRow: customizeRow,
      startY: startY + 10,
    });
    const NewstartY = doc.autoTable.previous.finalY;
    ///Alarm&Props
    doc.text("Alarme und Meldungen", 10, NewstartY + 10);
    const paramCA =
      desiredRecipe?.alarmPropsData?.alarmpropsData?.table
        ?.parametColumnAlarm || 1;
    const paramRA =
      desiredRecipe?.alarmPropsData?.alarmpropsData?.table?.parametRowAlarm ||
      1;
    const dataA = alarmpropsData(paramRA, paramCA);
    // Define the table headers

    function customizeRow(row, dataA) {
      if (row.index === 0) {
        row.styles.fillColor = [200, 250, 200]; // RGB color for gray
      }
    }
    doc.autoTable({
      body: dataA,
      didDrawRow: customizeRow,
      startY: NewstartY + 20,
    });

    ///////////////////NEW PAGE
    // Add a new page
    doc.addPage();
    doc.addImage(logic, "PNG", 10, 10, 200, 130); // adjust the parameters as needed

    /////ADD MORE PAGES IF NEEDED

    const pdfDataUri = doc.output("datauristring");
  

    setPdfData(pdfDataUri);
    // doc.save("generated-pdf.pdf");
  };

  const renderAllPages = () => {
    const pages = [];
    for (let pageNumber = 1; pageNumber <= 5; pageNumber++) {
      pages.push(
        <Page
          key={pageNumber}
          pageNumber={pageNumber}
          noData={true}
          width={800}
        />
      );
    }
    return pages;
  };

  const initialNodes = [];
  const initialEdges = [];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState(null);

  const { setViewport } = useReactFlow();
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
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
  }, [setNodes, setViewport]);


  const [logicshow, setLogicshow] = useState(false);
  const { getNodes } = useReactFlow();
  const imageWidth = 1024;
  const imageHeight = 768;
  const onClick = () => {
    const nodesBounds = getRectOfNodes(getNodes());
    const transform = getTransformForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2
    );

    toPng(document.querySelector(".react-flow__viewport"), {
      backgroundColor: "white",
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth,
        height: imageHeight,
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    }).then((dataUrl) => {
      console.log("Setting imageData:", { data: dataUrl });
      setImageDataLogic(dataUrl);
    });
  };

  useEffect(() => {
    onRestore();
  }, []);

  return (
    <div>
      <div></div>
      <h1>PDF Preview</h1>
      <button onClick={handleGeneratePDF}>Preview & Delete the pdf</button>
      <button onClick={onClick}>Retrive Data</button>
    

      {pdfData && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Document
            file={pdfData}
            onLoadError={(error) => console.log("Error", error)}
          >
            {renderAllPages()}
            {/* <Page pageNumber={1} /> */}
          </Document>
        </div>
      )}
        {!logicshow && (
        <div className=" w-100 " style={{ height: "95vh", width: "90em" }}>
          <ReactFlow
            id="flow-container"
            // ref={containerRef}
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
            <Panel style={{ paddingRight: "210px" }} position="top-right">
              {/* <button onClick={onRestore}>restore</button> */}
            </Panel>
          </ReactFlow>
        </div>
      )}
    </div>
  );
};

export default PDFPreview;
