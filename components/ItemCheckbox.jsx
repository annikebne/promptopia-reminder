import React from 'react';

function ItemCheckbox ({ item, toggle }) {
  function handleChange (event) {
    toggle(item._id, event.target.checked);
  }

  return (
    <>
      <div className="pl-2 pr-2 pb-2 pt-2 my-1 border rounded-lg border-a-black divide-lime-600 flex items-center gap-x-2">
        <input
          type="checkbox"
          className="appearance-none h-9 w-9 shrink-0 border border-4 border-a-yellow rounded-sm mt-1 bg-transparent
           focus:ring-offset-0 focus:ring-1 focus:ring-a-yellow
          checked:bg-a-black checked:border-a-yellow
          disabled:border-steel-400 disabled:bg-steel-400 outline outline-a-black-700"
          name={item.id}
          id={item._id}
          onChange={handleChange}
        />
        <div className="flex flex-col">
          <label className="font-sans font-semibold text-sm" htmlFor={item.id}>{item.description}</label>
          <p className="font-sans text-xs">Annika</p>

        </div>
      </div>
    </>
  )
}

export default ItemCheckbox