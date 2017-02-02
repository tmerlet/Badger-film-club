import { GET_FILMS, FAILURE } from './types';

export const getFilms = (json) => ({ type: GET_FILMS, payload: { json } });
export const failure = (error) => ({ type: FAILURE, payload: { error } });
