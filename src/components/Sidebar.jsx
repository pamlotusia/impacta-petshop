import React from 'react'
import { UserAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
// icons
import { IoHome } from 'react-icons/io5'
import { IoCalendar } from 'react-icons/io5'
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
      <div className="flex items-center mb-8 cursor-pointer">
        <IoHome size={40} />
        <p className="font-medium ml-6">Home</p>
      </div>

      <div className="flex items-center mb-8 cursor-pointer">
        <IoCalendar size={40} />
        <p className="font-medium ml-6"><Link to={'/agendamentos'}>Agendamentos</Link></p>
      </div>

      <div className="flex items-center cursor-pointer">
        <FaMoneyBillTransfer size={40} />
        <p className="font-medium ml-6"><Link to={'/financeiro'}>Financeiro</Link></p>
      </div>

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
