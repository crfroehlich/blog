import Fuse from 'fuse.js';
import SearchWorker from '../workers/search.worker';
export class BlogSearch {
  private fuse;
  private worker;
  readonly options = {
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

  constructor(data: any[]) {
    const index = Fuse.createIndex(this.options.keys, data);
    this.fuse = new Fuse(data, this.options, index);
    this.worker = typeof window === 'object' && new SearchWorker();
  }

  public search(term: string) {
    console.log(this.worker.search(100));
    return this.fuse.search(term);
  }
}
