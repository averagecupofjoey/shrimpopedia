import React, { useState } from 'react';
import shrimpSearch from '../public/assets/shrimpSearch.png';
import Image from 'next/image';
import SearchBar from '../components/SearchBar';
import AdvancedSearchBar from '../components/AdvancedSearchBar';

import ShrimpItem from '../components/ShrimpItem';

import constructionShrimp from '../public/assets/constructionShrimp.png';
import blueBubbles from '../public/assets/blueBubbles.png';
import noResults from '../public/assets/noResults.png';

// import logo from '../public/assets/logo.png';

const Search = () => {
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [searchResults, setSearchResults] = useState('');

  const sendSearchResults = (result) => {
    setSearchResults(result);
  };

  if (searchResults === '') {
    return (
      <div className='flex items-center min-w-full'>
        <div className='flex flex-col mt-20 md:mt-0 items-center w-full md:justify-center h-full max-h-full max-w-[1500px]'>
          {advancedSearch === false && (
            <>
              <Image
                src={shrimpSearch}
                alt='Shrimp Search Picture'
                className='w-[18rem] sm:w-80 md:w-100 mt-8 mb-4 md:mt-0 '
              ></Image>
              <SearchBar sendSearchResults={sendSearchResults} />
            </>
          )}
          {advancedSearch === true && (
            <>
              <Image
                src={blueBubbles}
                alt='Shrimp Search Picture'
                className='w-[18rem] sm:w-80 md:w-40 mt-8 md:mt-0 rotate-6'
              ></Image>
              <AdvancedSearchBar sendSearchResults={sendSearchResults} />
            </>
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
    if (searchResults.length === 0) {
      return (
        <div className='flex flex-col items-center justify-center w-full'>
          <Image
            src={noResults}
            alt='Shrimp Search Picture'
            className='w-[18rem] sm:w-80 md:w-100 mt-8 mb-4 md:mt-0 rounded-md'
          ></Image>
          <div className='p-4 text-3xl subpixel-antialiased font-medium'>
            No results found
          </div>
          <button onClick={() => setSearchResults('')}>Search Again?</button>
        </div>
      );
    }
    return (
      <div className='flex flex-col'>
        <div className='flex flex-col items-center justify-center'>
          <div className='p-4 text-3xl subpixel-antialiased font-medium'>
            Your Search Results
          </div>
          <button onClick={() => setSearchResults('')}>Search Again?</button>
        </div>
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
      </div>
    );
  }
};

export default Search;
