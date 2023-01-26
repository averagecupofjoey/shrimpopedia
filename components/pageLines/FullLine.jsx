import React from 'react';

const FullLine = ({ label, value }) => {
  if (label) {
    return (
      <div className='row-span-1 col-span-12 border-b-2 border-blue-500 text-black'>
        <span className='flex items-end'>
          {label} : {value}
        </span>
      </div>
    );
  }
  return <div className='row-span-1 col-span-12 border-b-2 border-blue-500' />;
};

export default FullLine;
