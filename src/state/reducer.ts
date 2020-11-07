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
      return { ...state, addedPost: true };
    }
    case 'ADD_POST_FINISH': {
      return { ...state, addedPost: false };
    }
    default:
      return state;
  }
};

export default reducer;
