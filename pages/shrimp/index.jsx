import React, { useState } from 'react';
import prisma from '../../lib/prisma';
import { makeSerializable } from '../../lib/util';
import ShrimpItem from '../../components/ShrimpItem';

const Shrimp = ({ feed }) => {
  return (
    <div className='grid grid-cols-1 grid-flow-row md:grid-cols-2 lg:grid-cols-3 gap-4 w-screen'>
      {feed.map((el, idx) => {
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
};

export default Shrimp;

export const getServerSideProps = async () => {
  const feed = await prisma.shrimp.findMany();

  return {
    props: {
      feed: makeSerializable(feed),
    },
  };
};
