import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// Import React FilePond
import { FilePond, File, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const UploadForm = () => {
  const [files, setFiles] = useState([]);
  const [sell, setSell] = useState(false);
  const [waterType, setWaterType] = useState('null');

  const handleSale = (e) => {
    setSell(e.target.value);
  };

  return (
    <form action='/' method='post' enctype='text/plain'>
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={false}
        maxFiles={1}
        server='/api'
        name='files' /* sets the file input name, it's filepond by default */
        labelIdle='Drag & Drop your picture or <span class="filepond--label-action">Browse</span>'
      />
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
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
      </div>
      {sell === true && (
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
  );
};

export default UploadForm;
