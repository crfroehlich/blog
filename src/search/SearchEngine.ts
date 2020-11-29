import SearchWorker from '../workers/search.worker';

export class SearchEngine {
  private worker;
  private data: any[];
  private searches: any[] = [];

  constructor(data: any[]) {
    this.init(data);
  }

  private init(data: any[]) {
    if(data) {
      this.data = data;
      if(!this.worker) {
        this.worker = typeof window === 'object' ? new SearchWorker() : null;
        this.worker.init(data);
      }
    }
  }

  public async search(term: string, log = false) {
    this.init(this.data);
    const result = await this.worker.search(term);
    if(log) {
      this.searches.push({term, result});
    } else {
      this.searches.push({term});
    }
    return result;
  }

  public async getSearches() {
    return this.searches;
  }
}
