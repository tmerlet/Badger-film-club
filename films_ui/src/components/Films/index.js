import React, { PropTypes } from 'react';
import Form from '../Form';

const renderFilms = films => {
  if (films.length > 0) {
    return (
      <ul>
        {films.map((film) => {
          return <li key={`film-${film.id}`}>{film.title}</li>;
        })}
      </ul>
    );
  }

  return <p>No films!</p>;
};

const Films = ({ films, loading }) => {
  return (
    <div>
      {loading
        ? <p>Loading!</p>
        : renderFilms(films)
      }
      <Form />
    </div>
  );
};

Films.propTypes = {
  films: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string
    })
  ),
  loading: PropTypes.bool,
};

export default Films;
