import React from 'react';

import H1 from '../H1';

const Films = (props) => {
  return (
    <div>
      {props.films.map((film, index) => {

        return <H1 key={`${index}-film`}>{film}</H1>
      })}

      {props.films.length === 0 &&
        <H1>Loading 💡</H1>
      }
    </div>
  );
}

export default Films;
