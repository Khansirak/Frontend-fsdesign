
import { Handle, Position } from 'reactflow';
import React, {useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { updateLogic } from '../redux/slices/logicReducer';


function TextUpdaterNode({ data, isConnectable }) {
  const dispatch = useDispatch();
  const handleInputChange = ((evt) => {
    const key = evt.target.name;
    const value = evt.target.value;
    dispatch(updateLogic(key, value));
    // console.log(evt.target.value);
    console.log(evt.target.value);
    const newValue = evt.target.value;
    data.value = newValue; 
  });
  return (

    <div style={{width:"250px"}} className=" text-center ">
 
        <input id="text"  defaultValue={data.value} name={data.name} onChange={(event) => handleInputChange(event)}  className="p-1 w-100 " />
      
      <Handle type="source" position={Position.Right}  isConnectable={isConnectable} />
    </div>
 
  );
}

export default TextUpdaterNode;
