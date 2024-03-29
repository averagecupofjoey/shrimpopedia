import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import constructionShrimp from '../../public/assets/constructionShrimp.png';
import Image from 'next/image';

import HalfGap from '../../components/pageLines/HalfGap';
import FullLine from '../../components/pageLines/FullLine';
import useDimensions from 'react-use-dimensions';

// import loadingShrimp from '../../public/assets/loading.png';
import spinner from '../../public/assets/spinner.svg';

const ShrimpId = () => {
  const [shrimpData, setShrimpData] = useState(null);

  const [ref, { height, width }] = useDimensions();

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
    return (
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <Image
          src={spinner}
          alt='Loading Image'
          className='w-[50vw] h-[50vh] rounded-md animate-spin'
        ></Image>
        <h1>Loading your data</h1>
      </div>
    );
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
      <div className='flex items-center justify-center  w-full p-2 font-gloria-hallelujah'>
        <div className='border-2 border-blue-50 h-full w-[90vh] bg-[#f5f5f5] grid grid-cols-14 grid-rows-25 grid-flow-col '>
          <div className='col-span-2 row-span-25 border-r-4 border-red-600 grid grid-rows-25 '>
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
            width={width}
          />
          <HalfGap />
          <HalfGap
            ref={ref}
            label='Primary Color'
            value={shrimpData.colorOne}
            height={height}
            width={width}
          />
          <HalfGap />
          <HalfGap
            ref={ref}
            label='Secondary Color'
            value={shrimpData.colorTwo}
            height={height}
            width={width}
          />
          <HalfGap />
          <HalfGap
            ref={ref}
            label='Morph Type'
            value={shrimpData.morphType}
            height={height}
            width={width}
          />

          <HalfGap />
          <FullLine
            label='Notes'
            value={shrimpData.notes}
            height={height}
            width={width}
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
          {shrimpData.sale === 'Yes' && (
            <FullLine
              label='Sale Info'
              value={shrimpData.saleInfo}
              height={height}
              width={width}
            />
          )}
          {shrimpData.sale === 'No' && <FullLine />}
          <FullLine />
          <FullLine />
          <FullLine />
          <div className='row-span-6 col-span-6 flex items-center justify-center relative'>
            <img
              className='max-h-full max-w-full absolute pb-1'
              src={shrimpData.image}
              alt='Shrimp Image'
              style={{ width: '100%', objectFit: 'contain' }}
            ></img>
            <div className='grid grid-cols-6 grid-rows-6 grid-flow-col w-full h-full'>
              <HalfGap />
              <HalfGap />
              <HalfGap />
              <HalfGap />
              <HalfGap />
              <HalfGap />
            </div>
          </div>
          <HalfGap
            ref={ref}
            label='Gender'
            value='Male'
            height={height}
            width={width}
          />
          <HalfGap />
        </div>
      </div>
    );
  }
};

export default ShrimpId;
