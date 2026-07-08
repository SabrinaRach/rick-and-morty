import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";
import { NavButton } from "./components/NavButton/NavButton.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]',
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
// Use the state variable page to keep track of the current page index.
export let maxPage = 42;
export let page = 1;
const searchQuery = "";

// Fetch Data from API

export const fetchCharacters = async () => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`,
  );
  const data = await response.json();

  cardContainer.innerHTML = ""; // empty container before adding new cards

  // create a character card for each character and append it to the cardContainer
  data.results.forEach((character) => {
    const card = createCharacterCard(character);
    cardContainer.append(card);
  });
};

fetchCharacters();

// EventListener für Paginierung

prevButton.addEventListener("click", () => {
  // wenn aktuelle Seitenanzahl > 1, gehe auf die Seite davor
  if (page > 1) {
    page--;
    fetchCharacters();
  }
});

nextButton.addEventListener("click", () => {
  // wenn aktuelle Seitenzahl > 1 und < 42 (maxPage), gehe zur nächsten Seite
  if (page < maxPage) {
    page++;
    fetchCharacters();
  }
});
