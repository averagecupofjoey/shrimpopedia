import { signIn } from 'next-auth/react';
import loginShrimp from '../public/assets/loginShrimp.png';
import Image from 'next/image';

const SignIn = () => {
  return (
    <div className='min-w-[100vw] flex flex-grow flex-col items-center justify-center'>
      <div className='flex flex-col items-center'>
        <Image className='max-w-[50%]' src={loginShrimp} alt='login shrimp' />
        Not signed in
        <button type='button' onClick={() => signIn()}>
          Sign in
        </button>
      </div>
    </div>
  );
};

export default SignIn;
