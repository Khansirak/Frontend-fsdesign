import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { updateLogic } from '../redux/slices/logicReducer';
import { useDispatch, useSelector } from "react-redux";

function TextUpdaterNodeOutput({ data, isConnectable }) {
  
  const dispatch = useDispatch();
  
  const handleInputChange = ((evt) => {
    const key = evt.target.name;
    const value = evt.target.value;
    dispatch(updateLogic(key, value));
    console.log(evt.target.value);
    const newValue = evt.target.value;
    data.value = newValue; 
  });

  return (
    <>
     <div style={{width:"250px"}} className=" text-center " >
              <Handle type="target" position={Position.Left}  isConnectable={isConnectable} />
        <input id="text"  defaultValue={data.value} name={data.name} onChange={(event) => handleInputChange(event,"1")} className="p-1 w-100" />

     </div>
    </>
  );
}

export default TextUpdaterNodeOutput;
