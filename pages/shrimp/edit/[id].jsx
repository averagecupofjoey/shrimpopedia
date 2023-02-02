import React, { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

// using client side session retrieval
const Edit = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [shrimpData, setShrimpData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [shrimpId, setShrimpId] = useState('');

  // getting id from page
  const router = useRouter();
  const { id } = router.query;

  //Form fields
  const [species, setSpecies] = useState(shrimpData?.species || '');
  const [name, setName] = useState(shrimpData?.name || '');
  const [colorOne, setColorOne] = useState(shrimpData?.colorOne || '');
  const [colorTwo, setColorTwo] = useState(shrimpData?.colorTwo || '');
  const [morphType, setMorphType] = useState(shrimpData?.morphType || '');
  const [waterType, setWaterType] = useState(shrimpData?.waterType || '');
  const [notes, setNotes] = useState(shrimpData?.notes || '');
  const [sell, setSell] = useState(shrimpData?.sale || '');
  const [saleInfo, setSaleInfo] = useState(shrimpData?.saleInfo || '');
  const [gender, setGender] = useState(shrimpData?.gender || '');

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

  const handleGender = (e) => {
    e.preventDefault();
    setGender(e.target.value);
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

  const { data: session, status } = useSession();

  const submitData = async (e) => {
    e.preventDefault();
    try {
      const body = {
        shrimpId,
        name,
        species,
        waterType,
        notes,
        sell,
        saleInfo,
        colorOne,
        colorTwo,
        morphType,
        gender,
      };
      await fetch(`/api/usershrimp/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          userid: `${session.user.id}`,
        },
        body: JSON.stringify(body),
      });
      await router.push(`/shrimp/${shrimpData.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      // console.log('DATA IS THIS', session);
      const fetchData = async () => {
        try {
          // const body = {
          //   id: session.user.id,
          // };
          const response = await fetch(`/api/usershrimp/${id}`, {
            // method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              userid: `${session.user.id}`,
            },
            // body: JSON.stringify(body),
          });
          // console.log('RESP:', response);
          const json = await response.json();
          setShrimpId(json[0].id);
          setSpecies(json[0].species);
          setName(json[0].name);
          setColorOne(json[0].colorOne);
          setColorTwo(json[0].colorTwo);
          setMorphType(json[0].morphType);
          setGender(json[0].gender);
          setWaterType(json[0].waterType);
          setNotes(json[0].notes);
          setSell(json[0].sale);
          setSaleInfo(json[0].saleInfo);
          setShrimpData(json[0]);
          setLoading(false);
          // console.log(json);

          // console.log(await response.json());
          // const res = await response.json();
          // setShrimpData(res);
          // setLoading(false);
        } catch (error) {
          console.log('error', error);
        }
      };
      fetchData();
    }
  }, [isLoggedIn]);

  if (status === 'loading' || isLoading) {
    return <h1>Loading...</h1>;
  }
  if (session && shrimpData === null) {
    setLoggedIn(true);
    setLoading(true);
  }

  if (!isLoading && shrimpData !== null) {
    console.log(shrimpData);
    console.log('ID IS *****', id);
    return (
      <div className='flex flex-col items-center justify-start w-full pt-3 pb-3'>
        <div className='p-3 border-black border-2 rounded-md items-center flex flex-col mb-10 bg-amber-100'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={shrimpData.image}
            className='w-[200px] h-[200px] mt-2'
          ></img>
          <form onSubmit={submitData} encType='text/plain'>
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
                  value={species}
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
                  value={name}
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
                  value={colorOne}
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
                  value={colorTwo}
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
                  value={morphType}
                  className='border-2 rounded-lg p-3 border-gray-300'
                  onChange={handleMorphType}
                >
                  <option value='Solid'>Solid</option>
                  <option value='Clear'>Clear</option>
                </select>
              </div>
            </div>
            <div className='grid md:grid-cols-2 gap-4 w-full py-2'>
              <div className='flex flex-col py-2'>
                <label htmlFor='Gender' className='uppercase text-sm py-2'>
                  Gender
                </label>
                <select
                  name='gender'
                  id='gender'
                  value={gender}
                  className='border-2 rounded-lg p-3 border-gray-300'
                  onChange={handleGender}
                >
                  <option value='Female'>Female</option>
                  <option value='Male'>Male</option>
                  <option value='Multi'>Multiple Shown</option>
                  <option value='Unknown'>Unknown</option>
                </select>
              </div>
              <div className='flex flex-col py-2'>
                <label htmlFor='waterType' className='uppercase text-sm py-2'>
                  Water Type
                </label>
                <select
                  name='waterType'
                  id='waterType'
                  value={waterType}
                  className='border-2 rounded-lg p-3 border-gray-300'
                  onChange={handleWaterType}
                >
                  <option value='Freshwater'>Freshwater</option>
                  <option value='Saltwater'>Saltwater</option>
                </select>
              </div>
            </div>
            <div className='flex flex-col py-2'>
              <label htmlFor='notes' className='uppercase text-sm py-2'>
                Notes
              </label>
              <textarea
                className='border-2 rounded-lg p-3 border-gray-300'
                rows='5'
                name='notes'
                id='notes'
                value={notes}
                placeholder='Add any interesting notes that you want to about this species here!'
                onChange={handleNotes}
              ></textarea>
            </div>
            <div className='flex flex-col py-2'>
              <label htmlFor='forSale' className='uppercase text-sm py-2'>
                For Sale?
              </label>
              <select
                name='forSale'
                value={sell}
                onChange={handleSale}
                className='border-2 rounded-lg p-3 border-gray-300'
              >
                <option value='No'>No</option>
                <option value='Yes'>Yes</option>
              </select>
            </div>
            {sell === 'Yes' && (
              <div className='flex flex-col py-2'>
                <label htmlFor='saleInfo' className='uppercase text-sm py-2'>
                  Sale Info
                </label>
                <textarea
                  className='border-2 rounded-lg p-3 border-gray-300'
                  rows='5'
                  name='saleInfo'
                  value={saleInfo}
                  placeholder='Add your sale inquery contact information'
                  onChange={handleSaleInfo}
                ></textarea>
              </div>
            )}
            <button
              className='w-full p-4 mt-4 text-gray-100 bg-slate-500 hover:text-gray-800'
              // disabled={!photo || !species || !name}
              // disabled={true}
              type='submit'
            >
              Update Your Shrimp!
            </button>
          </form>
        </div>
      </div>
    );
  }
  return (
    <div className='py-20'>
      Not signed in <br />
      <button type='button' onClick={() => signIn()}>
        Sign in
      </button>
    </div>
  );
};

export default Edit;
