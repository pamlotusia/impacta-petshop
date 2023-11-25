import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { auth } from '../firebase.js'; // Certifique-se de importar a instância correta do Firebase Authentication

const Appointments = () => {
  const [userAppointments, setUserAppointments] = useState([]);
  const LOCAL_STORAGE_KEY = 'userAppointments';  

  const formatDate = (date) => {
    const parts = date.split('-');
    const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
    return formattedDate;
  };

  useEffect(() => {
    const user = auth.currentUser;

    const loadAppointmentsFromLocalStorage = () => {
      const storedAppointments = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedAppointments) {
        const parsedAppointments = JSON.parse(storedAppointments);
        setUserAppointments(parsedAppointments);
      }
    };

    if (user) {
      const userId = user.uid;
      const db = getDatabase();
      const appointmentsRef = ref(db, 'agendamentos');

      get(appointmentsRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const appointmentsData = snapshot.val();
            const userAppointments = [];

            for (const date in appointmentsData) {
              if (appointmentsData.hasOwnProperty(date)) {
                const dateData = appointmentsData[date];

                for (const time in dateData) {
                  if (dateData.hasOwnProperty(time)) {
                    const userAgendamentos = dateData[time];

                    if (userAgendamentos[userId]) {
                      const appointment = {
                        ...userAgendamentos[userId],
                        date: formatDate(date),
                        time: time,
                        userId: userId,
                      };
                      userAppointments.push(appointment);
                    }
                  }
                }
              }
            }

            setUserAppointments(userAppointments);
            localStorage.setItem(
              LOCAL_STORAGE_KEY,
              JSON.stringify(userAppointments)
            );
          } else {
            loadAppointmentsFromLocalStorage();
            console.log('Agendamentos não encontrados');
          }
        })
        .catch((e) => {
          loadAppointmentsFromLocalStorage();
          console.error('Erro ao obter agendamentos do Firebase:', e.message);
        });
    } else {
      loadAppointmentsFromLocalStorage();
    }
  }, []);

  return (
    <div>
      <h1 className="text-2xl color-title text-center font-poppins my-10">
        Meus <span className="font-bold">agendamentos</span>
      </h1>

      <div className="m-20 grid grid-cols-5 gap-y-10">
        {userAppointments.map((appointment, index) => (
          <div
            key={index}
            className={`w-[260px] min-h-[180px] rounded-2xl mx-10 custom-shadow flex flex-col items-center justify-center`}
          >
            <ul className="text-center break-words">
              <li className="w-full text-lg font-medium px-3 mt-2 color-title ">
                {appointment.service}
              </li>
              <li className='my-1'>{appointment.date}</li>
              <li className='my-1'>às {appointment.time}</li>
              <li className='font-bold grey-font my-1'>R${appointment.price}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
