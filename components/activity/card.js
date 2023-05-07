import styles from "../../styles/activity.module.css";
import { generate_avatar_data } from "../../src/utility";
import { getActionCateogary, getActionPastDays } from "../../helpers/util";
import CheckIcon from "./checkIcon";
import { useRef } from "react";

// import "../../helpers/observer";

function Card({ data, type, index }) {
  const card = useRef(null);
  let patientName = data.patient_first_name + " " + data.patient_last_name;
  let avtarData = generate_avatar_data(patientName);

  return (
    <div className={"row card " + styles.cardContainer} ref={card}>
      <div
        className={styles.avtar}
        style={{ backgroundColor: avtarData.color }}
      >
        <div>
          {avtarData.initials !== "NN" ? avtarData.initials : "?"} {index}
        </div>
      </div>
      <div className=" " style={{}}>
        <span
          className={styles.cateogary}
          style={{ backgroundColor: avtarData.color }}
        >
          {getActionCateogary(data.event_type, type)}
        </span>
        <p>
          {patientName !== "null null" ? patientName : "A patient"}
          {type === "action"
            ? " has answered a question on that needs youl review"
            : " confirmed her "}
        </p>
      </div>
      <div className={styles.checkmark__container}>
        <p>{getActionPastDays(data.date_created)}</p>
        {type === "action" && (
          <div>
            <button
              className={styles.checkmark}
              style={{ color: "green", fontSize: "10px" }}
            >
              <CheckIcon />
            </button>
            <button className={styles.checkmark} style={{ color: "red" }}>
              <b>x</b>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Card;
