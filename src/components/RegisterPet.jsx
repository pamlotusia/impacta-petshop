import React, { useState } from 'react'
import iconDog from '../images/icon-dog.svg'
import iconCat from '../images/icon-cat.svg'
import iconBird from '../images/icon-bird.svg'
import iconRodent from '../images/icon-rodent.svg'
import starIcon from '../images/star.svg'

const RegisterPet = () => {
  return (
    <section>
      <p className="text-3xl text-center font-bold mb-[60px] mt-10">
        Cadastre seu pet!
      </p>
      <div className="flex justify-center mt-10">
        {/* seção formulario */}
        <div className="w-[700px] ml-10">
          <div className="flex justify-left mb-[60px]">
            <div className="flex flex-col m-2">
              <label
                htmlFor="name"
                className="text-1xl uppercase font-bold mb-2"
              >
                nome
              </label>
              <input
                type="text"
                id="name"
                className="w-[280px] h-[40px] border rounded  focus:outline-none shadow-md"
              />
            </div>
            <div className="flex flex-col m-2">
              <label
                htmlFor="name"
                className="text-1xl uppercase font-bold mb-2"
              >
                idade
              </label>
              <input
                type="text"
                id="name"
                className="w-[280px] h-[40px] border rounded  focus:outline-none shadow-md"
              />
            </div>
          </div>

          <div className="flex flex-col w-[500px] mb-[60px]">
            <p className="text-1xl uppercase font-bold text-left ml-2 mb-4">
              Tipo
            </p>
            <div className="flex justify-center mx-0">
              <button className="w-[110px] h-[100px] light-blue-input rounded-2xl flex flex-col justify-center items-center mx-2 custom-shadow">
                <img src={iconDog} alt="" className="w-[70px]" />
                <p className="font-bold color-title -mt-2">cachorro</p>
              </button>

              <button className="w-[110px] h-[100px] light-blue-input rounded-2xl flex flex-col justify-center items-center mx-2 custom-shadow">
                <img src={iconCat} alt="" className="w-[70px]" />
                <p className="font-bold color-title -mt-2">gato</p>
              </button>

              <button className="w-[110px] h-[100px] light-blue-input rounded-2xl flex flex-col justify-center items-center mx-2 custom-shadow">
                <img src={iconBird} alt="" className="w-[70px]" />
                <p className="font-bold color-title -mt-2">pássaro</p>
              </button>

              <button className="w-[110px] h-[100px] light-blue-input rounded-2xl flex flex-col justify-center items-center mx-2 custom-shadow">
                <img src={iconRodent} alt="" className="w-[70px]" />
                <p className="font-bold color-title -mt-2">roedor</p>
              </button>
            </div>
          </div>

          <div className="flex mb-[60px]">
            <div className="flex flex-col">
              <p className="text-1xl uppercase font-bold text-left ml-2 mb-4">
                Tamanho
              </p>
              <div className="flex justify-left">
                <button className="w-[81px] h-[78px] light-blue-input rounded-2xl mx-2">
                  <p className="text-4xl text-white uppercase">p</p>
                </button>
                <button className="w-[81px] h-[78px] light-blue-input rounded-2xl mx-2">
                  <p className="text-4xl text-white uppercase">m</p>
                </button>
                <button className="w-[81px] h-[78px] light-blue-input rounded-2xl mx-2">
                  <p className="text-4xl text-white uppercase ">g</p>
                </button>
              </div>
            </div>

            <div className="flex flex-col ml-10">
              <p className="text-1xl uppercase font-bold text-left ml-2 mb-3">
                Peso
              </p>
              <small className="text-right text-gray-700">
                digite apenas números
              </small>
              <input
                type="text"
                id="name"
                className="w-[250px] h-[40px] border rounded  focus:outline-none shadow-md"
              />
            </div>
          </div>

          <div className="flex mb-[60px]">
            <div className="flex flex-col mr-[40px]">
              <p className="text-1xl uppercase font-bold text-left ml-2 mb-4">
                Temperamento
              </p>
              <div className="flex justify-left">
                <img src={starIcon} alt="" className="w-[30px] mx-1" />
                <img src={starIcon} alt="" className="w-[30px] mx-1" />
                <img src={starIcon} alt="" className="w-[30px] mx-1" />
                <img src={starIcon} alt="" className="w-[30px] mx-1" />
                <img src={starIcon} alt="" className="w-[30px] mx-1" />
              </div>
            </div>

            <div className="flex flex-col ml-12">
              <p className="text-1xl uppercase font-bold text-left ml-2 mb-3">
                observações
              </p>
              <textarea
                cols="30"
                rows="10"
                className="w-[300px] h-[150px] border rounded  focus:outline-none shadow-md p-2"
                placeholder="descreva caso seu bichinho tenha um comportamento específico. Ex: não gosta que toquem nas patas traseiras"
              ></textarea>
            </div>
          </div>
        </div>

        {/* seção preview */}
        <div className="flex flex-col mt-10 ">
          <div className="w-[340px] h-[430px] bg-[#F7F7F9] rounded-2xl mx-10 custom-shadow">
            <div className="flex flex-col items-center">
              <div className="medium-blue h-[180px] w-[190px]">
                <img src={iconDog} alt="" />
              </div>
              <p className="text-lg font-medium">Nome do cachorro</p>
              <p>tempo de vida</p>
            </div>

            <div className="grid grid-cols-2 ">
              <p className="p-4">tamanho</p>
              <p className="p-4">peso</p>
              <p className="p-4">temperamento</p>
            </div>
          </div>
          <div className="flex justify-evenly mt-8">
            <button className="text-center uppercase  btn-cancel w-[138px] h-[50px] rounded-3xl uppercase font-bold ml-5">
              cancelar
            </button>
            <button className="text-center uppercase bg-confirm-color w-[138px] h-[50px] rounded-3xl uppercase font-bold text-white mr-5">
              confirmar
            </button>
          </div>

        </div>

      </div>
    </section>
  )
}

export default RegisterPet
