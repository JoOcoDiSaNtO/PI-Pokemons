import "./App.css";
import { Pokemons } from "./components/Home/Pokemons";
import SearchBar from "./components/SearchBar/SearchBar";

function App() {
  return (
    <div>
      <SearchBar/>
      <Pokemons />
    </div>
  );
}

export default App;
