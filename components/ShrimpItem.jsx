import React from 'react';

const ShrimpItem = ({ image }) => {
  return (
    <div className='w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[325px] lg:h-[325px] rounded-md border-2 border-black shadow-lg shadow-black hover:scale-105 ease-in duration-300'>
      <img src={image} className='rounded-md' />
    </div>
  );
};

export default ShrimpItem;
