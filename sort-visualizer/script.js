let arr = [];

let size = 50;

let container = document.querySelector("#container");

//height = multiplier*value
let heightMultiplier = 10;

//width of bars in px
let width = 10;

//bar must be minimun 20px tall
const minHeight = 20;

init(size);
shuffle(size);
drawArray();
/**
 * initialze a ordered array
 */
function init(size) {
  //calculate new heightMultipler value each time a new array is init
  heightMultiplier = 25 / Math.log(size);

  for (let i = 0; i < size; i++) {
    arr.push(i);
  }
}

/**
 * Shuffles the array
 */
function shuffle(size) {
  let temp;
  let j; //the index of the element to switch to
  arr.forEach((element, i) => {
    j = Math.ceil(Math.random() * size);
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  });
}

//draws a elem, return reference to element
function drawElem(index) {
  let elem = document.createElement("div");
  elem.classList.add("bar");
  elem.style.height = `${index * heightMultiplier + minHeight}px`;
  return elem;
}

//draws the array as bars on screen
function drawArray() {
  arr.forEach((element) => {
    container.appendChild(drawElem(element));
  });
}
