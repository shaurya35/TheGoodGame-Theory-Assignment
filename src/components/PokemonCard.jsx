import React from 'react';
import '../assets/styles/PokemonCard.css';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-image" />
      <h3 className="pokemon-name">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
      <p className="pokemon-id">#{pokemon.id}</p>
    </div>
  );
};

export default PokemonCard;
