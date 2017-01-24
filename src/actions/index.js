export const data = (json) => ({ type: 'DATA', payload: { json } });
export const failure = (error) => ({ type: 'FAILURE', payload: { error } });
