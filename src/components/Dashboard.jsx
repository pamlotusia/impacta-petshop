import React, { useState, useEffect } from 'react';
import { useSidebar } from '../contexts/SidebarContext';
import Graphics from './CardGraphic'; // Certifique-se de que este é o caminho correto para o componente
import './Sidebar.css'; // Reutilizando o CSS da Sidebar
import 'boxicons/css/boxicons.min.css';
import axios from 'axios';
import { UserAuth } from '../contexts/AuthContext'; // Assumindo que você tem um contexto de usuário

const Content = () => {
  const { toggleSidebar } = useSidebar();
  const { user } = UserAuth(); // Obtendo o usuário do contexto
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Recupera o estado do dark mode do localStorage
    const savedMode = localStorage.getItem('isDarkMode');
    return savedMode === 'true';
  });
  const [searchFormVisible, setSearchFormVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [donutData, setDonutData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [tableData, setTableData] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/all-schedules', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          }
        });

        const schedules = response.data;

        // Prepare Donut Chart Data
        const statusCount = schedules.reduce((acc, schedule) => {
          acc[schedule.status] = (acc[schedule.status] || 0) + parseFloat(schedule.price);
          return acc;
        }, {});

        const donutChartData = Object.keys(statusCount).map(status => ({
          name: status,
          value: statusCount[status]
        }));

        // Prepare Bar Chart Data
        const monthlyEarnings = schedules.reduce((acc, schedule) => {
          if (schedule.status === 'Completed') {
            const month = new Date(schedule.schedules).toLocaleString('default', { month: 'short' });
            acc[month] = (acc[month] || 0) + parseFloat(schedule.price); // Somando os valores dos preços completados por mês
          }
          return acc;
        }, {});

        const barChartData = Object.keys(monthlyEarnings).map(month => ({
          month,
          earnings: monthlyEarnings[month]
        }));

        // Prepare Table Data
        const monthlyData = schedules.reduce((acc, schedule) => {
          const month = new Date(schedule.schedules).toLocaleString('default', { month: 'short' });
          if (!acc[month]) {
            acc[month] = {
              completed: 0,
              canceled: 0,
              volume: 0,
              marketCap: 0
            };
          }
          acc[month].volume += parseFloat(schedule.price);
          if (schedule.status === 'Completed') {
            acc[month].completed += parseFloat(schedule.price);
            acc[month].marketCap += parseFloat(schedule.price);
          }
          if (schedule.status === 'Canceled') {
            acc[month].canceled += parseFloat(schedule.price);
          }
          return acc;
        }, {});

        const tableChartData = Object.keys(monthlyData).map(month => {
          const data = monthlyData[month];
          const capPercentage = ((data.completed - data.canceled) / data.volume) * 100;
          return {
            month,
            capPercentage,
            volume: data.volume,
            marketCap: data.marketCap
          };
        });

        setDonutData(donutChartData);
        setBarData(barChartData);
        setTableData(tableChartData);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [user]);

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

        {/* Adicionando gráficos acima da tabela */}
        <div className="analytics-section">
          <Graphics donutData={donutData} barData={barData} showDonutChart={true} showBarChart={true} />
        </div>

        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>Recent Orders</h3>
              <i className='bx bx-search'></i>
              <i className='bx bx-filter' onClick={() => setShowFilter(!showFilter)}></i>
              {showFilter && (
                <div className="filter-dropdown">
                  <button onClick={() => console.log('Filter by month')}>Filter by Month</button>
                  <button onClick={() => console.log('Filter by cap %')}>Filter by Cap %</button>
                  <button onClick={() => console.log('Filter by volume')}>Filter by Volume</button>
                  <button onClick={() => console.log('Filter by Market Cap')}>Filter by Market Cap</button>
                </div>
              )}
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Cap %</th>
                    <th>Volume</th>
                    <th>Market Cap</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((data, index) => (
                    <tr key={index}>
                      <td>
                        <p>{data.month}</p>
                      </td>
                      <td style={{ color: data.capPercentage < 0 ? 'red' : 'green' }}>
                        {data.capPercentage.toFixed(2)}%
                      </td>
                      <td>{data.volume.toLocaleString('pt-BR')}</td>
                      <td>{data.marketCap.toLocaleString('pt-BR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="todo">
            <div className="head">
              <h3>Regards</h3>
              <i className='bx bx-plus'></i>
              <i className='bx bx-filter'></i>
            </div>
            <ul className="todo-list">
            <li className="not-completed">
                <p>Março tivemos um atraso no fornecimento de produtos para banho de pets...</p>
                <i className='bx bx-dots-vertical-rounded'></i>
              </li>
              <li className="completed">
                <p>Inicio da campanha de ofertas feita em parceria com...</p>
                <i className='bx bx-dots-vertical-rounded'></i>
              </li>
              <li className="completed">
                <p>Lembrar de adiantar a compra de reações para pets</p>
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
