import React from 'react'
import iconDog from '../images/icon-dog.svg'
import iconCat from '../images/icon-cat.svg'
import iconBird from '../images/icon-bird.svg'
import iconRodent from '../images/icon-rodent.svg'

const MyPets = () => {
  return (
    <div>
      <p className="font-poppins text-3xl text-center color-title mb-[60px] my-10">
        Meus <span className="font-bold">bichinhos</span>
      </p>
      <div id="board" className="m-20 grid grid-cols-5 gap-y-10">
        <div className="flex flex-col">
          <div className="w-[260px] min-h-[300px] bg-[#F7F7F9] rounded-2xl mx-10 custom-shadow">
            <div className="flex flex-col items-center">
              <div className="h-[130px] w-[130px] mt-10 flex justify-center items-center rounded-full yellow ">
                <img src={iconDog} alt="" className="h-[100px] w-[100px] " />
              </div>
              <p className="w-full text-lg  text-center font-medium break-words px-3 mt-2 ">
                Nome
              </p>
              <p>Idade</p>
              <p>Peso</p>
              <a href="" className="yellow-font mt-4 uppercase font-medium ">
                {' '}
                abrir
              </a>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default MyPets
