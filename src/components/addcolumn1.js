import React, { useState, useEffect } from "react";
import { updateParameterTable } from "../redux/slices/parameterReducerSave";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Addcolumn1 = (props) => {
  const storedData = localStorage.getItem("therecipe");
  // const desiredRecipe = JSON.parse(storedData);
  // const desiredRecipe = parsedData.find((recipe) => recipe.id === id);
  const data = useSelector((state) => state.recipe);
  const desiredRecipe=data.projectdata;

  //ADDING THE INFORMATION OF PARAMETER TO SERVER

  const dispatch = useDispatch();
  const handleInputChange = (event, fieldId) => {
    const key = event.target.name;
    const value = event.target.value || " "; // Set empty value if the input is empty
    dispatch(updateParameterTable(key, value));
    
  };
  const combinedClassName = `w-100 small m-0 p-0 no-border ${props.className}`;
  const propName = JSON.stringify(props.param2) + JSON.stringify(props.param);
  // console.log(desiredRecipe.parameterTables.parameterData.table1[propName])
  const hg = JSON.stringify(
    desiredRecipe?.parameterTables?.parameterData?.tableP?.[propName] || 10
  ).length;

  useEffect(() => {
    const keyValueArray = [
      { key: 10, value: "Parameter" },
      { key: 11, value: "Default" },
      { key: 12, value: "Unit" },
      { key: 13, value: "Description" },
      { key: 14, value: "Min Wert" },
      { key: 15, value: "Max Wert" },
    ];

    // Dispatch updateParameterTable for each key-value pair
    keyValueArray.forEach(({ key, value }) => {
      dispatch(updateParameterTable(key, value));
    });

    const propName = JSON.stringify(props.param2) + JSON.stringify(props.param);
    

    if (!desiredRecipe?.alarmPropsData?.alarmpropsData?.table?.[propName]) {
      dispatch(updateParameterTable(propName, " "));
    }
  }, []);

  return (
    <>
      <th scope=" p-0 m-0">
        <input
          type="text"
          name={JSON.stringify(props.param2) + JSON.stringify(props.param)}
          defaultValue={(() => {
            const propName =
              JSON.stringify(props.param2) + JSON.stringify(props.param);
            if (propName === "10")
              return (
                desiredRecipe?.parameterTables?.parameterData?.tableP?.[
                  propName
                ] || "Parameter"
              );
            if (propName === "11")
              return (
                desiredRecipe?.parameterTables?.parameterData?.tableP?.[
                  propName
                ] || "Default"
              );
            if (propName === "12")
              return (
                desiredRecipe?.parameterTables?.parameterData?.tableP?.[
                  propName
                ] || "Unit"
              );
            if (propName === "13")
              return (
                desiredRecipe?.parameterTables?.parameterData?.tableP?.[
                  propName
                ] || "Description"
              );
            if (propName === "14")
              return (
                desiredRecipe?.parameterTables?.parameterData?.tableP?.[
                  propName
                ] || "Min Wert"
              );
            if (propName === "15")
              return (
                desiredRecipe?.parameterTables?.parameterData?.tableP?.[
                  propName
                ] || "Max Wert"
              );

            return (
              desiredRecipe?.parameterTables?.parameterData?.tableP?.[
                propName
              ] || "-"
            );
          })()}
          className={combinedClassName}
          style={{
            minHeight: "20px",
            height: `${hg * 2}px` || "5px",
            resize: "none",
          }} // Set the initial minimum height
          onChange={(event) => {
            event.target.style.height = "10px"; // Reset the height to auto
            event.target.style.height = event.target.scrollHeight + "px"; // Set the height to fit the content
            handleInputChange(event, "1");
          }}
        />
      </th>
    </>
  );
};
export default Addcolumn1;
