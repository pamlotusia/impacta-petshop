<<<<<<< HEAD
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
=======
import React from 'react'
import { UserAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { IoHome, IoCalendar } from 'react-icons/io5'
import { FaMoneyBillTransfer } from 'react-icons/fa6'
import { IoIosExit } from 'react-icons/io'

const Sidebar = () => {
  const { logout } = UserAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
      console.log('you are logout')
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <div className="p-6 pt-[10%] bg-background-color w-[20%] h-screen fixed left-0 top-0 color-title">
      {/* Envolver cada item em um componente Link ou usar navigate para redirecionar */}
      <Link to="/dashboard" className="flex items-center mb-8 cursor-pointer">
        <IoHome size={40} />
        <p className="font-medium ml-6">Home</p>
      </Link>

      <Link to="/agendamentos" className="flex items-center mb-8 cursor-pointer">
        <IoCalendar size={40} />
        <p className="font-medium ml-6">Agendamentos</p>
      </Link>

      <Link to="/financeiro" className="flex items-center cursor-pointer">
        <FaMoneyBillTransfer size={40} />
        <p className="font-medium ml-6">Financeiro</p>
      </Link>

      <div
        className="flex items-center mt-[50%] light-grey-font cursor-pointer"
        onClick={handleLogout}
      >
        <IoIosExit size={40} />
        <p className="font-medium ml-6">Sair</p>
      </div>
    </div>
  )
}

export default Sidebar
>>>>>>> origin/main
