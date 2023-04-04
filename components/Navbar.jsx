import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineClose, AiOutlineMenu, AiOutlineMail } from 'react-icons/ai';
// import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { useRouter } from 'next/router';
// import { CgFileDocument } from 'react-icons/cg';
import navImg from '../public/assets/logo.png';
import shrimpopedia from '../public/assets/shrimpopedia.png';
import shrimpopediaLogo from '../public/assets/shrimpopediaLogo2.png';
import blueShrimp from '../public/assets/loading.png';
import shrimpDrawing from '../public/assets/shrimpDrawing.png';

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
        shadow
          ? 'w-full h-20 shadow-xl z-[100] font-gloria-hallelujah'
          : ' w-full h-20 z-[100] font-gloria-hallelujah'
      }
    >
      <div className='flex justify-between items-center w-full h-full px-2 2xl:px-16'>
        <Link href='/'>
          <Image
            src={shrimpopediaLogo}
            alt='/'
            width='65'
            height='50'
            className='mt-6'
          />
        </Link>
        <div>
          <ul style={{ color: `${linkColor}` }} className='hidden md:flex'>
            <Link href='/'>
              <li className='ml-10 text-sm uppercase hover:border-b'>Home</li>
            </Link>
            <Link href='/shrimp'>
              <li className='ml-10 text-sm uppercase hover:border-b'>Shrimp</li>
            </Link>
            <Link href='/search'>
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
            <Link href='/mytank'>
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
        {/* <div className={nav ? '' : 'fixed top-0'}> */}
        <div
          className={
            nav
              ? 'fixed left-0 top-0 w-full h-screen p-10 ease-in-out duration-500 bg-[#f5f5f5]'
              : 'fixed left-[-100%] h-screen w-full top-0 p-10 ease-in duration-700'
          }
        >
          <div
            onClick={handleNav}
            className='rounded-full shadow-lg shadow-black p-3 cursor-pointer absolute top-3 right-3'
          >
            <AiOutlineClose />
          </div>
          <div className='flex flex-col items-center justify-center w-full'>
            <Image src={shrimpDrawing} alt='/' className='max-w-[50%]' />
            <div className='border-b border-gray-300'>
              <p className='w-full md:w-[90%] pb-4 text-hoverbase'>
                TABLE OF CONTENTS
              </p>
            </div>
          </div>
          {/* <div>
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
              <p className='w-[85%] md:w-[90%] py-4 text-hoverbase'>CONTENTS</p>
            </div>
          </div> */}

          <div className='py-4 flex flex-col'>
            <ul className='uppercase text-hoverbase'>
              {/* <a href='/'> */}
              <Link href='/'>
                <section className='flex items-baseline active:bg-gray-700 rounded-md'>
                  <li onClick={() => setNav(false)} className='py-4 text-sm'>
                    Home
                  </li>
                  <span className='flex overflow-hidden tracking-widest'>
                    .............................................................................................................
                  </span>
                  <h3>1</h3>
                </section>
              </Link>
              {/* </a> */}
              {/* <a href='/shrimp'> */}
              <Link href='/shrimp'>
                <section className='flex items-baseline active:bg-gray-700 rounded-md'>
                  <li onClick={() => setNav(false)} className='py-4 text-sm'>
                    Shrimp
                  </li>
                  <span className='flex overflow-hidden tracking-widest'>
                    .............................................................................................................
                  </span>
                  <h3>2</h3>
                </section>
              </Link>
              {/* </a> */}

              {/* <a href='/search'> */}
              <Link href='/search'>
                <section className='flex items-baseline active:bg-gray-700 rounded-md'>
                  <li onClick={() => setNav(false)} className='py-4 text-sm'>
                    Search
                  </li>

                  <span className='flex overflow-hidden tracking-widest'>
                    .............................................................................................................
                  </span>
                  <h3>3</h3>
                </section>
              </Link>
              {/* </a> */}

              {/* <a href='/upload'> */}
              <Link href='/upload'>
                <section className='flex items-baseline active:bg-gray-700 rounded-md'>
                  <li onClick={() => setNav(false)} className='py-4 text-sm'>
                    Upload
                  </li>
                  <span className='flex overflow-hidden tracking-widest'>
                    .............................................................................................................
                  </span>
                  <h3>4</h3>
                </section>
              </Link>
              {/* </a> */}

              {/* <a href='/'> */}
              <Link href='/'>
                <section className='flex items-baseline active:bg-gray-700 rounded-md'>
                  <li onClick={() => setNav(false)} className='py-4 text-sm'>
                    Resources
                  </li>
                  <span className='flex overflow-hidden tracking-widest'>
                    .............................................................................................................
                  </span>
                  <h3>5</h3>
                </section>
              </Link>
              {/* </a> */}

              {/* <a href='/mytank'> */}
              <Link href='/mytank'>
                <section className='flex items-baseline active:bg-gray-700 rounded-md'>
                  <li onClick={() => setNav(false)} className='py-4 text-sm'>
                    My&nbsp;Tank
                  </li>
                  <span className='flex overflow-hidden tracking-widest'>
                    .............................................................................................................
                  </span>
                  <h3>6</h3>
                </section>
              </Link>
              {/* </a> */}
              {/* <Link href='/shrimp'>
                <li onClick={() => setNav(false)} className='py-4 text-sm'>
                  Shrimp
                </li>
              </Link>
              <Link href='/search'>
                <li onClick={() => setNav(false)} className='py-4 text-sm'>
                  Search
                </li>
              </Link>
              <Link href='/upload'>
                <li onClick={() => setNav(false)} className='py-4 text-sm'>
                  Upload
                </li>
              </Link>
              <Link href='/#contact'>
                <li onClick={() => setNav(false)} className='py-4 text-sm'>
                  Resources
                </li>
              </Link> */}
            </ul>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Navbar;
