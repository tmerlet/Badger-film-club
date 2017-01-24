// THESE ACTION TYPE NAMES ARE CRAP AND SHOULD BE IMPORTED FROM TYPES
export const data = (json) => ({ type: 'DATA', payload: { json } });
export const failure = (error) => ({ type: 'FAILURE', payload: { error } });
