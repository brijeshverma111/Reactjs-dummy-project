import ActionNeeded from "./actionNeeded";
import FilterActivity from "./filterActivity";
import Notifications from "./notifications";
import ActivityContext from "../../context/activityContext";

import styles from "../../styles/activity.module.css";
import { useState } from "react";
function Activity() {
  const [filterSelected, setFilterSeleted] = useState([]);
  return (
    <>
      <h1>Activity</h1>
      <div className={"row " + styles.activity__container}>
        <ActivityContext.Provider value={{ filterSelected, setFilterSeleted }}>
          <div className="col-12 col-md-2">
            <FilterActivity />
          </div>
          <div className="col-12 col-md-6">
            <ActionNeeded />
          </div>
          <div className="col-12 col-md-4">
            <Notifications />
          </div>
        </ActivityContext.Provider>
      </div>
    </>
  );
}
export default Activity;
