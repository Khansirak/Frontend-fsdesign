import React, { useState } from "react";
import AddcolumnSignal from "./addcolumnSignal";
import AddcolumnAlarmProps from "./addcolumnAlarmProps";

const AddrowAlarmProps = (props) => {
  return (
    <>
      <tr>
  
        {[...Array(props.param)].map((x, i) => (
          <AddcolumnAlarmProps
            param={i}
            id={props.id}
            param2={props.param2 + 1}
            param3={props.param}
          />
        ))}
      </tr>
    </>
  );
};
export default AddrowAlarmProps;
