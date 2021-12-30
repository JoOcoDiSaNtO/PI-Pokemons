const { Router } = require("express");
const { Pokemons, Types } = require("../db");
const {
  GetAllPokemonsApi,
  CreatePokemon,
  GetAllPokemonsDB,
  GetAllPokemonsDBbyName,
  GetAllPokemonsApiByName,
  GetPokemonById,
  GetPokemonDBbyId,
} = require("../functions");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if (name === undefined) {
      const PApi = await GetAllPokemonsApi();
      const PDB = await GetAllPokemonsDB();
      console.log(PDB.length);
      if (PDB.length > 0) {
        const AllP = PApi.concat(PDB);
        res.send(AllP);
      } else {
        res.send(PApi);
      }
    } else if (name) {
      const apiName = await GetAllPokemonsApiByName(name);
      const dbName = await GetAllPokemonsDBbyName(name);
      if (apiName) return res.json(apiName);
      if (dbName) return res.json(dbName);
      res.status(404).send("POKEMON NOT FOUND");
    }
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id.length > 5) {
      const PokemonDBID = await GetPokemonDBbyId(id);
      if (PokemonDBID) return res.status(200).json(PokemonDBID);
      return res.status(404).send("ID NOT FOUND");
    }
    const PokemonID = await GetPokemonById(id);
    if (PokemonID) return res.status(200).json(PokemonID);
    return res.status(404).send("ID NOT FOUND");
  } catch (e) {
    req.status(200).send(e);
  }
});

router.post("/createPokemon", async (req, res) => {
  const { id, name, hp, attack, defense, speed, height, weight, image } =
    req.body;
  try {
    /*----Veo si ese nombre ya existe en la Db o en la API-----*/
    const nameDb = req.body.name;
    const pokeAPI = await GetAllPokemonsApiByName(nameDb);
    const pokeDB = await GetAllPokemonsDBbyName(nameDb);
    if (pokeDB || pokeAPI)
      return res.status(400).send("Pokemon already exists");
    /*---------------------------------------------------------*/
    const newPokemon = await CreatePokemon({
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
    res
      .status(200)
      .json(`YOUR POKEMON NAME: ${newPokemon.name} WAS SUCCESSFULLY CREATED`);
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = router;

/*
  "name":"joaco",
  "hp":"100",
  "attack":"100",
  "defense":"100",
  "speed":"100"'
  "height":"100",
  "weight":"100",
  "image":,

    // const foundPokeDb = await GetAllPokemonsDB(req.body.name);
    // const foundPokeApi = await GetAllPokemonsApi(req.body.name);
    // if (foundPokeDb || foundPokeApi)
    //   return res.status(400).send("Pokemon already exists");
*/
