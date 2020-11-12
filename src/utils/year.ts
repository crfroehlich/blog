import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IYear {
  name: string;
  font: IconProp;
  sequence: number;
}

interface IMap {
  [key: number]: IYear;
}

const calendar: IMap = {
  13: {
    name: 'Abacus',
    font: ['fad', 'abacus'],
    sequence: 13,
  },
  12: {
    name: 'Scarf',
    font: ['fad', 'scarf'],
    sequence: 12,
  },
  11: {
    name: 'Space Cat',
    font: ['fad', 'cat-space'],
    sequence: 11,
  },
  10: {
    name: 'Axe',
    font: ['fad', 'axe'],
    sequence: 10,
  },
  9: {
    name: 'Poison',
    font: ['fad', 'flask-poison'],
    sequence: 9,
  },
  8: {
    name: 'Mountains',
    font: ['fad', 'mountains'],
    sequence: 8,
  },
  7: {
    name: 'Coffee Pot',
    font: ['fad', 'coffee-pot'],
    sequence: 7,
  },
  6: {
    name: 'Money',
    font: ['fad', 'money-check'],
    sequence: 6,
  },
  5: {
    name: 'Honey Badger',
    font: ['fad', 'badger-honey'],
    sequence: 5,
  },
  4: {
    name: 'Podium',
    font: ['fad', 'podium'],
    sequence: 4,
  },
  3: {
    name: 'Rook',
    font: ['fad', 'chess-rook'],
    sequence: 3,
  },
  2: {
    name: 'Scarecrow',
    font: ['fad', 'scarecrow'],
    sequence: 2,
  },
  1: {
    name: 'Baby',
    font: ['fad', 'baby-carriage'],
    sequence: 1,
  },
};

const map: IMap = {};
const start = 6; // 0006 C.E.
const end = 2100; // 2100 C.E.
const cycle = 13;

let sequence = 1;
for (let i = start; i <= end; i += 1) {
  if (sequence > cycle) sequence = 1;
  map[i] = calendar[sequence];
  sequence += 1;
}

export const getYearOfThe = (year: number): IYear => map[year];
