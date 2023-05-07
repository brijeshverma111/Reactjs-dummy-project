import GeneralInformation from "./generalInformation";
import NavLinks from "./navLinks";
import WelcomeBanner from "./welcomeBanner";
import HeroImage from "./heroImage";
import styles from "../../styles/heropanel.module.css";

function HeroPanel() {
  return (
    <div className={"row " + styles.heroContainer}>
      <div className="col-12 col-md-8">
        <WelcomeBanner />
        <GeneralInformation />
        <NavLinks />
      </div>
      <div className="col-12 col-md-4">
        <HeroImage />
      </div>
    </div>
  );
}

export default HeroPanel;
