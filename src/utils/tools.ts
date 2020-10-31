
export class Tools {
  _window;

  _document;

  constructor() {
    if(typeof window != 'undefined') {
      this._window = window;
    }
    if(typeof document != 'undefined') {
      this._document = document;
    }
  }

  get localStorage() {
    if(this._window) {
      return this._window.localStorage;
    } else {
      return {
        getItem() { return '{ }'; },
        setItem() { },
      }
    }
  }

  getLocalDate(date: Date = new Date()) {
    return date.toLocaleDateString('ru-RU', {
      weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit'
    });
  }
}

export const tools = new Tools();
export default tools;
