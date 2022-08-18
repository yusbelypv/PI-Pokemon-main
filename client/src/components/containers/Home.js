import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavHome from "./NavHome";
import PokemonsContainer from "./PokemonsContainer";
import Refresh from "../buttons/Refresh";
import Clear from "../buttons/Clear";
import { useDispatch, useSelector } from "react-redux";
import {
  filterPokemonByType,
  filterPokemonCreated,
  getPokemons,
  getTypes,
  setLoaderTrue,
  
  sortPokemonsAlphabetically,
  sortPokemonsByStrength,
} from "../../Redux/actions/index";
import Pagination, { objIndexPagination } from "../Pagination";
import spinner from "../../assets/spinner.gif";
import styles from "../../styles/Home.module.css";
import homeButton from "../../assets/homeButton.png"
import Footer from "../presentationals/Footer";



function Home() {
  //Hooks para manejar el estado local y el renderizado de mi componente
 
  const [order, setOrder] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1); 
  const spinnerLoader = useSelector((state) => state.spinnerLoader);

  const pokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();
  const quantityXPage = 12; 

  //Llamado a la API para obtener types y pokemons
  useEffect(() => {
    dispatch(setLoaderTrue());
    dispatch(getTypes());
    dispatch(getPokemons());
  }, [dispatch]);

  //Funciones de ordenamientos
  const handleSortAlph = (type) => {
    dispatch(sortPokemonsAlphabetically(type));
    setOrder(type);
    setCurrentPage(1);
  };
  const handleSortStrength = (type) => {
    dispatch(sortPokemonsByStrength(type));
    setOrder(type);
    setCurrentPage(1);
  };

  //Funciones de filtrado
  const handleTypeFilter = (type) => {
    dispatch(filterPokemonByType(type));
    setOrder(type);
    setCurrentPage(1);
  };
  const handleSourceFilter = (isCreated) => {
    dispatch(filterPokemonCreated(isCreated));
    setOrder(isCreated);
    setCurrentPage(1);
  };

  //Paginado
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const { lastItemIndex, firstItemIndex } = objIndexPagination(
    currentPage,
    quantityXPage
  );

  //Función para el boton refresh. Setea la pagina en 1
  const handleRefresh = () => {

    dispatch(setLoaderTrue());
    dispatch(getPokemons());
    setCurrentPage(1);
  };


  return (
    <div className={styles.homeContainer}>
      <header className={styles.header_home}> <h2>Pokemon App ---  Home   </h2> 
      <Link to="/"> <img src={homeButton} alt="logo" /> </Link>
      <Clear />
      </header>
      <div>
        <NavHome
          handleSortAlph={handleSortAlph}
          handleSortStrength={handleSortStrength}
          handleTypeFilter={handleTypeFilter}
          handleSourceFilter={handleSourceFilter}
        />
      </div>

       <Refresh handleRefresh={handleRefresh} />
       
      

      {spinnerLoader ? (
        <img src={spinner} alt="...loading" className={styles.spinnerStyle} />
        
        
      ) : (
        <div>
          <PokemonsContainer
            lastItemIndex={lastItemIndex}
            firstItemIndex={firstItemIndex}
          />

          
        </div>
      )}

<>
        {!spinnerLoader ? (
          <Pagination
            items={pokemons}
            quantityXPage={quantityXPage}
            handlePagination={handlePagination}
            currentPage={currentPage}
          />
        ) : null}
      </>

    <Footer/>
    </div>
  );
}

export default Home;