import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'
import { getDatabase, ref, get } from 'firebase/database'

const Profile = () => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const user = auth.currentUser

    if (user) {
      const userId = user.uid
      const db = getDatabase()
      const userRef = ref(db, `users/${userId}`)

      get(userRef)
        .then(snapshot => {
          if (snapshot.exists()) {
            const userData = snapshot.val()
            setUserData(userData)
          } else {
            alert('dados do usuario nao encontrados')
          }
        })
        .catch(e => {
          alert('Erro ao obter dados do usuário no Firebase:', e.message)
        })
    }
  }, [])
  const db = getDatabase()
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
