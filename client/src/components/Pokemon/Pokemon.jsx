import React from "react";
import './Pokemon.css'

export default function Pokemon({ name, image }) {
  return (
    <li className="Pokemon" >
      <img src={image} alt="PokemonImage" />
      <h3>{name}</h3>
    </li>
  );
};


