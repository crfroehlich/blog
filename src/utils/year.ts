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
  17: {
    name: 'Pie',
    font: ['fas', 'pie'],
    sequence: 17,
  },
  16: {
    name: 'Pi',
    font: ['fas', 'pi'],
    sequence: 16,
  },
  15: {
    name: 'Luchador',
    font: ['fas', 'luchador'],
    sequence: 15,
  },
  14: {
    name: 'No-Fi',
    font: ['fas', 'wifi-slash'],
    sequence: 14,
  },
  13: {
    name: 'Abacus',
    font: ['fas', 'abacus'],
    sequence: 13,
  },
  12: {
    name: 'Scarf',
    font: ['fas', 'scarf'],
    sequence: 12,
  },
  11: {
    name: 'Space Cat',
    font: ['fas', 'cat-space'],
    sequence: 11,
  },
  10: {
    name: 'Axe',
    font: ['fas', 'axe'],
    sequence: 10,
  },
  9: {
    name: 'Poison',
    font: ['fas', 'flask-poison'],
    sequence: 9,
  },
  8: {
    name: 'Mountains',
    font: ['fas', 'mountains'],
    sequence: 8,
  },
  7: {
    name: 'Coffee Pot',
    font: ['fas', 'coffee-pot'],
    sequence: 7,
  },
  6: {
    name: 'Money',
    font: ['fas', 'money-check'],
    sequence: 6,
  },
  5: {
    name: 'Honey Badger',
    font: ['fas', 'badger-honey'],
    sequence: 5,
  },
  4: {
    name: 'Podium',
    font: ['fas', 'podium'],
    sequence: 4,
  },
  3: {
    name: 'Rook',
    font: ['fas', 'chess-rook'],
    sequence: 3,
  },
  2: {
    name: 'Scarecrow',
    font: ['fas', 'scarecrow'],
    sequence: 2,
  },
  1: {
    name: 'Baby',
    font: ['fas', 'baby-carriage'],
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
