import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Buttons.module.css";

const BackBtn = () => {
  return (
    <div>
      <Link to="/home">
        {" "}
        <button className={styles.btn}> Back to Home</button>
      </Link>
 
    </div>
  );
};

export default BackBtn;