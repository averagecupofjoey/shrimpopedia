import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import constructionShrimp from '../../public/assets/constructionShrimp.png';
import Image from 'next/image';

const ShrimpId = () => {
  const [shrimpData, setShrimpData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setLoading(true);
    fetch(`/api/shrimp/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setShrimpData(data);
        setLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <div>Hey we are loading your data</div>;
  }

  if (!isLoading && shrimpData.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center w-full'>
        <Image
          src={constructionShrimp}
          alt='A Shrimp at a Construction Site'
          className='w-[50vw] h-[50vh] rounded-md'
        />
        <div>Sorry, looks like that Shrimp doesn&apos;t exist!</div>
      </div>
    );
  }

  // {
  //   !shrimpData && <div>Nah bro, no Shrimp exists</div>;
  // }
  if (!isLoading && shrimpData.length > 0) {
    console.log('HERE', shrimpData);
    return (
      <div>
        Heyyyy you found the shrimp page for {id}, and you got the shrimpData
        {/* <img src={shrimpData.image}></img>
         */}
        {shrimpData[0].name}
      </div>
    );
  }
};

export default ShrimpId;
