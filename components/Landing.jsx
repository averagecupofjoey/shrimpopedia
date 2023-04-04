import React from 'react';
import Image from 'next/image';
import logoImage from '../public/assets/logo.png';
import shrimpSearch from '../public/assets/shrimpSearch.png';
import shrimpopedia from '../public/assets/shrimpopedia.png';

import useDimensions from 'react-use-dimensions';

const Landing = () => {
  const [ref, { x, y, width, height }] = useDimensions();
  return (
    <div
      ref={ref}
      id='landing'
      className='flex flex-col-reverse justify-center sm:flex-row px-6 items-center gap-8 mb-12 h-full'
    >
      <div className='sm:w-1/2'>
        <h2 className='max-w-md text-4xl font-bold text-center sm:text-5xl sm:text-left'>
          Welcome to Shrimpopedia!
        </h2>
        <p className='max-w-md text-2xl mt-4 text-center sm:text-left'>
          We’re a user contributed encyclopedia of unique shrimp morphs, and a
          resource for breeders to list their shrimp for sale. {x} , {y} ,{' '}
          {width} , {height}
        </p>
      </div>
      {/* <div className='max-h-full max-w-full'> */}
      <Image
        className='sm:w-1/2 w-[70%]'
        src={shrimpopedia}
        alt='Shrimpopedia Image'
      ></Image>
      {/* </div> */}
    </div>
  );
};

export default Landing;
