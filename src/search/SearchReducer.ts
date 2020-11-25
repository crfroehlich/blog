export const initialSearchState = {
  totalData: [],
  search: [],
  searchResults: [],
  isLoading: true,
  isError: false,
  searchQuery: '',
}

export const SearchReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        totalData: action.payload,
      }
    case 'SET_SEARCH':
      return {
        ...state,
        search: action.payload,
        isLoading: false,
      }
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload.searchQuery,
        searchResults: action.payload.searchResults,
      }
    default:
      return state
  }
}
