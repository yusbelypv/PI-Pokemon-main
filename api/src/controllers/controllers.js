/// Normalización de la info que llega de las consultas a la BD

normalizeInfoDb = (pokemonDb) => {
    const typesNormalize = pokemonDb.dataValues.types?.map((type) =>
     type.name.charAt(0).toUpperCase() + type.name.slice(1));

    return{
        name: pokemonDb.name.charAt(0).toUpperCase() + pokemonDb.name.slice(1),
        types: typesNormalize,
        urlImg: pokemonDb.urlImg, 
        id: pokemonDb.id,
        height: pokemonDb.height,
        weight: pokemonDb.weight,
        hp: pokemonDb.hp,
        attack: pokemonDb.attack,
        defense: pokemonDb.defense,
        speed: pokemonDb.speed,
        createInDb: pokemonDb.createInDb,
    };
};

// Normalización de la Info que llega de la Api

normalizeInfoApi = (responseApi) => {
    return{
        name: responseApi.data.name.charAt(0).toUpperCase() + responseApi.data.name.slice(1),
        types: responseApi.data.types?.map((typ)=>{
            return typ.type.name.charAt(0).toUpperCase() + typ.type.name.slice(1);
        }),
        urlImg: responseApi.data.sprites.other["official-artwork"].front_default,
        id: responseApi.data.id,
        height: responseApi.data.weight,
        weight: responseApi.data.weight,
        /// El método reduce retorna un objeto: {hp:, speed, attack, defense:}
        ...responseApi.data.stats.reduce((preValue, actualValue) =>({
            ...preValue,
            [actualValue.stat.name]: actualValue.base_stat,
        }),
        {}
        ),
        createInDb: false,        
    };
};

normalizeTypes = (types) => {
        return types?.map((type) => {
            return {
              ...type.dataValues,
              name: type.dataValues.name.charAt(0).toUpperCase() + type.name.slice(1),
            };
    });
};

module.exports = { normalizeInfoDb, normalizeInfoApi, normalizeTypes };
