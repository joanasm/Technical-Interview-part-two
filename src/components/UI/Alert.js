import React from 'react';
import { Alert } from '@material-ui/lab';

const CustomAlert = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center'
      }}
    >
      <Alert {...props} />
    </div>
  );
};

export default CustomAlert;
