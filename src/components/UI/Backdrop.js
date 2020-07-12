import React from 'react';

const Backdrop = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: '100',
        left: 0,
        top: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
      }}
    ></div>
  );
};

export default Backdrop;
