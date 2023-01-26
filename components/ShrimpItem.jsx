import React from 'react';

const ShrimpItem = ({ image, name, species }) => {
  return (
    <div className='w-[250px] h-[320px] sm:w-[300px] sm:h-[350px] lg:w-[325px] lg:h-[400px] rounded-md border-2 border-black shadow-lg shadow-black hover:scale-105 ease-in duration-300 bg-amber-100'>
      <div className='w-[246px] h-[250px] sm:w-[296px] sm:h-[300px] lg:w-[321px] lg:h-[325px] '>
        <img
          src={image}
          className='rounded-t-md object-contain border-b-2 border-black'
        />
      </div>
      <div className='flex flex-col items-center'>
        <div className='text-3xl subpixel-antialiased font-medium'>{name}</div>
        <div className='antialiased text-lg italic'>{species}</div>
      </div>
    </div>
  );
};

export default ShrimpItem;
