export class Tools {
  _window;

  _document;

  _process;

  constructor() {
    this.init();
  }

  init() {
    if (!this._window && typeof window !== 'undefined') {
      this._window = window;
    }
    if (!this._document && typeof document !== 'undefined') {
      this._document = document;
    }
    if (!this._process && typeof process !== 'undefined') {
      this._process = process;
    }
  }

  getLocalDate(date: Date = new Date()): string {
    let ret = '';
    try {
      ret = date?.toLocaleDateString('ru-RU', {
        weekday: 'long',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    } catch(e) {}
    return ret;
  }

  getDocument(): any {
    this.init();
    return this._document || this._window?.document || null;
  }

  getLocation(): any {
    this.init();
    return this._document?.location || this?._window?.location || null;
  }

  getEnv(): any {
    this.init();
    return this._process?.env || {};
  }

  isBrowser() {
    return this.getLocation() !== null;
  }
}

export const tools = new Tools();
