import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';
import { useSidebar } from '../contexts/SidebarContext';
import './Sidebar.css'; // Importação do CSS do caminho correto
import 'boxicons/css/boxicons.min.css';

const Sidebar = () => {
  const { logout } = UserAuth();
  const navigate = useNavigate();
  const { isSidebarHidden } = useSidebar();
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log('you are logout');
    } catch (e) {
      console.log(e.message);
    }
  };

  const menuItems = [
    { name: 'Dashboard', icon: 'bxs-dashboard', link: '/dashboard' },
    { name: 'My Jobs', icon: 'bxs-shopping-bag-alt', link: '/agendamentos' },
    { name: 'Finance', icon: 'bxs-doughnut-chart', link: '/financeiro' },
    { name: 'Message', icon: 'bxs-message-dots', link: '/message' },
    { name: 'Team', icon: 'bxs-group', link: '/team' }
  ];

  return (
    <section id="sidebar" className={isSidebarHidden ? 'hide' : ''}>
      <a href="#" className="brand">
        <i className='bx bxs-cat' style={{ fontSize: '35px' }}></i>
        <span className="text">MyPet</span>
      </a>
      <ul className="side-menu top">
        {menuItems.map((menu) => (
          <li className={activeMenu === menu.name ? 'active' : ''} key={menu.name}>
            <Link to={menu.link} onClick={() => handleMenuClick(menu.name)}>
              <i className={`bx ${menu.icon}`}></i>
              <span className="text">{menu.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="side-menu">
        <li>
          <a href="#">
            <i className='bx bxs-cog'></i>
            <span className="text">Settings</span>
          </a>
        </li>
        <li>
          <div className="logout" onClick={handleLogout}>
            <i className='bx bxs-log-out-circle'></i>
            <span className="text">Logout</span>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
