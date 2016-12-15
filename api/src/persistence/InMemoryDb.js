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

const update = (id, { title }) => {
  const film = readById(id);
  if (film === undefined) {
    return undefined;
  }

  const newFilm = { id, title };

  db[id] = newFilm;
  return newFilm;
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
