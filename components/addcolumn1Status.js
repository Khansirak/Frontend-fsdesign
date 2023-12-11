import React, { useState } from "react";
import { updateParameterTableState } from "../redux/slices/parameterReducerSave";
import { useDispatch, useSelector } from "react-redux";


const Addcolumn1Status = (props) => {
  const storedData = localStorage.getItem("fetchedData");
  const parsedData = JSON.parse(storedData);

//ADDING THE INFORMATION OF PARAMETER TO SERVER

  const dispatch = useDispatch();
  // const parameterDataSave = {table1:{}, table2:{}}
  const handleInputChangeStatus = (event, fieldId) => {
    const key = event.target.name;
    const value = event.target.value;
    // dispatch(updateParameterTableState(key, value));
  };
  const combinedClassName = `w-100 no-border ${props.className}`;
  return (
    <>

        {((((props.param+props.param3)+props.param2)*props.param2)+1)+props.param2}
      <th scope="col">
        <input
          type="text"
          name={JSON.stringify(props.param2) + JSON.stringify(props.param)}   
          defaultValue={parsedData?.recipe[0]?.parameterTables?.parameterData?.table2?.[JSON.stringify(props.param2) + JSON.stringify(props.param)] || "input"}
          className={combinedClassName}  
          onChange={(event) => handleInputChangeStatus(event, "1")}
          
        ></input>
      
      </th>
      
     
    </>
  );
};
export default Addcolumn1Status;
