import { useState } from "react";
import { useDispatch } from "react-redux";
import { findPokemon } from "../../store/actions";
import { Autocomplete } from "./autocomplete/autocomplete";
import "./searchbar.css";

function SearchBar() {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(false);
  const [search, setSearch] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(findPokemon(search));
  };

  return (
    <div className="SearchBar">
      <div>
        <input
          type="text"
          onChange={(e) => handleInputChange(e)}
          onClick={(e) => setDisplay(!display)}
          placeholder="Buscar Pokemon ..."
          className="InpSearch"
        />
        {display && (
          <div className="AutoContainer">
            <Autocomplete />
          </div>
        )}
      </div>
      <div>
        <button
          type="submit"
          onClick={(e) => handelSubmit(e)}
          className="BtnBusqueda"
        > Buscar
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
