export const initialState = {
  addedPost: false,
};

export interface IState {
  addedPost: boolean;
}

export interface IDefaultAction {
  type: string;
}

export const reducer = (state = initialState, action: IDefaultAction): IState => {
  switch (action.type) {
    case 'ADD_POST_START': {
      const newState = { ...state, addedPost: true };
      return newState;
    }
    case 'ADD_POST_FINISH': {
      const newState = { ...state, addedPost: false };
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
