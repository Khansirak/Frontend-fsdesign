import React, { useState, useEffect } from "react";
import "./menu.css";
import Project from "./project";
import Recipe from "./recipe";
import { useDispatch, useSelector } from "react-redux";
import { updateInput } from "../redux/slices/projectReducerSave";
import { fetchProjectSuccess } from "../redux/slices/projectReducerGet";

const Menu = ({ showPart = true }) => {
  ///ADD PROJECT
  const dispatch = useDispatch();

  // const storedData = localStorage.getItem("fetchedData");
  // const parsedData = JSON.parse(storedData);
  const [projects, setProjects] = useState([]);
  const [recipeId, setrecipeIds] = useState();
  const [partialrecipeId, setpartialrecipeIds] = useState();
  const [todelete, setTodelete] = useState();
  const [todeleteproject, setTodeleteproject] = useState();
  const [deleteproject, setdeleteproject] = useState();
  const [recipe, setReceipe] = useState(0);
  const [partialrecipe, setPartialReceipe] = useState(0);
  const [operationNumberClick, setoperationNumberClick] = useState(0);
  const [phaseNumberClick, setPhaseNumberClick] = useState(0);

  /////////////FOR PROJECT

  const handleSubmitProject = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Data sent to server successfully");
        // setProjectid(responseData[0]);
      } else {
        console.error("Error sending data to server");
      }
      fetchData();
    } catch (error) {
      console.error("Error sending data to server", error);
    }
  };

  const handleDeleteProject = async () => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this project?"
      );

      if (confirmed) {
        const toDelete = deleteproject;

        const response = await fetch(
          "http://localhost:8080/api/project/" + toDelete,
          {
            method: "DELETE",
            headers: {
              // "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          console.log("Data sent to server successfully");
        } else {
          console.error("Error sending data to server");
        }

        fetchData();
        const updatedProjects = projects.filter(
          (project) => project.id !== toDelete
        );
        setProjects(updatedProjects);
      }
    } catch (error) {
      console.error("Error sending data to server", error);
    }
  };

  const handleIdChangeProject = (id) => {
    // Use the id value here in the GrandparentComponent
    setTodeleteproject(id);
  };
  const onIdChangeproject = (id) => {
    // Use the id value here in the GrandparentComponent
    setdeleteproject(id);
  };

  ///////FOR PARTIL RECIPE
  const handleButtonClickPartialReceipe = () => {
    dispatch(updateInput("recipePartialNumber", partialrecipe + 1));
    setPartialReceipe(partialrecipe + 1);
  };
  const handleButtonClickPartialReceipeDelete = () => {
    setPartialReceipe(recipe - 1);
    dispatch(updateInput("recipePartialNumber", partialrecipe - 1));
  };
  const handleSubmitPartial = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/project/partialrecipe/" + deleteproject,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const responseData = await response.json(); // Parse the response as JSON
        console.log("Data sent to server successfully");
        setpartialrecipeIds(responseData[0]);
      } else {
        console.error("Error sending data to server");
      }
      fetchData();
    } catch (error) {
      console.error("Error sending data to server", error);
    }
  };
  //////////FOR RECIPE
  const handleButtonClickReceipe = () => {
    dispatch(updateInput("recipeNumber", recipe + 1));
    setReceipe(recipe + 1);
  };
  const handleButtonClickReceipeDelete = () => {
    setReceipe(recipe - 1);
    dispatch(updateInput("recipeNumber", recipe - 1));
    setReceipe(recipe - 1);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/project/recipe/" + deleteproject,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const responseData = await response.json(); // Parse the response as JSON
        console.log("Data sent to server successfully");
        setrecipeIds(responseData[0]);
      } else {
        console.error("Error sending data to server");
      }
      fetchData();
    } catch (error) {
      console.error("Error sending data to server", error);
    }
  };
  const handleSubmitReceipeDelete = async () => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this project?"
      );
      if (confirmed) {
       
        const toDelete = todelete;
        const response = await fetch(
          `http://localhost:8080/api/project/${todeleteproject}/recipe/${toDelete}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          console.log("Data sent to server successfully");
        } else {
          console.error("Error sending data to server");
        }
        fetchData();
      }
    } catch (error) {
      console.error("Error sending data to server", error);
    }
  };
  const handleIdChange = (id) => {
    // Use the id value here in the GrandparentComponent
    setTodelete(id);
  };

  const handleIdChangeOperation = (id) => {
    // Use the id value here in the GrandparentComponent
    setoperationNumberClick(id);
  };
  //////FOR OPERATION
  const handleSubmitOperation = async () => {
    const toDelete = todelete;
    try {
      const response = await fetch(
        `http://localhost:8080/api/project/${deleteproject}/recipe/${toDelete}/operation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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

  const handleDeleteOperation = async () => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this project?"
      );
      if (confirmed) {
        const response = await fetch(
          `http://localhost:8080/api/project/recipe/operation/${operationNumberClick}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          console.log("Data sent to server successfully");
        } else {
          console.error("Error sending data to server");
        }
        fetchData();
      }
    } catch (error) {
      console.error("Error sending data to server", error);
    }
  };

  /////////FOR THE PHASE
  const handleClickPhase = (id) => {
    setPhaseNumberClick(id);
  };
  const handleSubmitPhase = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/project/${todeleteproject}/operation/${operationNumberClick}/phase`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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

  const handleDeletePhase = async () => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this project?"
      );
      if (confirmed) {
        const response = await fetch(
          `http://localhost:8080/api/project/recipe/phase/${phaseNumberClick}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          console.log("Data sent to server successfully");
        } else {
          console.error("Error sending data to server");
        }
        fetchData();
      }
    } catch (error) {
      console.error("Error sending data to server", error);
    }
  };
  ///for LIST-TOOLBOX
  const [visible, setVisible] = useState(false);
  const removeElement = () => {
    setVisible((prev) => !prev);
  };
  const url = "http://localhost:8080/api/project/getProject";
  async function fetchData() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch(fetchProjectSuccess(data));
      setProjects(data);
    } catch (error) {
      console.error("Error fetching missions:", error);
    }
  }

  const urlNew = "http://localhost:8080/api/project/getProjectInformation";
  async function fetchDatadDescription() {
    try {
      const response = await fetch(urlNew);
      const data = await response.json();

      localStorage.setItem("descriptions", JSON.stringify(data));

    } catch (error) {
      console.error("Error fetching missions:", error);
    }
  }


  useEffect(() => {
    
    fetchData();
    fetchDatadDescription();

  }, []);

  return (
    <>
      {!showPart && (
        <div className="d-flex  flex-column  border w-100 justify-content-center border-info">
          {projects.map((item, index) => (
            <Project
              recipeId={recipeId}
              partialrecipeId={partialrecipeId}
              projectId={item.id}
              recipe={recipe}
              partialrecipe={partialrecipe}
              key={index}
              projectindex={index}
              onIdChange={handleIdChange}
              onIdChangeOperation={handleIdChangeOperation}
              onIdChangeProject={handleIdChangeProject}
              onIdChangeproject={onIdChangeproject}
              onIdChangePhase={handleClickPhase}
              item={item}
            />
          ))}
        </div>
      )}
      {showPart && (
        <div className=" menu-body2 d-flex flex-row">
          <div
            className="row  "
            style={{
              position: "fixed",
              top: "0",
              width: "7%",
              paddingTop: "60px",
              zIndex: "100",
            }}
          >
            {/* <nav className=" p-0  "> */}

            <ul className="nav  d-flex justify-content-around mt-3 pt-4 navbar-nav">
              <li
                className="nav-item mt-5 "
                style={{ height: "50px", width: "50px" }}
              >
                <button
                  type="button"
                  className="border btn m-2 border-info"
                  style={{
                    backgroundColor: "#b7e778",
                    fontSize: "10px",
                    height: "100%",
                  }}
                  onClick={() => {
                    handleSubmitProject();
                  }}
                >
                  New Project
                </button>
              </li>
              <li
                className="nav-item pt-2 "
                style={{ height: "60px", width: "40px" }}
              >
                <button
                  type="button"
                  className="border btn m-2 border-info"
                  style={{
                    backgroundColor: "#b7e778",
                    fontSize: "10px",
                    height: "100%",
                  }}
                  onClick={() => {
                    handleDeleteProject();
                  }}
                >
                  Delete Project
                </button>
              </li>
              <li
                className="nav-item pt-2 "
                style={{ height: "60px", width: "70px" }}
              >
                <button
                  type="button"
                  className="border  btn m-2 border-info"
                  style={{
                    backgroundColor: "#b7e778",
                    fontSize: "10px",
                    height: "100%",
                  }}
                  onClick={() => {
                    handleButtonClickReceipe(), handleSubmit();
                  }}
                >
                  New recipe
                </button>
              </li>
              <li
                className="nav-item pt-2"
                style={{ height: "60px", width: "50px" }}
              >
                <button
                  type="button"
                  className="border  btn m-2 border-info"
                  style={{
                    backgroundColor: "#b7e778",
                    fontSize: "10px",
                    height: "100%",
                  }}
                  onClick={() => {
                    handleButtonClickReceipeDelete(),
                      handleSubmitReceipeDelete();
                  }}
                >
                  Delete recipe
                </button>
              </li>

              <li
                className="nav-item pt-2 "
                style={{ height: "60px", width: "50px" }}
              >
                <button
                  type="button"
                  className="border  btn m-2 border-info"
                  style={{
                    backgroundColor: "#b7e778",
                    fontSize: "10px",
                    height: "100%",
                  }}
                  onClick={() => {
                    handleButtonClickPartialReceipe(), handleSubmitPartial();
                  }}
                >
                  New partial recipe
                </button>
              </li>

              <li
                className="nav-item pt-2 m-0"
                style={{ height: "60px", width: "50px" }}
              >
                <button
                  type="button"
                  className="border  btn m-2  border-info"
                  style={{
                    backgroundColor: "#b7e778",
                    fontSize: "10px",
                    height: "100%",
                  }}
                  onClick={() => {
                    handleButtonClickPartialReceipeDelete(),
                      handleSubmitReceipeDelete();
                  }}
                >
                  Delete partial recipe
                </button>
              </li>
              <li
                className="nav-item pt-2"
                style={{ height: "60px", width: "70px" }}
              >
                <button
                  type="button"
                  className="border  btn m-2 p-0 border-info"
                  style={{
                    backgroundColor: "#b7e778",
                    fontSize: "10px",
                    height: "100%",
                  }}
                  onClick={() => {
                    handleSubmitOperation();
                  }}
                >
                  New Operation
                </button>
              </li>
              <li
                className="nav-item pt-2"
                style={{ height: "60px", width: "70px" }}
              >
                <button
                  type="button"
                  className="border  btn m-2 p-0 border-info"
                  style={{
                    backgroundColor: "#b7e778",
                    fontSize: "10px",
                    height: "100%",
                  }}
                  onClick={() => {
                    handleDeleteOperation();
                  }}
                >
                  Delete Operation
                </button>
              </li>
              <li
                className="nav-item pt-2 "
                style={{ height: "60px", width: "55px" }}
              >
                <button
                  type="button"
                  className="border  btn m-2 border-info"
                  style={{
                    backgroundColor: "#b7e778",
                    fontSize: "10px",
                    height: "100%",
                  }}
                  onClick={() => {
                    handleSubmitPhase();
                  }}
                >
                  New Phase
                </button>
              </li>
              <li
                className="nav-item pt-2 "
                style={{ height: "60px", width: "45px" }}
              >
                <button
                  type="button"
                  className="border  btn m-2 border-info"
                  style={{
                    backgroundColor: "#b7e778",
                    fontSize: "10px",
                    height: "100%",
                  }}
                  onClick={() => {
                    handleDeletePhase();
                  }}
                >
                  Delete Phase
                </button>
              </li>
            </ul>
            {/* </nav> */}
          </div>
          <div
            className=" w-100 ml-5 p-0 border-info"
            style={{ marginLeft: "100px" }}
          >
            <div className=" d-flex row justify-content-between ">
              <div className="col text-center ">
                <h4 className="  font-weight-bold"> Management</h4>
              </div>
              <div className="col text-end">
                <button
                  type="button"
                  className="border right m-1 btn border-info"
                  style={{ backgroundColor: "#C0C0C0" }}
                  onClick={removeElement}
                >
                  List-toolbox
                </button>
              </div>
            </div>
            <div className="d-flex flex-row border w-100 justify-content-center border-info">
              <div className="d-flex  flex-column  border w-100 justify-content-center border-info">
                {projects.map((item, index) => (
                  <Project
                    recipeId={recipeId}
                    partialrecipeId={partialrecipeId}
                    projectId={item.id}
                    recipe={recipe}
                    partialrecipe={partialrecipe}
                    key={index}
                    projectindex={index}
                    onIdChange={handleIdChange}
                    onIdChangeOperation={handleIdChangeOperation}
                    onIdChangeProject={handleIdChangeProject}
                    onIdChangeproject={onIdChangeproject}
                    onIdChangePhase={handleClickPhase}
                    item={item}
                  />
                ))}
              </div>
              <div className="border w-50 border-info"></div>

              {visible && (
                <div className="border border-info" style={{ width: "30%" }}>
                  <ul className=" toolbox d-flex  m-0 p-0 ">
                    <li className="border  border-info">I/O-List</li>
                    <li className=" border  border-info">Signal-list</li>
                    <li className=" border  border-info">Logic-In-Out</li>
                    <li className=" border  border-info">Parameter</li>
                    <li className=" border  border-info">EM</li>
                    <li className=" border  border-info">Interlock</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Menu;
