import React, { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import ShrimpFeedItem from '../components/ShrimpFeedItem';

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
            email: session.user.email,
          };
          const response = await fetch(`/api/usershrimp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });
          console.log('RESP:', response);
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
    return (
      <>
        <div>Success, now time to do something with this data!</div>
        <div>
          {shrimpData.map((el, idx) => {
            return <ShrimpFeedItem key={idx} info={el} />;
          })}
          {/* {shrimpData.map((el, idx) => {
            return <ShrimpFeedItem key={idx} info={el} />;
          })}
          {shrimpData.map((el, idx) => {
            return <ShrimpFeedItem key={idx} info={el} />;
          })}
          {shrimpData.map((el, idx) => {
            return <ShrimpFeedItem key={idx} info={el} />;
          })}
          {shrimpData.map((el, idx) => {
            return <ShrimpFeedItem key={idx} info={el} />;
          })} */}
        </div>
      </>
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
