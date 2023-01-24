import React from 'react';
import Image from 'next/image';
import logoImage from '../public/assets/logo.png';
import shrimpSearch from '../public/assets/shrimpSearch.png';

const Landing = () => {
  return (
    <div
      id='landing'
      className='flex flex-col-reverse justify-center sm:flex-row px-6 items-center gap-8 mb-12 h-full'
    >
      <div className='sm:w-1/2'>
        <h2 className='max-w-md text-4xl font-bold text-center sm:text-5xl sm:text-left'>
          Welcome to Shrimpopedia!
        </h2>
        <p className='max-w-md text-2xl mt-4 text-center sm:text-left'>
          We’re a user contributed encyclopedia of unique shrimp morphs, and a
          resource for breeders to list their shrimp for sale.{' '}
        </p>
      </div>
      <Image
        className='sm:w-1/2 w-[80%]'
        src={shrimpSearch}
        alt='Shrimpopedia Image'
      ></Image>
    </div>
  );
};

export default Landing;
