import React, { useState } from 'react';
import prisma from '../../lib/prisma';
import { makeSerializable } from '../../lib/util';
import ShrimpItem from '../../components/ShrimpItem';
import Modal from 'react-modal';

const Shrimp = ({ feed }) => {
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
    setModalInfo(feed[idx]);
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
  return (
    <div className='grid grid-cols-1 grid-flow-row md:grid-cols-2 lg:grid-cols-3 gap-4 w-screen'>
      {feed.map((el, idx) => {
        return (
          <div key={idx} className='flex flex-col items-center'>
            <div onClick={() => openModal(idx)} className='col-span-1 mt-8'>
              <ShrimpItem image={el.image} />
            </div>
          </div>
        );
      })}
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
    </div>
  );
};

export default Shrimp;

export const getServerSideProps = async () => {
  const feed = await prisma.shrimp.findMany();

  return {
    props: {
      feed: makeSerializable(feed),
    },
  };
};
