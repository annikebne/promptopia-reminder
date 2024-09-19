import React, { useState, useEffect } from 'react';

import '../app/App.css';

import ListPage from './ListPage';

function ListPageController() {
  const [isFetching, setIsFetching] = useState(true);

  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/todos', {
          method: "GET"
        })

        const data = await response.json();

        console.log(data)
        setItems(data)
        setIsFetching(false)
      } catch (error) {
        console.log(error)
        setIsFetching(false)
      }

    }
    fetchItems()
  }, [])

  return (
    <>
      {
        !isFetching && (!!items.length) ? <ListPage items={items} />
        
        : <h2>Still fetching</h2>
      }
    </>
  );
}

export default ListPageController;
