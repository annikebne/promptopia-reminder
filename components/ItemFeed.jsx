'use client'
import { useContext } from 'react'
import { ItemContext } from './ItemContext.js'

import ItemCheckbox from './ItemCheckbox.jsx';

const ItemFeed = () => {
  const items = useContext(ItemContext)

  return(
    <section className="w-full sm:px-16 px-6">
      <div className="flex flex-col">
        {!!items.length && items.map((item) => <ItemCheckbox key={item._id} item={item} />)}
      </div>
    </section>
  )
}

export default ItemFeed