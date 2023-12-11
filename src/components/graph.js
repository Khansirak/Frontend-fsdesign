import React, { useRef, useState, useEffect } from "react";
import DrawingComponent from "./grahpEditor.js";
import Menu from "./menu";
import "./phase.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//IMPORTANTE DO NOT DELETE

const Graph = () => {
  const [inputFields, setInputFields] = useState([]);
  const { id } = useParams();
  const storedData = localStorage.getItem("therecipe");
  // const desiredRecipe = JSON.parse(storedData);
  // const desiredRecipe = parsedData.find((recipe) => recipe.id === id);
  const data = useSelector((state) => state.recipe);
  const desiredRecipe=data.projectdata;
  const Inputs = JSON.parse(desiredRecipe?.graphRecipe?.array || "[]");

  const [visible, setVisible] = useState(true);
  const [visibles2, setVisibles2] = useState(false);
  const removeElement = () => {
    setVisible((prev) => !prev);
  };
  const removeElement2 = () => {
    setVisibles2((prev) => !prev);
  };

  //FOR CHART



  // const url = "http://localhost:8080/api/project/recipeids";
  // async function fetchData() {
  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();

  //     localStorage.setItem("RecipesFetched", JSON.stringify(data));
  //   } catch (error) {
  //     console.error("Error fetching missions:", error);
  //   }
  // }
  const urlRecipe = `http://localhost:8080/api/project/recipe/${id}`;
  async function fetchData() {
    try {
      const response = await fetch(urlRecipe);
      const data = await response.json();
      dispatch(fetchProjectSuccess(data));
      localStorage.setItem("therecipe", JSON.stringify(data));
      // setTherecipe(prevState => ({ ...prevState, id: "newId", project_id: "newProjectId" }));
    } catch (error) {
      console.error("Error fetching missions:", error);
    }
  }

  useEffect(() => {
    fetchData();
    if (Inputs) {
      setInputFields(Inputs);
    }
  }, []);

  const handleInputChange = (e) => {
    const updatedFields = [...inputFields];
    const index = e.target.name;
    const value = e.target.value;
    console.log(index, value);
    updatedFields[index] = value;
    setInputFields(updatedFields);
  };

  return (
    <>
      <div className=" d-flex menu-body w-100 ">
        <div className=" menu-body2 d-flex flex-row w-100">
          <div className="d-flex flex-column  w-100">
            <div className="d-flex border p-0 justify-content-between border-info ">
              <div>
                <button
                  type="button"
                  className="border text-center m-1 btn border-info"
                  style={{ backgroundColor: "#C0C0C0" }}
                  onClick={removeElement2}
                >
                  Management
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="border  btn m-1  border-info"
                  style={{ backgroundColor: "#b7e778" }}
                >
                  Overview{" "}
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
            </div>

            <div className="d-flex border border-info  h-110">
              {visibles2 && (
                <div className="" style={{ width: "20%" }}>
                   <Menu showPart={false} />
                </div>
              )}
              <div className="d-flex border  w-75 border-info">
                <div className="d-flex w-100 row h-100">
                  <section className="d-flex row p-4 h-50 justify-content-center">
                    <h3 className="border-bottom text-center"> Graph </h3>
                    <div className="d-flex justify-content-center p-0 ">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          paddingTop: "50px",
                        }}
                      >
                        <input
                          key={0}
                          name={0}
                          type="text"
                          defaultValue={Inputs?.[0] || ""}
                          onChange={(e) => handleInputChange(e)}
                          style={{
                            marginBottom: "10px",
                            width: "130px",
                            textAlign: "center",
                            border: "none",
                          }}
                        />
                        <input
                          key={1}
                          name={1}
                          type="text"
                          defaultValue={Inputs?.[1] || ""}
                          onChange={(e) => handleInputChange(e)}
                          style={{
                            marginBottom: "10px",
                            width: "130px",
                            textAlign: "center",
                            border: "none",
                          }}
                        />
                        <input
                          key={2}
                          name={2}
                          type="text"
                          defaultValue={Inputs?.[2] || ""}
                          onChange={(e) => handleInputChange(e)}
                          style={{
                            marginBottom: "10px",
                            width: "130px",
                            textAlign: "center",
                            border: "none",
                          }}
                        />
                        <input
                          key={3}
                          name={3}
                          type="text"
                          defaultValue={Inputs?.[3] || ""}
                          onChange={(e) => handleInputChange(e)}
                          style={{
                            marginBottom: "10px",
                            width: "130px",
                            textAlign: "center",
                            border: "none",
                          }}
                        />
                        <input
                          key={4}
                          name={4}
                          type="text"
                          defaultValue={Inputs?.[4] || ""}
                          onChange={(e) => handleInputChange(e)}
                          style={{
                            marginBottom: "10px",
                            width: "130px",
                            textAlign: "center",
                            border: "none",
                          }}
                        />
                        <input
                          key={5}
                          name={5}
                          type="text"
                          defaultValue={Inputs?.[5] || ""}
                          onChange={(e) => handleInputChange(e)}
                          style={{
                            marginBottom: "60px",
                            width: "130px",
                            textAlign: "center",
                            border: "none",
                          }}
                        />
                        <input
                          key={6}
                          name={6}
                          type="text"
                          defaultValue={Inputs?.[6] || ""}
                          onChange={(e) => handleInputChange(e)}
                          style={{
                            marginBottom: "10px",
                            width: "130px",
                            textAlign: "center",
                            border: "none",
                          }}
                        />
                        <input
                          key={7}
                          name={7}
                          type="text"
                          defaultValue={Inputs?.[7] || ""}
                          onChange={(e) => handleInputChange(e)}
                          style={{
                            marginBottom: "10px",
                            width: "130px",
                            textAlign: "center",
                            border: "none",
                          }}
                        />

                        <input
                          key={8}
                          name={8}
                          type="text"
                          defaultValue={Inputs?.[8] || ""}
                          onChange={(e) => handleInputChange(e)}
                          style={{
                            marginBottom: "10px",
                            width: "130px",
                            textAlign: "center",
                            border: "none",
                          }}
                        />
                        <input
                          key={9}
                          name={9}
                          type="text"
                          defaultValue={Inputs?.[9] || ""}
                          onChange={(e) => handleInputChange(e)}
                          style={{
                            marginBottom: "10px",
                            width: "130px",
                            textAlign: "center",
                            border: "none",
                          }}
                        />
                        <input
                          key={10}
                          name={10}
                          type="text"
                          defaultValue={Inputs?.[10] || ""}
                          onChange={(e) => handleInputChange(e)}
                          style={{
                            marginBottom: "50px",
                            width: "130px",
                            textAlign: "center",
                            border: "none",
                          }}
                        />
                                           <input
                          key={15}
                          name={15}
                          type="text"
                          defaultValue={Inputs?.[15] || ""}
                          onChange={(e) => handleInputChange(e)}
                          style={{
                            marginBottom: "10px",
                            width: "130px",
                            textAlign: "center",
                            border: "none",
                          }}
                        />
                        <input
                          key={11}
                          name={11}
                          type="text"
                          defaultValue={Inputs?.[11] || ""}
                          onChange={(e) => handleInputChange(e)}
                          style={{
                            marginBottom: "10px",
                            width: "130px",
                            textAlign: "center",
                            border: "none",
                          }}
                        />
                        <input
                          key={12}
                          name={12}
                          type="text"
                          defaultValue={Inputs?.[12] || ""}
                          onChange={(e) => handleInputChange(e)}
                          style={{
                            marginBottom: "10px",
                            width: "130px",
                            textAlign: "center",
                            border: "none",
                          }}
                        />

                        <input
                          key={13}
                          name={13}
                          type="text"
                          defaultValue={Inputs?.[13] || ""}
                          onChange={(e) => handleInputChange(e)}
                          style={{
                            marginBottom: "10px",
                            width: "130px",
                            textAlign: "center",
                            border: "none",
                          }}
                        />
                        
                        <input
                          key={14}
                          name={14}
                          type="text"
                          defaultValue={Inputs?.[14] || ""}
                          onChange={(e) => handleInputChange(e)}
                          style={{
                            marginBottom: "10px",
                            width: "130px",
                            textAlign: "center",
                            border: "none",
                          }}
                        />
                      </div>

                      <DrawingComponent inputFields={inputFields} />
                    </div>
                  </section>
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

export default Graph;
