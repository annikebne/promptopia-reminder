import React, { useState, useEffect, useMemo } from 'react';

import '../app/App.css';
import ItemCheckbox from './ItemCheckbox';

function getCheckedItems(array) {
  if (!array) return [];

  return array.filter((it) => it.feChecked).map((it) => it.id);
}

function ListPage({ items }) {
  const [openItemState, setOpenItemState] = useState([]);
  const [checkedItemIds, setCheckedItemIds] = useState([]);

  useEffect(() => {
    setOpenItemState(items.map((it) => {
      return {
        ...it,
        feChecked: false,
      }
    }))
  }, [items]);

  function addCheckedItem(id) {
    let checkedArray = JSON.parse(JSON.stringify(checkedItemIds));
    checkedArray.push(id);
    setCheckedItemIds(checkedArray);
  }

  function removeCheckedItem(id) {
    let checkedArray = JSON.parse(JSON.stringify(checkedItemIds));
    const index = checkedArray.indexOf(id)
    checkedArray.splice(index, 1)
    setCheckedItemIds(checkedArray)
  }

  function toggle(id, isChecked) {
    let array = JSON.parse(JSON.stringify(openItemState));
    const item = array.find(it => it.id == id);
    item.feChecked = isChecked;

    if (isChecked) {
      addCheckedItem(id)
    } else {
      removeCheckedItem(id)
    }

    setOpenItemState(array);
  }

  function renderItems(items) {
    return items.map((it) => {
      return (
        <ItemCheckbox key={it.id} item={it} toggle={toggle} />
      )
    });
  }

  function renderItems(items) {
    if (items.length > 0) {
      return items.map((it) => {
        return (<li key={it.id}>
          <h2>{it.description}</h2>
          </li>);
      });
    } else return (<h2>No items</h2>) 
  }

  function removeCheckedItems() {
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ "ids": checkedItemIds }),
    // };

    // fetch('/api/tick-items', requestOptions)
    // .then(response => {
    //   if (!response.ok) {
    //     throw new Error("Api response was not ok")
    //   }
    //   return response.json();
    // })
    // .then((json) => {
    //   // console.log("response", json)
    // })
    // .catch(error => console.error(error));
  }

  return(
    <>
      <fieldset className="flex flex-col">
          { renderItems(items) }
      </fieldset>

      <button
        disabled={checkedItemIds.length == 0}
        className="mt-1 px-4 py-2 bg-a-black rounded-md shadow-sm opacity-100 text-a-yellow text-sm font-semibold disabled:opacity-60"
        onClick={removeCheckedItems}
      >
        Markera som köpta
      </button>
    </>
  )
}

export default ListPage