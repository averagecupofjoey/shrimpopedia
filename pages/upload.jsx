import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import UploadForm from '../components/UploadForm';

// using client side session retrieval
const Upload = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <h1>Loading...</h1>;
  }
  if (session) {
    return (
      <div className='max-w-[1240px] w-full h-full mx-auto p-2 flex flex-col items-center bg-slate-500'>
        Welcome {session.user?.email}! <br />
        <p>Use the below form to upload an entry into Shrimpopedia</p>
        <UploadForm />
        <button type='button' onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className='py-20'>
      Not signed in <br />
      <button type='button' onClick={() => signIn()}>
        Sign in
      </button>
    </div>
  );
};

export default Upload;
