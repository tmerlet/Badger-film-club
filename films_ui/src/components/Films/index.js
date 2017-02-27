import React, { PropTypes } from 'react';

const Films = (props) => {
  return (
    <div>
      {props.loading &&
        'Loading!'
      }

      {!props.loading &&
        <div>
          {props.films.length > 0 &&
            <ul>
              {props.films.map((film) => {
                return <li key={`film-${film.id}`}>{film.title}</li>;
              })}
            </ul>
          }
          {props.films.length === 0 &&
            <div>No films!</div>
          }
        </div>
      }
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
