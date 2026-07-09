export function NavPagination (onSubmit, onClick) {
const pag = document.createElement("span");
pag.classList.add("navigation__pagination");
pag.dataset.js = "pagination";
pag.textContent = "1 / 42";

return pag;
}

