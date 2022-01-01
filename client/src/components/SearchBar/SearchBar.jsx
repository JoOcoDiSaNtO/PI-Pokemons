import { useState } from "react";
import { useDispatch } from "react-redux";
import { findPokemon } from "../../store/actions";

export function SearchBar() {
  const [Search, setSearch] = useState("");
  const [Id, setId] = useState("")

  let dispatch = useDispatch();

  function sucum(e) {
    e.preventDefault();
    dispatch(findPokemon(Search));
  }

  function onInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  function OnIdChange(e){
    e.preventDefault();
    setId(e.target.value);
  }

  return (
    <div>
      <form onSubmit={sucum}>
        <p>Busca Por Nombre</p>
            <input type="search" onChange={onInputChange} value={Search} />
            <input type="submit" value="Buscar" />
      </form>
    </div>
  );
}
