import React, { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import ShrimpItem from '../components/ShrimpItem';
import Link from 'next/link';
import spinner from '../public/assets/spinner.svg';
import Image from 'next/image';

// using client side session retrieval
const Mytank = () => {
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
          setLoading(false);
          setShrimpData(json);
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
  if (session && shrimpData === null) {
    setLoggedIn(true);
    setLoading(true);
  }

  if (!isLoading && shrimpData !== null) {
    return (
      <div className='flex flex-col items-center'>
        <div>Welcome {session.user?.email}!</div>
        <div>
          Not you?{' '}
          <button type='button' onClick={() => signOut()}>
            Sign Out
          </button>
        </div>
        <div className='grid grid-cols-1 grid-flow-row md:grid-cols-2 lg:grid-cols-3 gap-4 w-screen'>
          {shrimpData.map((el, idx) => {
            let editLink = `/shrimp/edit/${el.id}`;
            return (
              <div key={idx} className='flex flex-col items-center'>
                <div className='col-span-1 mt-8'>
                  <ShrimpItem data={el} />
                </div>
                <Link href={editLink}>
                  <button className='mt-4'>Edit Shrimp Info</button>
                </Link>
              </div>
            );
          })}
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

export default Mytank;
