import { film } from '../models/film';

let uid;
let db;

const create = ({ title }) => {
  uid++;
  const newFilm = film(uid, title);
  db[uid] = newFilm;
  return newFilm;
};

const read = () => {
  return Object.keys(db).map(key => db[key]);
};

const readById = (id) => {
  return db[id];
};

const update = (id, { title }) => {
  const existingFilm = readById(id);
  if (existingFilm === undefined) {
    return undefined;
  }

  const updatedFilm = film(id, title);

  db[id] = updatedFilm;
  return updatedFilm;
};

export default () => {
  db = {};
  uid = 0;
  return {
    create,
    read,
    readById,
    update
  };
};
