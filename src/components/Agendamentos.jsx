import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserAuth } from '../contexts/AuthContext';

const Agendamentos = () => {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const { user } = UserAuth();
  const [userAppointments, setUserAppointments] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (user) {
        try {
          const response = await axios.get('http://127.0.0.1:5000/all-schedules', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          });
          // Ordena os agendamentos por data antes de atualizar o estado
          const sortedData = response.data.sort((a, b) => new Date(a.schedules) - new Date(b.schedules));
          setUserAppointments(sortedData);
        } catch (error) {
          console.error('Erro ao obter os agendamentos:', error);
        }
      }
    };

    fetchAppointments();
  }, [user]);

  useEffect(() => {
    const applyFilter = () => {
      switch (selectedFilter) {
        case 'dia':
          filterByDay();
          break;
        case 'semana':
          filterByWeek();
          break;
        case 'mês':
          filterByMonth();
          break;
        default:
          // Garante que os dados estejam ordenados mesmo sem filtro específico
          setFilteredData([...userAppointments].sort((a, b) => new Date(a.schedules) - new Date(b.schedules)));
      }
    };

    applyFilter();
  }, [selectedFilter, userAppointments]);

  const filterByDay = () => {
    const today = new Date();
    const filtered = userAppointments.filter(item => {
      const itemDate = new Date(item.schedules);
      return (
        itemDate.getDate() === today.getDate() &&
        itemDate.getMonth() === today.getMonth() &&
        itemDate.getFullYear() === today.getFullYear()
      );
    });
    setFilteredData(filtered);
  };

  const filterByWeek = () => {
    const today = new Date();
    const firstDayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
    const lastDayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 6);
    const filtered = userAppointments.filter(item => {
      const itemDate = new Date(item.schedules);
      return itemDate >= firstDayOfWeek && itemDate <= lastDayOfWeek;
    });
    setFilteredData(filtered);
  };

  const filterByMonth = () => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const filtered = userAppointments.filter(item => {
      const itemDate = new Date(item.schedules);
      return itemDate >= firstDayOfMonth && itemDate <= lastDayOfMonth;
    });
    setFilteredData(filtered);
  };

  const handleFilterClick = filter => {
    setSelectedFilter(filter);
  };

  const formatDateTime = dateTimeString => {
    const dateTime = new Date(dateTimeString);
    const options = { hour: 'numeric', minute: 'numeric' };
    const formattedTime = dateTime.toLocaleTimeString([], options);
    return `${formattedTime}`;
  };

  const handleStatusChange = async (cardId, newStatus) => {
    try {
      await axios.post('http://127.0.0.1:5000/all-schedules', {
        id: cardId,
        status: newStatus
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });

      const updatedAppointments = userAppointments.map(card => {
        if (card.id === cardId) {
          return { ...card, status: newStatus };
        }
        return card;
      });
      setUserAppointments(updatedAppointments);
    } catch (error) {
      console.error('Erro ao atualizar o status:', error);
    }
  };
  return (
    <div className="">
      <div className="flex mt-10 justify-between items-center">
        <p className="text-2xl grey-font">Agendamentos</p>
        <div className="flex">
          <p
            className={`mx-1 p-2 px-5 light-blue-input rounded-[50px] ${
              selectedFilter === 'dia' ? 'button-active' : 'text-black'
            }`}
            onClick={() => handleFilterClick('dia')}
          >
            dia
          </p>
          <p
            className={`mx-1 p-2 px-5 light-blue-input rounded-[50px] ${
              selectedFilter === 'semana' ? 'button-active' : 'text-black'
            }`}
            onClick={() => handleFilterClick('semana')}
          >
            semana
          </p>
          <p
            className={`mx-1 p-2 px-5 light-blue-input rounded-[50px] ${
              selectedFilter === 'mês' ? 'button-active' : 'text-black'
            }`}
            onClick={() => handleFilterClick('mês')}
          >
            mês
          </p>
        </div>
      </div>

      <div className="Cards flex mt-10">
        {filteredData.map((card, id) => (
          <div key={id}>
            <p className="m-3">{formatDateTime(card.schedules)}</p>

            <div className="parentContainer">
              <p className="text-md font-bold">{card.type_service}</p>
              <p className="text-sm">
                {card.nameOwner}, {card.pet_size}, {card.price}
              </p>
              <p>
                <span className="font-bold font-md">alterar status </span>

                 <select
                    className="btn-select"
                    value={card.status}
                    onChange={(e) => handleStatusChange(card.id, e.target.value)}
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Concluido">Concluído</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Agendamentos;
