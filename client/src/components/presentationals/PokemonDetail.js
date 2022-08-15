import React from "react";
import styles from "../../styles/PokemonDetails.module.css";
import stylePokemon from "../../styles/Pokemon.module.css";

const PokemonDetail = ({ pokemonDetail }) => {
  const {
    name,
    id,
    types,
    urlImg,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    createInDb,
  } = pokemonDetail;

  return (

    <div className={styles.detailContainer}>
      <div className={styles.card}>
        <div className={styles.upper}>
        
          <div>
             <img src={urlImg} alt="Pokemon" className={styles.pokemonImg} />
          </div>
           <div className={styles.stats}>
              <div className={styles.statsCard}>
                 <h4>Healt</h4><p>{hp}</p>
              </div>
              <div className={styles.statsCard}> 
                 <h4>Speed</h4><p>{speed}</p>
              </div>
              <div className={styles.statsCard}>
                 <h4>Attack</h4><p>{attack}</p>
              </div>
              <div className={styles.statsCard}>
                 <h4>Defense</h4><p>{defense}</p>
              </div>
              <div className={styles.statsCard}>
                 <h4>Height</h4><p>{height}</p>
              </div>
              <div className={styles.statsCard}>
                <h4>Weight</h4><p>{weight}</p>
              </div>
          </div>
          <div className={styles.cardGradient}> 
               <p className={styles.pokemonName}>{name}</p>
               <p className={styles.p_id}>Id: {createInDb ? id.slice(0, 4): id}</p>
                 <div className={styles.types}>
                    {types?.map((type, i) => (
                    <p className={stylePokemon[type.toLowerCase()]} key={i}>{type}</p>
                     ))}
                 </div>
          </div>     
       </div> 
     </div> 
  </div>  
  );
};

export default PokemonDetail;