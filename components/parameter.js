import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Addcolumn1 from "./addcolumn1";
import Addrow1 from "./addrow1";
import { Link, useParams } from "react-router-dom";
import { updateParameterTable } from "../redux/slices/parameterReducerSave";
import { resetParameter } from "../redux/slices/parameterReducerSave";
import { fetchRecipeSuccess } from "../redux/slices/recipeReducerget";
import '../index.css'
const Parameter = () => {
  const [forRow, setForRow] = useState(0);
  const [forColumn, setForColumn] = useState(0);
  const [visible, setVisible] = useState(true);
  const removeElement = () => {
    setVisible((prev) => !prev);
  };

  ////GETTING THE Parameetr DATA
  const { id } = useParams();
  const storedData = localStorage.getItem("therecipe");
  // const desiredRecipe = JSON.parse(storedData);
  // const desiredRecipe = parsedData.find((recipe) => recipe.id === id);
  const data = useSelector((state) => state.recipe);
  const desiredRecipe=data.projectdata;
  const parametersave = useSelector((state) => state.parametersave);
  console.log("tst", parametersave)
    // const tableRef = useRef(null);
    const dispatch = useDispatch();

  ////SAVING THE DATA
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/project/recipe/parameter/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parametersave),
        }
      );

      if (response.ok) {
        console.log("Data sent to server successfully");       
      } else {
        console.error("Error sending data to server");
      }
      fetchData()
    } catch (error) {
      console.error("Error sending data to server", error);
    }

    dispatch(updateParameterTable("parametRow", JSON.stringify(forRow)));
    dispatch(updateParameterTable("parametColumn", JSON.stringify(forColumn)));
       
  };
  const urlRecipe = `http://localhost:8080/api/project/recipe/${id}`;
  async function fetchData() {
    try {
      const response = await fetch(urlRecipe);
      const data = await response.json();
      dispatch(fetchRecipeSuccess(data));
      // localStorage.setItem("therecipe", JSON.stringify(data));
      // setTherecipe(prevState => ({ ...prevState, id: "newId", project_id: "newProjectId" }));
    } catch (error) {
      console.error("Error fetching missions:", error);
    }
  }
  useEffect(() => {
    fetchData();
  
  }, [dispatch]);
  useEffect(() => {
    fetchData();
    const paramC =
      desiredRecipe?.parameterTables?.parameterData?.tableP?.parametColumn || 6;
    setForColumn(JSON.parse(paramC));
    const paramR =
      desiredRecipe?.parameterTables?.parameterData?.tableP?.parametRow || 2;
    setForRow(JSON.parse(paramR));
    dispatch(resetParameter());
  }, []);




  return (
    <>
      <div className="menu-body w-100 ">
        <div className=" menu-body2 d-flex flex-row">
          <div className=" row">
            <nav className="navbar ">
              <ul className="nav  d-flex justify-content-start navbar-nav">
                <li className="nav-item w-75 ">
                  <button
                    type="button"
                    className="border btn m-3 border-info"
                    style={{ backgroundColor: "#b7e778" }}
                    onClick={() => {
                      setForRow(forRow + 1);
                    }}
                  >
                    New row
                  </button>
                </li>
                <li className="nav-item w-75">
                  <button
                    type="button"
                    className="border  btn m-3 border-info"
                    style={{ backgroundColor: "#b7e778" }}
                    onClick={() => {
                      setForColumn(forColumn + 1);
                    }}
                  >
                    New column
                  </button>
                </li>

                <li className="nav-item w-75 ">
                  <button
                    type="button"
                    className="border btn m-3 border-info"
                    style={{ backgroundColor: "#b7e778" }}
                    onClick={() => {
                      setForRow(forRow - 1);
                    }}
                  >
                    Delete row
                  </button>
                </li>
                <li className="nav-item w-75">
                  <button
                    type="button"
                    className="border  btn m-3 border-info"
                    style={{ backgroundColor: "#b7e778" }}
                    onClick={() => {
                    
                      setForColumn(forColumn - 1);
                    }}
                  >
                    Delete column
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          <div className="  w-100  h-100">
            <div className=" d-flex row justify-content-between m-1">
              <div className="col text-center ">
                <h4 className=" p-2 font-weight-bold"> Parameter</h4>
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
            <div className="d-flex h-100">
              <div className="d-flex  justify-content-center border w-100 border-info">
                <div className="m-3">

                        <td className="p-0 w-75">
                          <table
                            id="tb-Parameter"
                            className="table m-0 border"
                            // ref={tableRef}
                          >
                            <tbody>
                              {[...Array(forRow)].map((row1, index) => (
                                <Addrow1
                                  key={index}
                                  id={id}
                                  param={forColumn}
                                  param2={index}
                                />
                              ))}
                            </tbody>
                          </table>
                        </td>
                  <button
                    type="button"
                    className="border float-left btn m-3 border-info"
                    style={{ backgroundColor: "#b7e778" }}
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                  {/* <button
                    type="button"
                    className="border float-left btn m-3 border-info"
                    style={{ backgroundColor: "#b7e778" }}
                    onClick={handleRestore}
                  >
                    Store
                  </button> */}
                </div>
              </div>
              {visible && (
                <div className="border w-25 border-info">
                  <ul className=" toolbox column d-flex p-0 ">
                    <li className="border small border-info">I/O-List</li>
                    <li className=" border small border-info">Signal-list</li>
                    <li className=" border small border-info">Logic-In-Out</li>
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
    </>
  );
};
export default Parameter;
