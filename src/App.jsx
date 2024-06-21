import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import './assets/styles/App.css';

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const promises = response.data.results.map(async (poke) => {
          const pokeDetails = await axios.get(poke.url);
          return pokeDetails.data;
        });
        const results = await Promise.all(promises);
        setPokemon(results);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemon.filter(poke =>
    poke.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Pokemon Scraper</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="pokemon-grid">
        {filteredPokemon.map(poke => (
          <PokemonCard key={poke.id} pokemon={poke} />
        ))}
      </div>
    </div>
  );
};

export default App;
