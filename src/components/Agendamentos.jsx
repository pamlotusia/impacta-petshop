import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserAuth } from '../contexts/AuthContext';
import { useSidebar } from '../contexts/SidebarContext';
import profileImage from '../images/robert.jpg';
import './Sidebar.css'; // Reutilizando o CSS da Sidebar
import 'boxicons/css/boxicons.min.css';

const Content = () => {
  const { toggleSidebar } = useSidebar();
  const { user } = UserAuth();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('isDarkMode');
    return savedMode === 'true';
  });
  const [searchFormVisible, setSearchFormVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [canceledCount, setCanceledCount] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filter, setFilter] = useState('Todos');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
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

  const fetchAppointments = async () => {
    if (user) {
      try {
        const response = await axios.get('http://127.0.0.1:5000/all-schedules', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        });

        const sortedData = response.data.sort((a, b) => new Date(a.schedules) - new Date(b.schedules));
        const pending = sortedData.filter(appointment => appointment.status === 'Pending').length;
        const completed = sortedData.filter(appointment => appointment.status === 'Completed').length;
        const canceled = sortedData.filter(appointment => appointment.status === 'Canceled').length;

        setPendingCount(pending);
        setCompletedCount(completed);
        setCanceledCount(canceled);
        setAppointments(sortedData);
        setFilteredAppointments(sortedData);
      } catch (error) {
        console.error('Erro ao obter os agendamentos:', error);
      }
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  const formatDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleDateString();
  };

  const getStatusClassName = (status) => {
    switch (status) {
      case 'Pending':
        return 'status pending';
      case 'Completed':
        return 'status completed';
      case 'Canceled':
        return 'status canceled';
      default:
        return '';
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    filterAppointments(newFilter);
    setIsDropdownVisible(false);
  };

  const filterAppointments = (filter) => {
    const now = new Date();
    let filtered = [];

    switch (filter) {
      case 'Dia':
        filtered = appointments.filter(appointment => {
          const date = new Date(appointment.schedules);
          return date.toDateString() === now.toDateString();
        });
        break;
      case 'Semana':
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
        filtered = appointments.filter(appointment => {
          const date = new Date(appointment.schedules);
          return date >= startOfWeek && date <= endOfWeek;
        });
        break;
      case 'Mês':
        filtered = appointments.filter(appointment => {
          const date = new Date(appointment.schedules);
          return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        });
        break;
      case 'Ano':
        filtered = appointments.filter(appointment => {
          const date = new Date(appointment.schedules);
          return date.getFullYear() === now.getFullYear();
        });
        break;
      case 'Todos':
        filtered = appointments;
        break;
      default:
        filtered = appointments;
    }

    setFilteredAppointments(filtered);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.post('http://127.0.0.1:5000/all-schedules', {
        id,
        status: newStatus,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });

      // Refaz o fetch dos agendamentos após atualizar o status
      fetchAppointments();
    } catch (error) {
      console.error('Erro ao atualizar o status:', error);
    }
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
          <img src={profileImage} alt="profile" />
        </a>
      </nav>
      {/* NAVBAR */}
      
      {/* Dropdown fora do container principal */}
      

      {/* MAIN */}
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Schedules</h1>
            <ul className="breadcrumb">
              <li>
                <a href="#">Appointments</a>
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
              <h3>{completedCount}</h3>
              <p>Completed</p>
            </span>
          </li>
          <li>
            <i className='bx bx-time'></i>
            <span className="text">
              <h3>{pendingCount}</h3>
              <p>Pending</p>
            </span>
          </li>
          <li>
            <i className='bx bx-x-circle'></i>
            <span className="text">
              <h3>{canceledCount}</h3>
              <p>Canceled</p>
            </span>
          </li>
        </ul>

        <div className="table-data">
          <div 
            id="filter-dropdown" 
            className={`filter-dropdown ${isDropdownVisible ? 'show' : ''}`} 
            style={{ position: 'absolute', zIndex: 1000, right: '20px', top: '70px' }}
          >
            <button onClick={() => handleFilterChange('Todos')}>Todos</button>
            <button onClick={() => handleFilterChange('Dia')}>Dia</button>
            <button onClick={() => handleFilterChange('Semana')}>Semana</button>
            <button onClick={() => handleFilterChange('Mês')}>Mês</button>
            <button onClick={() => handleFilterChange('Ano')}>Ano</button>
          </div>
          <div className="order">
            <div className="head">
              <h3>Recent Orders</h3>
              <i className='bx bx-search'></i>
              <i className='bx bx-filter' onClick={() => setIsDropdownVisible(!isDropdownVisible)}></i>
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Pet</th>
                    <th>Date Order</th>
                    <th>Services</th>
                    <th>Status</th>
                    <th>Status Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>
                        <img src={profileImage} alt="profile" />
                        <p>{appointment.nameOwner}</p>
                      </td>
                      <td>{appointment.pet_name}</td>
                      <td>{formatDate(appointment.schedules)}</td>
                      <td>{appointment.service}</td>
                      <td><span className={getStatusClassName(appointment.status)}>{appointment.status}</span></td>
                      <td>
                        <select 
                          value={appointment.status} 
                          onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                          <option value="Canceled">Canceled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </main>
      {/* MAIN */}
    </section>
  );
};

export default Content;
