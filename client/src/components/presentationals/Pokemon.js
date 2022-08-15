import { Link } from "react-router-dom";
import styles from "../../styles/Pokemon.module.css";

function Pokemon(props) {
  const { name, types, urlImg, id, createInDb } = props.pokemons;
  
  return (
    <div>
    <div className={styles.card}>

      <Link to={`/detail/${id}`} style={{ textDecoration: 'none' }}>

      <div className={styles.cover}>
        <img src={urlImg} alt="Pokemons" />
        <div className={styles.img__back}></div>
      </div>
      <div className={styles.description}>
        <h2>{name} </h2>
        {createInDb ? (
          <div className={styles.idPokemon}>Id: {id.slice(0, 4)}</div>
        ) : (
          <div className={styles.idPokemon}>Id: {id}</div>
        )}
        <div className={styles.typesContainer}>
          {types?.map((type, i) => (
            <p className={styles[type.toLowerCase()]} key={i}>
              {type}
            </p>
          ))}
        </div>
      </div>
      </Link>
    </div>
    
    </div>
    
  );
}

export default Pokemon;