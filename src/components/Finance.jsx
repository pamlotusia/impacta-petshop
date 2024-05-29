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
