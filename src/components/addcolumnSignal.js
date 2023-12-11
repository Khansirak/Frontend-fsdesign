import React, { useState,useEffect } from "react";
import {updateSignalTable} from "../redux/slices/signalReducer"
import { useDispatch, useSelector } from "react-redux";


const AddcolumnSignal = (props) => {
  const storedData = localStorage.getItem("therecipe");
  // const desiredRecipe = JSON.parse(storedData);
  const data = useSelector((state) => state.recipe);
  const desiredRecipe=data.projectdata;
  // const desiredRecipe = parsedData.find((recipe) => recipe.id === id);
//ADDING THE INFORMATION OF PARAMETER TO SERVER

  const dispatch = useDispatch();

  const handleInputChange = (event, fieldId) => {
    const key = event.target.name;
    const value = event.target.value;
    dispatch(updateSignalTable(key, value));
  };
  const combinedClassName = `w-100 small p-0 m-0 no-border ${props.className}`;
  const propName = JSON.stringify(props.param2) + JSON.stringify(props.param);

  const hg=JSON.stringify(desiredRecipe?.signalData?.signalData?.table1?.[propName] || 10)?.length
 
  useEffect(() => {
    const keyValueArray = [
      { key: 10, value: 'ID' },
      { key: 11, value: 'Tag/Name' },
      { key: 12, value: 'Description' },
      { key: 13, value: 'Datentyp' },
      { key: 14, value: 'Type' },
      { key: 16, value: 'Default' },
      { key: 17, value: 'Unit' },
      { key: 18, value: 'Limits' },
      { key: 19, value: 'Range' },
   
    ];

    // Dispatch updateParameterTable for each key-value pair
    keyValueArray.forEach(({ key, value }) => {
      dispatch(updateSignalTable(key, value));
    });

    const propName = JSON.stringify(props.param2) + JSON.stringify(props.param);
    

    if (!desiredRecipe?.alarmPropsData?.alarmpropsData?.table?.[propName]) {
      dispatch(updateSignalTable(propName, " "));
    }


  }, []);
  return (
    <>

      <th scope="col p-0 m-0" >
      <input 
          type="text"
          name={JSON.stringify(props.param2) + JSON.stringify(props.param)}
          defaultValue={
            
            (() => {
              const propName = JSON.stringify(props.param2) + JSON.stringify(props.param);
              if (propName === "10") return desiredRecipe?.signalData?.signalData?.table1?.[propName] || "ID";
              if (propName === "11") return desiredRecipe?.signalData?.signalData?.table1?.[propName] || "Tag/Name";
              if (propName === "12") return desiredRecipe?.signalData?.signalData?.table1?.[propName] || "Description";
              if (propName === "13") return desiredRecipe?.signalData?.signalData?.table1?.[propName] || "Datentyp";
              if (propName === "14") return desiredRecipe?.signalData?.signalData?.table1?.[propName] || "Type";
              if (propName === "15") return desiredRecipe?.signalData?.signalData?.table1?.[propName] || "Default";
              if (propName === "16") return desiredRecipe?.signalData?.signalData?.table1?.[propName] || "Unit";
              if (propName === "17") return desiredRecipe?.signalData?.signalData?.table1?.[propName] || "Limits";
              if (propName === "18") return desiredRecipe?.signalData?.signalData?.table1?.[propName] || "Range";
              if (propName === "19") return desiredRecipe?.signalData?.signalData?.table1?.[propName] || "Definiton";

              return (
                desiredRecipe?.signalData?.signalData?.table1?.[propName] || "-"
              );
            })()}
          className={combinedClassName}  
          style={{ minHeight: "20px",  height: `${(hg) *2 +5}px` || '5px',resize: "none" }} // Set the initial minimum height
          onChange={(event) => {
            event.target.style.height = "10px"; // Reset the height to auto
            event.target.style.height =
              event.target.scrollHeight + "px"; // Set the height to fit the content
            handleInputChange(event, "1");
          }}
        />
      </th>
    </>
  );
};
export default AddcolumnSignal;
