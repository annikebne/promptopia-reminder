import { useEffect, useContext, useState } from 'react'
import { ItemContext, ItemDispatchContext } from '@components/ItemContext.js'
import ItemFeed from "@components/ItemFeed";
import InputField from '@components/InputField';
import { LoadingDispatchContext, LoadingContext } from '@components/LoadingContext.js'

const ListPage = () => {
  const dispatchItems = useContext(ItemDispatchContext)
  const dispatchLoading = useContext(LoadingDispatchContext)
  const isLoading = useContext(LoadingContext)

  const items = useContext(ItemContext)

  const fetchItems = async () => {
    dispatchLoading({ type: 'update', isLoading: true })

    try {
      const response = await fetch('/api/todos', { method: 'GET' })
      let data = await response.json()
      
      data = data.map((item) => {
        return { ...item, checked: false }
      })

      dispatchItems({ items: data, type: 'populate' })
    } catch (error) {
      console.log(error)
    } finally {
      dispatchLoading({ type: 'update', isLoading: false })
    }
  }

  const deleteItems = async () => {

    const checkedItemIds = items.filter((item) => item.checked).map(it => it._id)

    if (!checkedItemIds.length) return

    try {
      dispatchLoading({type: 'update', isLoading: true})
      const response = await fetch('/api/todos/delete', {
        method: 'POST',
        body: JSON.stringify({
          ids: checkedItemIds
        })
      })

      if (response.ok) {
        dispatch({ type: 'delete' })
      }

    } catch (error) {
      console.log(error)
    } finally {
      dispatchLoading({type: 'update', isLoading: false})
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleDeleteClick = async () => {
    await deleteItems()
    await fetchItems()
  }

  return(
    <div className="w-full h-full bg-a-yellow font-sans">
      {isLoading ? 
        <div className="loading">
          <div className="loader"></div>
        </div> : <>
        {!!items.length && <>
          <ItemFeed />
          <button
            className="sm:mx-16 mx-6 my-4 px-4 py-2 font-semibold text-sm bg-a-black text-a-yellow rounded-md shadow-sm opacity-100 disabled:opacity-60"
            onClick={handleDeleteClick}
          >
            Ta bort markerade
          </button>
        </>}
        
        <InputField />
      </>}
    </div>
  )
}

export default ListPage