import React from 'react';

const ShrimpFeedItem = ({ info }) => {
  // console.log(props);

  return (
    <div className='w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-md border-2 border-black shadow-lg shadow-black hover:scale-105 ease-in duration-300'>
      <img src={info.image} className='rounded-md' />
    </div>
  );
};

export default ShrimpFeedItem;
