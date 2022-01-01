import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../../store/actions";
import Pokemon from "../Pokemon/Pokemon";
import './Pokemons.css'


export function Pokemons() {
  let pokemons = useSelector((state) => state.Pokemons);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);
  console.log(pokemons)
  return (
    <ul className="Pokemones" >
      {pokemons.map((p) => {
        return <Pokemon name={p.name} image={p.image} type={p.type} key={p.name}/>;
      })}
    </ul>
  );
}
