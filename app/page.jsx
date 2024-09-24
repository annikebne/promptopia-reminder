
'use client'
import ListPage from '@components/ListPage';
import { useSession, SessionProvider } from 'next-auth/react'
import { ItemProvider } from '@components/ItemContext.js'

const Home = () => {
  const { data: session } = useSession()

  return (
    <>
      <SessionProvider>
        {session?.user ?
          <ItemProvider>
            <ListPage />
          </ItemProvider>
        :
          <div className='w-full bg-a-yellow font-sans sm:px-16 px-6'>
            <h2>Logga in för att komma igång!</h2></div>}
        </SessionProvider>
    </>
)};

export default Home;
