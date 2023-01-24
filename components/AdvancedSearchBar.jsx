import React, { useState } from 'react';

const AdvancedSearchBar = () => {
  const [species, setSpecies] = useState();
  const [name, setName] = useState();
  const [colorOne, setColorOne] = useState('Red');
  const [colorTwo, setColorTwo] = useState('N/A');
  const [morphType, setMorphType] = useState('Solid');
  const [waterType, setWaterType] = useState('Freshwater');
  const [notes, setNotes] = useState('');
  const [sell, setSell] = useState('No');
  const [saleInfo, setSaleInfo] = useState('');
  const [photo, setPhoto] = useState(null);

  //Form state handlers
  const handleSpecies = (e) => {
    e.preventDefault();
    setSpecies(e.target.value);
  };

  const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleColorOne = (e) => {
    e.preventDefault();
    setColorOne(e.target.value);
  };

  const handleColorTwo = (e) => {
    e.preventDefault();
    setColorTwo(e.target.value);
  };

  const handleMorphType = (e) => {
    e.preventDefault();
    setMorphType(e.target.value);
  };

  const handleWaterType = (e) => {
    e.preventDefault();
    setWaterType(e.target.value);
  };

  const handleNotes = (e) => {
    e.preventDefault();
    setNotes(e.target.value);
  };

  const handleSale = (e) => {
    e.preventDefault();
    setSell(e.target.value);
  };

  const handleSaleInfo = (e) => {
    e.preventDefault();
    setSaleInfo(e.target.value);
  };
  return (
    <form className='bg-gray-200 rounded-md p-4'>
      {/* <label
        for='default-search'
        className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
      >
        Search
      </label>
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <svg
            aria-hidden='true'
            class='w-5 h-5 text-gray-500 dark:text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            ></path>
          </svg>
        </div>
        <input
          type='search'
          id='default-search'
          className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Search for species or name'
          required
        />
        <button
          type='submit'
          className='text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Search
        </button>
      </div> */}
      <div className='grid md:grid-cols-2 gap-4 w-full py-2'>
        <div className='flex flex-col'>
          <label htmlFor='species' className='uppercase text-sm py-2'>
            Scientific Name
          </label>
          <input
            className='border-2 rounded-lg p-3 flex border-gray-300'
            type='text'
            name='species'
            placeholder='e.g: Neocaridina'
            id='species'
            onChange={handleSpecies}
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='name' className='uppercase text-sm py-2'>
            Common Name
          </label>
          <input
            className='border-2 rounded-lg p-3 flex border-gray-300'
            type='text'
            name='name'
            id='name'
            placeholder='e.g: Cherry Shrimp'
            onChange={handleName}
          />
        </div>
      </div>
      <div className='grid md:grid-cols-3 gap-4 w-full py-2'>
        <div className='flex flex-col'>
          <label htmlFor='colorOne' className='uppercase text-sm py-2'>
            Primary Color
          </label>
          <select
            name='colorOne'
            id='colorOne'
            className='border-2 rounded-lg p-3 border-gray-300'
            onChange={handleColorOne}
          >
            <option value='Red'>Red</option>
            <option value='Orange'>Orange</option>
            <option value='Yellow'>Yellow</option>
            <option value='Blue'>Blue</option>
            <option value='Green'>Green</option>
            <option value='Black'>Black</option>
            <option value='White'>White</option>
            <option value='Purple'>Purple</option>
          </select>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='colorTwo' className='uppercase text-sm py-2'>
            Secondary Color
          </label>
          <select
            id='colorTwo'
            name='colorTwo'
            className='border-2 rounded-lg p-3 border-gray-300'
            onChange={handleColorTwo}
          >
            <option value='Red'>Red</option>
            <option value='Orange'>Orange</option>
            <option value='Yellow'>Yellow</option>
            <option value='Blue'>Blue</option>
            <option value='Green'>Green</option>
            <option value='Black'>Black</option>
            <option value='White'>White</option>
            <option value='Purple'>Purple</option>
            <option value='N/A'>N/A</option>
          </select>
        </div>
        <div className='flex flex-col'>
          <label htmlFor='morphType' className='uppercase text-sm py-2'>
            Morph Type
          </label>
          <select
            name='morphType'
            id='morphType'
            className='border-2 rounded-lg p-3 border-gray-300'
            onChange={handleMorphType}
          >
            <option value='Solid'>Solid</option>
            <option value='Clear'>Clear</option>
          </select>
        </div>
      </div>
      <div className='flex flex-col py-2'>
        <label htmlFor='waterType' className='uppercase text-sm py-2'>
          Water Type?
        </label>
        <select
          name='waterType'
          id='waterType'
          className='border-2 rounded-lg p-3 border-gray-300'
          onChange={handleWaterType}
        >
          <option value='Freshwater'>Freshwater</option>
          <option value='Saltwater'>Saltwater</option>
        </select>
      </div>
    </form>
  );
};

export default AdvancedSearchBar;
