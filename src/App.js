import React from 'react'
import ContextProvider from './context/context-provider'
import Layout from './pages/layout'

const App = () => {
  return (
    <ContextProvider>
      <Layout />
    </ContextProvider>
  )
}

export default App