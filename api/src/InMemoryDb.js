let uid;

const create = ({ title }) => {
  uid++;
  return { id: uid, title }
};

export default (seed = 0) => {
  uid = seed;
  return {
    uid,
    create
  };
};
