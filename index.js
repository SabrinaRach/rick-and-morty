import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";


// Fetch Data from API

export const fetchCharacters = async () => {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const data = await response.json();

  cardContainer.innerHTML=""; // empty container before adding new cards

// create a character card for each character and append it to the cardContainer
  data.results.forEach((character) => {
    const card = createCharacterCard(character);
    cardContainer.append(card);
  });
  };


fetchCharacters();

// call the createCharacterCard function and append its return value to the existing cardContainer.






