/* SearchBar.js
├── erstellt HTML
├── hört auf submit
└── gibt Suchbegriff zurück */

export function SearchBar(onSubmit) {
  const div = document.createElement("div");
  div.classList.add("search-bar-container");
  div.dataset.js = "search-bar-container";

  const form = document.createElement("form");
  form.classList.add("search-bar");
  form.dataset.js = "search-bar";
  form.action = "";

  const input = document.createElement("input");
  input.name = "query";
  input.classList.add("search-bar__input");
  input.type = "text";
  input.placeholder = "search characters";
  input.setAttribute("aria-label", "character name");

  const button = document.createElement("button");
  button.classList.add("search-bar__button");
  button.setAttribute("aria-label", "search for character");

  const img = document.createElement("img");
  img.classList.add("search-bar__icon");
  img.src = "assets/magnifying-glass.png";
  img.alt = "magnifying glass icon";

  button.appendChild(img);
  form.append(input, button);
  div.append(form);
  
  // The Search Bar
 form.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = input.value;
    onSubmit(query);
  
 });
  return div;
}


