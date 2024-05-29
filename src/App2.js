import React, { useContext } from 'react'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import { Route, Routes } from 'react-router-dom'
import { AuthContextProvider, UserAuth } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import RegisterPet from './components/RegisterPet'
import MyPets from './components/MyPets'
import Appointments from './components/Appointments'
import Profile from './components/Profile'
import Dashboard from './components/Dashboard'
import Sidebar from './components/Sidebar'
import LoginEmployee from './components/LoginEmployee'
import Agendamentos from './components/Agendamentos2'
import Finance from './components/Finance'
const App = () => {
  const { user } = UserAuth()
  const userEmail = user ? user.email : null
  const employeeEmails = ['employee@gmail.com', 'funcionario@gmail.com']

  const isEmployee = employeeEmails.includes(userEmail)
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Navbar />
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cadastrar-pet"
            element={
              <ProtectedRoute>
                <Navbar />
                <RegisterPet />
              </ProtectedRoute>
            }
          />
          <Route
            path="/meus-pets"
            element={
              <ProtectedRoute>
                <Navbar />
                <MyPets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/historico"
            element={
              <ProtectedRoute>
                <Navbar />
                <Appointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Navbar />
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* rotas dashboard */}
          <Route path="/signin-employee" element={<LoginEmployee />} />

          <Route path="/signin-employee" element={<LoginEmployee />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Sidebar />
                <Finance/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/agendamentos"
            element={
              <ProtectedRoute>
                <Sidebar />
                <Agendamentos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/financeiro"
            element={
              <ProtectedRoute>
                <Sidebar />
                <Finance />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App
