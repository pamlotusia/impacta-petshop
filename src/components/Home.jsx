import React, { useState } from 'react'
import { UserAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { db, auth } from '../firebase'
import { set, getDatabase, ref } from 'firebase/database'
import PopUp from './PopUp'

const Home = () => {
  const { user, logout } = UserAuth()
  const navigate = useNavigate()

  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
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
    if (!selectedDate || !selectedTime || !selectedService) {
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

      const selectedServiceOption = document.querySelector(
        'input[name="servico"]:checked'
      )

      if (selectedServiceOption) {
        setSeletedService(selectedServiceOption.value)
      }

      let selectedTosaOption = document.querySelector(
        'input[name="tipo-tosa"]:checked'
      )

      if (selectedTosaOption) {
        setSelectedTosa(selectedTosaOption.id)
      } else {
        setSelectedTosa('sem tosa')
      }

      const uid = user.uid
      const userName = user.displayName
      const data = {
        date: selectedDate,
        time: selectedTime,
        service: selectedService,
        tosa: selectedTosa
      }

      const db = getDatabase()
      const agendamentoRef = ref(db, `agendamentos/${selectedDate}/${uid}`)
      await set(agendamentoRef, data)

      alert('Dados salvos com sucesso')
    } catch (e) {
      alert(e, e.message)
    }
  }

  return (
    <div className="w-[700px] mx-auto  p-10 rounded-md shadow-lg my-20 py-8 bg-background-color">
      <button onClick={handleLogout} className="border px-6 py-2 my-4 mb-10">
        Logout
      </button>
      <h1 className="text-2xl text-center font-bold mb-4">
        Agende seu horário
      </h1>
      <form>
        <div className="mb-3 p-2 rounded-lg">
          <label className="text-gray-700 text-mdn font-bold ">Data</label>
          <input
            onChange={e => setSelectedDate(e.target.value)}
            type="date"
            className="w-full px-3 py-3 focus:outline-none light-blue-input "
          />
        </div>
        <div className="mb-4 p-2 rounded-lg">
          <label className="text-gray-700 text-md font-bold">Horário</label>
          <input
            onChange={e => setSelectedTime(e.target.value)}
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
              onChange={e =>
                setSeletedService(e.target.nextElementSibling.textContent)
              }
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
              onChange={e =>
                setSeletedService(e.target.nextElementSibling.textContent)
              }
              name="serviço"
              id="banho_tosa"
              data-text="Banho & Tosa"
              type="radio"
            />
            <label className="text-gray-700 text-sm font-medium ml-6">
              Banho & Tosa
            </label>
          </div>
        </div>

        <p className="text-2xl text-center font-bold mb-6 m-10">
          Escolha a tosa
        </p>

        <div className="flex justify-center">
          <div className=" flex mb-3  p-2 rounded-lg ml-2">
            <input
              onChange={e =>
                setSelectedTosa(e.target.nextElementSibling.textContent)
              }
              name="tipo-tosa"
              id="tosa-higienica"
              data-text="Tosa Higiênica"
              type="radio"
            />
            <label className="text-gray-700 text-sm font-medium ml-2">
              Tosa Higiênica
            </label>
          </div>

          <div className=" flex mb-3  p-2 rounded-lg">
            <input
              onChange={e =>
                setSelectedTosa(e.target.nextElementSibling.textContent)
              }
              name="tipo-tosa"
              id="tosa-baixa"
              data-text="Tosa baixa"
              type="radio"
            />
            <label className="text-gray-700 text-sm font-medium ml-2">
              Tosa baixa
            </label>
          </div>

          <div className=" flex mb-3  p-2 rounded-lg">
            <input
              onChange={e =>
                setSelectedTosa(e.target.nextElementSibling.textContent)
              }
              name="tipo-tosa"
              id="tosa-media"
              data-text="Tosa média"
              type="radio"
              className=""
            />
            <label className="text-gray-700 text-sm font-medium ml-2">
            Tosa média
            </label>
          </div>

          <div className=" flex mb-3  p-2 rounded-lg">
            <input
              onChange={e =>
                setSelectedTosa(e.target.nextElementSibling.textContent)
              }
              name="tipo-tosa"
              id="tosa-alta"
              data-text="Tosa alta"
              type="radio"
            />
            <label className="text-gray-700 text-sm font-medium ml-2">
              Tosa alta
            </label>
          </div>
        </div>
      </form>
      <div className="flex justify-center">
        <button className="border px-6 py-2 my-4 m-5 rounded-md font-bold uppercase">
          Cancelar
        </button>
        <button
          className="px-6 py-2 my-4 m-5 bg-confirm-color rounded-md text-white font-bold uppercase"
          onClick={handleConfirm}
        >
          Confirmar
        </button>
      </div>
    </div>
  )
}

export default Home
