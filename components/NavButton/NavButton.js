
// onClickPrev und onClickNext sind callback functions
export function NavButton (onClickPrev, onClickNext) {
  const nav = document.createElement("nav");
  nav.classList.add("navigation");
  nav.dataset.js = "navigation";

    const prevButton = document.createElement("button");
  prevButton.classList.add("button", "button--prev");
  prevButton.dataset.js = "button-prev";
  prevButton.textContent = "previous";

    const nextButton = document.createElement("button");
  nextButton.classList.add("button", "button--next");
  nextButton.dataset.js = "button-next";
  nextButton.textContent = "next";


// Klick-Events
  prevButton.addEventListener("click", () => {
    prevButton.classList.add("button-click");
    onClickPrev();
  });

  nextButton.addEventListener("click", () => {
    nextButton.classList.add("button-click");
    onClickNext();
  });


  // Animation nach Ende entfernen
  // wenn Button "animationed" ist, dann entferne die Klasse. Beim erneuten Klick startet die Animation wieder neu

  prevButton.addEventListener("animationend", () => {
    prevButton.classList.remove("button-click");
  });

  nextButton.addEventListener("animationend", () => {
    nextButton.classList.remove("button-click");
  });

nav.append(prevButton, nextButton);

return nav;

}

