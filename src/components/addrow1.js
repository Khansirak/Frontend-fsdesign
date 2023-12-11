import React, { useState } from "react";
import Addcolumn1 from "./addcolumn1";

const Addrow1 = (props) => {
  return (
    <>
      <tr  className="p-0">
        {[...Array(props.param)].map((x, i) => (
          <Addcolumn1
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
export default Addrow1;
