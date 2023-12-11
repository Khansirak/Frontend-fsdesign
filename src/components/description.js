import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipeSuccess } from "../redux/slices/recipeReducerget";

import { updateDescription } from "../redux/slices/descriptionReducer";

const Description = () => {
  ///FOR UPDATING THE DESCRIPTION
  const descriptionsave = useSelector((state) => state.descriptionsave);

  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const value = e.target.value;
    dispatch(updateDescription(value));
  };
  const { id } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const textObject = { content: descriptionsave };
    try {
      const response = await fetch(
        `http://localhost:8080/api/project/recipe/description/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(textObject),
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

  /////FOR SHOWING THE LIST-TOOLBOX
  const [visible, setVisible] = useState(true);

  const removeElement = () => {
    setVisible((prev) => !prev);
  };
  ////GETTING THE DESCRIPTION DATA

  const storedData = localStorage.getItem("RecipesFetched");
  const parsedData = JSON.parse(storedData);
  // const desiredRecipe = parsedData.find((recipe) => recipe.id === id);


  const data = useSelector((state) => state.recipe);
  const desiredRecipe=data.projectdata;

  const url = "http://localhost:8080/api/project/recipeids";
  async function fetchData() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch(fetchRecipeSuccess(data));
      // localStorage.setItem("RecipesFetched", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching missions:", error);
    }
  }
  useEffect(() => {
    fetchData();
  
  }, [dispatch]);

  useEffect(() => {
    const urlRecipe = `http://localhost:8080/api/project/recipe/${id}`;
    async function fetchData() {
      try {
        const response = await fetch(urlRecipe);
        const data = await response.json();
        dispatch(fetchRecipeSuccess(data));
        // localStorage.setItem("therecipe", JSON.stringify(data));
        // setRecipeData("data")
      } catch (error) {
        console.error("Error fetching missions:", error);
      }
    }
    fetchData();
  });

  return (
    <>
      <div className="menu-body w-100 ">
        <div className=" menu-body2 d-flex flex-row">
          <div className=" border w-100 border-info h-100">
            <div className=" d-flex row justify-content-between m-1">
              <div className="col text-center ">
                <h4 className=" p-2 font-weight-bold"> Introduction</h4>
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
              <div className="d-flex justify-content-center border w-100 border-info">
                <div className="d-flex justify-content-center w-100 m-2">
                  <form
                    classname=" row d-flex justify-content-center w-100"
                    onSubmit={handleSubmit}
                  >
                    <label className="  w-100">
                      <textarea
                        rows="20"
                        cols="100"
                        className="no-border"
                        name="description"
                        defaultValue={
                          (JSON.parse(desiredRecipe?.description || "{}")
                            ?.content ??
                            "") ||
                          ""
                        }
                        onChange={(event) => handleInputChange(event, "1")}
                      />
                    </label>
                    <input className="w-25" type="submit" value="Submit" />
                  </form>
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
export default Description;
