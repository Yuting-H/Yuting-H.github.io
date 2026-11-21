import { memo, useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_SIZE = 16;
const MIN_SIZE = 4;
const MAX_SIZE = 100;
const MIN_OPACITY = 0.1;
const MAX_OPACITY = 1;
const OPACITY_STEP = 0.1;

function emptyCells(size) {
  return Array.from({ length: size * size }, () => ({
    color: null,
    opacity: 0,
  }));
}

function randomColor() {
  return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
    Math.random() * 255
  })`;
}

const Pixel = memo(function Pixel({
  index,
  color,
  opacity,
  onPaint,
  onStartPaint,
}) {
  return (
    <div
      className="min-w-0"
      style={{
        backgroundColor: color ?? undefined,
        opacity: opacity || undefined,
      }}
      onMouseDown={(event) => {
        if (event.button === 0) {
          onStartPaint(index);
        }
      }}
      onMouseEnter={() => onPaint(index)}
    />
  );
});

export default function Etch() {
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [cells, setCells] = useState(() => emptyCells(DEFAULT_SIZE));
  const [mode, setMode] = useState("paint");
  const [opacity, setOpacity] = useState(OPACITY_STEP);
  const painting = useRef(false);

  useEffect(() => {
    const startPainting = (event) => {
      if (event.button === 0) {
        painting.current = true;
      }
    };
    const stopPainting = () => {
      painting.current = false;
    };

    // Capture phase so the flag is set before React's bubble-phase handler.
    window.addEventListener("mousedown", startPainting, true);
    window.addEventListener("mouseup", stopPainting);
    return () => {
      window.removeEventListener("mousedown", startPainting, true);
      window.removeEventListener("mouseup", stopPainting);
    };
  }, []);

  const paintCell = useCallback(
    (index) => {
      if (!painting.current) {
        return;
      }

      setCells((prev) => {
        const cell = prev[index];
        if (!cell) {
          return prev;
        }

        const color = mode === "paint" ? "black" : randomColor();
        const nextOpacity =
          cell.opacity < MAX_OPACITY
            ? Math.min(
                MAX_OPACITY,
                Math.round((cell.opacity + opacity) * 10) / 10
              )
            : cell.opacity;

        const next = prev.slice();
        next[index] = { color, opacity: nextOpacity };
        return next;
      });
    },
    [mode, opacity]
  );

  const startPaint = useCallback(
    (index) => {
      painting.current = true;
      paintCell(index);
    },
    [paintCell]
  );

  function resizeGrid() {
    const answer = window.prompt("Enter a size between 4 and 100");
    const newSize = Number(answer);

    if (answer !== null && newSize >= MIN_SIZE && newSize <= MAX_SIZE) {
      setSize(newSize);
      setCells(emptyCells(newSize));
    } else {
      window.alert("Number not valid");
    }
  }

  function resetCanvas() {
    setCells(emptyCells(size));
  }

  function toggleMode() {
    setMode((prev) => (prev === "paint" ? "rainbow" : "paint"));
  }

  function changeOpacity(delta) {
    setOpacity((prev) => {
      const next = Math.round((prev + delta) * 10) / 10;
      return Math.min(MAX_OPACITY, Math.max(MIN_OPACITY, next));
    });
  }

  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="flex flex-wrap justify-center gap-4 p-4">
        <button
          type="button"
          onClick={resizeGrid}
          className="rounded-lg border border-gray-500 p-1 text-lg">
          Canvas Size
        </button>
        <button
          type="button"
          onClick={resetCanvas}
          className="rounded-lg border border-gray-500 p-1 text-lg">
          Reset Canvas
        </button>
        <button
          type="button"
          onClick={toggleMode}
          className={`rounded-lg border p-1 text-lg ${
            mode === "rainbow"
              ? "border-2 border-orange-400 bg-[linear-gradient(135deg,rgba(229,204,195,1)_0%,rgba(96,71,223,1)_100%)] text-white"
              : "border-gray-500"
          }`}>
          {mode === "paint" ? "Paint mode" : "Rainbow mode"}
        </button>
        <button
          type="button"
          onContextMenu={(event) => event.preventDefault()}
          onMouseUp={(event) => {
            event.preventDefault();
            if (event.button === 0) {
              changeOpacity(OPACITY_STEP);
            } else if (event.button === 2) {
              changeOpacity(-OPACITY_STEP);
            }
          }}
          className="rounded-lg border border-gray-500 p-1 text-lg">
          Opacity {Math.round(opacity * 100)}%
        </button>
      </div>

      <div
        className="grid aspect-square h-[60vh] w-[60vh] max-h-[60vh] border-2 border-black rounded select-none"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${size}, minmax(0, 1fr))`,
        }}
        onMouseDown={(event) => event.preventDefault()}
        onContextMenu={(event) => event.preventDefault()}>
        {cells.map((cell, index) => (
          <Pixel
            key={index}
            index={index}
            color={cell.color}
            opacity={cell.opacity}
            onPaint={paintCell}
            onStartPaint={startPaint}
          />
        ))}
      </div>
    </div>
  );
}
