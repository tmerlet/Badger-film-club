// AGAIN ACTION TYPES SHOULD BE IMPORTED AND NOT HARDCODED STRINGS
export default (state = {}, action) => {
  switch (action.type) {

    case 'FAILURE': {
      const { error } = action.payload;
      return state;
    }

    case 'DATA': {
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
