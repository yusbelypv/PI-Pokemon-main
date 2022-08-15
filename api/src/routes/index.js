const { Router } = require('express');
const { getPokemon, getPokemonId, postPokemon } = require('../controllers/pokemon.js');
const { getTypes } = require("../controllers/type");


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons", getPokemon);
router.get("/pokemon/:idPokemon", getPokemonId);
router.post("/pokemons", postPokemon);
router.get("/types", getTypes);



module.exports = router;
