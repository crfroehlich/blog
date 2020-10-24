
class Tools {
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
        getItem() { return '{ "isDarkThemeActive": true }'; },
        setItem() { },
      }
    }
  }
}

export const tools = new Tools();
export default tools;
