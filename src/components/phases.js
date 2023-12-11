import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateInput } from "../redux/slices/projectReducerSave";

const Phases = ({ vl, phasedata, i, onIdChangePhase, id,projectindex }) => {
  const storedData = localStorage.getItem("descriptions");
  const parsedData = JSON.parse(storedData);
  // const [phasedata, setPhaseData] = useState({ value0: 0, value1: 1 });

  //ADDING THE INFORMATION OF PARAMETER TO SERVER
  const dispatch = useDispatch();
  const handleInputChange = (event, fieldId) => {
    const key = event.target.id;
    const value = event.target.value;
    dispatch(updateInput(key, value));
  };
  useEffect(() => {
    console.log(phasedata);
  }, []);
  const handleClickPhase = (event) => {
    const id = event.target.id;
    onIdChangePhase(id);
  };
  return (
    <>
      <ul className="d-flex flex-column pb-1">
        {[...Array(1)].map((_, index) => (
          <li>
            {" "}
            <input
              type="text"
              key={index}
              id={id}
              className="border border-success"
              name={"recipe" + vl + "operation" + i + "phase" + vl + index}
              defaultValue={parsedData?.[projectindex]?.projectInformation?.[id] || ""}
              onClick={handleClickPhase}
              onChange={(event) => handleInputChange(event, "1")}
            />{" "}
            <Link to={`/phase/${id ?? 0}`}>Phase</Link>
          </li>
        ))}
      </ul>
    </>
  );
};
export default Phases;
