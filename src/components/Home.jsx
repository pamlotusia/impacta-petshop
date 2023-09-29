import React, { useState } from 'react'
import { UserAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { db, auth } from '../firebase'
import { set } from 'firebase/database'

const Home = () => {
  const { user, logout } = UserAuth()
  const navigate = useNavigate()

  const [selectedDate, setSeletecDate] = useState('')
  const [selectedTime, setSeletecTime] = useState('')
  const [selectedService, setSeletedService] = useState('')
  const [selectedTosa, setSelectedTosa] = useState('')

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
      console.log('you are logout')
    } catch (e) {
      console.log(e.message)
    }
  }

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime || !selectedService || !selectedTosa) {
      alert(
        'Por favor, preencha todos os campos para garantir que o seu agendamento seja concluido com sucesso'
      )
      return
    }
    try {
      const user = auth.currentUser
      if (!user) {
        alert('Usuario não encontrado')
        return
      }
      const uid = user.uid
      const data = {
        date: selectedDate,
        time: selectedTime,
        service: selectedService,
        tosa: selectedTosa
      }

      await set(db.ref(`agendamentos/${selectedDate}/${uid}`, data))
      alert('Dados salvos com sucesso')
    } catch (e) {
      alert(e, e.message)
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
          onChange={e => setSeletecDate(e.target.value)}
            type="date"
            className="w-full px-3 py-3 focus:outline-none light-blue-input "
          />
        </div>
        <div className="mb-4 p-2 rounded-lg">
          <label className="text-gray-700 text-sm font-bold">Horário</label>
          <input
          onChange={e => setSeletecTime(e.target.value)}
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
            onChange={e => setSeletedService(e.target.value)}
              name="serviço"
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
            // onChange={e => setSeletedService(e.target.value)}
              name="serviço"
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
            onChange={e => setSelectedTosa(e.target.value)}
              name="tipo-tosa"
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
            // onChange={e => setSelectedTosa(e.target.value)}
              name="tipo-tosa"
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
            // onChange={e => setSelectedTosa(e.target.value)}
              name="tipo-tosa"
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
            // onChange={e => setSelectedTosa(e.target.value)}
              name="tipo-tosa"
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
        <button className="border px-6 py-2 my-4 m-5 rounded-md">
          Cancelar
        </button>
        <button className="px-6 py-2 my-4 m-5 bg-confirm-color rounded-md"
        onSubmit={handleConfirm}>
          Confirmar
        </button>
      </div>
    </div>
  )
}

export default Home
