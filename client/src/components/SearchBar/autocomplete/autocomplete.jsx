import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../../../store/actions";
import "./autocomplete.css";

export function Autocomplete() {
  let pokemons = useSelector((state) => state.Pokemons);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);
  return (
    <div className="PokemonBar">
      {pokemons.map((p) => {
        return (
          <div className="PokemonList" key={p.id}>
            <a href="/detail" className="nombres">
              <p>{p.name}</p>
            </a>
            <img src={p.image} alt="Pokemon" className="imagen" />
          </div>
        );
      })}
    </div>
  );
}
