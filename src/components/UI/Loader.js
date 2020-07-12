import React from 'react';
import { CircularProgress } from '@material-ui/core';

const Loader = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center'
      }}
    >
      <CircularProgress {...props} />
    </div>
  );
};

export default Loader;
