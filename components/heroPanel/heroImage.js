import heroLogo from "../../src/assets/hero-img.png";
import styles from "../../styles/heropanel.module.css";

function HeroImage() {
  return (
    <>
      <img className={styles.heroLogo} src={heroLogo} alt="hero_Logo" />
    </>
  );
}

export default HeroImage;
