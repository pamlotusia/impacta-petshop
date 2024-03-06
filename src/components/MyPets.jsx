import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
=======

// Dá merge nessa 
>>>>>>> 05477f3cb8ab03ecc30c44ac17b6cd8b1cd1dd5c

// Importe os ícones diretamente
import iconDog from '../images/icon-dog.svg';
import iconCat from '../images/icon-cat.svg';
import iconBird from '../images/icon-bird.svg';
import iconRodent from '../images/icon-rodent.svg';

const MyPets = () => {
  const [pets, setPets] = useState([]);

  const colorIcon = {
    dog: { color: 'medium-blue', icon: iconDog },
    cat: { color: 'yellow', icon: iconCat },
    bird: { color: 'green', icon: iconBird },
    rodent: { color: 'pink', icon: iconRodent },
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/pets', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setPets(data);
          localStorage.setItem('userPets', JSON.stringify(data));
        } else {
          alert('Erro ao buscar os pets');
        }
      } catch (error) {
        alert('Erro ao buscar os pets');
        console.error('Erro ao buscar os pets:', error);
      }
    };

    fetchPets();
  }, []);

  return (
    <div className="px-10 ">
      <h1 className="text-2xl color-title text-center font-poppins my-10">
        Meus <span className="font-bold"> bichinhos</span>
      </h1>
      <div className="grid grid-cols-1 justify-items-center gap-y-10 md:grid-cols-2 lg:grid-cols-5">
        {pets.map((pet, index) => {
          const petType = pet.pet_type.toLowerCase(); // Alteração aqui para usar o nome correto do campo
          const petInfo = colorIcon[petType];

          if (!petInfo) {
            return null;
          }

          return (
            <div
            className={`w-[260px] h-[170px] lg:h-[290px] rounded-2xl custom-shadow`}
            key={index}
          >
            <div className="flex flex-col items-center">
              <div
                className={`${petInfo.color} lg:h-[130px] lg:w-[130px] mt-3 p-1 lg:mt-8 flex justify-center items-center rounded-full`}
              >
                <img
                  src={petInfo.icon}
                  alt={pet.name}
                  className="h-[60px] w-[60px] lg:h-[100px] lg:w-[100px]"
                />
              </div>
              <p className="w-full text-lg text-center font-medium break-words px-3 lg:mt-2 ">
                {pet.name}
              </p>
              <p>Idade: {pet.age}</p>
              <p>Peso: {pet.weight}</p>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyPets;
