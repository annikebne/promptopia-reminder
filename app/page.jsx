'use client'
import ItemFeed from "@components/ItemFeed";
import InputField from '@components/InputField';
import { SessionProvider } from 'next-auth/react';

const Home = () => (
  <div className='w-full'>
    <SessionProvider>
      <ItemFeed />
      <InputField />
    </SessionProvider>
  </div>
);

export default Home;
