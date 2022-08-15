import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/LandingPage.module.css";

function LandingPage() {
  return (
    <div className={styles.background}>
      <Link to="/home">
        <div className={styles.homeBtn}></div>
        <span className={styles.home_span}>Welcome to the Pokemon World</span>
      </Link>
        <p className={styles.name}>Made by: Yusbely Parra @2022</p>
    </div>
  );
}

export default LandingPage;