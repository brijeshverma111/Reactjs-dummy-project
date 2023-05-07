import styles from "../../styles/activity.module.css";
import { actionStatus, actionFilterMap } from "../../src/constants";
import { capitalizeFirstLetter, pagedActionDataList } from "../../helpers/util";
// import ActionDataList from "../../src/data/actions";
import Card from "./card";
import { useState, useContext, useEffect, useRef } from "react";
import ActivityContext from "../../context/activityContext";
//add All to actionStatus object
Object.assign(actionStatus, { ALL: "all" });

function ActionNeeded() {
  const { filterSelected } = useContext(ActivityContext);

  const [actionData, setActionData] = useState(pagedActionDataList(0));
  const [filterActionData, setFilterActionData] = useState(
    pagedActionDataList(0)
  );
  const [finalActionData, setFinalActionData] = useState(
    pagedActionDataList(0)
  );
  const [pageSize, setPageSize] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filterType, setFilterType] = useState(null);

  const elementRef = useRef(null);

  const filterActivity = () => {
    let getFilterNames = [];
    let res = [];
    // console.log("filterActivity", filterSelected && filterSelected.length);

    if (filterSelected && filterSelected.length !== 0) {
      Object.keys(actionFilterMap).filter((key) => {
        if (filterSelected === actionFilterMap[key]["text"]) {
          getFilterNames = actionFilterMap[key]["filters"];
        }
        return null;
      });
      res = actionData.filter((data) =>
        getFilterNames.includes(data.event_type)
      );
      setFilterActionData(res);
    } else setFilterActionData(actionData);
  };

  const filterAction = (filteredData) => {
    // console.log("filterAction", filteredData);

    let result = [];
    if (
      filterType &&
      filterType !== null &&
      filterType !== "all" &&
      filterType !== undefined
    ) {
      // console.log("filterAction", filteredData);
      result = filteredData.filter((data) => {
        return data["status"].toLowerCase() === filterType.toLowerCase();
      });
      setFinalActionData(result);
    } else {
      setFinalActionData(filteredData);
    }
  };
  useEffect(() => {
    filterActivity();
  }, [filterSelected, actionData]);

  useEffect(() => {
    filterAction(filterActionData);
  }, [filterActionData]);
  useEffect(() => {
    filterAction(filterActionData);
  }, [filterType]);

  const getData = () => {
    console.log("pageSize", pageSize);
    console.log("pagedActiast", pagedActionDataList(3));
    let data = pagedActionDataList(pageSize);
    if (data.length === 0) {
      setHasMore(false);
    }
    setActionData((prevData) => [...prevData, ...data]);
    setPageSize((prevState) => prevState + 1);
  };

  const onIntersection = (entries) => {
    const firstEntry = entries[0];
    console.log("IntersectionObserver firstEntry", firstEntry);

    if (firstEntry.isIntersecting && hasMore) {
      getData();
    }
  };
  useEffect(() => {
    console.log("IntersectionObserver");
    const obeserver = new IntersectionObserver(onIntersection);
    if (obeserver && elementRef.current) {
      obeserver.observe(elementRef.current);
    }
    return () => {
      if (obeserver) {
        obeserver.disconnect();
      }
    };
  }, [finalActionData]);

  return (
    <>
      <div className="text-left">
        <p>Action Needed</p>
      </div>
      <div className="text-right">
        {Object.keys(actionStatus).map(function (key) {
          return (
            <button
              key={actionStatus[key]}
              className={
                filterType === actionStatus[key] ? styles.selected : ""
              }
              onClick={() => {
                setFilterType(actionStatus[key]);
              }}
            >
              {capitalizeFirstLetter(actionStatus[key])}
            </button>
          );
        })}
      </div>
      <hr />
      {finalActionData.map((actionItem, index) => {
        return (
          <Card
            key={actionItem.id}
            index={index}
            data={actionItem}
            type="action"
          />
        );
      })}

      <div className="elementRef" ref={elementRef}></div>
    </>
  );
}
export default ActionNeeded;
