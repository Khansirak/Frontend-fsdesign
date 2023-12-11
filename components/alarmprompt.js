import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddcolumnAlarmProps from "./addcolumnAlarmProps";
import AddrowAlarmProps from "./addrowAlarmProps";
import { Link, useParams } from "react-router-dom";
import { updateAlarmPropsTable } from "../redux/slices/alarmpropsReducer";
import { fetchProjectSuccess } from "../redux/slices/projectReducerGet";
import { resetAlarmProps } from "../redux/slices/alarmpropsReducer";
import { fetchRecipeSuccess } from "../redux/slices/recipeReducerget";

const Alarmprompt = () => {
  const [forRowAlarm, setForRowAlarm] = useState(0);
  const [forColumnAlarm, setForColumnAlarm] = useState(0);
  const [visible, setVisible] = useState(true);
  const removeElement = () => {
    setVisible((prev) => !prev);
  };

  ////GETTING THE Signal DATA
  const { id } = useParams();
  const storedData = localStorage.getItem("therecipe");
  const data = useSelector((state) => state.recipe);
  const desiredRecipe=data.projectdata;
  const alarmsave = useSelector((state) => state.alarmprops);

  const dispatch = useDispatch();
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/project/recipe/alarmprops/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(alarmsave),
        }
      );

      if (response.ok) {
        console.log("Data sent to server successfully");
      } else {
        console.error("Error sending data to server");
      }
      fetchData();
    } catch (error) {
      console.error("Error sending data to server", error);
    }
    dispatch(
      updateAlarmPropsTable("parametRowAlarm", JSON.stringify(forRowAlarm))
    );

    dispatch(
      updateAlarmPropsTable(
        "parametColumnAlarm",
        JSON.stringify(forColumnAlarm)
      )
    );
  };

  const urlRecipe = `http://localhost:8080/api/project/recipe/${id}`;
  async function fetchData() {
    try {
      const response = await fetch(urlRecipe);
      const data = await response.json();
      dispatch(fetchRecipeSuccess(data));
      // localStorage.setItem("therecipe", JSON.stringify(data));
      // setTherecipe(prevState => ({ ...prevState, id: "newId", project_id: "newProjectId" }));
    } catch (error) {
      console.error("Error fetching missions:", error);
    }
  }
  useEffect(() => {
    fetchData();
  
  }, [dispatch]);
  useEffect(() => {
    fetchData();
    const paramC =
      desiredRecipe?.alarmPropsData?.alarmpropsData?.table
        ?.parametColumnAlarm || 8;
    setForColumnAlarm(JSON.parse(paramC));
    const paramR =
      desiredRecipe?.alarmPropsData?.alarmpropsData?.table?.parametRowAlarm ||
      2;
    setForRowAlarm(JSON.parse(paramR));
    dispatch(resetAlarmProps());
  }, []);

  return (
    <>
      <div className="menu-body w-100 ">
        <div className=" menu-body2 d-flex flex-row">
          <div className=" row">
            <nav className="navbar ">
              <ul className="nav  d-flex justify-content-start navbar-nav">
                <li className="nav-item w-75 ">
                  <button
                    type="button"
                    className="border btn m-3 border-info"
                    style={{ backgroundColor: "#b7e778" }}
                    onClick={() => {
                      setForRowAlarm(forRowAlarm + 1);
                    }}
                  >
                    New row
                  </button>
                </li>
                <li className="nav-item w-75">
                  <button
                    type="button"
                    className="border  btn m-3 border-info"
                    style={{ backgroundColor: "#b7e778" }}
                    onClick={() => {
                      setForColumnAlarm(forColumnAlarm + 1);
                    }}
                  >
                    New column
                  </button>
                </li>
                <li className="nav-item w-75 ">
                  <button
                    type="button"
                    className="border btn m-3 border-info"
                    style={{ backgroundColor: "#b7e778" }}
                    onClick={() => {
                      setForRowAlarm(forRowAlarm - 1);
                    }}
                  >
                    Delete row
                  </button>
                </li>
                <li className="nav-item w-75">
                  <button
                    type="button"
                    className="border  btn m-3 border-info"
                    style={{ backgroundColor: "#b7e778" }}
                    onClick={() => {
                      setForColumnAlarm(forColumnAlarm - 1);
                    }}
                  >
                    Delete column
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          <div className=" w-100  h-100">
            <div className=" d-flex row justify-content-between m-1">
              <div className="col text-center ">
                <h4 className=" p-2 font-weight-bold"> Alarm&Prompt</h4>
              </div>
              <div className="col text-end">
                <button
                  type="button"
                  className="border right m-1 btn border-info"
                  style={{ backgroundColor: "#C0C0C0" }}
                  onClick={removeElement}
                >
                  List-toolbox
                </button>
              </div>
            </div>

            <div className="d-flex h-100">
              <div className="d-flex justify-content-center border w-100 border-info">
                <div className="mt-5 m-4">
                  <td className="p-0 w-75">
                    <table id="tb-AlarmProps" className="table m-0 border">
                      <tbody>
                        {[...Array(forRowAlarm)].map((row1, index) => (
                          <AddrowAlarmProps
                            key={index}
                            id={id}
                            param={forColumnAlarm}
                            param2={index}
                          />
                        ))}
                      </tbody>
                    </table>
                  </td>

                  <button
                    type="button"
                    className="border float-left btn m-3 border-info"
                    style={{ backgroundColor: "#b7e778" }}
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                </div>
              </div>
              {visible && (
                <div className="border w-25 border-info">
                  <ul className=" toolbox column d-flex p-0 ">
                    <li className="border small border-info">I/O-List</li>
                    <li className=" border small border-info">Signal-list</li>
                    <li className=" border small border-info">Logic-In-Out</li>
                    <li className=" border small border-info">Parameter</li>
                    <li className=" border small border-info">EM</li>
                    <li className=" border small border-info">Interlock</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Alarmprompt;
