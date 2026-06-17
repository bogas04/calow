export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const roundToTens = (n: number) => Math.floor(n / 10) * 10;

/**
 *
 * Poor man's calculator. I don't want to use eval on unrestricted strings.
 * Checks if string contains + or -
 * Processes the string until it's a series of positive and negative numbers
 * Adds them up.
 *
 * Dry run:
 * Input: "10"
 * Step 1: Doesn't have +/-, return value as a Number
 * Output: 10
 *
 * Input: "10 + 12 - 6"
 * Step 1: "10+12-6"         // remove spaces
 * Step 2: "10!+12!-6"       // mark all operators with a preceding '!'
 * Step 3: ["10","+12","-6"] // split by '!'
 * Step 4: 16                // add all items of array
 * Output: 16
 */
const isDigit = (character: string) => /[0-9]/.test(character);

const parseNumber = (input: string, index: number) => {
  let current = index;
  let value = 0;
  let hasDecimal = false;
  let decimalFactor = 0.1;

  if (input[current] === "+" || input[current] === "-") {
    current += 1;
  }

  while (current < input.length) {
    const char = input[current];

    if (char === ".") {
      if (hasDecimal) {
        break;
      }
      hasDecimal = true;
      current += 1;
      continue;
    }

    if (!isDigit(char)) {
      break;
    }

    if (!hasDecimal) {
      value = value * 10 + Number(char);
    } else {
      value += Number(char) * decimalFactor;
      decimalFactor *= 0.1;
    }

    current += 1;
  }

  const raw = input.slice(index, current);
  const numericValue = Number(raw);
  return { value: numericValue, nextIndex: current };
};

const evaluateExpression = (input: string) => {
  let index = 0;

  const parseFactor = () => {
    const start = input[index];
    if (start === "+" || start === "-") {
      const sign = start === "-" ? -1 : 1;
      index += 1;
      const number = parseNumber(input, index);
      if (Number.isNaN(number.value)) {
        return NaN;
      }
      index = number.nextIndex;
      return sign * number.value;
    }

    const number = parseNumber(input, index);
    if (Number.isNaN(number.value)) {
      return NaN;
    }
    index = number.nextIndex;
    return number.value;
  };

  const parseTerm = () => {
    let value = parseFactor();
    if (Number.isNaN(value)) {
      return NaN;
    }

    while (index < input.length) {
      const operator = input[index];
      if (operator !== "*" && operator !== "/") {
        break;
      }
      index += 1;
      const nextValue = parseFactor();
      if (Number.isNaN(nextValue)) {
        return NaN;
      }

      if (operator === "*") {
        value *= nextValue;
      } else {
        if (nextValue === 0) {
          return NaN;
        }
        value /= nextValue;
      }
    }

    return value;
  };

  let result = parseTerm();
  if (Number.isNaN(result)) {
    return NaN;
  }

  while (index < input.length) {
    const operator = input[index];
    if (operator !== "+" && operator !== "-") {
      break;
    }
    index += 1;
    const nextTerm = parseTerm();
    if (Number.isNaN(nextTerm)) {
      return NaN;
    }

    if (operator === "+") {
      result += nextTerm;
    } else {
      result -= nextTerm;
    }
  }

  return result;
};

export const computeArithmeticExpression = (expression: string) => {
  const normalized = expression.replaceAll(" ", "");
  if (normalized === "") {
    return NaN;
  }

  const validExpression = /^[0-9.+\-*/]+$/;
  if (!validExpression.test(normalized)) {
    return NaN;
  }

  if (/[+\-*/]{2,}/.test(normalized.replace(/^[+\-]/, ""))) {
    return NaN;
  }

  const result = evaluateExpression(normalized);
  return Number.isFinite(result) ? result : NaN;
};

/**
 * 
  takes an array of objects and sorts it by the count of a key
  Example:
  [
    {name: 'a'},
    {name: 'b'},
    {name: 'b'},
    {name: 'c'},
    {name: 'c'},
    {name: 'c'},
  ]

  Output:
  [
    {name: 'c'},
    {name: 'b'},
    {name: 'a'},
  ]
 */
export function sortByKey<T extends Record<string, any>>(arr: T[], key: keyof T, ascending = false): T[] {
  const rankedMap = new Map<string, { item: T; count: number }>();
  arr.forEach((item) => {
    const fromMap = rankedMap.get(item[key]);
    rankedMap.set(item[key], { count: (fromMap?.count ?? 0) + 1, item });
  });

  return Array.from(rankedMap.values())
    .sort((a, b) => (a.count - b.count) * (ascending ? 1 : -1))
    .map((x) => x.item);
}
