import { Link, useParams } from "react-router-dom";
import Recipe from "./recipe";
import Recipe1 from "./partialRecipe";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateInput } from "../redux/slices/projectReducerSave";
import { resetSignals } from "../redux/slices/signalReducer";
import { resetParameter } from "../redux/slices/parameterReducerSave";
import { resetAlarmProps } from "../redux/slices/alarmpropsReducer";

const Project = ({
  recipe,
  partialrecipe,
  projectindex,
  onIdChange,
  onIdChangeProject,
  onIdChangeproject,
  onIdChangeRecipe,
  onIdChangeOperation,
  onIdChangePhase,
  projectId,
  item,
}) => {
  //ADDING THE INFORMATION TO SERVER
  const dispatch = useDispatch();
  const projectinformationsave = useSelector((state) => state.projectsave);
  const handleInputChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    dispatch(updateInput(key, value));
  };

  const handleSubmit = async (e) => {
    const projectId = e.target.id;
    try {
      const response = await fetch(
        `http://localhost:8080/api/project/information/${projectId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectinformationsave),
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
  ////GETTING THE PROJECT Description

  const storedData = localStorage.getItem("descriptions");
  const parsedData = JSON.parse(storedData);
  ///////RECIPE
  const handleIdChange = (id) => {
    // Use the id value here or pass it to the grandparent component
    onIdChange(id);
  };

  const handleIdChangeRecipe = (id) => {
    onIdChangeRecipe(id);
  };
  const handleIdChangeOperation = (id) => {
    onIdChangeOperation(id);
  };

  const handleIdChangeProject = (id) => {
    onIdChangeProject(id);
    // setTodeleteProject(id);
  };
  ////PROJECT
  const handleClickproject = (event) => {
    const id = event.target.id;
    onIdChangeproject(id); // Call the callback function to pass the id to the parent component
  };
  const handleClickPhase = (id) => {
    onIdChangePhase(id);
  };

  
  useEffect(() => {

    dispatch(resetSignals());
    dispatch(resetParameter());
    dispatch(resetAlarmProps());
  }, []);

  return (
    <>

      <ul className="d-flex tree mt-5 p-0 ">
        <li>
          <details open>
            <summary className="pb-3">
              <input
                id={projectId}
                type="text"
                className="border border-success"
                name="projectName"
                defaultValue={
                  parsedData[projectindex]?.projectInformation?.projectName ||
                  "Add Project Name"
                }
                onChange={(event) => handleInputChange(event, "1")}
                onClick={handleClickproject}
              />{" "}
              Project Name{" "}
            </summary>
            <ul className="d-flex flex-column pb-3">
              <li className="d-flex">
                <details open>
                  <summary className="pb-3"> Automation</summary>
                  <ul className="d-flex flex-column h-100vh pb-2">
                    <li>
                      <summary className="pb-2">
                        {" "}
                        Funtional specification
                      </summary>
                      {[...Array(item.recipe.length)].map((rc, index) => (
                        <Recipe
                          onIdChange={handleIdChange}
                          onIdChangeRecipe={handleIdChangeRecipe}
                          onIdChangeOperation={handleIdChangeOperation}
                          onIdChangeProject={handleIdChangeProject}
                          onIdChangePhase={handleClickPhase}
                          key={index}
                          recipeId={item?.recipe?.[index]?.id || 0}
                          vl={index}
                          recipe={recipe}
                          projectId={projectId}
                          RecipeName="Recipe"
                          projectindex={projectindex}
                          rc={item.recipe[index]}
                        />
                      ))}

                      {[...Array(item.partialRecipe.length)].map((rc, index) => (
                        <Recipe1
                          onIdChange={handleIdChange}
                          onIdChangeRecipe={handleIdChangeRecipe}
                          onIdChangeOperation={handleIdChangeOperation}
                          onIdChangeProject={handleIdChangeProject}
                          onIdChangePhase={handleClickPhase}
                          key={index}
                          recipeId={item?.partialRecipe?.[index]?.id || 0}
                          vl={index}
                          partialrecipe={partialrecipe}
                          projectId={projectId}
                          RecipeName="Recipe"
                          projectindex={projectindex}
                          rc={item.partialRecipe[index]}
                        />
                      ))}
                      {/* <li>
                        <details open>
                          <summary className="pb-3">
                            <input
                              id="message"
                              type="text"
                              className="border border-success"
                              defaultValue=" EQM"
                            />
                            Equipement Module{" "}
                          </summary>
                          <ul className="pb-3">
                            <li>
                              <input
                                type="text"
                                id="message3"
                                className="border  border-success"
                                name="equipementModule"
                                defaultValue={
                                  parsedData?.projectInformation
                                    ?.equipementModule ||
                                     "Equipement Module"
                                }
                                onChange={(event) =>
                                  handleInputChange(event, "1")
                                }
                              />
                              <Link to="/equipemen-module">Agitator </Link>
                            </li>
                          </ul>
                        </details>
                      </li>
                      <li>
                        <details open>
                          <summary className="pb-3">
                            <input
                              id="message"
                              type="text"
                              className="border border-success"
                              defaultValue="Ilock"
                            />{" "}
                            Interlock{" "}
                          </summary>
                          <ul className="pb-3">
                            <li>
                              <input
                                type="text"
                                id="message3"
                                className="border border-success"
                                name="interlock"
                                defaultValue={
                                  parsedData?.projectInformation?.interlock ||
                                  "Interlock"
                                }
                                onChange={(event) =>
                                  handleInputChange(event, "1")
                                }
                              />{" "}
                              <Link to="/interlock-module">Agitator </Link>{" "}
                            </li>
                          </ul>
                        </details>
                      </li> */}
                    </li>

                  </ul>
                </details>
              </li>
              <li className="mt-2">
                <summary className="pb-3">
                  <button
                    id={projectId}
                    type="button"
                    className="border float-left btn  border-info"
                    style={{ backgroundColor: "#b7e778", height: "40px" }}
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    Save the information
                  </button>
                </summary>
              </li>
            </ul>
          </details>
          {/* <button
            id={projectId}
            type="button"
            className="border float-left btn m-2 p-1  border-info"
            style={{ backgroundColor: "#b7e778", height: "40px" }}
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Save
          </button> */}
        </li>
      </ul>
    </>
  );
};

export default Project;
