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
drawArray();
shuffle(size);
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
    j = Math.floor(Math.random() * size);
    swap(i, j);
  });
}

function swap(i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
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

//check if array is sorted in non decreasing order
function sorted() {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }
  return true;
}