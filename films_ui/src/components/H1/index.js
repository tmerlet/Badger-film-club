import React from 'react';

import './style.css';

const H1 = (props) => {
  return (
    <h1 className="heading">{props.children}</h1>
  )
};

export default H1;
