'use client'
import ItemFeed from "@components/ItemFeed";
import InputField from '@components/InputField';
import { SessionProvider } from 'next-auth/react';
import { useState } from 'react'

const Home = () => {
  const [newItems, setNewItems] = useState([])

  const handleSuccess = (response) => {
    const newNewItems = JSON.parse(JSON.stringify(newItems))
    newNewItems.push(response)
    console.log(newNewItems)
    setNewItems(newNewItems)
  }

  return (

    <div className='w-full font-sans'>
      <SessionProvider>
        <ItemFeed recentlyAdded={newItems} />

        <InputField handleSucess={handleSuccess} />
      </SessionProvider>
    </div>
)};

export default Home;
