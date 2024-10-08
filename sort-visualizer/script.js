let arr = [];

let size = 100;

//height = multiplier*value
let heightMultiplier = 10;

//delay between each element swap operation in ms
let delay = 4;

//width of bars in px
const width = 10;

//bar must be minimun 20px tall
const minHeight = 20;

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const container = document.querySelector("#container");

const sortBtn = document.querySelector("#sort");

const shuffleBtn = document.querySelector("#shuffle");

const elements = document.querySelector("#elements");

const speedOp = document.querySelector("#speed");

sortBtn.addEventListener("click", bubbleSort);

shuffleBtn.addEventListener("click", shuffle);

elements.addEventListener("change", () => {
  reset();
  size = elements.value;
  init(size);
  drawArray();
});

speedOp.addEventListener("change", () => {
  switch (speedOp.value) {
    case "Fast":
      delay = 4;
      break;
    case "Medium":
      delay = 20;
      break;
    case "Slow":
      delay = 100;
      break;
    default:
      break;
  }
});

init(size);
drawArray();

/**
 * initialze a ordered array
 */
function init(size) {
  container.innerHTML = "";
  //calculate new heightMultipler value each time a new array is init
  heightMultiplier = 25 / Math.log(size);

  for (let i = 0; i < size; i++) {
    arr.push(i);
  }
}

/**
 * Shuffles the array
 */
async function shuffle() {
  let temp;
  let j; //the index of the element to switch to
  for (let i = 0; i < arr.length; i++) {
    j = Math.floor(Math.random() * size);
    container.children.item(i).classList.toggle("red");
    container.children.item(j).classList.toggle("red");
    await sleep(delay);
    swap(i, j);
  }
}

async function swap(i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  drawArray(); //updates array after swap
}

function reset() {
  arr = [];
  size = 0;
  container.innerHTML = "";
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
  container.innerHTML = "";
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

async function bubbleSort() {
  while (!sorted()) {
    for (let i = 0; i < arr.length - 1; i++) {
      let j = i + 1;
      if (arr[i] > arr[j]) {
        container.children.item(i).classList.toggle("red");
        container.children.item(j).classList.toggle("red");
        await sleep(delay);
        swap(i, j);
      }
    }
  }
}
