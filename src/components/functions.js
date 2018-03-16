import _ from "lodash";
// simple fisher yates implementation
export const shuffle = deck => {
  let randomizedDeck = [];
  let array = deck.slice();
  while (array.length !== 0) {
    let rIndex = Math.floor(array.length * Math.random());
    randomizedDeck.push(array[rIndex]);
    array.splice(rIndex, 1);
  }
  return randomizedDeck;
};
export const matrix = (numbers, row) => {
  let a = [];
  let b = [];
  for (let i in numbers) {
    if (parseInt(i) === Math.floor(numbers.length / 2)) {
      a.push({ selected: true, value: numbers[i] });
    } else {
      a.push({ selected: false, value: numbers[i] });
      if (i % row === row - 1) {
        b.push(a);
        a = [];
      }
    }
  }
  return b;
};

export const randomArrayGenerate = (length, init) => {
  const numbers = [];
  if (init === "initial") {
    for (let i = 1; i <= length; i++) {
      numbers.push("");
    }
    return matrix(shuffle(numbers), Math.sqrt(length));
  }
  for (let i = 1; i <= length; i++) {
    numbers.push(i);
  }
  return matrix(shuffle(numbers), Math.sqrt(length));
};

export const check = numbers => {
  let cnt = 0,
    leftDigonal = 0,
    rightDigonal = 0;
  let colSelected = [];
  for (let i = 0; i < numbers.length; i++) {
    colSelected[i] = 0;
  }
  _.map(numbers, (row, i) => {
    let rowSelected = 0;
    _.map(row, (col, j) => {
      if (col.selected === true) {
        rowSelected++;
        colSelected[j]++;
        if (i === j) {
          leftDigonal++;
        }
        if (row.length - 1 - i === j) {
          rightDigonal++;
        }
        if (colSelected[j] === numbers.length) cnt++;
      }
    });
    if (rowSelected === numbers.length) cnt++;
    if (leftDigonal === numbers.length) cnt++;
    if (rightDigonal === numbers.length) cnt++;
  });
  return cnt;
};
