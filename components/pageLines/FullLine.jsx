import React from 'react';

const FullLine = ({ label, value, height }) => {
  if (label) {
    return (
      <div
        className='row-span-1 col-span-12 border-b-2 border-blue-500 text-black'
        style={{ lineHeight: `${height}px`, fontSize: `${height - 6}px` }}
      >
        <span className='flex items-end'>
          {label} : {value}
        </span>
      </div>
    );
  }
  return <div className='row-span-1 col-span-12 border-b-2 border-blue-500' />;
};

export default FullLine;
