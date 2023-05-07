import styles from "../../styles/heropanel.module.css";

const navData = [
  { name: "Create a Custom Campaign", id: 1 },
  { name: "Work on My Tasks", id: 2 },
  { name: "Find Revenue Opportunities", id: 3 }
];

function NavLinks() {
  return (
    <div className={styles.navContainer}>
      {navData.map((data) => {
        return (
          <div key={data.id} className="col-md-4 col-12">
            <div className={styles.navCard}>
              <div className={styles.text}>
                <b>{data.name}</b>
              </div>
              <div className={styles.arrow__div}>
                <span className={styles.arrow}>↱</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default NavLinks;
