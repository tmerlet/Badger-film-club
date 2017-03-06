import { GET_FILMS, FAILURE, CREATE_FILM } from './types';

export const getFilms = (json) => ({ type: GET_FILMS, payload: { json } });
export const createFilm = (title) => ({ type: CREATE_FILM, payload: { title } });
export const failure = (error) => ({ type: FAILURE, payload: { error } });
