import Head from 'next/head';
import Image from 'next/image';
// import { Inter } from '@next/font/google';
import Landing from '../components/Landing';

// const inter = Inter({ subsets: ['latin'] });
import shrimpBook from '../public/assets/shrimpBook.png';

export default function Home() {
  return (
    <div className='flex items-center justify-center  w-full p-2 font-gloria-hallelujah'>
      <Head>
        <title>Shrimpopedia</title>
        <meta
          name='description'
          content='A user contributed encyclopedia of aquarium shrimp morphs'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className=' border-blue-50 h-full w-[90vh] bg-[#f5f5f5] '>
        <div className='flex flex-col items-center  h-full'>
          <div className='mt-8 text-4xl font-extrabold'>Shrimpopedia</div>
          <div className='mt-6 sm:text-xl'>Or, a</div>
          <div className='mt-4 text-bold uppercase sm:text-xl'>
            User-contributed dictionary
          </div>
          <div>&</div>
          <div className='text-bold uppercase sm:text-xl'>
            Online Marketplace
          </div>
          <div className='mt-2'>for aquarium shrimp </div>
          <div className='flex flex-1 flex-col justify-center items-center'>
            <Image
              className='w-[70%] max-w-[425px] rounded-md pt-2'
              src={shrimpBook}
              alt='shrimp book picture'
            />
            <div className='mt-2 uppercase'>Vol. 1</div>
          </div>
        </div>
      </div>
    </div>
  );
}
