import React, { memo } from 'react';
import { TextField } from '@material-ui/core';

const MemoTextField = (props) => {
  // console.log('Rendering Text Field');
  return <TextField {...props}></TextField>;
};

export default memo(
  MemoTextField,
  (prevProps, nextProps) =>
    nextProps.value === prevProps.value && nextProps.error === prevProps.error
);
