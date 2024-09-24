'use client'

import { createContext, useReducer } from 'react'

export const LoadingContext = createContext(null)
export const LoadingDispatchContext = createContext(null)

const initialIsLoading = true

export function LoadingProvider({ children }) {
  const [isLoading, dispatch] = useReducer(loadingReducer, initialIsLoading)

  return(
    <LoadingContext.Provider value={isLoading}>
      <LoadingDispatchContext.Provider value={dispatch}>
        {children}
      </LoadingDispatchContext.Provider>
    </LoadingContext.Provider>
  )
}

function loadingReducer(isLoading, action) {
  if (action.type === 'update') return action.isLoading

  return isLoading
}