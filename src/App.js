import React from 'react'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import { Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import RegisterPet from './components/RegisterPet'
import MyPets from './components/MyPets'
import Appointments from './components/Appointments'
import Profile from './components/Profile'

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
                <Navbar />
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='/cadastrar-pet'
            element={
              <ProtectedRoute>
                <Navbar />
                <RegisterPet />                
              </ProtectedRoute>
            }
          />
          <Route
            path='/meus-pets'
            element={
              <ProtectedRoute>
                <Navbar />
                <MyPets />                
              </ProtectedRoute>
            }
          />
          <Route
            path='/historico'
            element={
              <ProtectedRoute>
                <Navbar />
                <Appointments />                
              </ProtectedRoute>
            }
          />
          <Route
            path='/perfil'
            element={
              <ProtectedRoute>
                <Navbar />
                <Profile />                
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App
