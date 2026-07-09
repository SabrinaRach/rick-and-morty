import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";
import { NavButton } from "./components/NavButton/NavButton.js";
import { SearchBar } from "./components/SearchBar/SearchBar.js";

// DOM Elements
const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]',
);
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');
const main = document.querySelector('[data-js="main"]');

// States
// Use the state variable page to keep track of the current page index.
export let maxPage = 42;
export let page = 1;
export let searchQuery = "";


// The Search Bar
const searchBarElement = SearchBar((query) => {
  searchQuery = query;
  page = 1;
  fetchCharacters();
});

main.prepend(searchBarElement); //da append die SearchBar als letztes child in Main einfügt, umgehen wir dies mit prepend

//Functions
// Fetch Data from API

export const fetchCharacters = async () => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`,
  );
  const data = await response.json();

  maxPage = data.info.pages;

  cardContainer.innerHTML = ""; // empty container before adding new cards

  // create a character card for each character and append it to the cardContainer
  data.results.forEach((character) => {
    const card = createCharacterCard(character);
    cardContainer.append(card);
  });
  pagination.textContent = `${page} / ${maxPage}`;
};







// EventListener für Paginierung

prevButton.addEventListener("click", () => {

  // wenn aktuelle Seitenanzahl > 1, gehe auf die Seite davor
  if (page > 1) {
    page--;
    prevButton.classList.add("button-click");
    fetchCharacters();
  }
});

// wenn Button "animationed" ist, dann entferne die Klasse. Beim erneuten Klick startet die Animation wieder neu
prevButton.addEventListener("animationend", () => {
  prevButton.classList.remove("button-click");
});

nextButton.addEventListener("click", () => {
  // wenn aktuelle Seitenzahl > 1 und < 42 (maxPage), gehe zur nächsten Seite
  if (page < maxPage) {
    page++;
    nextButton.classList.add("button-click");
    fetchCharacters();
  }
});

// wenn Button "animationed" ist, dann entferne die Klasse. Beim erneuten Klick startet die Animation wieder neu
nextButton.addEventListener("animationend", () => {
  nextButton.classList.remove("button-click");
});

//App starten
fetchCharacters();


