import React, { useState } from 'react';
import shrimpSearch from '../public/assets/shrimpSearch.png';
import Image from 'next/image';
import SearchBar from '../components/SearchBar';
import AdvancedSearchBar from '../components/AdvancedSearchBar';

import ShrimpItem from '../components/ShrimpItem';

import constructionShrimp from '../public/assets/constructionShrimp.png';

// import logo from '../public/assets/logo.png';

const Search = () => {
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [searchResults, setSearchResults] = useState('');

  const sendSearchResults = (result) => {
    setSearchResults(result);
  };

  if (searchResults === '') {
    return (
      <div className='flex flex-col items-center w-full justify-center max-h-full'>
        {advancedSearch === false && (
          <>
            <Image
              src={shrimpSearch}
              alt='Shrimp Search Picture'
              className='w-[40%] mt-8 mb-4 md:mt-0 '
            ></Image>
            <SearchBar sendSearchResults={sendSearchResults} />
          </>
        )}
        {advancedSearch === true && (
          <AdvancedSearchBar sendSearchResults={sendSearchResults} />
        )}
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
  }

  // if (searchResults.length === 0) {
  //   return (
  //     <div className='flex flex-col items-center justify-center w-full'>
  //       <Image
  //         src={constructionShrimp}
  //         alt='A Shrimp at a Construction Site'
  //         className='w-[50vw] h-[50vh] rounded-md'
  //       />
  //       <div>Sorry, looks like that Shrimp doesn&apos;t exist!</div>
  //     </div>
  //   );
  // }

  if (searchResults !== '') {
    return (
      <div className='grid grid-cols-1 grid-flow-row md:grid-cols-2 lg:grid-cols-3 gap-4 w-screen'>
        {searchResults.map((el, idx) => {
          return (
            <div key={idx} className='flex flex-col items-center'>
              <div className='col-span-1 mt-8'>
                <ShrimpItem data={el} />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};

export default Search;
