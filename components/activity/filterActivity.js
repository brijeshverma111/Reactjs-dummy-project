import styles from "../../styles/activity.module.css";
import { filterActivityOptions, actionFilterMap } from "../../src/constants";
import { capitalizeFirstLetter } from "../../helpers/util";
import { useContext } from "react";
import ActivityContext from "../../context/activityContext";

function FilterActivity() {
  const { filterSelected, setFilterSeleted } = useContext(ActivityContext);
  // console.log("filterSelected", filterSelected);
  return (
    <>
      <h5>📁 Filter Activity</h5>
      <button
        className={
          !filterSelected ? styles.selected : " " + styles.activity__name
        }
        onClick={() => setFilterSeleted([])}
        style={{ display: "block" }}
      >
        Select All
      </button>
      {Object.keys(actionFilterMap).map((activity) => {
        return (
          <button
            key={actionFilterMap[activity].text}
            className={
              filterSelected == actionFilterMap[activity].text
                ? styles.selected
                : "" + styles.activity__name
            }
            onClick={() => setFilterSeleted(actionFilterMap[activity].text)}
          >
            {capitalizeFirstLetter(actionFilterMap[activity].text)}
          </button>
        );
      })}
    </>
  );
}
export default FilterActivity;
