import styles from "../../styles/Buttons.module.css";

export default function Clear() {
  return (
    <div>
      <button className={styles.btnClear} onClick={() => window.location.reload()}> Reload </button>
      
      
    </div>
  );
}