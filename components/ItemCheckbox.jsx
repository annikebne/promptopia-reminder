import React from 'react';
import { useContext } from 'react'
import { ItemDispatchContext } from './ItemContext.js';

function ItemCheckbox ({ item }) {
  const dispatch = useContext(ItemDispatchContext)

  function handleChange (event) {
    dispatch({
      item: {
        ...item,
        checked: event.target.checked,
      },
      type: 'changed'
    })
  }

  return (
    <>
      <div className="itemCheckbox pl-2 pr-2 pb-2 pt-2 my-1 border rounded-lg border-a-black divide-lime-600 flex items-center gap-x-2">
        <input
          type="checkbox"
          className="appearance-none h-9 w-9 shrink-0 border border-4 border-a-yellow rounded-sm bg-transparent
           focus:ring-offset-0 focus:ring-1 focus:ring-a-yellow
          checked:bg-a-black checked:border-a-yellow
          disabled:border-steel-400 disabled:bg-steel-400 outline outline-a-black-700 outline-1 hover:cursor-pointer"
          name={item.id}
          id={item._id}
          onChange={handleChange}
        />
        <div className="flex flex-col">
          <label className="font-sans font-semibold text-sm" htmlFor={item.id}>{item.description}</label>
          <p className="font-sans text-xs">{item.creator?.username ? item.creator.username : 'Unknown'}</p>

        </div>
      </div>
    </>
  )
}

export default ItemCheckbox