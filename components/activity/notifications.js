import styles from "../../styles/activity.module.css";
import { notificationStatus, notificationFilterMap } from "../../src/constants";
import { capitalizeFirstLetter } from "../../helpers/util";
import NotificationDataList from "../../src/data/notifications";
import Card from "./card";
import { useState, useContext, useEffect } from "react";
import ActivityContext from "../../context/activityContext";

//add All to actionStatus object

function Notifications() {
  const { filterSelected } = useContext(ActivityContext);

  // const [notificationData, setNotificationData] = useState(
  //   NotificationDataList
  // );
  const [filterNotificationData, setFilterNotificationData] = useState(
    NotificationDataList
  );
  const [finalNotificationData, setFinalNotificationData] = useState(
    NotificationDataList
  );
  const [filterType, setFilterType] = useState(null);

  const filterAction = (filteredData) => {
    // console.log("filterAction noti", filteredData);

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
      setFinalNotificationData(result);
    } else {
      setFinalNotificationData(filteredData);
    }
  };
  useEffect(() => {
    let getFilterNames = [];
    if (filterSelected && filterSelected.length !== 0) {
      Object.keys(notificationFilterMap).filter((key) => {
        if (filterSelected === notificationFilterMap[key]["text"]) {
          getFilterNames = notificationFilterMap[key]["filters"];
        }
        return null;
      });
      let res = NotificationDataList.filter((data) =>
        getFilterNames.includes(data.event_type)
      );
      setFilterNotificationData(res);
    } else setFilterNotificationData(NotificationDataList);
  }, [filterSelected]);

  useEffect(() => {
    filterAction(filterNotificationData);
  }, [filterNotificationData]);
  useEffect(() => {
    filterAction(filterNotificationData);
  }, [filterType]);

  return (
    <>
      <div className="text-right">
        {Object.keys(notificationStatus).map((key) => {
          return (
            <button
              key={notificationStatus[key]}
              className={
                filterType === notificationStatus[key] ? styles.selected : ""
              }
              onClick={() => {
                setFilterType(notificationStatus[key]);
              }}
            >
              {capitalizeFirstLetter(notificationStatus[key])}
            </button>
          );
        })}
      </div>
      <hr />
      {finalNotificationData.map((actionItem) => {
        return (
          <Card key={actionItem.id} data={actionItem} type="notification" />
        );
      })}
    </>
  );
}
export default Notifications;
