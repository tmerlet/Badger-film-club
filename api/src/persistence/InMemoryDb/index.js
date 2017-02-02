import { film } from '../../models/film';

let uid;
let db;

const create = title => {
  uid++;
  const newFilm = film(uid, title);
  db = {
    ...db,
    [uid]: newFilm
  };
  return newFilm;
};

const read = () => Object.keys(db).map(key => db[key]);

const readById = id => db[id];

const update = (id, title) => {
  const existingFilm = readById(id);
  if (existingFilm === undefined) {
    return undefined;
  }

  const updatedFilm = film(id, title);

  db = {
    ...db,
    [id]: updatedFilm
  };
  return updatedFilm;
};

export default () => {
  db = {
    0: 'PENGUINS'
  };
  uid = 1;
  return {
    create,
    read,
    readById,
    update
  };
};
