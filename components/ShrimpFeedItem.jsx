import React from 'react';
import Modal from 'react-modal';

const ShrimpFeedItem = ({ info }) => {
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

  function openModal() {
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
    <div className='w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-md border-2 border-black shadow-lg shadow-black hover:scale-105 ease-in duration-300'>
      <img src={info.image} className='rounded-md' onClick={openModal} />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div className='notebookBody'>
          <h4 className='notebookH4'> {info.name}</h4>
          <div className='notebookLines'>
            <ul className='notebookList'>
              <li className='notebookli hover:notebookHover'>
                Species: {info.species}
              </li>
              <li className='notebookli hover:notebookHover'>
                Common Name: {info.name}
              </li>
              <li className='notebookli hover:notebookHover'>
                Primary Color: {info.colorOne}
              </li>
              <li className='notebookli hover:notebookHover'>
                Secondary Color: {info.colorTwo}
              </li>
              <li className='notebookli hover:notebookHover'>
                <div className='flex'>
                  <div>Primary Color: {info.colorOne}</div>
                  <div>Primary Color: {info.colorOne}</div>
                </div>
              </li>
              <li>
                <img src={info.image} className='w-[200px] h-[200px]'></img>
              </li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ShrimpFeedItem;
