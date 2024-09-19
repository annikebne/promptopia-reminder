'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

import ItemCheckbox from './ItemCheckbox';

const ItemFeed = () => {
  const { data: session } = useSession()
  const [items, setItems] = useState([])
  const [checkedItemIds, setCheckedItems] = useState([])

  const deleteItems = async () => {
    if (!checkedItemIds) return

    const response = await fetch("/api/todos/delete", {
      method: "POST",
      body: JSON.stringify({
        ids: checkedItemIds
      }),
    });

    const data = response.json()
    // reload page / hide deleted items
  }

  function addCheckedItem(id) {
    let checkedArray = JSON.parse(JSON.stringify(checkedItemIds));
    checkedArray.push(id);
    setCheckedItems(checkedArray);
  }

  function removeCheckedItem(id) {
    let checkedArray = JSON.parse(JSON.stringify(checkedItemIds));
    const index = checkedArray.indexOf(id)
    checkedArray.splice(index, 1)
    setCheckedItems(checkedArray)
  }

  function toggle(id, isChecked) {
    if (isChecked) {
      addCheckedItem(id)
    } else {
      removeCheckedItem(id)
    }
  }

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('/api/todos', { method: 'GET' })
      const data = await response.json()

      setItems(data)
    }

    fetchItems()
  }, [])

  return(
    <>
      {session?.user &&
        <section className="w-full sm:px-16 px-6">
          <div className="flex flex-col">
            {items.length && items.map((item) => <ItemCheckbox key={item._id} item={item} toggle={toggle} />)}
          </div>
          <button className="outline_btn" onClick={deleteItems}>Delete items</button>
        </section>
      }
    </>

  )
}

export default ItemFeed