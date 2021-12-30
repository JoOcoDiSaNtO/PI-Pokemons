const axios = require("axios");
const { Pokemon, Type, conn } = require("../../db");
const { Op } = require("sequelize");

const GetAllPokemons = async () => {
  try {
    const firstResults = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=40"
    ); //hago la primera consulta a la API
    const result = firstResults.data.results.map((e) => axios.get(e.url));
    // result es un array con los resultados de la segunda consulta
    let pokemons = Promise.all(result) //me guardo la promesa para retornarla
      //este e es un array con los objetos data de la respuesta axios
      .then((e) => {
        let pokemon = e.map((e) => e.data); //crea un array con los objetos pokemon
        let arrPokemons = [];
        pokemon.map((e) => {
          arrPokemons.push({
            id: e.id,
            name: e.name,
            hp: e.stats[0].base_stat,
            attack: e.stats[1].base_stat,
            defense: e.stats[2].base_stat,
            // spAttack: e.stats[3].base_stat,
            // spDefense: e.stats[4].base_stat,
            speed: e.stats[5].base_stat,
            height: e.height,
            weight: e.weight,
            image: e.sprites.other.dream_world.front_default,
            types: e.type,
            // e.types.length < 2
            //   ? [e.types[0].type.name]
            //   : [e.types[0].type.name, e.types[1].type.name]
          });
        });
        return arrPokemons;
      });
    return pokemons;
  } catch (e) {
    console.log(e);
  }
};
const GetAllPokemonsDB = async () => {
  try {
    const PokeDB = await Pokemon.findAll({
      attributes: [
        "nombre",
        "vida",
        "fuerza",
        "defensa",
        "velocidad",
        "altura",
        "peso",
      ],
      include: {
        model: Type,
        attributes: ["tipo"],
      },
    });
    return PokeDB;
  } catch (e) {
    console.log(e);
  }
};
const GetPokemonByID = async (id) => {
  const ApiID = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const value = ApiID.data;
  return {
    id: value.id,
    name: value.name,
    types: value.types.map((e) => e.type.name).join(", "),
    hp: value.stats[0].base_stat,
    attack: value.stats[1].base_stat,
    defense: value.stats[2].base_stat,
    speed: value.stats[5].base_stat,
    height: value.height,
    weight: value.weight,
    image: value.sprites.other.home.front_default,
  };
};
const GetPokemonByName = async (name) => {
  const ApiID = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const value = ApiID.data;
  console.log(value);
  const pokemon = {
    id: value.id,
    name: value.name,
    types: value.types.map((e) => e.type.name).join(", "),
    hp: value.stats[0].base_stat,
    attack: value.stats[1].base_stat,
    defense: value.stats[2].base_stat,
    speed: value.stats[5].base_stat,
    height: value.height,
    weight: value.weight,
    image: value.sprites.other.home.front_default,
  };
  console.log(pokemon);
  return pokemon;
};
const GetPokemonByType = async () => {
  try {
    const apiTypes = await axios.get("https://pokeapi.co/api/v2/type");
    const value = apiTypes.data.results;
    const apiTypesMap = await value.map((d) => {
      return {
        name: d.name,
      };
    });
    return apiTypesMap;
  } catch (e) {
    console.log(e);
  }
};
const CreatePokemon = async (NewPok) => {
  let {nombre, vida, fuerza, defensa, velocidad, altura, peso, tipo } = NewPok
  try {
      let NewPoke = await Pokemon.create({
        nombre: nombre.toLowerCase(),
        vida,
        fuerza,
        defensa,
        velocidad,
        peso,
        altura,
      });
      if(tipo.length === 1){
        await NewPoke.addType(tipo[0])
      }else {
        await NewPoke.addTypes(tipo[0])
        await NewPoke.addTypes(tipo[1])
      }
      return NewPoke
  } catch (e) {
    console.log(e);
  }
};
const CreateTypeinDB = async (type) => {
  try {
    const newType = await Type.create({
      tipo: type,
    });
    return newType;
  } catch (e) {
    console.log(e);
  }
};
const FillDBofTypes = async () => {
  try {
    const type = await GetPokemonByType();
    type.forEach((e) => {
      CreateTypeinDB(e.name);
    });
  } catch (e) {
    console.log(e);
  }
};
const AssingType = async (pokemon, type) => {
  const PokemonToAssing = await Pokemon.findByPK(pokemon);
  const TypeToAssing = await Type.findAll({
    where: {
      [Op.or]: [{ id: type[0] }, { id: type[1] }],
    },
  });
  PokemonToAssing.addType(TypeToAssing);
};

module.exports = {
  GetAllPokemons,
  GetAllPokemonsDB,
  GetPokemonByID,
  GetPokemonByName,
  GetPokemonByType,
  CreatePokemon,
  FillDBofTypes,
};
