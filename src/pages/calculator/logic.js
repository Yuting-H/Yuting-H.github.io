export const MAX_LENGTH = 15;
export const MAX_RESULT_LENGTH = 14;

const BASIC_OPERATORS = "+-*/";

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function percentage(a) {
  return a / 100;
}

/**
 * Applies a single operator to two operands.
 */
export function operate(a, op, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (op) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    case "%":
      return percentage(a);
    default:
      return undefined;
  }
}

/**
 * Splits the displayed equation into computable tokens, keeping the
 * operators as separate entries.
 */
export function consolidateEquation(equation) {
  return equation
    .join("")
    .split(/(?=[+\-*/%])|(?<=[+\-*/%])/g);
}

/**
 * Computes an equation token by token, following DMAS.
 */
export function evaluate(tokens) {
  const wellFormed = [...tokens];

  wellFormed.forEach((char, index) => {
    if (char === "%") {
      wellFormed.splice(
        index - 1,
        2,
        operate(wellFormed[index - 1], "%")
      );
    }
  });

  wellFormed.forEach((char, index) => {
    if (char === "*" || char === "/") {
      wellFormed.splice(
        index - 1,
        3,
        operate(wellFormed[index - 1], char, wellFormed[index + 1])
      );
    }
  });

  wellFormed.forEach((char, index) => {
    if (char === "+" || char === "-") {
      wellFormed.splice(
        index - 1,
        3,
        operate(wellFormed[index - 1], char, wellFormed[index + 1])
      );
    }
  });

  return `${wellFormed}`;
}

/**
 * Returns true when a decimal point cannot be appended to the equation,
 * for example "1.2." or "10%.5".
 */
function invalidDecimal(equation) {
  const lastDecimal = equation.lastIndexOf(".");

  if (lastDecimal === -1) {
    return false;
  }

  const lastOperator = Math.max(
    equation.lastIndexOf("+"),
    equation.lastIndexOf("-"),
    equation.lastIndexOf("*"),
    equation.lastIndexOf("/")
  );

  return lastOperator < lastDecimal;
}

/**
 * Validates a keypress against the current equation and returns the next
 * equation plus whether the input was rejected.
 */
export function insertToken(equation, token) {
  if (equation.length >= MAX_LENGTH) {
    return { next: equation, error: false };
  }

  const prev = equation.at(-1);

  const tokenType = {
    isNumber: Boolean(parseFloat(token)) || token === "0",
    isZero: token === "0",
    isDecimal: token === ".",
    isPercent: token === "%",
    isBasic: BASIC_OPERATORS.includes(token),
  };

  const prevType = {
    isFirst: equation.length <= 1,
    isPercent: prev === "%",
    isZero: prev === "0",
    isDecimal: prev === ".",
    isBasic: BASIC_OPERATORS.includes(prev),
  };

  const push = () => ({ next: [...equation, token], error: false });
  const reject = () => ({ next: equation, error: true });

  if (tokenType.isZero) {
    if ((prevType.isZero && prevType.isFirst) || prevType.isPercent) {
      return reject();
    }
    return push();
  }

  if (tokenType.isNumber) {
    if (prevType.isPercent) {
      return reject();
    }
    if (prevType.isFirst && prevType.isZero) {
      return { next: [token], error: false };
    }
    return push();
  }

  if (tokenType.isDecimal) {
    if (
      prevType.isDecimal ||
      prevType.isPercent ||
      prevType.isBasic ||
      invalidDecimal(equation)
    ) {
      return reject();
    }
    return push();
  }

  if (tokenType.isPercent) {
    if (prevType.isBasic || prevType.isDecimal || prevType.isPercent) {
      return reject();
    }
    return push();
  }

  if (tokenType.isBasic) {
    if (prevType.isBasic || prevType.isDecimal) {
      return reject();
    }
    return push();
  }

  return { next: equation, error: false };
}

/**
 * Shortens a numeric result so it fits on the display.
 */
export function fitResult(result) {
  const chars = result.split("");
  return chars.length >= MAX_LENGTH
    ? chars.slice(0, MAX_RESULT_LENGTH)
    : chars;
}
