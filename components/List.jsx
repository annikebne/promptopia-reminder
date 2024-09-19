'use client'

import { useEffect, useState } from 'react'

const List = () => {

  const [listItems, setListItems] = useState([])

  useEffect(() => {
    const fetchListItems = async () => {
      const response = await fetch('/api/todos', {
        method: 'GET'
      })
      const data = await response.toJson()

      console.log('data', data)

      // setListItems(data)

    }


  }, [])

  return(
    <div>
      List page
    </div>
  )
}

export default List