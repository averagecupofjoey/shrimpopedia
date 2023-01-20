import React, { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import ShrimpFeedItem from '../components/ShrimpFeedItem';
import ProfileShrimpItem from '../components/ProfileShrimpItem';
import Modal from 'react-modal';

// using client side session retrieval
const Mytank = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [shrimpData, setShrimpData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);
  const [modalIsOpen, setIsOpen] = React.useState(false);

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
    console.log('IN OPEN MODAL');
    setModalInfo(shrimpData[idx]);
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
            email: session.user.email,
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
    console.log(shrimpData[0]);
    return (
      <>
        <div>Success, now time to do something with this data!</div>
        <div>
          {/* {shrimpData.map((el, idx) => {
            return <ShrimpFeedItem key={idx} info={el} />;
          })} */}
          {shrimpData.map((el, idx) => {
            return (
              <div key={idx} onClick={() => openModal(idx)}>
                <ProfileShrimpItem
                  // key={idx}
                  image={el.image}
                  // onClick={() => console.log('CLICK')}
                />
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
        </div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel='Example Modal'
        >
          <div className='notebookBody'>
            <h4 className='notebookH4'> {modalInfo?.name || ''}</h4>
            <div className='notebookLines'>
              <ul className='notebookList'>
                <li className='notebookli hover:notebookHover'>
                  Species: {modalInfo?.species || ''}
                </li>
                <li className='notebookli hover:notebookHover'>
                  Common Name: {modalInfo?.name || ''}
                </li>
                <li className='notebookli hover:notebookHover'>
                  Primary Color: {modalInfo?.colorOne || ''}
                </li>
                <li className='notebookli hover:notebookHover'>
                  Secondary Color: {modalInfo?.colorTwo || ''}
                </li>
                <li className='notebookli hover:notebookHover'>
                  <div className='flex'>
                    <div>Primary Color: {modalInfo?.colorOne || ''}</div>
                    <div>Primary Color: {modalInfo?.colorOne || ''}</div>
                  </div>
                </li>
                <li>
                  <img
                    src={modalInfo?.image || ''}
                    className='w-[200px] h-[200px]'
                  ></img>
                </li>
              </ul>
            </div>
          </div>
        </Modal>
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
