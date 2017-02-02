export default (state = {}, action) => {
  switch (action.type) {

    case 'FAILURE': {
      const { error } = action.payload;
      return state;
    }

    case 'GET_FILMS': {
      const { json } = action.payload;
      return {
        ...state,
        films: json,
      }
    }
    default:
      return state;
  }
}
