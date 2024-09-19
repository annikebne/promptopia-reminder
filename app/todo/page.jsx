'use client'
import { useState, useEffect } from 'react'
import { SessionProvider } from 'next-auth/react';

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'

const ItemInput = () => {
  const { data: session } = useSession()
  const [input, setInput] = useState('')

  const handleInputChange = (event) => {
    setInput(event.target.value)
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    console.log("SUBMIT: ", input)
    console.log("session", session)
    try {
      const response = await fetch('/api/todos/new', {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          description: input
        })
      })

      if (response.ok) {
        console.log("OK", response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        onChange={handleInputChange}
        value={input}
      />
      <button type="submit">Add</button>
    </form>
  )
}

const Todos = () => {
  const router = useRouter()

  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('/api/todos', {
        method: "GET"
      })

      const data = await response.json();

      console.log(data)
      setItems(data)
    }

    fetchItems()
  }, [])
  return (
    <SessionProvider>
      <section>
        <h1 className="logo small">KOM IHÅG</h1>
        <ItemInput />

        <div>
          <h2>Items length: {items.length}</h2>
          {items.length}
          {
            items.length > 0 && (
              <div>Items has length</div>
            )
          }
        </div>
      </section>
    </SessionProvider>
  )
}

export default Todos