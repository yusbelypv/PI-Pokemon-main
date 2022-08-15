const axios = require("axios");
const { Pokemon, Type } = require("../db");
const { normalizeInfoDb, normalizeInfoApi } = require("./controllers.js");

const getPokemon = async(req, res) => {
    const { name } = req.query;

    try{
        // - Llamada a Db por name - //
        if(name){
            const nameLower = name.trim().toLowerCase();
             /// se busca en minúsculas ya que se almaceno asi
            const pokemonDbByName = await Pokemon.findOne({
                where: { name: nameLower },
                include: Type, 
            });

        if(pokemonDbByName !== null)
           return res.json(normalizeInfoDb(pokemonDbByName));
        else { // Consulta a la Api por name
             const responseApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nameLower}`);
             const dataApiByName = normalizeInfoApi(responseApi);
             return res.json(dataApiByName);
        }     

        }
        // - Llamada a la Api - //
        const infoApi = await Promise.all([
            axios.get("https://pokeapi.co/api/v2/pokemon"),
            axios.get("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20"),
        ]);
        infoArr1 = infoApi[0].data.results;
        infoArr2 = infoApi[1].data.results;

        const pokemonsInfoApi = infoArr1.concat(infoArr2);
        const pokemonsInfoPromises = pokemonsInfoApi?.map((pokemon) => {
            return axios.get(pokemon.url).then((response) => {
                return { ...normalizeInfoApi(response) };
            })
            .catch((e) => console.log(e));
        });

        const pokemonsApi = await Promise.all(pokemonsInfoPromises);

        /// Consulta a la BD ////
        const infoBd = await Pokemon.findAll({
            include: {
                model: Type,
                attributes: ["name"],
                through: { attributes: [] },
            },
        });
        /// Normalizamos la info que llegue de la Api
        const infoDbNormalize = infoBd?.map((pokemon) =>{
            return normalizeInfoDb(pokemon);
        });

        // Concatenamos los pokemons de DB y Api
        const allPokemons = pokemonsApi.concat(infoDbNormalize);
        return res.json(allPokemons);
    } catch (error) {
        res.status(404).json({ msg: " Pokemons not found. " + error });
    }

}

const getPokemonId = async(req, res) => {
    const { idPokemon } = req.params;

    try{
        const pokemonDb = await Pokemon.findByPk(idPokemon, { include: Type});
        if(pokemonDb === null)
           return res.status(404).json(" Id not found: " + error);
        return res.json(normalizeInfoDb(pokemonDb));
    } catch {
        try{
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
            const infoApiResponse = normalizeInfoApi(response);
            return res.json(infoApiResponse);
        } catch (error) {
            res.status(404).json("Error: Id not found: " + error);
        }
    }
}

const postPokemon = async(req, res) => {

    try{
        let { name, types, urlImg, height, weight, hp, attack, defense, speed } = req.body; 

        if(!name) return res.status(404).send("Necessary parameters not found");
        if(name){
            if(!hp) hp=1;
            if(!attack) attack=1;
            if(!defense) defense=1;
            if(!speed) speed=1;
            if(!height) height=1;
            if(!weight) weight=1;
            if(!types.length) types = ["unknown"];

            const nameLower = name.trim().toLowerCase(); //Se almacenan en minusculas porque así están en la Api
            const typesLower = types?.map((type) => type.toLowerCase());
           
            const pokemonNew = await Pokemon.create({
                name: nameLower,
                urlImg,
                height,
                weight,
                hp,
                attack,
                defense,
                speed,
            });

            const typeDbArr = await Type.findAll({
                where: { name: typesLower },
                
            });

            const typeDbId = typeDbArr?.map((poke) => poke.dataValues.id);

            await pokemonNew.addType(typeDbId);

            const newPokemon = await Pokemon.findOne({
                where: { name: nameLower },
                include: Type,
            });
            const newPokeNormalize = normalizeInfoDb(newPokemon);
            return res.json(newPokeNormalize);
        }
    } catch (e) {
        return res.status(404).json("Error: " + e);
    }
}



module.exports = { getPokemon, getPokemonId, postPokemon }