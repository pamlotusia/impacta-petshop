import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { getDatabase, ref, get } from 'firebase/database'

// Importe os ícones diretamente
import iconDog from '../images/icon-dog.svg'
import iconCat from '../images/icon-cat.svg'
import iconBird from '../images/icon-bird.svg'
import iconRodent from '../images/icon-rodent.svg'

const MyPets = () => {
  const [pets, setPets] = useState([])

  const colorIcon = {
    dog: {
      color: 'medium-blue',
      icon: iconDog
    },
    cat: {
      color: 'yellow',
      icon: iconCat
    },
    bird: {
      color: 'green',
      icon: iconBird
    },
    rodent: {
      color: 'pink',
      icon: iconRodent
    }
  }

  useEffect(() => {
    const user = auth.currentUser
    const db = getDatabase()

    if (user) {
      const uid = user.uid
      const petsRef = ref(db, `users/${uid}/pets`)

      get(petsRef)
        .then(snapshot => {
          if (snapshot.exists()) {
            const petData = snapshot.val()
            const petsArray = Object.values(petData)
            setPets(petsArray)

            localStorage.setItem('userPets', JSON.stringify(petsArray))
          } else {
            alert('pet nao encontrado')
          }
        })
        .catch(e => {
          alert(e.message)
        })
    } else {
      const storedPets = localStorage.getItem('userPets')
      if(storedPets){
        const parsedPets = JSON.parse(storedPets)
        setPets(parsedPets)
      }
    }
  }, [])

  return (
    <div>
      <h1 className="text-2xl color-title text-center font-poppins my-10">
        Meus <span className='font-bold'> bichinhos</span>
      </h1>
      <div className="m-20 grid grid-cols-5 gap-y-10">
      {pets.map((pet, index) => {
        const petType = pet.tipoDeAnimal
        const petInfo = colorIcon[petType]

        if (!petInfo) {
          return null
        }

        return (
          <div
            className={`w-[260px] min-h-[300px] bg-${petInfo.color} rounded-2xl mx-10 custom-shadow`}
            key={index}
          >
            <div className="flex flex-col items-center">
              <div
                className={`${petInfo.color} h-[130px] w-[130px] mt-10 flex justify-center items-center rounded-full`}
              >
                <img
                  src={petInfo.icon}
                  alt={pet.nomePet}
                  className="h-[100px] w-[100px]"
                />
              </div>
              <p className="w-full text-lg text-center font-medium break-words px-3 mt-2 ">
                {pet.nomePet}
              </p>
              <p>Idade: {pet.idadePet}</p>
              <p>Peso: {pet.pesoPet}</p>
              <a href="" className="yellow-font mt-4 uppercase font-medium">
                {' '}
                abrir
              </a>
            </div>
          </div>
        )
      })}
    </div>

    </div>
  )
}

export default MyPets
