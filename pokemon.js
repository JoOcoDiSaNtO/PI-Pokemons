const axios = require("axios");
const { Router } = require("express");
const { Pokemon, Type, conn } = require("./api/src/db");

const router = Router();
// LLAMA A TODOS LOS PRIMEROS 20 POKEMONS
const GetAllPokemons = async ()=>{
  try {
          const url = await axios.get("https://pokeapi.co/api/v2/pokemon");
          const next = await axios.get(url.data.next);
          const results = url.data.results;
          const result2 = next.data.results;
          const AllPokemons = [];
      //Primeros 20
      for(let i = 0 ; i < results.length ; i++) {
          const pokes = await axios.get(results[i].url);
          const pokeparams = pokes.data;
          AllPokemons.push({
              id : pokeparams.id,
              name : pokeparams.name,
              types : pokeparams.types.map((e) => e.type.name).join(", "),
              hp : pokeparams.stats[0].base_stat,
              attack : pokeparams.stats[1].base_stat,
              defense : pokeparams.stats[2].base_stat,
              speed : pokeparams.stats[5].base_stat,
              height : pokeparams.height,
              weight : pokeparams.weight,
              image : pokeparams.sprites.other.home.front_default
          });
      }
      // Ya son 40
      for(let i = 0 ; i < result2.length ; i++) {
          const pokes = await axios.get(result2[i].url);
          const pokeparams = pokes.data;
          AllPokemons.push({
              id : pokeparams.id,
              name : pokeparams.name,
              types : pokeparams.types.map((e) => e.type.name).join(", "),
              hp : pokeparams.stats[0].base_stat,
              attack : pokeparams.stats[1].base_stat,
              defense : pokeparams.stats[2].base_stat,
              speed : pokeparams.stats[5].base_stat,
              height : pokeparams.height,
              weight : pokeparams.weight,
              image : pokeparams.sprites.other.home.front_default
          });
      }
      return AllPokemons;
  } 
  catch (error){
      console.log(error)
  }
};
// LLAMADO POR ID
const GetPokemonsById = async () => {
  const { id } = req.params;
  try {
    if (id) {
      let idint = Number(id);
      if (Number.isInteger(idint)) {
        const Allpoke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/:${id}`
        );
        if (Allpoke.data) return res.json(Pokemones);
      } else {
        let pokemon = await Pokemon.findByPk(id, { include: { model: Type } });
        if (pokemon) return res.json(pokemon);
      }
    }
    return res
      .status(404)
      .json("EL ID INGRESADO NO COINCIDE CON NINGUN POKEMON");
  } catch (e) {
    res.status(400).json("OCURRIO UN ERROR INESPERADO");
  }
};
// LLAMADO POR NOMBRE
const GetPokemonsByName = async () => {};

module.exports = {
  GetAllPokemons,
  GetPokemonsById,
  GetPokemonsByName,
};
