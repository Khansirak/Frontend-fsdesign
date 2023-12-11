import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateActionStepTable } from "../redux/slices/actionStepReducer";
import { resetTable } from "../redux/slices/actionStepReducer";
import { fetchProjectSuccess } from "../redux/slices/projectReducerGet";
const ActionTable = ({ name, step, actionObject, id, handleNodeClick }) => {
  const dispatch = useDispatch();
  // console.log(`id`, id);
  // console.log(`step`, step)
  const actionstepTables = useSelector((state) => state.actionstep);

  // const url = "http://localhost:8080/api/project/recipeids";
  // async function fetchData() {
  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     dispatch(fetchProjectSuccess(data));
  //     localStorage.setItem("RecipesFetched", JSON.stringify(data));
  //     if (id) {
  //       handleNodeClick(undefined, { id });
  //     }
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
      // localStorage.setItem("therecipe", JSON.stringify(data));
      // setTherecipe(prevState => ({ ...prevState, id: "newId", project_id: "newProjectId" }));
    } catch (error) {
      console.error("Error fetching missions:", error);
    }
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/project/recipe/actionsteptable/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(actionstepTables),
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

  const handleInputChange = (event, fieldId) => {
    const key = event.target.name;
    const value = event.target.value;
    dispatch(updateActionStepTable(key, value));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <table
        id={name}
        className="table table-bordered border border-dark custom-rounded-table"
      >
        <thead>
          <tr>
            <th className="p-0">Action:</th>
            <th className="p-0">{name}</th>
            <th className="p-0">Step-no:</th>
            <th className="p-0">{step}</th>
            <th className="p-0">Restart date:</th>
          </tr>
          <tr>
            <th className="p-0">Delay-t</th>
            <th className="p-0">Cond.</th>
            <th className="p-0">Name</th>
            <th className="p-0">Description</th>
            <th className="p-0">Value</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(20)].map((_, i) => (
            <tr key={i} className="rows">
              <td style={{width:"60px"}}>
                <input
                  key={actionObject?.id}
                  name={i}
                  defaultValue={actionObject?.actionstepTable?.[i] || ""}
                  className="no-border w-100 "
                  onChange={(event) => {
                    handleInputChange(event, "1");
                  }}
                />
              </td>
              <td style={{width:"60px"}}>
                <input
                  key={actionObject?.id}
                  name={i + 20}
                  defaultValue={actionObject?.actionstepTable?.[i + 20] || ""}
                  className="no-border  w-100"
                  onChange={(event) => {
                    handleInputChange(event, "1");
                  }}
                />
              </td>
              <td className="">
                <input
                  key={actionObject?.id}
                  name={i + 2 * 20}
                  defaultValue={
                    actionObject?.actionstepTable?.[i + 2 * 20] || ""
                  }
                  className="no-border  w-100"
                  onChange={(event) => {
                    handleInputChange(event, "1");
                  }}
                />
              </td>
              <td className="">
                <input
                  key={actionObject?.id}
                  name={i + 3 * 20}
                  defaultValue={
                    actionObject?.actionstepTable?.[i + 3 * 20] || ""
                  }
                  className="no-border  w-100"
                  onChange={(event) => {
                    handleInputChange(event, "1");
                  }}
                />
              </td>
              <td style={{width:"70px"}}>
                <input
                  key={actionObject?.id}
                  name={i + 4 * 20}
                  defaultValue={
                    actionObject?.actionstepTable?.[i + 4 * 20] || ""
                  }
                  className="no-border  w-100"
                  onChange={(event) => {
                    handleInputChange(event, "1");
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          id={name}
          className="border  btn m-1  border-info"
          style={{ backgroundColor: "rgb(192, 192, 192)" }}
          onClick={(event) => {
            handleSubmit();
          }}
        >
          Save{" "}
        </button>
      </div>
    </>
  );
};
export default ActionTable;
