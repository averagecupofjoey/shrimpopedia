import React from 'react';

const FullLine = ({ label, value, height, width }) => {
  if (label) {
    return (
      <div
        className='row-span-1 col-span-12 border-b-2 border-blue-500 text-black pl-2'
        style={{
          lineHeight: `${height}px`,
          fontSize: width > 213 ? `${height - 6}px` : `${height - 12}px`,
        }}
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
