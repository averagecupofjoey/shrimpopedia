import React, { useState, useEffect } from 'react';

const AdvancedSearchBar = ({ sendSearchResults }) => {
  const [species, setSpecies] = useState('');
  const [name, setName] = useState('');
  const [colorOne, setColorOne] = useState('');
  const [colorTwo, setColorTwo] = useState('');
  const [morphType, setMorphType] = useState('');
  const [waterType, setWaterType] = useState('');
  const [sell, setSell] = useState('');

  const [shrimpData, setShrimpData] = useState('');

  useEffect(() => {
    if (shrimpData !== '') {
      console.log('IN USE EFFECT');
      sendSearchResults(shrimpData);
    }
  }, [shrimpData, sendSearchResults]);

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

  const handleSale = (e) => {
    e.preventDefault();
    setSell(e.target.value);
  };

  // API Query
  const fetchData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/shrimp?species=${species}&name=${name}&colorOne=${colorOne}&colorTwo=${colorTwo}&morphType=${morphType}&waterType=${waterType}&forSale=${sell}`
      );
      // console.log('RESP:', response);
      const json = await response.json();
      setShrimpData(json);
      setLoading(false);

      sendSearchResults(shrimpData);
      // console.log(json);

      // console.log(await response.json());
      // const res = await response.json();
      // setShrimpData(res);
      // setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <form className='bg-gray-200 rounded-md p-4' onSubmit={fetchData}>
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
            value={species}
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
            value={name}
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
            value={colorOne}
          >
            <option value=''>-</option>
            <option value='Red'>Red</option>
            <option value='Orange'>Orange</option>
            <option value='Yellow'>Yellow</option>
            <option value='Blue'>Blue</option>
            <option value='Green'>Green</option>
            <option value='Black'>Black</option>
            <option value='White'>White</option>
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
            value={colorTwo}
          >
            <option value=''>-</option>
            <option value='Red'>Red</option>
            <option value='Orange'>Orange</option>
            <option value='Yellow'>Yellow</option>
            <option value='Blue'>Blue</option>
            <option value='Green'>Green</option>
            <option value='Black'>Black</option>
            <option value='White'>White</option>
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
            value={morphType}
          >
            <option value=''>-</option>
            <option value='Solid'>Solid</option>
            <option value='Clear'>Clear</option>
          </select>
        </div>
      </div>
      <div className='flex flex-col py-2'>
        <label htmlFor='waterType' className='uppercase text-sm py-2'>
          Water Type
        </label>
        <select
          name='waterType'
          id='waterType'
          className='border-2 rounded-lg p-3 border-gray-300'
          onChange={handleWaterType}
          value={waterType}
        >
          <option value=''>-</option>
          <option value='Freshwater'>Freshwater</option>
          <option value='Saltwater'>Saltwater</option>
        </select>
      </div>
      <div className='flex flex-col py-2'>
        <label htmlFor='forSale' className='uppercase text-sm py-2'>
          For Sale
        </label>
        <select
          name='forSale'
          value={sell}
          onChange={handleSale}
          className='border-2 rounded-lg p-3 border-gray-300'
        >
          <option value=''>-</option>
          <option value='No'>No</option>
          <option value='Yes'>Yes</option>
        </select>
      </div>
      <div className='flex justify-center items-center'>
        <button
          className=' text-gray-100 bg-slate-500 hover:text-gray-800'
          type='submit'
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default AdvancedSearchBar;
