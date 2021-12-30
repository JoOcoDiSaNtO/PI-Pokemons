import { useState } from "react";
import { useDispatch } from "react-redux";
import { findPokemon } from "../../store/actions";

export function SearchBar (){
    const [Search, setSearch] = useState('')
    let dispatch = useDispatch()
    console.log(Search)
    
    function OnSubmit(e){
        e.preventDefault()
        dispatch(findPokemon(Search))
    }

    function onInputChange(e){
        e.preventDefault()
        setSearch(e.target.value)
    }

    return <div>
        <form onSubmit={OnSubmit}>
            <input type="text" onChange={onInputChange} value={Search}/>
            <input type="submit" value="Buscar"/>
        </form>
    </div>
}