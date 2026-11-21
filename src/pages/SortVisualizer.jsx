import { useEffect, useRef, useState } from "react";

const SPEEDS = { Fast: 4, Medium: 20, Slow: 100 };
const MIN_ELEMENTS = 5;
const MAX_ELEMENTS = 100;
const BAR_WIDTH = 10;
const MIN_BAR_HEIGHT = 20;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function createArray(size) {
  return Array.from({ length: size }, (_, index) => index);
}

function isSorted(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }
  return true;
}

const controlClasses =
  "rounded border border-gray-400 bg-white px-3 py-2 disabled:opacity-50";

export default function SortVisualizer() {
  const [size, setSize] = useState(100);
  const [sizeInput, setSizeInput] = useState("100");
  const [arr, setArr] = useState(() => createArray(100));
  const [speed, setSpeed] = useState("Fast");
  const [active, setActive] = useState([]);
  const [running, setRunning] = useState(false);
  const runToken = useRef(0);

  const delay = SPEEDS[speed] ?? SPEEDS.Fast;
  const heightMultiplier = size > 1 ? 25 / Math.log(size) : 25;

  // Abort any in-flight animation loop when the page unmounts.
  useEffect(() => () => {
    runToken.current += 1;
  }, []);

  function rebuild(nextSize) {
    setSize(nextSize);
    setArr(createArray(nextSize));
    setActive([]);
  }

  function handleSizeChange(event) {
    const raw = event.target.value;
    setSizeInput(raw);

    const value = Number(raw);
    if (
      Number.isInteger(value) &&
      value >= MIN_ELEMENTS &&
      value <= MAX_ELEMENTS
    ) {
      rebuild(value);
    }
  }

  function handleSizeBlur() {
    const value = Number(sizeInput);
    if (
      !Number.isInteger(value) ||
      value < MIN_ELEMENTS ||
      value > MAX_ELEMENTS
    ) {
      setSizeInput(String(size));
    }
  }

  async function shuffle() {
    if (running) {
      return;
    }

    const token = ++runToken.current;
    setRunning(true);
    const next = [...arr];

    for (let i = 0; i < next.length; i++) {
      if (runToken.current !== token) {
        return;
      }

      const j = Math.floor(Math.random() * next.length);
      setActive([i, j]);
      await sleep(delay);

      if (runToken.current !== token) {
        return;
      }

      [next[i], next[j]] = [next[j], next[i]];
      setArr([...next]);
    }

    setActive([]);
    setRunning(false);
  }

  async function bubbleSort() {
    if (running) {
      return;
    }

    const token = ++runToken.current;
    setRunning(true);
    const next = [...arr];

    while (!isSorted(next)) {
      if (runToken.current !== token) {
        return;
      }

      for (let i = 0; i < next.length - 1; i++) {
        if (runToken.current !== token) {
          return;
        }

        const j = i + 1;
        if (next[i] > next[j]) {
          setActive([i, j]);
          await sleep(delay);

          if (runToken.current !== token) {
            return;
          }

          [next[i], next[j]] = [next[j], next[i]];
          setArr([...next]);
        }
      }
    }

    setActive([]);
    setRunning(false);
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex h-[90vh] items-end justify-center overflow-hidden border border-red-500">
        {arr.map((value, index) => (
          <div
            key={index}
            className={`shrink-0 border border-black ${
              active.includes(index) ? "bg-red-500" : "bg-gray-500"
            }`}
            style={{
              height: `${value * heightMultiplier + MIN_BAR_HEIGHT}px`,
              width: `${BAR_WIDTH}px`,
            }}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 p-4">
        <button
          type="button"
          onClick={bubbleSort}
          disabled={running}
          className={controlClasses}>
          Sort
        </button>
        <button
          type="button"
          onClick={shuffle}
          disabled={running}
          className={controlClasses}>
          Shuffle
        </button>

        <label htmlFor="elements">Elements</label>
        <input
          id="elements"
          name="elements"
          type="number"
          min={MIN_ELEMENTS}
          max={MAX_ELEMENTS}
          step={1}
          value={sizeInput}
          onChange={handleSizeChange}
          onBlur={handleSizeBlur}
          disabled={running}
          className="w-20 rounded border border-gray-400 px-2 py-2 disabled:opacity-50"
        />

        <label htmlFor="speed">Speed</label>
        <select
          id="speed"
          name="speed"
          value={speed}
          onChange={(event) => setSpeed(event.target.value)}
          disabled={running}
          className="rounded border border-gray-400 px-2 py-2 disabled:opacity-50">
          <option value="Fast">Fast</option>
          <option value="Medium">Medium</option>
          <option value="Slow">Slow</option>
        </select>
      </div>
    </div>
  );
}
