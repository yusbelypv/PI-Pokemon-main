const axios = require("axios");
const { normalizeTypes } = require("./controllers.js");
const { Type } = require("../db");

const getTypes = async (req, res) => {

   try {
        const typesDataApi = await axios.get("https://pokeapi.co/api/v2/type");
        const typesApi = typesDataApi.data.results?.map((type) =>
          type.name.toLowerCase()
        );
        //[type1, type2....]
    
        const typesToDBPromises = await typesApi?.map(async (type) => {
          return await Type.findOrCreate({
            where: { name: type },
          });
        });
    
        const typesToDB = await Promise.all(typesToDBPromises);
    
        const typesDB = await Type.findAll();
    
        typesDbNormalized = normalizeTypes(typesDB); //Type con la primer letra en mayuscula
        return res.json(typesDbNormalized);
      } catch (error) {
        return res.status(404).json(error);
      }
    
}

module.exports = { getTypes }