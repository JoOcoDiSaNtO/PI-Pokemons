import axios from "axios";

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const FIND_POKEMONS = "FIND_POKEMONS";

export function getAllPokemons() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/api/pokemon/")
      .then((pokemon) => {
        dispatch({
          type: GET_ALL_POKEMONS,
          payload: pokemon.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
}
export function findPokemon(Search) {
  return function (dispatch) {
    console.log(Search);
    axios
      .get("http://localhost:3001/api/pokemon?name=" + Search)
      .then((pokemon) => {
        dispatch({
          type: FIND_POKEMONS,
          payload: pokemon.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
}
