import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { UserAuth } from '../contexts/AuthContext'

const Profile = () => {
  const { user } = UserAuth();
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if ( user ) {
        try {
          const response = await axios.get('http://127.0.0.1:5000/profile',{
            headers: {
              'Content-Type': 'application/json'
              , Authorization: `Bearer ${user.token}`
            }
          });
          setUserData(response.data)
        } catch (error) {
          console.log('Erro ao obyer dados do usuário:', error)
          alert('Erro ao obter dados do usuário:', error.message)
        }
      }
    };
    fetchData();
  }, [user]); 
  return (
    <div className="mx-20 font-poppins">
      <h1 className="text-3xl color-title text-left font-poppins  font-medium my-10">
        Meu perfil
      </h1>
      {userData ? (
        <div className="flex flex-col">
          <p className="text-2xl font-medium mb-3">Dados pessoais</p>
          <p className="text-1xl mb-3">{userData.name}</p>
          <p className="text-1xl mb-3">{userData.email}</p>
          <p className="text-1xl mb-3">{userData.phone}</p>
        </div>
      ) : (
        <p> Carregando informações do perfil...</p>
      )}
    </div>
  )
}

export default Profile
