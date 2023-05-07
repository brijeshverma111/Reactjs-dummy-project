import HeroPanel from "../components/heroPanel/heroPanel";
import Activity from "../components/activity/activity";
// import datatable from "../components/datatable";

import styles from "../styles/app.module.css";

export default function App() {
  return (
    <div className={"App " + styles.appContainer}>
      <HeroPanel />
      <Activity />
      {/* <datatable /> */}
    </div>
  );
}
