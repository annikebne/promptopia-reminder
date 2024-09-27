"use client";

import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { LoadingDispatchContext } from '@components/LoadingContext.js'

const Nav = () => {
  const { data: session } = useSession()

  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const dispatch = useContext(LoadingDispatchContext)
  const loginBtnClasses = 'font-sans px-4 py-2 font-semibold text-sm border border-a-black text-a-black bg-a-yellow rounded-md shadow-sm opacity-100 disabled:opacity-60'
  const logoutBtnClasses = 'font-sans px-4 py-2 font-semibold text-sm border border-a-black text-a-black bg-a-yellow rounded-md shadow-sm opacity-100 disabled:opacity-60'

  useEffect(() => {
    (async () => {
      dispatch({ 'isLoading': true, type: 'update' })
      try {
        const res = await getProviders()
        setProviders(res)
      } catch (error) {
        console.log(error)
      } finally {
        dispatch({ 'isLoading': false, type: 'update' })
      }
      
    })()
  }, [])

  return (
    <nav className='flex-between w-full mb-5 pt-3 sm:px-16 px-6'>
      <div className='flex gap-2 flex-center'>
        <p className="logo small uppercase">Kom ihåg</p>
      </div>
      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <button type='button' onClick={signOut} className={logoutBtnClasses}>
              Logga ut
            </button>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className={loginBtnClasses}
                >
                  Logga in
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className={logoutBtnClasses}
                >
                  Logga ut
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className={loginBtnClasses}
                >
                  Logga in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
