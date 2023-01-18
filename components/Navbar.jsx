import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineClose, AiOutlineMenu, AiOutlineMail } from 'react-icons/ai';
// import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { useRouter } from 'next/router';
// import { CgFileDocument } from 'react-icons/cg';
import navImg from '../public/assets/logo.png';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [navBg, setNavBg] = useState('#ecf0f3');
  const [linkColor, setLinkColor] = useState('#1f2937');
  const [scrollPadding, setScrollPadding] = useState(0);

  const router = useRouter();

  const navRef = useRef(null);

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener('scroll', handleShadow);
  }, [navBg]);

  return (
    <div
      ref={navRef}
      style={{ backgroundColor: `${navBg}` }}
      className={
        shadow ? 'w-full h-20 shadow-xl z-[100]' : ' w-full h-20 z-[100]'
      }
    >
      <div className='flex justify-between items-center w-full h-full px-2 2xl:px-16'>
        <Link href='/'>
          <Image src={navImg} alt='/' width='75' height='50' />
        </Link>
        <div>
          <ul style={{ color: `${linkColor}` }} className='hidden md:flex'>
            <Link href='/'>
              <li className='ml-10 text-sm uppercase hover:border-b'>Home</li>
            </Link>
            <Link href='/shrimp'>
              <li className='ml-10 text-sm uppercase hover:border-b'>Shrimp</li>
            </Link>
            <Link href='/#skills'>
              <li className='ml-10 text-sm uppercase hover:border-b'>Search</li>
            </Link>
            <Link href='/upload'>
              <li className='ml-10 text-sm uppercase hover:border-b'>Upload</li>
            </Link>
            <Link href='/#contact'>
              <li className='ml-10 text-sm uppercase hover:border-b'>
                Resources
              </li>
            </Link>
            <Link href='/#contact'>
              <li className='ml-10 text-sm uppercase hover:border-b'>
                My Tank
              </li>
            </Link>
          </ul>
          <div
            onClick={handleNav}
            style={{ color: `${linkColor}` }}
            className='md:hidden'
          >
            <AiOutlineMenu size={25} />
          </div>
        </div>
      </div>
      <div
        className={
          nav ? 'md:hidden fixed left-0 top-0 w-full h-screen bg-black/70' : ''
        }
      >
        <div
          className={
            nav
              ? 'fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-badgebase p-10 ease-in duration-500'
              : 'fixed left-[-100%] top-0 p-10 ease-in duration-500'
          }
        >
          <div>
            <div className='flex w-full items-center justify-between'>
              <Link href='/'>
                <Image
                  src={'/assets/logo.png'}
                  alt='/'
                  width='87'
                  height='35'
                />
              </Link>
              <div
                onClick={handleNav}
                className='rounded-full shadow-lg shadow-black p-3 cursor-pointer'
              >
                <AiOutlineClose />
              </div>
            </div>
            <div className='border-b border-gray-300 my-4'>
              <p className='w-[85%] md:w-[90%] py-4 text-hoverbase'>
                Where to?
              </p>
            </div>
          </div>
          <div className='py-4 flex flex-col'>
            <ul className='uppercase text-hoverbase'>
              <Link href='/'>
                <li onClick={() => setNav(false)} className='py-4 text-sm'>
                  Home
                </li>
              </Link>
              <Link href='/#about'>
                <li onClick={() => setNav(false)} className='py-4 text-sm'>
                  Shrimp
                </li>
              </Link>
              <Link href='/#skills'>
                <li onClick={() => setNav(false)} className='py-4 text-sm'>
                  Search
                </li>
              </Link>
              <Link href='/#projects'>
                <li onClick={() => setNav(false)} className='py-4 text-sm'>
                  Upload
                </li>
              </Link>
              <Link href='/#contact'>
                <li onClick={() => setNav(false)} className='py-4 text-sm'>
                  Resources
                </li>
              </Link>
            </ul>

            {/* <div className='pt-10 sm:pt-20 md:pt-30 '>
              <p className='uppercase tracking-widest text-hoverbase'>
                Connect with me
              </p>
              <div className='flex items-center justify-between my-4 w-full sm:w-[80%]'>
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://www.linkedin.com/in/josephelias/'
                >
                  <div className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointe hover:scale-105 ease-in duration-300'>
                    <FaLinkedinIn />
                  </div>
                </a>
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://github.com/averagecupofjoey'
                >
                  <div className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointe hover:scale-105 ease-in duration-300 ml-3'>
                    <FaGithub />
                  </div>
                </a>
                <a href='mailto:jrelias@outlook.com'>
                  <div className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointe hover:scale-105 ease-in duration-300 ml-3'>
                    <AiOutlineMail />
                  </div>
                </a>
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://drive.google.com/file/d/19JWFzMRUAnTzl12Opq0a34gIZcRg3JUa/view'
                >
                  <div className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointe hover:scale-105 ease-in duration-300 ml-3'>
                    <CgFileDocument />
                  </div>
                </a>
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
