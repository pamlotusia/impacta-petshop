import React, { useState, useEffect } from 'react';
import { useSidebar } from '../contexts/SidebarContext';
import Graphics from './Graphics';
import 'boxicons/css/boxicons.min.css';
import './Sidebar.css'; // Reutilizando o CSS da Sidebar
import profileImage from '../images/robert.jpg';

const Dashboard = () => {
  const { toggleSidebar } = useSidebar();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('isDarkMode');
    return savedMode === 'true';
  });
  const [searchFormVisible, setSearchFormVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  useEffect(() => {
    // Atualiza o estado do dark mode no localStorage
    localStorage.setItem('isDarkMode', isDarkMode);
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

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
          <img src={profileImage} alt="profile" />
        </a>
      </nav>
      {/* NAVBAR */}

      {/* MAIN */}
      <main className="main-content">
        <div className='centered-div'>
          <Graphics />
        </div>

      </main>
      {/* MAIN */}
    </section>
  );
}

export default Dashboard;
