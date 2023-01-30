import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import constructionShrimp from '../../public/assets/constructionShrimp.png';
import Image from 'next/image';

import HalfGap from '../../components/pageLines/HalfGap';
import FullLine from '../../components/pageLines/FullLine';
import useDimensions from 'react-use-dimensions';

const ShrimpId = () => {
  const [shrimpData, setShrimpData] = useState(null);

  const [ref, { height }] = useDimensions();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        return;
      }
      try {
        const response = await fetch(`/api/shrimp/${id}`);
        const json = await response.json();

        setShrimpData(json[0]);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, [id]);

  const isLoading = shrimpData === null;
  const noData = shrimpData === undefined;

  if (isLoading) {
    return <div>Hey we are loading your data</div>;
  }

  if (!isLoading && noData) {
    return (
      <div className='flex flex-col items-center justify-center w-full'>
        <Image
          src={constructionShrimp}
          alt='A Shrimp at a Construction Site'
          className='w-[50vw] h-[50vh] rounded-md'
        />
        <div>Sorry, looks like that Shrimp doesn&apos;t exist!</div>
      </div>
    );
  }

  if (!isLoading && !noData) {
    return (
      <div className='flex items-center justify-center  w-full pt-2 pb-2'>
        <div className='border-2 border-blue-50 h-full w-[90vh] bg-[#f5f5f5] grid grid-cols-14 grid-rows-25 grid-flow-col '>
          <div className='col-span-2 row-span-25 border-r-4 border-red-600 grid grid-rows-25'>
            <div className='row-span-3 border-b-2 border-blue-500'></div>
            {[...Array(22)].map((x, i) => (
              <div
                className='row-span-1 border-b-2 border-blue-500'
                key={i}
              ></div>
            ))}
          </div>
          <div className='row-span-3 col-span-12 border-b-2 border-blue-500 flex items-end justify-center'>
            <span className='text-3xl subpixel-antialiased font-medium'>
              {shrimpData.name} -
            </span>
            <span className='antialiased text-lg italic'>
              {shrimpData.species}
            </span>
          </div>
          <HalfGap
            ref={ref}
            label='Water Type'
            value={shrimpData.waterType}
            height={height}
          />
          <HalfGap />
          <HalfGap label='Primary Color' value={shrimpData.colorOne} />
          <HalfGap />
          <HalfGap label='Secondary Color' value={shrimpData.colorTwo} />
          <HalfGap />
          <HalfGap label='Morph Type' value={shrimpData.morphType} />

          <HalfGap />
          <FullLine
            label='Notes'
            value='Pokem ipsum dolor sit amet Hitmonchan Hidden Machine Jellicent Gary Smeargle Vulpix. Mewtwo Strikes Back Relicanth Mesprit Slowpoke Happiny Cacnea Flygon. Normal Crustle Darumaka Whiscash Mandibuzz Dewgong Elgyem. Sand-Attack Swadloon Kingdra Kanto Whismur Glitch City quis nostrud exercitation. Duis aute irure dolor in reprehenderit in voluptate Pupitar Uxie Hoothoot Pignite Pachirisu Muk.'
            height={height}
          />
          <FullLine />
          <FullLine />
          <FullLine />
          <FullLine />
          <FullLine />
          <FullLine />
          <FullLine />
          <FullLine />
          <FullLine />
          <FullLine />
          <FullLine />
          <FullLine />
          <FullLine />
          <div className='row-span-6 col-span-6 flex items-center justify-center bg-gray-300 border-b-2 border-blue-500'>
            {/* <div className='w-full h-full'> */}
            <img
              className='max-h-full max-w-full'
              src={shrimpData.image}
              alt='Shrimp Image'
              style={{ width: '100%', objectFit: 'contain' }}
            ></img>
            {/* </div> */}
          </div>
          <HalfGap label='Gender' value='Male' />
          <HalfGap />
        </div>
      </div>
    );
  }
};

export default ShrimpId;
