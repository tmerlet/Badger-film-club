let uid;
let db;

const create = ({ title }) => {
  uid++;
  const newFilm = { id: uid, title };
  db[uid] = newFilm;
  return newFilm;
};

const read = () => {
  return Object.keys(db).map(key => db[key]);
};

const readById = (id) => {
  return db[id];
};

export default (seed = 0) => {
  db = {};
  uid = seed;
  return {
    uid,
    create,
    read,
    readById
  };
};
