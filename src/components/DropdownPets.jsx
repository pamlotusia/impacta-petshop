import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'
import { getDatabase, ref, get } from 'firebase/database'

import { FaPlus, FaMinus } from 'react-icons/fa'
import iconDog from '../images/icon-dog.svg'
import iconCat from '../images/icon-cat.svg'
import iconBird from '../images/icon-bird.svg'
import iconRodent from '../images/icon-rodent.svg'

function DropdownPets({onPetSelect}) {
  const [isOpen, setIsOpen] = useState(false)
  const [pets, setPets] = useState([])
  const [selectedPet, setSelectedPet] = useState(null)

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
            console.log('Dados do pet:', petData)
            const petsArray = Object.values(petData)
            setPets(petsArray)
            localStorage.setItem('userPets', JSON.stringify(petsArray))
          } else {
            alert('Pet não encontrado')
          }
        })
        .catch(e => {
          alert(e.message)
        })
    } else {
      const storedPets = localStorage.getItem('userPets')
      if (storedPets) {
        const parsedPets = JSON.parse(storedPets)
        setPets(parsedPets)
      }
    }
  }, [])

  const handlePetClick = pet => {
    setSelectedPet(pet)
    setIsOpen(false)

    // chama a função de callback com o pet selecionado
    onPetSelect && onPetSelect(pet)
  }

  return (
    <div className=" relative flex flex-col items-center w-[340px] rounded-lg mt-8">
      <div
        onClick={() => setIsOpen(prev => !prev)}
        className=" shadow bg-white p-4 w-full flex items-center justify-between rounded-lg border-4 border-transparent active:border-yellow duration-300 active:yellow-font "
      >
        Selecione seu pet
        {!isOpen ? (
          <FaPlus className="yellow-font" />
        ) : (
          <FaMinus className="yellow-font" />
        )}
      </div>
      {isOpen && (
        <div className="bg-white absolute top-10 flex-col items-start rounded-lg p-2 w-full">
          {pets.length === 0 ? (
            //caso nenhum pet encontrado
            <div className="text-left h-[100px] m-3">
              <p className='mb-3'>
                É necessário ter um pet registrado para concluir o agendamento
              </p>
              <a href="/cadastrar-pet" className="yellow-font underline">
                Registrar um pet
              </a>
            </div>
          ) : (
            // Se houver pets, exibir a lista de pets
            pets.map((pet, index) => {
              const petType = pet.tipoDeAnimal
              const petInfo = colorIcon[petType]

              if (!petInfo) {
                return null
              }
              return (
                <div
                  className={`cursor-pointer flex items-center justify-center mx-2 my-6 p-2 rounded ${
                    selectedPet === pet ? 'bg-gray-200' : ''
                  }`}
                  key={index}
                  onClick={() => handlePetClick(pet)}
                >
                  <div
                    className={`${petInfo.color} h-[42px] w-[50px]  flex justify-center items-center rounded-full`}
                  >
                    <img
                      src={petInfo.icon}
                      alt={pet.nomePet}
                      className="h-[25px] w-[25px]"
                    />
                  </div>
                  <p className="w-full text-lg text-center font-normal break-words px-3 mt-2 grey-font ">
                    {pet.nomePet}
                  </p>
                </div>
              )
            })
          )}
        </div>
      )}
      {selectedPet && (
        <div className="mt-4">
          {/* Bloco da opção selecionada */}
          <div className="flex items-center justify-center mx-2 my-6 bg-gray-200 p-4 rounded-lg">
            <div
              className={`${
                colorIcon[selectedPet.tipoDeAnimal].color
              } h-[40px] w-[55px]  flex justify-center items-center rounded-full p-2`}
            >
              <img
                src={colorIcon[selectedPet.tipoDeAnimal].icon}
                alt={selectedPet.nomePet}
                className="h-[35px] w-[35px]"
              />
            </div>
            <p className="w-full text-lg text-center font-normal break-words px-3 mt-2 grey-font">
              {selectedPet.nomePet}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default DropdownPets
