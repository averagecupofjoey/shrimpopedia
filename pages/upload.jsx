import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import UploadForm from '../components/UploadForm';
import SignIn from '../components/SignIn';

// using client side session retrieval
const Upload = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <h1>Loading...</h1>;
  }
  if (session) {
    return (
      <div className='max-w-[1240px] w-full h-full mx-auto p-2 flex flex-col items-center'>
        <p className='mb-2'>
          Welcome {session.user?.email}! <br />
        </p>
        {/* <p>Use the below form to upload an entry into Shrimpopedia</p> */}
        <UploadForm />
        {/* <button type='button' onClick={() => signOut()}>
          Sign out
        </button> */}
      </div>
    );
  }
  return <SignIn />;
};

export default Upload;
