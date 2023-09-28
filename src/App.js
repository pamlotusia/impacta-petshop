import React from 'react'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import { Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext'


const App = () => {
  return (
    <div>
      <AuthContextProvider>
      <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route
            path='/home'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App
