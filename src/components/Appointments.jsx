import React, { useState, useEffect } from 'react';
import axios from 'axios';
import iconDog from '../images/icon-dog.svg';
import iconCat from '../images/icon-cat.svg';
import iconBird from '../images/icon-bird.svg';
import iconRodent from '../images/icon-rodent.svg';

const Appointments = () => {
  const [userAppointments, setUserAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/schedules', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setUserAppointments(response.data);
      } catch (error) {
        console.error('Erro ao obter os agendamentos:', error);
      }
    };

    fetchAppointments();
  }, []);

  const getIconAndColor = (petType) => {
    switch (petType.toLowerCase()) {
      case 'dog':
        return { icon: iconDog, color: 'medium-blue' };
      case 'cat':
        return { icon: iconCat, color: 'yellow' };
      case 'bird':
        return { icon: iconBird, color: 'green' };
      case 'rodent':
        return { icon: iconRodent, color: 'pink' };
      default:
        return { icon: null, color: 'medium-blue' };
    }
  };

  return (
    <div className='mx-5 md:m-20 lg:mx-[100px]'>
      <h1 className="text-2xl color-title text-center font-poppins my-10">
        Meus <span className="font-bold">agendamentos</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-10">
        {userAppointments.map((appointment, index) => (
          <div
            key={index}
            className={`max-w-[content] md:w-[240px] min-h-[180px] rounded-2xl mx-10 lg:mx-0 custom-shadow flex flex-col items-center justify-center`}
          >
            {appointment.pet_type && (
              <div
                className={`h-16 w-16 mb-2 flex mt-3 justify-center items-center rounded-full ${getIconAndColor(appointment.pet_type).color}`}
              >
                <img src={getIconAndColor(appointment.pet_type).icon} className="w-10 h-10" />
              </div>
            )}
            <ul className="text-center break-words mb-3">
              <li className="w-full text-lg font-medium px-3 mt-2 color-title ">
                {appointment.pet_name}
              </li>
              <li className='my-1 font-medium'>{appointment.type_service}</li>
              <li className='my-1'>{appointment.schedules.split('T')[0]}</li>
              <li className='my-1'>às {appointment.schedules.split('T')[1]}</li>
              <li className='font-bold grey-font my-1'>R${appointment.price}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
