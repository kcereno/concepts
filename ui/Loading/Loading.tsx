import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center my-10">
      <h2>Loading</h2>
      <progress className="w-56 text-center progress progress-accent" />
    </div>
  );
};

export default Loading;
