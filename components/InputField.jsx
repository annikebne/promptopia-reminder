import React, { useState, useContext } from 'react';
import { useSession } from 'next-auth/react'
import { ItemDispatchContext } from './ItemContext.js';

function InputField () {
  const { data: session } = useSession();
  const [input, setInput] = useState('');
  const dispatch = useContext(ItemDispatchContext)

  function handleSubmit(event) {
    event.preventDefault();
    if (input.length > 0) {
      addItem(input);
      setInput('')
    }
  }

  function handleChange(event) {
    setInput(event.target.value);
  }

  async function addItem(inputString) {
    if (input.length < 2) return;

    try {
      const response = await fetch('/api/todos/new', {
        method: 'POST',
        body: JSON.stringify({
          userId: session?.user.id,
          description: inputString
        })
      })

      if (response.ok) {
        const data = await response.json()
        dispatch({
          type: 'add',
          item: data,
        })
        
      }
    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 w-full h-16 z-10 bg-a-pink flex justify-between items-center px-4"
      >

      <input
        type="text"
        id="user-input"
        name=""
        value={input}
        placeholder="Att köpa"
        className="px-3 py-1 outline-1 flex-1"
        onChange={handleChange}
      />

      <button
        disabled={input.length < 2}
        type="submit"
        className="ml-4 px-4 py-2 font-semibold text-sm bg-a-black text-a-pink rounded-md shadow-sm opacity-100 disabled:opacity-60"
        >
          Lägg till
        </button>
    </form>
  )
}

export default InputField