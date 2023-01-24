import React, { useState } from 'react';
import shrimpSearch from '../public/assets/shrimpSearch.png';
import Image from 'next/image';
import SearchBar from '../components/SearchBar';
import AdvancedSearchBar from '../components/AdvancedSearchBar';

// import logo from '../public/assets/logo.png';

const Search = () => {
  const [advancedSearch, setAdvancedSearch] = useState(false);

  return (
    <div className='flex flex-col items-center w-full justify-center max-h-full'>
      {advancedSearch === false && (
        <>
          <Image
            src={shrimpSearch}
            alt='Shrimp Search Picture'
            className='w-[40%] mt-8 mb-4 md:mt-0 '
          ></Image>
          <SearchBar />
        </>
      )}
      {advancedSearch === true && <AdvancedSearchBar />}
      <div
        className='text-blue-600 underline hover:cursor-pointer'
        onClick={() => {
          setAdvancedSearch(!advancedSearch);
        }}
      >
        {advancedSearch === true && <>Basic</>}
        {advancedSearch === false && <>Advanced</>}
      </div>
    </div>
  );
};

export default Search;
