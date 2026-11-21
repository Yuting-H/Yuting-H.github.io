import { useState } from "react";
import {
  consolidateEquation,
  evaluate,
  fitResult,
  insertToken,
} from "./calculator/logic.js";

const PAD = [
  "CE",
  "<-",
  "%",
  "/",
  "7",
  "8",
  "9",
  "*",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  ".",
  "0",
  "=",
];

const keyClasses =
  "flex h-16 w-16 items-center justify-center rounded border-2 border-calc-edge bg-calc-isabelline text-[32px] leading-none shadow-[2px_2px_2px_rgba(0,0,0,0.35)] active:bg-calc-pink";

export default function Calculator() {
  const [equation, setEquation] = useState(["0"]);
  const [error, setError] = useState("");

  function press(key) {
    setError("");

    if (key === "CE") {
      setEquation(["0"]);
      return;
    }

    if (key === "<-") {
      setEquation((prev) =>
        prev.length > 1 ? prev.slice(0, -1) : ["0"]
      );
      return;
    }

    if (key === "=") {
      const last = equation.at(-1);
      if (!parseFloat(last) && last !== "0" && last !== "%") {
        setError("Format Invalid");
        return;
      }
      setEquation(fitResult(evaluate(consolidateEquation(equation))));
      return;
    }

    const { next, error: rejected } = insertToken(equation, key);
    if (rejected) {
      setError("Format Invalid");
      return;
    }
    setEquation(next);
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-calc-sage p-4">
      <div className="flex flex-col items-center rounded-lg border-4 border-calc-sand bg-calc-sand shadow-[10px_10px_2px_rgba(0,0,0,0.347)]">
        <div className="flex h-24 w-[270px] flex-col justify-center overflow-hidden rounded bg-calc-dark p-1 font-mono text-[32px] text-calc-isabelline">
          <span className="truncate">{equation.join("")}</span>
        </div>

        <p
          role="alert"
          aria-live="polite"
          className="h-5 w-full px-1 text-center text-xs text-red-700">
          {error}
        </p>

        <div className="flex w-[278px] flex-row flex-wrap gap-0.5 p-0.5 pt-1">
          {PAD.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => press(key)}
              className={`${keyClasses} ${key === "=" ? "grow" : ""}`}>
              {key}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
