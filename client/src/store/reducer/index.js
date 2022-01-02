import { SEARCH_NAME, GET_ALL_POKEMONS } from "../actions";

export const InitialState = {
  Pokemons: [],
  Pokemon: [],
  Type: [],
  Name: "",
  Order: "",
  Filter: "",
  FilterOrder: "",
  Page: 0,
  Size: "",
};

export function Reducer(state = InitialState, action) {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        Pokemons: action.payload,
      };
    case SEARCH_NAME:
      return {
        ...state,
        Pokemon: action.payload,
      };
    default:
      return state;
  }
}

