import { actionFilterMap, notificationFilterMap } from "../src/constants";
import ActionDataList from "../src/data/actions";

export const capitalizeFirstLetter = (str) => {
  if (str && str.length > 0) {
    const arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();
    }
    return arr.join(" ");
  }
  return str;
};

export const getActionCateogary = (event_type, type) => {
  // APPT_REQUEST: { text: "Appt Request", filters: ["AR", "AC", "ASF"] },
  let filterText = "";
  let fileterData = type === "action" ? actionFilterMap : notificationFilterMap;
  Object.keys(fileterData).filter((key) => {
    fileterData[key]["filters"].filter((cat) => {
      return cat === event_type ? (filterText = fileterData[key]["text"]) : "";
    });
    return null;
  });

  return filterText;
};
export const getActionPastDays = (start) => {
  if (start === undefined) {
    return "just now";
  }
  const date1 = new Date(start);
  const date2 = new Date();
  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;
  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime();
  if (diffInTime / oneDay >= 365) {
    return Math.round(diffInTime / (oneDay * 365)) + " years ago";
  } else if (diffInTime / oneDay >= 30) {
    return Math.round(diffInTime / (oneDay * 30)) + " months ago";
  } else if (diffInTime / oneDay >= 1) {
    return Math.round(diffInTime / oneDay) + " days ago";
  } else if (diffInTime / (1000 * 60 * 60) > 1) {
    return Math.round(diffInTime / (1000 * 60 * 60)) + "hours ago";
  } else if (diffInTime / (1000 * 60) > 1) {
    return Math.round(diffInTime / (1000 * 60)) + " minutes ago";
  } else if (diffInTime / (1000 * 60) < 1) {
    return Math.ceil(diffInTime / 1000) + " seconds ago";
  }
};

export const pagedActionDataList = (page, size = 20) => {
  // console.log("ActionDataList", ActionDataList.length);
  return ActionDataList.slice(page * size, (page + 1) * size);
};
