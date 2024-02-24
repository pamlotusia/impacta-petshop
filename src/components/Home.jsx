import React, { useId, useState } from 'react'
import { UserAuth } from '../contexts/AuthContext'
import { db, auth } from '../firebase'
import { set, getDatabase, ref, get } from 'firebase/database'
import PopUp from './PopUp'
import DropdownPets from './DropdownPets'
import Price from './Price'
import WhatsappReminder from './WhatsappReminder'
import { differenceInDays } from 'date-fns'

const Home = () => {
  const { user } = UserAuth()

  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedService, setSeletedService] = useState('')
  const [bathSelected, setBathSelected] = useState(false)
  const [selectedTosa, setSelectedTosa] = useState('')
  const [selectedPet, setSelectedPet] = useState(null)
  const [finalPrice, setFinalPrice] = useState(0)
  const [popupData, setPopupData] = useState(null)

  // whatsapp
  const [whatsappReminderChecked, setWhatsappReminderChecked] = useState(false)
  const [userData, setUserData] = useState(null)
  const handleUserDataChange = (newUserData) => {
    setUserData(newUserData)
  }

  const formatDate = date => {
    const parts = date.split('-')
    const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`
    return formattedDate
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

      const data = {
        date: selectedDate,
        time: selectedTime,
        service: selectedService,
        tosa: selectedTosa,
        price: finalPrice
      }

      const db = getDatabase()

      //consultar o numero de agendamentos para o mesmo dia
      const agendamentosDiaRef = ref(db, `agendamentos/${selectedDate}`)
      const agendamentosSnapshot = await get(agendamentosDiaRef)

      if (agendamentosSnapshot.exists()) {
        const agendamentosData = agendamentosSnapshot.val()
        const numAgendamentosParaDia = Object.keys(agendamentosData).length

        //verifica se já existem 5 agendamentos par ao mesmo dia
        if (numAgendamentosParaDia >= 5) {
          alert(
            'Desculpe, o limite de agendamentos para este dia foi atingido e não é mais possivel realizar novos agendamentos. Por favor, tente outra data.'
          )
          return
        }
      }

      //referencia de onde o agendamento ficará salvo agendamento > dia selecionado > hora selecionada > usuario logado
      const agendamentoRef = ref(
        db,
        `agendamentos/${selectedDate}/${selectedTime}/${uid}`
      )
      await set(agendamentoRef, data)

      alert('Dados salvos com sucesso')
    } catch (e) {
      alert(e, e.message)
    }

    setPopupData({
      date: formatDate(selectedDate),
      service: selectedService,
      time: selectedTime,
      price: finalPrice
    })

    // whatsapp
    if(whatsappReminderChecked && isDateNear(selectedDate)){
      sendMessageViaWhatsapp()
    }
  }

  const isDateNear = (selectedDate) => {
    const currentDate = new Date()
    const selectedDateObject = new Date(selectedDate)
    const difference = differenceInDays(selectedDateObject, currentDate)

    return difference <= 1
  }

  const sendMessageViaWhatsapp = () => {
    const phoneNumber = userData;
    const message = encodeURIComponent(`Olá, ${userData}. Lembrandando que o seu agendamento está marcado para o dia ${selectedDate}, estamos ansiosos para te atender!`);
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    window.open(url, '_blank');
  };


  const handleClosePopup = () => {
    setPopupData(null)
  }

  const handlePetSelect = pet => {
    setSelectedPet(pet)
  }

  return (
    <div className="lg:w-[700px] mx-auto  p-10 rounded-md lg:shadow-lg my-20 py-8 lg:bg-background-color relative">
      <h1 className="text-2xl text-center color-title font-bold font-poppins mb-4">
        Agende seu horário
      </h1>
      <form>
        <div className="mb-3 p-2 rounded-lg">
          <label className="text-gray-700 text-mdn font-bold ">Data</label>
          <input
            onChange={e => setSelectedDate(e.target.value)}
            type="date"
            className="w-full px-3 py-3 focus:outline-none light-blue-input date-input "
          />
        </div>
        <div className="mb-4 p-2 rounded-lg">
          <label className="text-gray-700 text-md font-bold">Horário</label>
          <input
            onChange={e => setSelectedTime(e.target.value)}
            type="time"
            className="w-full px-3 py-3 focus:outline-none light-blue-input time-input"
          />
        </div>

        <p className="text-2xl text-center font-bold mb-6 m-10">
          Selecione o serviço
        </p>

        <div className="flex justify-center">
          <div className="flex mb-3  p-2 rounded-lg">
            <input
              onChange={e => {
                setSeletedService(e.target.nextElementSibling.textContent)
                setBathSelected(e.target.value === 'banho')
                setSelectedTosa('')
              }}
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
              onChange={e => {
                setSeletedService(e.target.nextElementSibling.textContent)
                setBathSelected(false)
              }}
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

        <div className="grid md:flex md:justify-center lg:flex lg:justify-center">
          <div className=" flex mb-3  p-2 rounded-lg">
            <input
              onChange={e =>
                setSelectedTosa(e.target.nextElementSibling.textContent)
              }
              name="tipo-tosa"
              id="tosa-higienica"
              data-text="Tosa higiênica"
              type="radio"
              disabled={bathSelected}
              checked={bathSelected ? false : undefined}
            />
            <label className="text-gray-700 text-sm font-medium ml-2">
              Tosa higiênica
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
              disabled={bathSelected}
              checked={bathSelected ? false : undefined}
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
              disabled={bathSelected}
              checked={bathSelected ? false : undefined}
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
              disabled={bathSelected}
              checked={bathSelected ? false : undefined}
            />
            <label className="text-gray-700 text-sm font-medium ml-2">
              Tosa alta
            </label>
          </div>
        </div>

        <div className="flex justify-center">
          <DropdownPets onPetSelect={handlePetSelect} />
        </div>

        <div className="flex justify-center ">
          <Price
            serviceType={selectedService}
            groomingType={selectedTosa}
            selectedPet={selectedPet}
            setFinalPrice={setFinalPrice}
          />
        </div>

        <div className="flex justify-center mt-5">
          <WhatsappReminder 
          onCheckboxChange={setWhatsappReminderChecked} 
          onUserDataChange={handleUserDataChange}/>
        </div>
      </form>

      <div className="flex justify-center">
        <button className="border px-6 py-2 my-4 m-3 rounded-md font-bold uppercase">
          Cancelar
        </button>
        <button
          className="px-6 py-2 my-4 m-5 yellow rounded-md text-white font-bold uppercase"
          onClick={handleConfirm}
        >
          Confirmar
        </button>
      </div>
      {popupData && (
        <PopUp
          date={popupData.date}
          service={popupData.service}
          time={popupData.time}
          price={popupData.price}
          onClose={handleClosePopup}
        />
      )}
    </div>
  )
}

export default Home
