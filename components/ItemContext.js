'use client'
import { createContext, useContext, useReducer } from 'react'

export const ItemContext = createContext(null)
export const ItemDispatchContext = createContext(null)

export function ItemProvider({ children }) {
  const [items, dispatch] = useReducer(itemReducer, initialItems)

  return (
    <ItemContext.Provider value={items}>
      <ItemDispatchContext.Provider value={dispatch}>
        {children}
      </ItemDispatchContext.Provider>
    </ItemContext.Provider>
  )
}

export function useItems() {
  return useContext(ItemContext)
}

export function useItemDispatch() {
  return useContext(ItemDispatchContext)
}

function itemReducer(items, action) {
  switch (action.type) {
    case 'populate': {
      return action.items
    }

    case 'add': {
      return [...items, {
        _id: action.item._id,
        description: action.item.description,
        checked: false,
      }]
    }

    case 'changed': {
      return items.map(i => {
        if (i._id === action.item._id) {
          return action.item
        } else {
          return i
        }
      })
    }

    case 'delete': {
      return items.filter((item) => !item.checked)
    }

    default: {
      throw Error('Unknown action: '. action.type)
    }
  }
}

const initialItems = []
