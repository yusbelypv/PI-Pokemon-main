import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/PokemonCreate.module.css";
import homeButton from "../../assets/homeButton.png";
import Footer from "./Footer";
import BackBtn from "../buttons/BackBtn";
import pokemon4 from "../../assets/pokemon4.png"



function PokemonCreado() {
  return (
    <div className={styles.detailContainer}>
      <header className={styles.header_home}> <h2>Pokemon App  </h2> 
      <Link to="/"> <img src={homeButton} alt="logo" /> </Link>
      </header>
    
      <div className={styles.card}>
       <div>
        <p className={styles.p_creado} > "Your pokemon has been successfully created" </p>
       </div>
       <div>
        <BackBtn/>
       </div>
       <div>
       <Link to="/home"> <img src = {pokemon4} className={styles.pokemons} alt="Pokemon" /></Link>
       </div>
       
        
      </div>
           
      <Footer/>
    </div>
  );
}

export default PokemonCreado;