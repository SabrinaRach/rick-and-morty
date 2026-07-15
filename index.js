import { SearchBar } from "./components/SearchBar/SearchBar.js";
import { NavButton } from "./components/NavButton/NavButton.js";
import { NavPagination } from "./components/NavPagination/NavPagination.js";
import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";



// DOM Elements
const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector('[data-js="search-bar-container"]',);
const main = document.querySelector('[data-js="main"]');
const title = document.querySelector('[data-js="title"]');


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
  paginationElement.textContent = `${page} / ${maxPage}`;
};



// Navigation erstellen und EventListener für Paginierung

const navElement = NavButton( 
  () => {

  // wenn aktuelle Seitenanzahl > 1, gehe auf die Seite davor
  if (page > 1) {
    page--;
    fetchCharacters();
  }
},

 () => {
  // wenn aktuelle Seitenzahl > 1 und < 42 (maxPage), gehe zur nächsten Seite
  if (page < maxPage) {
    page++;
    fetchCharacters();
  }
});



// Pagination
const paginationElement = NavPagination();
// Pagination zwischen die Buttons setzen
navElement.insertBefore(
  paginationElement,
  navElement.children[1]
);

document.body.append(navElement);

//App starten
fetchCharacters();

//Wenn Title geklickt wird, dann lädt die Seite neu, Searchbar wird geleert
title.addEventListener("click", () => {
  searchBarElement.querySelector(".search-bar__input").value = ""; // sucht das Element, das zu ".search-bar__input passt" und löscht den Inhalt des Eingabefeldes
  page = 1;
  searchQuery = "";
  fetchCharacters();
});


