import React from 'react';

const Display = (props: { message: string }) => {
  return (
    <div id="display">
      <h1>{props.message}</h1>
    </div>
  );
};
export default Display;
