import styles from "../../styles/Buttons.module.css";

export default function Refresh({ handleRefresh }) {
  return (
    <div>
      <button className={styles.btn} onClick={() => handleRefresh()}> Refresh Page</button>
      
      
    </div>
  );
}