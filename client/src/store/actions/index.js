import axios from "axios";

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const SEARCH_NAME = "SEARCH_NAME";

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

export function findPokemon(name) {
  console.log(name)
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/api/pokemon?name=" + name) 
      return dispatch({
        type: "SEARCH_NAME",
        payload: json.data,
      });
    } catch {
      return alert("No se encontró el pokemon");
    }
  };
}
