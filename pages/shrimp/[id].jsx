import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ShrimpId = () => {
  const [shrimpData, setShrimpData] = useState(null);
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

  if (!isLoading && shrimpData === null) {
    return <div>Nah bro, no Shrimp exists</div>;
  }

  // {
  //   !shrimpData && <div>Nah bro, no Shrimp exists</div>;
  // }
  if (!isLoading && shrimpData !== null) {
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
