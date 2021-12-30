import "./App.css";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { Pokemons } from "./components/Home/Pokemons";
import "./components/Home/Pokemons.css";

function App() {
  return (
    <div>
      <SearchBar />
      <Pokemons />
    </div>
  );
}

export default App;
