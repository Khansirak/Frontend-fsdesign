import React, { useState } from 'react';
import AddcolumnSignal from './addcolumnSignal'


const AddrowSignal = (props) => {


  return (
   <>
    <tr >
      {/* {props.param2} */}
    {[...Array(props.param)].map((x, i) =>
    <AddcolumnSignal param={i} id={props.id} param2={props.param2+1} param3={props.param}/>
  )}
       
    </tr>
   </>
  );
};
export default AddrowSignal;
