import React, { useState,useEffect } from "react";


import { updateAlarmPropsTable } from "../redux/slices/alarmpropsReducer";
import { useDispatch,useSelector } from "react-redux";

const AddcolumnAlarmProps = (props) => {
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
    dispatch(updateAlarmPropsTable(key, value));
  };
  const combinedClassName = `w-100 small p-0 m-0 no-border ${props.className}`;
  const propName = JSON.stringify(props.param2) + JSON.stringify(props.param);
  const hg=JSON.stringify(desiredRecipe?.alarmPropsData?.alarmpropsData?.table?.[propName] || 10)?.length
 

  useEffect(() => {
    const keyValueArray = [
      { key: 10, value: 'Alarm Tag' },
      { key: 11, value: 'Status' },
      { key: 12, value: 'Description' },
      { key: 13, value: 'Type' },
      { key: 14, value: 'Priority' },
      { key: 16, value: 'Def: low-Alarm' },
      { key: 17, value: 'Def: High Alarm' },
      { key: 18, value: 'Def: High-High-Alarm' },
   
    ];

    // Dispatch updateParameterTable for each key-value pair
    keyValueArray.forEach(({ key, value }) => {
      dispatch(updateAlarmPropsTable(key, value));
    });
    
    const propName = JSON.stringify(props.param2) + JSON.stringify(props.param);
    

    if (!desiredRecipe?.alarmPropsData?.alarmpropsData?.table?.[propName]) {
      dispatch(updateAlarmPropsTable(propName, " "));
    }
  
  }, []);
  return (
    <>

      <th scope="col p-0 m-0">
        <input
          type="text"
          name={JSON.stringify(props.param2) + JSON.stringify(props.param)}
          defaultValue={
            (() => {
              const propName = JSON.stringify(props.param2) + JSON.stringify(props.param);
              if (propName === "10") return desiredRecipe?.alarmPropsData?.alarmpropsData?.table?.[propName] || "Alarm Tag";
              if (propName === "11") return desiredRecipe?.alarmPropsData?.alarmpropsData?.table?.[propName] || "Status";
              if (propName === "12") return desiredRecipe?.alarmPropsData?.alarmpropsData?.table?.[propName] || "Description";
              if (propName === "13") return desiredRecipe?.alarmPropsData?.alarmpropsData?.table?.[propName] || "Type";
              if (propName === "14") return desiredRecipe?.alarmPropsData?.alarmpropsData?.table?.[propName] || "Priority";
              if (propName === "15") return desiredRecipe?.alarmPropsData?.alarmpropsData?.table?.[propName] || "Def: low-Alarm";
              if (propName === "16") return desiredRecipe?.alarmPropsData?.alarmpropsData?.table?.[propName] || "Def: High Alarm";
              if (propName === "17") return desiredRecipe?.alarmPropsData?.alarmpropsData?.table?.[propName] || "Def: High-High-Alarm";

              return (
                desiredRecipe?.alarmPropsData?.alarmpropsData?.table?.[propName] || "-"
              );
            })()
          }
          className={combinedClassName}
          style={{ minHeight: "20px",  height: `${(hg) *2 +5}px` || '5px',resize: "none" }} // Set the initial minimum height
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
export default AddcolumnAlarmProps;
