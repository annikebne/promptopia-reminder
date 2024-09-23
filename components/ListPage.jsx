import { useEffect, useContext } from 'react'
import { ItemContext, ItemDispatchContext } from '@components/ItemContext.js'
import ItemFeed from "@components/ItemFeed";
import InputField from '@components/InputField';

const ListPage = () => {
  const dispatch = useContext(ItemDispatchContext)
  const items = useContext(ItemContext)

const deleteItems = async () => {
  const checkedItemIds = items.filter((item) => item.checked).map(it => it._id)

  if (!checkedItemIds.length) return

  try {
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
  }
}

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/todos', { method: 'GET' })
        let data = await response.json()
        
        data = data.map((item) => {
          return { ...item, checked: false }
        })

        dispatch({items: data, 'type': 'populate' })
      } catch (error) {
        console.log(error)
      }
    }

    fetchItems()
  }, [])

  return(
    <div className='w-full bg-a-yellow font-sans'>
      <ItemFeed />
        <button
          className="sm:mx-16 mx-6 my-4 px-4 py-2 font-semibold text-sm bg-a-black text-a-yellow rounded-md shadow-sm opacity-100 disabled:opacity-60"
          onClick={deleteItems}
        >
          Ta bort markerade
        </button>
      <InputField />
    </div>
  )
}

export default ListPage