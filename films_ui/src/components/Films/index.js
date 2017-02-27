import React, { PropTypes } from 'react';

const Films = (props) => {
  return (
    <div>
      {props.loading &&
        'Loading!'
      }
    </div>
  );
};

Films.propTypes = {
  loading: PropTypes.bool,
};

export default Films;
