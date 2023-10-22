import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'
import { getDatabase, ref, get } from 'firebase/database'

const Appointments = () => {
  const [userAppointments, setUserAppointments] = useState([])
  const LOCAL_STORAGE_KEY = 'userAppointments'

  useEffect(() => {
    const user = auth.currentUser

    const loadAppointmentFromLocalStorage = () => {
      const storedAppointments = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (storedAppointments) {
        const parsedAppointments = JSON.parse(storedAppointments)
        setUserAppointments(parsedAppointments)
      }
    }

    if (user) {
      const userId = user.uid
      const db = getDatabase()
      const appointmentsRef = ref(db, 'agendamentos')

      get(appointmentsRef)
        .then(snapshot => {
          if (snapshot.exists()) {
            const appointmentsData = snapshot.val()
            const userAppointments = []

            // Iterar sobre as datas
            for (const date in appointmentsData) {
              if (appointmentsData.hasOwnProperty(date)) {
                if (appointmentsData[date][userId]) {
                  // Adicionar os agendamentos do usuário
                  userAppointments.push(appointmentsData[date][userId])

                  let currDate = date.toString().split('-')
                  let finalDate = date.reverse().join('/')
                }
              }
            }

            setUserAppointments(userAppointments)
            localStorage.setItem(
              LOCAL_STORAGE_KEY,
              JSON.stringify(userAppointments)
            )
          } else {
            loadAppointmentFromLocalStorage()
            alert('agendamentos não encontrados')
          }
        })
        .catch(e => {
          loadAppointmentFromLocalStorage()
          alert('erro ao obter agendamentos do firebase: ' + e.message)
        })
    } else {
      loadAppointmentFromLocalStorage()
    }
  }, [])

  return (
    <div>
      <h1 className="text-2xl color-title text-center font-poppins my-10">
        Meus <span className="font-bold">agendamentos</span>
      </h1>

      <div className="m-20 grid grid-cols-5 gap-y-10">
        {userAppointments.map((appointment, index) => (
          <div
            key={index}
            className={`w-[260px] min-h-[200px] rounded-2xl mx-10 custom-shadow flex flex-col items-center justify-center`}
          >
            <ul className="text-center break-words">
              <li className="w-full text-lg font-medium px-3 mt-2">
                {appointment.service}
              </li>
              <li>{appointment.date}</li>
              <li>às {appointment.time}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Appointments
