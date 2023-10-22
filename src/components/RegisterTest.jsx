import React, { useEffect, useState } from 'react'
import iconDog from '../images/icon-dog.svg'
import iconCat from '../images/icon-cat.svg'
import iconBird from '../images/icon-bird.svg'
import iconRodent from '../images/icon-rodent.svg'
import starIcon from '../images/star.svg'
import selectedStar from '../images/star-selected.svg'

import { auth } from '../firebase'
import { set, getDatabase, ref } from 'firebase/database'

const RegisterTest = () => {
  // Informações que vão para o CardPreview
  const [formData, setFormData] = useState({
    // Inicialize os campos do formulário com valores padrão se necessário
    campoNome: '',
    campoIdade: '',
    campoPeso: ''
  })
  const [selectedAnimal, setSelectedAnimal] = useState(null)
  const [nameAnimal, setNameAnimal] = useState('')
  const [ageAnimal, setAgeAnimal] = useState('')
  const [weightAnimal, setWeightAnimal] = useState('')
  const [selectedSize, setSelectedSize] = useState(null)
  const [starValue, setStarValue] = useState(null)
  const [observations, setObservations] = useState('')

  const handleFormChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleAnimalButtonClick = animal => {
    setSelectedAnimal(animal)
  }

  const handleStarValueChange = value => {
    setStarValue(value)
  }

  return (
    <section>
      <p className="text-3xl text-center font-bold mb-[60px] mt-10">
        Cadastre seu pet!
      </p>
      <div className="flex justify-center mt-10">
        <div className="w-[700px] ml-10">
          <Formulario
            onChange={handleFormChange}
            formData={formData}
            selectedAnimal={selectedAnimal}
            onAnimalButtonClick={handleAnimalButtonClick}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            onStarValueChange={handleStarValueChange}
            observations={observations}
            setObservations={setObservations}
          />
        </div>
        <div className="flex flex-col mt-10">
          <CardPreview
            formData={formData}
            selectedAnimal={selectedAnimal}
            selectedSize={selectedSize}
            starValue={starValue}
            nameAnimal={nameAnimal}
            ageAnimal={ageAnimal}
            weightAnimal={weightAnimal}
            setNameAnimal={setNameAnimal}
            setAgeAnimal={setAgeAnimal}
            setWeightAnimal={setWeightAnimal}
            observations={observations}
          />
        </div>
      </div>
    </section>
  )
}

const CardPreview = ({
  formData,
  nameAnimal,
  ageAnimal,
  weightAnimal,
  setNameAnimal,
  setAgeAnimal,
  setWeightAnimal,
  selectedAnimal = { selectedAnimal },
  selectedSize ={selectedSize},
  starValue,
  observations,
}) => {
  // função envia dados para banco
  const handleConfirmPet = async () => {
    if (!nameAnimal || !ageAnimal || !weightAnimal || !selectedAnimal || !selectedSize) {
      alert('por favor preencha os campos')
      return
    }

    console.log(observations)
    try {
      const user = auth.currentUser
      const uid = user.uid

      const data = {
        nomePet: nameAnimal,
        idadePet: ageAnimal,
        pesoPet: weightAnimal,
        observacoes: observations,
        tipoDeAnimal: selectedAnimal,
        tamanho: selectedSize,
        temperamento: starValue
      }

      const db = getDatabase()
      const petRef = ref(db, `users/${uid}/pets/${data.nomePet}`)
      await set(petRef, data)

      alert('pet cadastrado com sucesso!!!')
    } catch (e) {
      alert(e, e.message)
    }
  }

  useEffect(() => {
    setNameAnimal(formData.campoNome)
  }, [formData.campoNome])

  useEffect(() => {
    setAgeAnimal(formData.campoIdade)
  }, [formData.campoIdade])

  useEffect(() => {
    setWeightAnimal(formData.campoPeso)
  }, [formData.campoPeso])

  const animalColors = {
    dog: 'medium-blue',
    cat: 'yellow',
    bird: 'green',
    rodent: 'pink'
  }

  const getAnimalIcon = animalType => {
    switch (animalType) {
      case 'dog':
        return iconDog
      case 'cat':
        return iconCat
      case 'bird':
        return iconBird
      case 'rodent':
        return iconRodent
      default:
        return iconDog
    }
  }
  return (
    <div className="flex flex-col">
      <div className="w-[300px] h-[350px] bg-[#F7F7F9] rounded-2xl mx-10 custom-shadow">
        <div className="flex flex-col items-center">
          <div
            className={`h-[100px] w-[100px] mt-10 flex justify-center rounded-full ${
              selectedAnimal ? animalColors[selectedAnimal] : 'medium-blue'
            }`}
          >
            <img src={getAnimalIcon(selectedAnimal)} alt="" />
          </div>
          <p className="w-full text-lg  text-center font-medium break-words px-3">
            {formData.campoNome}
          </p>
          <p>{formData.campoIdade}</p>
        </div>

        <div className="grid grid-cols-2 px-10 py-5">
          <p className="px-4">{selectedSize}</p>
          <p className="px-4">{formData.campoPeso}</p>
          <p className="p-2">{starValue}</p>
        </div>
      </div>
      <div className="flex justify-evenly mt-8">
        <button className="text-center uppercase  btn-cancel w-[138px] h-[50px] rounded-3xl uppercase font-bold ml-5">
          cancelar
        </button>
        <button
          className="text-center uppercase yellow w-[138px] h-[50px] rounded-3xl uppercase font-bold text-white mr-5"
          onClick={handleConfirmPet}
        >
          confirmar
        </button>
      </div>
    </div>
  )
}

const Formulario = ({
  onChange,
  formData,
  selectedAnimal,
  onAnimalButtonClick,
  selectedSize,
  setSelectedSize,
  onStarValueChange,
  observations, 
  setObservations
}) => {
  // legenda de cada estrela
  const starValues = [
    'poucas ideia',
    'calmo',
    'moderado',
    'simpático',
    'felizão'
  ]

  const [selectedImages, setSelectedImages] = useState([
    false,
    false,
    false,
    false,
    false
  ])

  const handleImageClick = index => {
    const newSelectedImages = [...selectedImages]

    onStarValueChange(starValues[index])

    //deselecionar estrelas
    newSelectedImages.fill(false)

    //seleciona a imagem da primeira posição pra frente
    for (let i = 0; i <= index; i++) {
      newSelectedImages[i] = true
    }

    setSelectedImages(newSelectedImages)
  }

  const handleSizeButtonClick = size => {
    setSelectedSize(size)
  }
  return (
    <div className="w-[700px] ml-10">
      <div className="flex justify-left mb-[60px]">
        <div className="flex flex-col m-2">
          <label htmlFor="name" className="text-1xl uppercase font-bold mb-2">
            nome
          </label>
          <input
            type="text"
            id="name"
            className="w-[280px] h-[40px] border rounded focus:outline-none shadow-md p-2"
            name="campoNome"
            value={formData.campoNome}
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col m-2">
          <label htmlFor="name" className="text-1xl uppercase font-bold mb-2">
            idade
          </label>
          <input
            type="text"
            id="name"
            className="w-[280px] h-[40px] border rounded  focus:outline-none shadow-md p-2"
            name="campoIdade"
            value={formData.campoIdade}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="flex flex-col w-[500px] mb-[60px]">
        <p className="text-1xl uppercase font-bold text-left ml-2 mb-4">Tipo</p>
        <div className="flex justify-center mx-0">
          <button
            className={`w-[110px] h-[100px] ${
              selectedAnimal === 'dog'
                ? 'medium-blue text-white'
                : 'light-blue-input color-title'
            } rounded-2xl flex flex-col justify-center items-center mx-2 custom-shadow text-white`}
            onClick={() => onAnimalButtonClick('dog')}
          >
            <img src={iconDog} alt="" className="w-[70px]" />
            <p className="font-bold -mt-2">cachorro</p>
          </button>

          <button
            className={`w-[110px] h-[100px] ${
              selectedAnimal === 'cat'
                ? 'yellow text-white'
                : 'light-blue-input color-title'
            } rounded-2xl flex flex-col justify-center items-center mx-2 custom-shadow`}
            onClick={() => onAnimalButtonClick('cat')}
          >
            <img src={iconCat} alt="" className="w-[70px]" />
            <p className="font-bold -mt-2">gato</p>
          </button>

          <button
            className={`w-[110px] h-[100px] ${
              selectedAnimal === 'bird'
                ? 'green text-white'
                : 'light-blue-input color-title'
            } rounded-2xl flex flex-col justify-center items-center mx-2 custom-shadow`}
            onClick={() => onAnimalButtonClick('bird')}
          >
            <img src={iconBird} alt="" className="w-[70px]" />
            <p className="font-bold  -mt-2">pássaro</p>
          </button>

          <button
            className={`w-[110px] h-[100px] ${
              selectedAnimal === 'rodent'
                ? 'pink text-white'
                : 'light-blue-input color-title'
            } rounded-2xl flex flex-col justify-center items-center mx-2 custom-shadow`}
            onClick={() => onAnimalButtonClick('rodent')}
          >
            <img src={iconRodent} alt="" className="w-[70px]" />
            <p className="font-bold -mt-2">roedor</p>
          </button>
        </div>
      </div>

      <div className="flex mb-[60px]">
        <div className="flex flex-col">
          <p className="text-1xl uppercase font-bold text-left ml-2 mb-4">
            Tamanho
          </p>
          <div className="flex justify-left">
            <button
              className={`w-[81px] h-[78px] ${
                selectedSize === 'pequeno'
                  ? 'button-active'
                  : 'light-blue-input'
              } rounded-2xl mx-2`}
              onClick={() => handleSizeButtonClick('pequeno')}
            >
              <p className="text-4xl text-white uppercase">p</p>
            </button>

            <button
              className={`w-[81px] h-[78px] ${
                selectedSize === 'médio' ? 'button-active' : 'light-blue-input'
              } rounded-2xl mx-2`}
              onClick={() => handleSizeButtonClick('médio')}
            >
              <p className="text-4xl text-white uppercase">m</p>
            </button>
            <button
              className={`w-[81px] h-[78px] ${
                selectedSize === 'grande' ? 'button-active' : 'light-blue-input'
              } rounded-2xl mx-2`}
              onClick={() => handleSizeButtonClick('grande')}
            >
              <p className="text-4xl text-white uppercase ">g</p>
            </button>
          </div>
        </div>

        <div className="flex flex-col ml-10">
          <p className="text-1xl uppercase font-bold text-left ml-2 mb-3">
            Peso
          </p>
          <small className="text-right text-gray-700">
            descreva o peso em kilo
          </small>
          <input
            type="text"
            id="name"
            className="w-[250px] h-[40px] border rounded  focus:outline-none shadow-md"
            name="campoPeso"
            value={formData.campoPeso}
            placeholder="8kg"
            onChange={onChange}
          />
        </div>
      </div>

      <div className="flex mb-[60px]">
        <div className="flex flex-col mr-[40px]">
          <p className="text-1xl uppercase font-bold text-left ml-2 mb-4">
            Temperamento
          </p>
          <div className="flex justify-left">
            {selectedImages.map((selected, index) => (
              <img
                key={index}
                src={selected ? selectedStar : starIcon}
                className={`w-[30px] mx-1 ${
                  selected ? 'selected-image' : 'unselected-image'
                }`}
                onClick={() => handleImageClick(index)}
              />
            ))}
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
            value={observations}
            onChange={e => setObservations(e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  )
}

export default RegisterTest
