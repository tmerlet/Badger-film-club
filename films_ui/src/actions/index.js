import { CREATE_FILM, FAILURE, GET_FILMS, GET_FILMS_SUCCESS } from './types';

export const createFilm = (title) => ({ type: CREATE_FILM, payload: { title } });
export const getFilms = () => ({ type: GET_FILMS });
export const getFilmsSuccess = (films) => ({ type: GET_FILMS_SUCCESS, payload: { films } });
export const failure = (error) => ({ type: FAILURE, payload: { error } });
