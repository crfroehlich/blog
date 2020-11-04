
export class Tools {
  _window;

  _document;

  constructor() {
    this.init();
  }

  init() {
    if (!this._window && typeof window != 'undefined') {
      this._window = window;
    }
    if (!this._document && typeof document != 'undefined') {
      this._document = document;
    }
  }

  get localStorage() {
    if(this._window) {
      return this._window.localStorage;
    } else {
      return {
        getItem() {
          return '{ }';
        },
        setItem() {},
      };
    }
  }

  getLocalDate(date: Date = new Date()): string {
    return date.toLocaleDateString('ru-RU', {
      weekday: 'long',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }

  getDocument(): any {
    this.init();
    return this._document || this._window?.document || null;
  }

  getLocation(): any {
    this.init();
    return this._document?.location || this?._window?.location || null;
  }

  isBrowser() {
    return this.getLocation() !== null;
  }
}

export const tools = new Tools();
export default tools;
