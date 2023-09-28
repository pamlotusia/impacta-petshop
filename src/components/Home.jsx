import React from 'react'
import { UserAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const { user, logout } = UserAuth()

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
      console.log('you are logout')
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <div className="max-w-md mx-auto  p-5 rounded-md shadow-lg my-20 py-8 bg-background-color">
      <button onClick={handleLogout} className="border px-6 py-2 my-4 mb-10">
        Logout
      </button>
      <h1 className="text-2xl text-center font-bold mb-4">
        Agende seu horário
      </h1>
      <form>
        <div className="mb-3 p-2 rounded-lg">
          <label className="text-gray-700 text-sm font-bold ">Data</label>
          <input
            type="date"
            className="w-full px-3 py-3 focus:outline-none light-blue-input "
          />
        </div>
        <div className="mb-4 p-2 rounded-lg">
          <label className="text-gray-700 text-sm font-bold">Horário</label>
          <input
            type="time"
            className="w-full px-3 py-3 focus:outline-none light-blue-input"
          />
        </div>

        <p className="text-2xl text-center font-bold mb-6 m-10">
          Selecione o serviço
        </p>

        <div className="flex justify-center">
          <div className=" flex mb-3  p-2 rounded-lg">
            <input
              id="banho"
              value="banho"
              data-text="Apenas banho"
              type="radio"
              className=""
            />
            <label className="text-gray-700 text-sm font-medium ml-6">
              Apenas banho
            </label>
          </div>

          <div className=" flex mb-3  p-2 rounded-lg">
            <input
              id="banho"
              value="banho"
              data-text="Apenas banho"
              type="radio"
              className=""
            />
            <label className="text-gray-700 text-sm font-medium ml-6">
              Apenas banho
            </label>
          </div>
        </div>

        <p className="text-2xl text-center font-bold mb-6 m-10">
          Escolha a tosa
        </p>

        <div className="flex justify-center">
          <div className=" flex mb-3  p-2 rounded-lg">
            <input
              id="banho"
              value="banho"
              data-text="Tosa Higiênica"
              type="radio"
              className=""
            />
            <label className="text-gray-700 text-sm font-medium ml-6">
              Tosa Higiênica
            </label>
          </div>

          <div className=" flex mb-3  p-2 rounded-lg">
            <input
              id="banho"
              value="banho"
              data-text="Apenas banho"
              type="radio"
              className=""
            />
            <label className="text-gray-700 text-sm font-medium ml-6">
              Apenas banho
            </label>
          </div>

          <div className=" flex mb-3  p-2 rounded-lg">
            <input
              id="banho"
              value="banho"
              data-text="Tosa Higiênica"
              type="radio"
              className=""
            />
            <label className="text-gray-700 text-sm font-medium ml-6">
              Tosa Higiênica
            </label>
          </div>

          <div className=" flex mb-3  p-2 rounded-lg">
            <input
              id="banho"
              value="banho"
              data-text="Apenas banho"
              type="radio"
              className=""
            />
            <label className="text-gray-700 text-sm font-medium ml-6">
              Apenas banho
            </label>
          </div>
        </div>
      </form>
      <div className="flex justify-center">
        <button className="border px-6 py-2 my-4 m-5 rounded-md">Cancelar</button>
        <button className="px-6 py-2 my-4 m-5 bg-confirm-color rounded-md">Confirmar</button>
      </div>
    </div>
  )
}

export default Home
