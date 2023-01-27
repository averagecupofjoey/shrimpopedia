import React, { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

// using client side session retrieval
const Edit = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [shrimpData, setShrimpData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        try {
          const body = {
            id: session.user.id,
          };
          const response = await fetch(`/api/usershrimp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });
          // console.log('RESP:', response);
          const json = await response.json();
          setShrimpData(json);
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
    return (
      <div className='flex flex-col items-center justify-start'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={shrimpData[0].image} className='w-[200px] h-[200px]'></img>
        <Image src={shrimpData.image} alt='Shrimp Image'></Image>
        {shrimpData.name}
        Hi is this working
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
