let arr = [];

let container = document.querySelector("#container");

//height = multiplier*value
let heightMultiplier = 50;

//width of bars in px
let width = 10;

init(10);

drawArray();

/**
 * Shuffles array
 */
function shuffle() {}

/**
 * initialze a ordered array
 */
function init(size) {
  for (let i = 0; i < size; i++) {
    arr.push(i);
  }
}

//draws a elem, return reference to element
function drawElem(index) {
  let elem = document.createElement("div");
  elem.classList.add("bar");
  elem.style.height = `${index * heightMultiplier}px`;
  return elem;
}

//draws the global array as bars
function drawArray() {
  arr.forEach((element) => {
    container.appendChild(drawElem(element));
  });
}
