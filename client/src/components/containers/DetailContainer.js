import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { clearPokemons, getPokemonById } from "../../Redux/actions/index";
import PokemonDetail from "../presentationals/PokemonDetail";
import BackBtn from "../buttons/BackBtn";
import homeButton from "../../assets/homeButton.png";
import spinner from "../../assets/spinner2.gif";
import { btnMargin } from "../../styles/Buttons.module.css";
import styles from "../../styles/Home.module.css";
import Footer from "../presentationals/Footer";



function DetailContainer() {
  
  const pokemon = useSelector((state) => state.pokemon);
  let { id } = useParams();
  const dispatch = useDispatch();
  const spinnerLoader = useSelector((state) => state.spinnerLoader);
  

  useEffect(() => {
    dispatch(clearPokemons()); //El clearPokemons establece en su reducers un loader: true
    dispatch(getPokemonById(id));
  }, [dispatch, id]);

  return (
    <div>
       <header className={styles.header_home}> <h2>Pokemon App ---  Pokemon Details   </h2> 
      <Link to="/"> <img src={homeButton} alt="logo" /> </Link>
      </header>
      <div className={btnMargin}>
        <BackBtn />
      </div>

      {spinnerLoader ? (
        <div className={styles.spinnerContainer}>
          {" "}
          <img src={spinner} alt="...loading" className={styles.spinnerStyle} />
        </div>
      ) : (
        <PokemonDetail pokemonDetail={pokemon} />
      )}
      <div className={styles.empty}></div>
    <Footer />
    </div>
  );
}

export default DetailContainer;