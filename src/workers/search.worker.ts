import Fuse from 'fuse.js';

export async function search(term) {
  return _fuse.search(term);
}

let _fuse;
const _options = {
  // isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  includeMatches: true,
  findAllMatches: true,
  minMatchCharLength: 3,
  // location: 0,
  // threshold: 0.6,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  keys: [
    "title",
    "subtitle",
    "date",
    "excerpt",
    "tags",
    "description",
  ],
};

export function init(data) {
  const index = Fuse.createIndex(_options.keys, data);
  _fuse = new Fuse(data, _options, index);
}