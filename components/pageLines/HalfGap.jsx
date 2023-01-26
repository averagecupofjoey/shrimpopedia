import React from 'react';

const HalfGap = ({ label, value }) => {
  if (label) {
    return (
      <div className='row-span-1 col-span-6 border-b-2 border-blue-500'>
        <span>
          {label} : {value}
        </span>
      </div>
    );
  }
  return <div className='row-span-1 col-span-6 border-b-2 border-blue-500' />;
};

export default HalfGap;
