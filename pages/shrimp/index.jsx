import React, { useEffect, useState } from 'react';
import prisma from '../../lib/prisma';
import { makeSerializable } from '../../lib/util';
import ShrimpItem from '../../components/ShrimpItem';
import InfiniteScroll from 'react-infinite-scroll-component';

const Shrimp = ({ feed }) => {
  const [shrimpFeed, setShrimpFeed] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  // setShrimpFeed(feed);
  // console.log(feed);

  useEffect(() => {
    const fetchShrimp = async () => {
      const response = await fetch(`/api/shrimpfeed/?pageNumber=1`);
      const json = await response.json();
      setShrimpFeed(json);
      setPageNumber(2);
    };
    fetchShrimp();
  }, []);

  const fetchData = async (pageNumber) => {
    try {
      const response = await fetch(`/api/shrimpfeed/?pageNumber=${pageNumber}`);
      const json = await response.json();

      if (json.length < 6) {
        setHasMoreItems(false);
      }

      // setShrimpFeed((prev) => [...prev, ...json[0]]);
      setShrimpFeed(shrimpFeed.concat(json));
      // setPageNumber((prev) => prev + 1);
      setPageNumber(pageNumber + 1);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className='grid grid-cols-1 grid-flow-row md:grid-cols-2 lg:grid-cols-3 gap-4 w-screen'>
      <InfiniteScroll
        // height={300}
        dataLength={shrimpFeed.length - 1}
        next={() => fetchData(pageNumber)}
        scrollableTarget='scrollableDiv'
        hasMore={hasMoreItems}
        loader={<h4 className='col-span-1 mt-8'>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {shrimpFeed.map((el, idx) => {
          return (
            <div key={idx} className='flex flex-col items-center'>
              <div className='col-span-1 mt-8'>
                <ShrimpItem data={el} />
              </div>
            </div>
          );
        })}
      </InfiniteScroll>
      {/* {feed.map((el, idx) => {
        return (
          <div key={idx} className='flex flex-col items-center'>
            <div className='col-span-1 mt-8'>
              <ShrimpItem data={el} />
            </div>
          </div>
        );
      })} */}
    </div>
  );
};

export default Shrimp;

export const getServerSideProps = async () => {
  const feed = await prisma.shrimp.findMany({
    skip: 0,
    take: 6,
  });

  return {
    props: {
      feed: makeSerializable(feed),
    },
  };
};
