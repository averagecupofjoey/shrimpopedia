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
  return (
    <form action='/' method='post' enctype='text/plain'>
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={true}
        maxFiles={3}
        server='/api'
        name='files' /* sets the file input name, it's filepond by default */
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
      <div className='grid grid-cols-2'>
        <div>
          <input type='radio' />
          <label> Freshwater</label>
        </div>
        {/* <input type='radio'>Saltwater</input> */}
        <div>
          <input type='radio'></input>
          <label> Saltwater</label>
        </div>
      </div>
      <div className='grid md:grid-cols-2 gap-4 w-full py-2'>
        <div className='flex flex-col'>
          <label className='uppercase text-sm py-2'>Name</label>
          <input
            className='border-2 rounded-lg p-3 flex border-gray-300'
            type='text'
            name='name'
          />
        </div>
        <div className='flex flex-col'>
          <label className='uppercase text-sm py-2'>Phone Number</label>
          <input
            className='border-2 rounded-lg p-3 flex border-gray-300'
            type='text'
            name='phone'
          />
        </div>
      </div>
      <div className='flex flex-col py-2'>
        <label className='uppercase text-sm py-2'>Email</label>
        <input
          className='border-2 rounded-lg p-3 flex border-gray-300'
          type='email'
          name='email'
        />
      </div>
      <div className='flex flex-col py-2'>
        <label className='uppercase text-sm py-2'>Subject</label>
        <input
          className='border-2 rounded-lg p-3 flex border-gray-300'
          type='text'
          // name='subject'
          onChange={(e) => {
            updateSubject(
              `mailto:jrelias@outlook.com?subject=` + e.target.value
            );
          }}
        />
      </div>
      <div className='flex flex-col py-2'>
        <label className='uppercase text-sm py-2'>Message</label>
        <textarea
          className='border-2 rounded-lg p-3 border-gray-300'
          rows='10'
          name='message'
        ></textarea>
      </div>
      <button className='w-full p-4 mt-4 text-gray-100'>Send Message</button>
    </form>
  );
};

export default UploadForm;
