import React, { useState } from 'react';

const ShrimpItem = ({ image, name, species }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className='flex flex-col items-center cardContainer'
      onClick={() => setFlipped(!flipped)}
    >
      {/* <div className='w-[250px] h-[320px] sm:w-[300px] sm:h-[375px] lg:w-[325px] lg:h-[400px] rounded-md border-2 border-black shadow-lg shadow-black hover:scale-105 ease-in duration-300 bg-amber-100 relative'>
        <div className='w-[246px] h-[250px] sm:w-[296px] sm:h-[300px] lg:w-[321px] lg:h-[325px] '>
          <img
            src={image}
            className='rounded-t-md object-contain border-b-2 border-black'
          />
        </div>
        <div className='flex flex-col items-center'>
          <div className='text-3xl subpixel-antialiased font-medium'>
            {name}
          </div>
          <div className='antialiased text-lg italic'>{species}</div>
        </div>
      </div> */}
      <div className='card'>
        <div
          className={
            !flipped ? 'cardFront cardFrontShown' : 'cardFront cardFrontHidden'
          }
        >
          Hello front
        </div>
        <div
          className={
            !flipped ? 'cardBack cardBackHidden' : 'cardBack cardBackShown'
          }
        >
          Hello back
        </div>
      </div>
    </div>
  );
};

export default ShrimpItem;
