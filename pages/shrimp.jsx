import React from 'react';
// import { GetServerSideProps } from 'next';
import prisma from '../lib/prisma';
import { makeSerializable } from '../lib/util';
import ShrimpFeedItem from '../components/ShrimpFeedItem';

const shrimp = ({ feed }) => {
  // console.log(props.feed);
  return (
    <div className='flex grid justify-center items-center w-full md:grid-cols-2'>
      <div>Hi this is a div thing</div>
      {feed.map((el, idx) => {
        return <ShrimpFeedItem key={idx} info={el} />;
      })}
    </div>
  );
};

export default shrimp;

export const getServerSideProps = async () => {
  const feed = await prisma.shrimp.findMany();

  return {
    props: {
      feed: makeSerializable(feed),
    },
  };
};
