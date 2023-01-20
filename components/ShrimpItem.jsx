import React from 'react';

const ShrimpItem = ({ image }) => {
  return (
    <div className='w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-md border-2 border-black shadow-lg shadow-black hover:scale-105 ease-in duration-300'>
      <img src={image} className='rounded-md' />
    </div>
  );
};

export default ShrimpItem;
