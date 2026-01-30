'use client'
import { createContext, useContext, useState } from 'react'

type DataContextType = {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
}
const DataContext = createContext<DataContextType | undefined>(undefined)

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) throw new Error('No context provided')
}

export default function DataProvider ({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
  return (
    <DataContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}