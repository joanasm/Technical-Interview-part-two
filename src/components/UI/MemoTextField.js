import React, { memo } from 'react';
import { TextField } from '@material-ui/core';

const MemoTextField = (props) => {
  console.log('Rendering Text Field'); //TODO - remove console.log
  return <TextField {...props}></TextField>;
};

export default memo(
  MemoTextField,
  (prevProps, nextProps) =>
    nextProps.value === prevProps.value && nextProps.error === prevProps.error
);
