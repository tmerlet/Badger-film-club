import fetch from 'isomorphic-fetch';

import { applyMiddleware } from 'redux';

import getFilms from './getFilms';
import createFilm from './createFilm'

export default (filmsUrl) => applyMiddleware(
  getFilms(fetch, filmsUrl),
  createFilm(fetch, filmsUrl)
);
