import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Script from 'next/script';
import Resizer from 'react-image-file-resizer';
import Cropper from 'react-cropper';
import Modal from 'react-modal';
import Router from 'next/router';

import '../node_modules/cropperjs/dist/cropper.min.css';

const UploadForm = () => {
  const [files, setFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState('');
  // const [modalOpen, setModalOpen] = useState('No');
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [fileType, setFileType] = useState('');

  const [cropData, setCropData] = useState('#');
  const [cropper, setCropper] = useState();

  //Form fields
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
  const [gender, setGender] = useState('Female');

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

  const updateImagePreview = async (e) => {
    let file = e.target.files[0];
    console.log('ORIGINAL FILE', file);

    file = await resizeFile(file);
    console.log('NEW FILE', file);
    // const image = await resizeFile(file);
    // console.log('HERE IS THE ORIGINAL FILE', file);

    // setImagePreview(URL.createObjectURL(e.target.files[0]));
    setImagePreview(URL.createObjectURL(file));

    // console.log('%%%%%', URL.createObjectURL(e.target.files[0]));
    // console.log('HERE IS THE UPDATED FILE', image);
    // setImagePreview(image);
    setFileType(file.type);
    // console.log('?????', file.type);
    // setFileType(image.type);
    openModal();
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        500,
        500,
        'JPEG',
        70,
        0,
        (uri) => {
          resolve(uri);
        },
        'file',
        325,
        325
      );
    });

  // const openModal = () => {
  //   setModalOpen('true');
  // };

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
    getCroppedPhoto();
    setIsOpen(false);
  }

  // useEffect(() => {
  //   if (cropper) cropper.setDragMode('move');
  // }, [cropper]);

  function getCroppedPhoto() {
    //Below is functionality to check if photo is greater than 1mb, but I have decided to automatically reduce file sizes regardless of initial upload size to save space in the database

    let newPhoto = cropper.getCroppedCanvas().toDataURL('image/jpeg');

    //calculate size of newPhoto https://stackoverflow.com/questions/18557497/how-to-get-html5-canvas-todataurl-file-size-in-javascript
    // let head = 'data:image/jpeg;base64,';
    // let imageSize = Math.round(((newPhoto.length - head.length) * 3) / 4);

    // if size is greater than 1,000,000 bytes - run resize at 50 quality
    // if (imageSize > 1000000) {
    //   console.log('original', newPhoto);
    //   let fileToResize = cropper.getCroppedCanvas();
    //   let resizedPhoto = resizeFile(fileToResize);
    //   newPhoto = resizedPhoto.toDataURL('image/jpeg');
    //   console.log('resized', newPhoto);
    // }
    // let croppedPhoto = cropper.getCroppedCanvas();
    // let resizedPhoto = resizeFile(croppedPhoto);
    // // let newPhoto = resizeFile(cropper.getCroppedCanvas());

    // let newPhoto = resizedPhoto.toDataURL('image/jpeg');
    console.log('resized photo', newPhoto);

    setPhoto(newPhoto);
  }

  const submitData = async (e) => {
    e.preventDefault();
    try {
      const body = {
        name,
        species,
        waterType,
        photo,
        notes,
        sell,
        saleInfo,
        colorOne,
        colorTwo,
        morphType,
        gender,
      };
      await fetch(`/api/shrimp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/shrimp');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* <Script src='../node_modules/cropperjs/dist/cropper.js' /> */}
      {/* <button onClick={() => setModalOpen('Yes')}>Show modal</button>
      {modalOpen === 'Yes' && (
        <div className='w-full h-full bg-pink-300 flex'>
          <button onClick={setModalOpen('No')}>Send this away</button>
        </div>
      )} */}

      {/* <button onClick={openModal}>Open Modal</button> */}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <h1 className='text-center'>Crop Image Display</h1>
        <br></br>
        <Cropper
          // className='max-h-[10%] max-w-full'
          style={{ height: 400, width: '100%' }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview='.img-preview'
          src={imagePreview}
          viewMode={1}
          minCropBoxHeight={100}
          minCropBoxWidth={100}
          maxCropBoxHeight={100}
          maxCropBoxWidth={100}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          guides={true}
          cropBoxResizable={false}
          movable={true}
          toggleDragModeOnDblclick={false}
          dragMode='move'
        />
        {/* <img src={imagePreview}></img> */}
        <br></br>
        <button onClick={closeModal}>Use this image</button>
      </Modal>

      <form
        onSubmit={submitData}
        encType='text/plain'
        className='max-w-full flex flex-col items-center'
      >
        <div className='fileInput flex flex-col items-center justify-center'>
          <label htmlFor='image_upload'>
            Choose image to upload (PNG, JPG)
          </label>
          <input
            className='w-auto my-2'
            type='file'
            id='image_upload'
            name='image_upload'
            accept='.jpg, .jpeg, .png'
            multiple={false}
            onChange={updateImagePreview}
            // onChange={openModal}
          />
        </div>
        {photo !== null && (
          <>
            <div className='previewContainer max-w-[400px] max-h-[400px] flex items-center justify-center'>
              {/* <div>
            <img src={imagePreview} id='image'></img>
          </div> */}
              <img
                src={photo}
                id='output'
                className='h-full w-full'
                alt='shrimp pic'
              ></img>
            </div>
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
                  maxLength='25'
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
                  maxLength='20'
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
            <div className='grid md:grid-cols-2 gap-4 w-full py-2'>
              <div className='flex flex-col py-2'>
                <label htmlFor='Gender' className='uppercase text-sm py-2'>
                  Gender
                </label>
                <select
                  name='gender'
                  id='gender'
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
                  className='border-2 rounded-lg p-3 border-gray-300'
                  onChange={handleWaterType}
                >
                  <option value='Freshwater'>Freshwater</option>
                  <option value='Saltwater'>Saltwater</option>
                </select>
              </div>
            </div>
            <div className='flex flex-col py-2 min-w-full'>
              <label htmlFor='notes' className='uppercase text-sm py-2'>
                Notes
              </label>
              <textarea
                className='border-2 rounded-lg p-3 border-gray-300'
                rows='5'
                name='notes'
                id='notes'
                placeholder='Add any interesting notes that you want to about this species here!'
                onChange={handleNotes}
                maxLength='200'
              ></textarea>
            </div>
            <div className='flex flex-col py-2 min-w-full'>
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
              <div className='flex flex-col py-2 min-w-full'>
                <label htmlFor='saleInfo' className='uppercase text-sm py-2'>
                  Sale Info
                </label>
                <textarea
                  className='border-2 rounded-lg p-3 border-gray-300'
                  rows='5'
                  name='saleInfo'
                  placeholder='Add your sale inquery contact information'
                  onChange={handleSaleInfo}
                  maxLength='100'
                ></textarea>
              </div>
            )}
            <button
              className='w-full p-4 mt-4 text-gray-100 bg-slate-500 hover:text-gray-800'
              // disabled={!photo || !species || !name}
              // disabled={true}
              type='submit'
            >
              Add to Shrimpopedia!
            </button>
          </>
        )}
      </form>
    </>
  );
};

export default UploadForm;

//  <FilePond
//    files={files}
//    // onupdatefiles={setFiles}
//    allowMultiple={false}
//    maxFiles={1}
//    // server='/api'
//    name='files' /* sets the file input name, it's filepond by default */
//    labelIdle='Drag & Drop your picture or <span class="filepond--label-action">Browse</span>'
//    storeAsFile={true}
//    // instantUpload={false}
//    allowFileTypeValidation={true}
//    acceptedFileTypes={['image/png', 'image/jpeg', 'image/jpg']}
//    labelFileTypeNotAllowed='Only .png, .jpg, or .jpeg file types are allowed'
//    allowImageCrop={true}
//    imageCropAspectRatio='1:1'
//    styleItemPanelAspectRatio={0.5625}
//    imageEditEditor={create({
//      cropAspectRatioOptions: [
//        {
//          label: 'Free',
//          value: null,
//        },
//        {
//          label: 'Portrait',
//          value: 1.25,
//        },
//        {
//          label: 'Square',
//          value: 1,
//        },
//        {
//          label: 'Landscape',
//          value: 0.75,
//        },
//      ],
//    })}
//    onupdatefiles={(fileItem) => {
//      setFiles(fileItem);
//      // setFiles({
//      //   files: fileItems.map((fileItem) => fileItem.file),
//      // });
//    }}
//  />;
