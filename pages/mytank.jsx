import React, { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import ShrimpFeedItem from '../components/ShrimpFeedItem';
import ShrimpItem from '../components/ShrimpItem';
import Modal from 'react-modal';
import Link from 'next/link';
import HalfGap from '../components/pageLines/HalfGap';
import FullLine from '../components/pageLines/FullLine';

// using client side session retrieval
const Mytank = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [shrimpData, setShrimpData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [fullPageLink, setFullPageLink] = useState('');

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
  // Modal.setAppElement('#yourAppElement');

  function openModal(idx) {
    setModalInfo(shrimpData[idx]);
    setFullPageLink(`/shrimp/${shrimpData[idx].id}`);
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
    //we put the image here?
  }

  function closeModal() {
    setIsOpen(false);
  }

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
    return <h1>Loading...</h1>;
  }
  if (session && shrimpData === null) {
    console.log(session);
    setLoggedIn(true);
    setLoading(true);
  }

  if (!isLoading && shrimpData !== null) {
    // console.log(shrimpData[0]);
    return (
      <div className='grid grid-cols-1 grid-flow-row md:grid-cols-2 lg:grid-cols-3 gap-4 w-screen'>
        {/* <div>Success, now time to do something with this data!</div> */}
        {/* <div> */}
        {/* {shrimpData.map((el, idx) => {
            return <ShrimpFeedItem key={idx} info={el} />;
          })} */}
        {shrimpData.map((el, idx) => {
          let editLink = `/shrimp/edit/${el.id}`;
          return (
            <div key={idx} className='flex flex-col items-center'>
              <div onClick={() => openModal(idx)} className='col-span-1 mt-8'>
                <ShrimpItem
                  image={el.image}
                  name={el.name}
                  species={el.species}
                />
              </div>
              <Link href={editLink}>
                <button className='mt-4'>Edit Shrimp Info</button>
              </Link>
            </div>
          );
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
        {/* </div> */}
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          // style={customStyles}
          contentLabel='Example Modal'
        >
          <div style={{ height: '100%' }}></div>
          {/* <div style={{ height: '450px' }}>
            <div className='flex items-center justify-center  w-full pt-2 pb-2'>
              <div className='border-2 border-blue-50 w-[90vh] bg-[#f5f5f5] grid grid-cols-14 grid-rows-24 grid-flow-col '>
                <div className='col-span-2 row-span-24 border-r-4 border-red-600 grid grid-rows-24'>
                  <div className='row-span-2 border-b-2 border-blue-500'></div>
                  {[...Array(22)].map((x, i) => (
                    <div
                      className='row-span-1 border-b-2 border-blue-500'
                      key={i}
                    ></div>
                  ))}
                </div>
                <div className='row-span-2 col-span-12 border-b-2 border-blue-500 flex items-end justify-center'>
                  <span className='text-3xl subpixel-antialiased font-medium'>
                    {modalInfo?.name || ''} -
                  </span>
                  <span className='antialiased text-lg italic'>
                    {modalInfo?.species || ''}
                  </span>

                  <a href={fullPageLink}>
                    <button>Go to full page</button>
                  </a>
                </div>
                <HalfGap
                  label='Water Type'
                  value={modalInfo?.waterType || ''}
                />
                <HalfGap />
                <HalfGap
                  label='Primary Color'
                  value={modalInfo?.colorOne || ''}
                />
                <HalfGap />
                <HalfGap
                  label='Secondary Color'
                  value={modalInfo?.colorTwo || ''}
                />
                <HalfGap />
                <HalfGap
                  label='Morph Type'
                  value={modalInfo?.morphType || ''}
                />

                <HalfGap />
                <FullLine label='Notes' value='Pokem ipsum d.' />
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

                  <img
                    className='max-h-full max-w-full'
                    src={modalInfo?.image || ''}
                    alt='Shrimp Image'
                    style={{ width: '100%', objectFit: 'contain' }}
                  ></img>

                </div>
                <HalfGap label='Gender' value={modalInfo?.morphType || ''} />
                <HalfGap />
              </div>
            </div>
          </div> */}
        </Modal>
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
