import React from "react";
import './Pokemon.css'

export default function Pokemon({ name, image, type }) {
  return (
    <li className="Pokemon" >
      <img src={image} alt="PokemonImage" />
      <h3>{name}</h3>
      <p>{type}</p>
    </li>
  );
};


