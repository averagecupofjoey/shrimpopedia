import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Script from 'next/script';
import Resizer from 'react-image-file-resizer';
// Import doka
import { create } from '../react-doka/lib/doka.esm.min';

// Import React FilePond
import { FilePond, File, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
// Import the plugin code
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginImageCrop,
  FilePondPluginImageEdit,
  FilePondPluginImageResize,
  FilePondPluginImageTransform
);

const UploadForm = () => {
  const [files, setFiles] = useState([]);
  const [sell, setSell] = useState('No');
  const [waterType, setWaterType] = useState('null');
  const [imagePreview, setImagePreview] = useState('');

  const handleSale = (e) => {
    e.preventDefault();
    setSell(e.target.value);
  };

  const updateImagePreview = async (e) => {
    // console.log('image changed');
    // console.log('****', URL.createObjectURL(e.target.files[0]));
    const file = e.target.files[0];
    const image = await resizeFile(file);
    console.log('****', image);
    // setImagePreview(URL.createObjectURL(image));
    setImagePreview(image);
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        'JPEG',
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        'base64'
      );
    });

  return (
    <>
      <Script src='../node_modules/cropperjs/dist/cropper' />

      <form action='/' method='post' enctype='text/plain'>
        <div className='fileInput flex flex-col items-center'>
          <label for='image_uploads'>Choose image to upload (PNG, JPG)</label>
          <input
            type='file'
            id='image_upload'
            name='image_upload'
            accept='.jpg, .jpeg, .png'
            multiple={false}
            onChange={updateImagePreview}
          />
        </div>
        <div className='previewContainer'>
          <div>
            <img src={imagePreview} id='image'></img>
          </div>
          <img src='' id='output'></img>
        </div>
        <div className='grid md:grid-cols-2 gap-4 w-full py-2'>
          <div className='flex flex-col'>
            <label className='uppercase text-sm py-2'>Scientific Name</label>
            <input
              className='border-2 rounded-lg p-3 flex border-gray-300'
              type='text'
              name='species'
              placeholder='e.g: Neocaridina'
            />
          </div>
          <div className='flex flex-col'>
            <label className='uppercase text-sm py-2'>Common Name</label>
            <input
              className='border-2 rounded-lg p-3 flex border-gray-300'
              type='text'
              name='name'
              placeholder='e.g: Cherry Shrimp'
            />
          </div>
        </div>
        <div className='grid md:grid-cols-3 gap-4 w-full py-2'>
          <div className='flex flex-col'>
            <label className='uppercase text-sm py-2'>Primary Color</label>
            <select className='border-2 rounded-lg p-3 border-gray-300'>
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
            <label className='uppercase text-sm py-2'>Secondary Color</label>
            <select className='border-2 rounded-lg p-3 border-gray-300'>
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
            <label className='uppercase text-sm py-2'>Morph Type</label>
            <select className='border-2 rounded-lg p-3 border-gray-300'>
              <option value='Solid'>Solid</option>
              <option value='Clear'>Clear</option>
            </select>
          </div>
        </div>
        <div className='flex flex-col py-2'>
          <label className='uppercase text-sm py-2'>Water Type?</label>
          <select className='border-2 rounded-lg p-3 border-gray-300'>
            <option value='Freshwater'>Freshwater</option>
            <option value='Saltwater'>Saltwater</option>
          </select>
        </div>
        <div className='flex flex-col py-2'>
          <label className='uppercase text-sm py-2'>Notes</label>
          <textarea
            className='border-2 rounded-lg p-3 border-gray-300'
            rows='5'
            name='notes'
            placeholder='Add any interesting notes that you want to about this species here!'
          ></textarea>
        </div>
        <div className='flex flex-col py-2'>
          <label className='uppercase text-sm py-2'>For Sale?</label>
          <select
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
            <label className='uppercase text-sm py-2'>Sale Info</label>
            <textarea
              className='border-2 rounded-lg p-3 border-gray-300'
              rows='5'
              name='notes'
              placeholder='Add your sale inquery contact information'
            ></textarea>
          </div>
        )}
        <button className='w-full p-4 mt-4 text-gray-100'>Send Message</button>
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
