import Head from 'next/head';
import Image from 'next/image';
// import { Inter } from '@next/font/google';
import Landing from '../components/Landing';

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div>
      <Head>
        <title>Shrimpopedia</title>
        <meta
          name='description'
          content='A user contributed encyclopedia of aquarium shrimp morphs'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Landing />
    </div>
  );
}
