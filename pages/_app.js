import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { SessionProvider } from 'next-auth/react';
import '../node_modules/cropperjs/dist/cropper.min.css';

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className='flex flex-col h-screen'>
        <Navbar />
        <div className='flex flex-1 overflow-auto'>
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  );
}
