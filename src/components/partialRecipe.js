import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateInput } from "../redux/slices/projectReducerSave";
import Phases from "./phases";
import { useIDContext } from "../context/IdContext";

const Recipe1 = ({
  rc,
  vl,
  recipe,
  recipeId,
  RecipeName,
  onIdChange,
  projectId,
  onIdChangeProject,
  onIdChangeOperation,
  onIdChangePhase,
  projectindex,
}) => {
  ////GETTING THE Projectdata DATA
  const storedData = localStorage.getItem("descriptions");
  const parsedData = JSON.parse(storedData);
  const [operationdata, setOperationData] = useState({ value0: 0 });
  const [phasedata, setPhaseData] = useState(0);
  const [phasedata1, setPhaseData1] = useState({ value0: 3, value1: 2 });
  const [recipeIds, setrecipeId] = useState([]);
  const dispatch = useDispatch();



  //////redux savedata

  const handleInputChange = (event, fieldId) => {
    const key = event.target.id;
    const value = event.target.value;
    dispatch(updateInput(key, value));
  };

  const fetchRecipeIds = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/project/recipeids",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const responseData = await response.json(); // Parse the response as JSON
        setrecipeId(responseData);
      } else {
        console.error("Error sending data to server");
      }
    } catch (error) {
      console.error("Error sending data to server", error);
    }
  };

  const handleClick = (event) => {
    const id = event.target.id;
    onIdChange(id);
    const projectId = event.target.name;
    onIdChangeProject(projectId);
  };

  const handleClickOperation = (e) => {
    const operationIdClicked = e.target.id;
    onIdChangeOperation(operationIdClicked);

    const projectId = e.target.name;
    onIdChangeProject(projectId);
  };
  const handleClickPhase = (id) => {
    onIdChangePhase(id);
  };
  useEffect(() => {
    //////////FOR OPERATION
    const recipeArray = [];
    for (let i = 0; i < recipe; i++) {
      recipeArray[i] = parsedData?.projectInformation?.[`${i}`] || 0;
    }

    const updatedOperationData = {};
    for (let i = 0; i < recipeArray.length; i++) {
      updatedOperationData[`value${i}`] = recipeArray[i] || 0;
    }
    setOperationData(updatedOperationData);
    fetchRecipeIds();

    /////////FOR PHASE
    const operationArray = [];
    for (let i = 0; i <= Object.keys(operationdata).length; i++) {
      operationArray[i] = parsedData?.projectInformation?.[`phases${i}`] || 0;
    }

    const updatedPhaseData = {};
    for (let i = 0; i <= operationArray.length; i++) {
      updatedPhaseData[`phases${i}`] = operationArray[i] || 0;
    }
    setPhaseData(updatedPhaseData);
  }, []);

  return (
    <>
      <li key={vl}>
        <details open>
          <summary className="pb-2">
            <input
              id={recipeId}
              name={projectId}
              type="text"
              className="border border-success"
              defaultValue={
                parsedData[projectindex]?.projectInformation?.[recipeId] || ""
              }
              onChange={(event) => handleInputChange(event, "1")}
              onClick={handleClick}
            />
            <Link to={`/phase/${recipeId}`}>Partial Recipe</Link>
          </summary>
          {
            <ul className="d-flex flex-column pb-1">
              {[...Array(rc?.subOperations?.length || 0)]
                .fill()
                .map((numTimes, i) => (
                  <>
                    <li key={i}>
                      <details open>
                        <summary className="pb-1">
                          <input
                            id={rc?.subOperations?.[i]?.id || 0}
                            type="text"
                            className="border border-success"
                            name={projectId}
                            defaultValue={
                              parsedData[projectindex]?.projectInformation?.[
                                rc?.subOperations?.[i]?.id
                              ] || ""
                            }
                            onChange={(event) => handleInputChange(event, "1")}
                            onClick={handleClickOperation}
                          />
                          <Link
                            to={`/phase/${rc?.subOperations?.[i]?.id || 0}`}
                          >
                            Operation
                          </Link>
                        </summary>
                        {[
                          ...Array(
                            rc?.subOperations?.[i]?.subPhases.length || 0
                          ),
                        ]
                          .fill()
                          .map((operationValue, operationIndex) => (
                            <Phases
                              vl={vl}
                              operationdata={operationdata}
                              phasedata={phasedata}
                              i={i}
                              projectindex={projectindex}
                              onIdChangePhase={handleClickPhase}
                              id={
                                rc?.subOperations?.[i]?.subPhases?.[
                                  operationIndex
                                ]?.id || 0
                              }
                     
                            />
                          ))}
                      </details>
                    </li>

                    {/* } */}
                  </>
                ))}
            </ul>
          }
          
        </details>
      </li>
    </>
  );
};

export default Recipe1;
