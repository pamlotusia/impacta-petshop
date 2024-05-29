<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useSidebar } from '../contexts/SidebarContext';
import './Sidebar.css'; // Reutilizando o CSS da Sidebar
import 'boxicons/css/boxicons.min.css';

const Content = () => {
  const { toggleSidebar } = useSidebar();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Recupera o estado do dark mode do localStorage
    const savedMode = localStorage.getItem('isDarkMode');
    return savedMode === 'true';
  });
  const [searchFormVisible, setSearchFormVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Atualiza o estado do dark mode no localStorage
    localStorage.setItem('isDarkMode', isDarkMode);
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 576) {
        setSearchFormVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSearchButtonClick = (e) => {
    if (window.innerWidth < 576) {
      e.preventDefault();
      setSearchFormVisible(!searchFormVisible);
    }
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <section id="content">
      {/* NAVBAR */}
      <nav>
        <i className='bx bx-menu' onClick={toggleSidebar}></i>
        <a href="#" className="nav-link">Categories</a>
        <form action="#" className={searchFormVisible ? 'show' : ''}>
          <div className="form-input">
            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-btn" onClick={handleSearchButtonClick}>
              <i className={`bx ${searchFormVisible ? 'bx-x' : 'bx-search'}`}></i>
            </button>
          </div>
        </form>
        <input
          type="checkbox"
          id="switch-mode"
          hidden
          checked={isDarkMode}
          onChange={handleDarkModeToggle}
        />
        <label htmlFor="switch-mode" className="switch-mode"></label>
        <a href="#" className="notification">
          <i className='bx bxs-bell'></i>
          <span className="num">8</span>
        </a>
        <a href="#" className="profile">
          <img src="img/people.png" alt="profile" />
        </a>
      </nav>
      {/* NAVBAR */}

      {/* MAIN */}
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Analytics</h1>
            <ul className="breadcrumb">
              <li>
                <a href="#">Schedules</a>
              </li>
              <li><i className='bx bx-chevron-right'></i></li>
              <li>
                <a className="active" href="#">Home</a>
              </li>
            </ul>
          </div>
          <a href="#" className="btn-download">
            <i className='bx bxs-cloud-download'></i>
            <span className="text">Download PDF</span>
          </a>
        </div>

        <ul className="box-info">
          <li>
            <i className='bx bxs-calendar-check'></i>
            <span className="text">
              <h3>1020</h3>
              <p>Completed</p>
            </span>
          </li>
          <li>
            <i className='bx bx-time'></i>
            <span className="text">
              <h3>2834</h3>
              <p>Pending</p>
            </span>
          </li>
          <li>
            <i className='bx bx-x-circle'></i>
            <span className="text">
              <h3>2543</h3>
              <p>canceled</p>
            </span>
          </li>
        </ul>

        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>Recent Orders</h3>
              <i className='bx bx-search'></i>
              <i className='bx bx-filter'></i>
            </div>
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Date Order</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img src="img/people.png" alt="user" />
                    <p>John Doe</p>
                  </td>
                  <td>01-10-2021</td>
                  <td><span className="status completed">Completed</span></td>
                </tr>
                <tr>
                  <td>
                    <img src="img/people.png" alt="user" />
                    <p>John Doe</p>
                  </td>
                  <td>01-10-2021</td>
                  <td><span className="status pending">Pending</span></td>
                </tr>
                <tr>
                  <td>
                    <img src="img/people.png" alt="user" />
                    <p>John Doe</p>
                  </td>
                  <td>01-10-2021</td>
                  <td><span className="status process">Process</span></td>
                </tr>
                <tr>
                  <td>
                    <img src="img/people.png" alt="user" />
                    <p>John Doe</p>
                  </td>
                  <td>01-10-2021</td>
                  <td><span className="status pending">Pending</span></td>
                </tr>
                <tr>
                  <td>
                    <img src="img/people.png" alt="user" />
                    <p>John Doe</p>
                  </td>
                  <td>01-10-2021</td>
                  <td><span className="status completed">Completed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="todo">
            <div className="head">
              <h3>Todos</h3>
              <i className='bx bx-plus'></i>
              <i className='bx bx-filter'></i>
            </div>
            <ul className="todo-list">
              <li className="completed">
                <p>Todo List</p>
                <i className='bx bx-dots-vertical-rounded'></i>
              </li>
              <li className="completed">
                <p>Todo List</p>
                <i className='bx bx-dots-vertical-rounded'></i>
              </li>
              <li className="not-completed">
                <p>Todo List</p>
                <i className='bx bx-dots-vertical-rounded'></i>
              </li>
              <li className="completed">
                <p>Todo List</p>
                <i className='bx bx-dots-vertical-rounded'></i>
              </li>
              <li className="not-completed">
                <p>Todo List</p>
                <i className='bx bx-dots-vertical-rounded'></i>
              </li>
            </ul>
          </div>
        </div>
      </main>
      {/* MAIN */}
    </section>
  );
};

export default Content;
=======
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserAuth } from '../contexts/AuthContext';

const Finance = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const { user } = UserAuth();

  const getWeekOfMonth = (date) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayOfWeek = firstDayOfMonth.getDay() === 0 ? 7 : firstDayOfMonth.getDay();
    const offsetDate = date.getDate() + firstDayOfWeek - 1;
    return Math.floor(offsetDate / 7);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const response = await axios.get('http://127.0.0.1:5000/all-schedules', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          });
          const processedData = processFinanceData(response.data);
          setMonthlyData(processedData);
        } catch (error) {
          console.error("Erro ao buscar os dados: ", error);
        }
      }
    };

    fetchData();
  }, [user]);

  const processFinanceData = (data) => {
    const mesesOrdenados = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];

    const financeData = data.reduce((acc, curr) => {
      const date = new Date(curr.schedules);
      const month = date.toLocaleString('pt-BR', { month: 'long' });
      const week = getWeekOfMonth(date);

      if (!acc[month]) acc[month] = {};
      if (!acc[month][week]) acc[month][week] = { expectativa: 0, rendimento_bruto: 0 };

      acc[month][week].expectativa += parseFloat(curr.price);
      if (curr.status === 'Concluido') {
        acc[month][week].rendimento_bruto += parseFloat(curr.price);
      } else {
        // Se o status não for "Concluido", garantimos que o rendimento bruto é tratado como R$ 0.00
        acc[month][week].rendimento_bruto += 0;
      }

      return acc;
    }, {});

    const financeDataSorted = Object.entries(financeData).sort((a, b) => {
      return mesesOrdenados.indexOf(a[0].toLowerCase()) - mesesOrdenados.indexOf(b[0].toLowerCase());
    }).map(([month, weeks]) => ({
      mes: month,
      semanas: Object.entries(weeks).map(([week, values], index) => ({
        index,
        expectativa: values.expectativa.toFixed(2),
        rendimento_bruto: values.rendimento_bruto.toFixed(2),
      })),
    }));

    return financeDataSorted;
  };

  return (
    <div className="flex justify-center h-screen top-0 ml-[15%] w-[80%]">
      <div className="font-poppins">
        <p className="text-2xl grey-font my-5">Financeiro</p>
        {monthlyData.map((mes, mesIndex) => (
          <div key={mesIndex} className="my-10">
            <p className="font-bold pink-font text-xl my-2">{mes.mes}</p>
            <div className="finance-grid">
              {mes.semanas.map((semana) => (
                <div key={semana.index}>
                  <p className="text-1xl ml-2 grey-font">
                    Semana {semana.index + 1}
                  </p>
                  <div className="finance-cards">
                    <div className="w-[248px] h-[70px] btn-cancel flex flex-col justify-evenly rounded-[10px] grey-font font-nunito">
                      <p className="font-bold text-sm ml-2 pink-font">
                        expectativa:
                        <span className="font-normal grey-font ml-3">
                          R${semana.expectativa}
                        </span>
                      </p>
                      <p className="font-bold text-sm ml-2">
                        rendimento bruto:
                        <span className="font-normal ml-3">
                          R${semana.rendimento_bruto}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Finance;
>>>>>>> origin/main
