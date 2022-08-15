//Componente que renderizará los componente Pokemon
import { useSelector, useDispatch } from "react-redux";
import Pokemon from "../presentationals/Pokemon";
import { clearPokemons, getPokemons } from "../../Redux/actions/index";
import { pokemonContainer } from "../../styles/PokemonsContainer.module.css";
import styles from "../../styles/PageNotFound.module.css";


function PokemonsContainer({ lastItemIndex, firstItemIndex }) {
  //https://react-redux.js.org/api/hooks
  const pokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    
    dispatch(clearPokemons());
    dispatch(getPokemons());
  };

  return (
    <>
      {pokemons.length !== 0 ? (
        <div className={pokemonContainer}>
          {Array.isArray(pokemons) === false ? (
            <>
              <Pokemon
                key={pokemons.id}
                pokemons={pokemons}
                handleDelete={handleDelete}
              />
            </>
          ) : (
            pokemons?.slice(firstItemIndex, lastItemIndex).map((pokemon) => {
              return (
                <Pokemon
                  pokemons={pokemon}
                  handleDelete={handleDelete}
                  key={pokemon.id}
                />
              );
            })
          )}
        </div>
      ) : (
        <>
          <div className={styles.pokemonsNotFound} />
          <p className={styles.p_pokemonNotFound}>"Pokemons not found"</p>
          
        </>
      )}
    </>
  );
}

export default PokemonsContainer;