const axios = require("axios");
const { Op } = require("sequelize");
const { Pokemons, Types, conn } = require("../db");

const GetAllPokemonsApi = async () => {
  try {
    const Api = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40");
    const resMap = Api.data.results.map((e) => axios.get(e.url));
    const promise = await Promise.all(resMap).then((e) => {
      let pokemon = e.map((e) => e.data);
      let arrPokem = [];
      pokemon.map((e) => {
        arrPokem.push({
          id: e.id,
          name: e.name,
          hp: e.stats[0].base_stat,
          attack: e.stats[1].base_stat,
          defense: e.stats[2].base_stat,
          speed: e.stats[5].base_stat,
          height: e.height,
          weight: e.weight,
          image: e.sprites.other.dream_world.front_default,
        });
      });
      return arrPokem;
    });
    return promise;
  } catch (e) {
    console.log(e);
  }
};

const GetAllPokemonsApiByName = async (name) => {
  if (typeof name === "string") {
    name = name.toLowerCase();
  }
  try {
    const foundPokemon = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}/`
    );
    const detailPokemon = {
      id: foundPokemon.data.id,
      name: foundPokemon.data.name,
      hp: foundPokemon.data.stats[0].base_stat,
      attack: foundPokemon.data.stats[1].base_stat,
      defense: foundPokemon.data.stats[2].base_stat,
      speed: foundPokemon.data.stats[5].base_stat,
      height: foundPokemon.data.height,
      weight: foundPokemon.data.weight,
      image: foundPokemon.data.sprites.other.dream_world.front_default,
      types:
        foundPokemon.data.types.length < 2
          ? [foundPokemon.data.types[0].type.name]
          : [
              foundPokemon.data.types[0].type.name,
              foundPokemon.data.types[1].type.name,
            ],
    };
    return detailPokemon;
  } catch (err) {
    console.log(err);
  }
};

const GetAllPokemonsDB = async () => {
  try {
    const PokeDB = await Pokemons.findAll({
      include: {
        model: Types,
      },
      attributes: [
        "dbId",
        "name",
        "hp",
        "attack",
        "defense",
        "speed",
        "height",
        "weight",
        "image",
      ],
    });
    return PokeDB;
  } catch (e) {
    console.log(e);
  }
};

const GetAllPokemonsDBbyName = async (name) => {
  name = name.toLowerCase();
  try {
    const PokeDB = await Pokemons.findOne({
      where: {
        name: name,
      },
      include: {
        model: Types,
        attributes: ["id", "name"],
      },
    });
    return PokeDB;
  } catch (e) {
    console.log(e);
  }
};

const GetPokemonById = async (id) => {
  const ApiId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const value = ApiId.data;
  return {
    id: value.id,
    name: value.name,
    hp: value.stats[0].base_stat,
    attack: value.stats[1].base_stat,
    defense: value.stats[2].base_stat,
    speed: value.stats[5].base_stat,
    height: value.height,
    weight: value.weight,
    image: value.sprites.other.home.front_default,
    types: value.types.map((e) => e.type.name).join(", "),
  };
};

const GetPokemonDBbyId = async (id) => {
  try {
    const PokeDB = await Pokemons.findByPk(id, {
      include: {
        model: Types,
        attributes: ["id", "name"],
      },
    });
    return PokeDB;
  } catch (e) {
    console.log(e);
  }
};

const CreatePokemon = async (pokemon) => {
  let { id, name, hp, attack, defense, speed, height, weight, image, types } =
    pokemon;
  try {
    const newPokemon = await Pokemons.create({
      id,
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
    });
    if (types.length === 1) {
      await newPokemon.addTypes(types[0]);
    } else {
      await newPokemon.addTypes(types[0]);
      await newPokemon.addTypes(types[1]);
    }

    return newPokemon;
  } catch (err) {
    console.log(err);
  }
};

const GetTypesFromApi = async () => {
  try {
    const api = await axios.get("https://pokeapi.co/api/v2/type");
    const result = api.data.results;
    return result;
  } catch (e) {
    console.log(e);
  }
};

const FillDBofTypes = async () => {
  const type = await GetTypesFromApi();
  type.forEach((e) => {
    CreateType(e.name);
  });
};

const CreateType = async (type) => {
  const newType = await Types.create({
    name: type,
  });
  return newType;
};

const AssingTypeToPokemon = async (pokemon, types) => {
  const pokeAssing = await Pokemons.findByPk(pokemon);
  const typeAssing = await Types.findAll({
    where: {
      [Op.or]: [{ id: types[0] }, { id: types[1] }],
    },
  });
  pokeAssing.addTypes(typeAssing);
};

module.exports = {
  GetAllPokemonsApi,
  GetAllPokemonsDB,
  CreatePokemon,
  GetAllPokemonsDBbyName,
  GetAllPokemonsApiByName,
  GetPokemonById,
  GetPokemonDBbyId,
  GetTypesFromApi,
  FillDBofTypes,
  AssingTypeToPokemon,
};
