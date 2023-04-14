import React, { useState } from 'react';
import { IoFemaleSharp, IoMaleFemaleSharp, IoMaleSharp } from 'react-icons/io5';
import { GiShoppingCart } from 'react-icons/gi';

const ShrimpItem = ({ data }) => {
  const [flipped, setFlipped] = useState(false);

  const { image, name, species, gender, sale, waterType, morphType } = data;
  const entryLink = `/shrimp/${data.id}`;

  function buttonClick(event) {
    event.stopPropagation();
  }

  // var base64str = image.substring(image.indexOf(',') + 1);
  // var decoded = atob(base64str);

  // console.log('FileSize: ' + decoded.length / 1e6);

  return (
    <div className='flex flex-col items-center cardContainer'>
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
      <div className='card' onClick={() => setFlipped(!flipped)}>
        <div
          className={
            !flipped ? 'cardFront cardFrontShown' : 'cardFront cardFrontHidden'
          }
        >
          <div className='w-[246px] h-[250px] sm:w-[296px] sm:h-[300px] lg:w-[321px] lg:h-[325px]'>
            <div
              className='rounded-t-[.200rem] object-contain border-b-2 border-black w-[100%] h-[100%]'
              style={{
                backgroundImage: `url('${image}')`,
                backgroundSize: 'cover',
              }}
            />
          </div>
          <div className='flex flex-col items-center '>
            <div className='text-3xl subpixel-antialiased font-medium flex flex-row items-center'>
              {name}
            </div>
            <div className='antialiased text-lg italic flex flex-row  items-center'>
              {species}
              {gender === 'Female' ? (
                <IoFemaleSharp className='text-pink-500' />
              ) : (
                ''
              )}
              {gender === 'Male' ? (
                <IoMaleSharp className='text-blue-500' />
              ) : (
                ''
              )}
              {sale === 'Yes' ? (
                <GiShoppingCart className='text-green-500' />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        <div
          className={
            !flipped ? 'cardBack cardBackHidden' : 'cardBack cardBackShown'
          }
        >
          <div className='flex flex-col items-center h-full'>
            <div className='text-3xl subpixel-antialiased font-medium mt-4'>
              {name}
            </div>
            <div className='antialiased text-lg italic'>{species}</div>

            <div className='text-lg sm:text-2xl mt-8'>
              <div>Water Type: {waterType}</div>
              <div className='mt-2 sm:mt-3'>Morph Type: {morphType}</div>
              <div className='mt-2 sm:mt-3'> Gender: {gender}</div>
            </div>
            <a className='mt-auto mb-4' href={entryLink}>
              <button onClick={(e) => buttonClick(e)}>View Entry</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShrimpItem;
