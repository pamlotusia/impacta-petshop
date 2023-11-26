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

  // Função de limpar todos os valores inputados
  const handleResetForm = () => {
    setFormData({
      campoNome: '',
      campoIdade: '',
      campoPeso: ''
    });
    setSelectedAnimal(null);
    setNameAnimal('');
    setAgeAnimal('');
    setWeightAnimal('');
    setSelectedSize(null);
    setStarValue(null);
    setObservations('');
  };

  const handleAnimalButtonClick = animal => {
    setSelectedAnimal(animal)
  }

  const handleStarValueChange = value => {
    setStarValue(value)
  }

  return (
    <section>
      <p className="text-3xl text-center color-title font-bold mb-[60px] mt-10 ">
        Cadastre seu pet!
      </p>
      <div className=" w-full flex flex-col justify-center lg:flex-row md:flex-row px-5 overflow-hidden">
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
        
        <div className="flex flex-col hidden md:block lg:block">
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
            onResetForm={handleResetForm}
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
  onResetForm
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

  //limpa formulário
  const handleCancel = () => {
    onResetForm(); // Chama a função recebida para redefinir o formulário
  };


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
    // cardpreview
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
        <button className="text-center uppercase  btn-cancel w-[138px] h-[50px] rounded-3xl uppercase font-bold ml-5"
        onClick={handleCancel}>
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
    'arisco',
    'reservado',
    'calmo',
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
    // formulario cadastro de pets
    <div className="color-title">
      <div className="flex mb-[60px]">
        <div className="flex flex-col m-2">
          <label htmlFor="name" className="text-1xl uppercase font-bold mb-2">
            nome
          </label>
          <input
            type="text"
            id="name"
            className="w-auto lg:w-[280px] lg:h-[40px] border rounded focus:outline-none shadow-md p-2"
            name="campoNome"
            value={formData.campoNome}
            onChange={onChange}
            autoComplete='off'
          />
        </div>
        <div className="flex flex-col m-2">
          <label htmlFor="name" className="text-1xl uppercase font-bold mb-2">
            idade
          </label>
          <input
            type="text"
            id="name"
            className="lg:w-[280px] h-[40px] border rounded  focus:outline-none shadow-md p-2"
            name="campoIdade"
            value={formData.campoIdade}
            onChange={onChange}
            autoComplete='off'
          />
        </div>
      </div>

      <div className="flex flex-col w-[500px] mb-[60px]">
        <p className="text-1xl uppercase font-bold text-left ml-2 mb-4">Tipo</p>
        <div className="flex mx-0">
          <button
            className={`w-[80px] h-[80px] lg:w-[110px] lg:h-[100px] ${
              selectedAnimal === 'dog'
                ? 'medium-blue text-white'
                : 'light-blue-input color-title'
            } rounded-2xl flex flex-col justify-center items-center mx-2 custom-shadow text-white`}
            onClick={() => onAnimalButtonClick('dog')}
          >
            <img src={iconDog} alt="" className="w-[50px] lg:w-[70px]" />
            <p className="font-bold -mt-2 text-sm">cachorro</p>
          </button>
          <button
            className={`w-[80px] h-[80px] lg:w-[110px] lg:h-[100px] ${
              selectedAnimal === 'cat'
                ? 'yellow text-white'
                : 'light-blue-input color-title'
            } rounded-2xl flex flex-col justify-center items-center mx-2 custom-shadow`}
            onClick={() => onAnimalButtonClick('cat')}
          >
            <img src={iconCat} alt="" className="w-[50px] lg:w-[70px]" />
            <p className="font-bold -mt-2 font-sm">gato</p>
          </button>
          <button
            className={`w-[80px] h-[80px] lg:w-[110px] lg:h-[100px] ${
              selectedAnimal === 'bird'
                ? 'green text-white'
                : 'light-blue-input color-title'
            } rounded-2xl flex flex-col justify-center items-center mx-2 custom-shadow`}
            onClick={() => onAnimalButtonClick('bird')}
          >
            <img src={iconBird} alt="" className="w-[50px] lg:w-[70px]" />
            <p className="font-bold -mt-2 font-sm">pássaro</p>
          </button>
          <button
            className={`w-[80px] h-[80px] lg:w-[110px] lg:h-[100px] ${
              selectedAnimal === 'rodent'
                ? 'pink text-white'
                : 'light-blue-input color-title'
            } rounded-2xl flex flex-col justify-center items-center mx-2 custom-shadow`}
            onClick={() => onAnimalButtonClick('rodent')}
          >
            <img src={iconRodent} alt="" className="w-[50px] lg:w-[70px]" />
            <p className="font-bold -mt-2 font-sm">roedor</p>
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
              className={`w-[50px] h-[50px] lg:w-[81px] lg:h-[78px] ${
                selectedSize === 'pequeno'
                  ? 'button-active'
                  : 'light-blue-input'
              } rounded-2xl mx-2`}
              onClick={() => handleSizeButtonClick('pequeno')}
            >
              <p className="text-2xl lg:text-4xl text-white uppercase">p</p>
            </button>

            <button
              className={`w-[50px] h-[50px] lg:w-[81px] lg:h-[78px] ${
                selectedSize === 'médio' ? 'button-active' : 'light-blue-input'
              } rounded-2xl mx-2`}
              onClick={() => handleSizeButtonClick('médio')}
            >
              <p className="text-2xl lg:text-4xl text-white uppercase">m</p>
            </button>
            <button
              className={`w-[50px] h-[50px] lg:w-[81px] lg:h-[78px] ${
                selectedSize === 'grande' ? 'button-active' : 'light-blue-input'
              } rounded-2xl mx-2`}
              onClick={() => handleSizeButtonClick('grande')}
            >
              <p className="text-2xl lg:text-4xl text-white uppercase ">g</p>
            </button>
          </div>
        </div>

        <div className="flex flex-col ml-5 lg:ml-10">
          <p className="text-1xl uppercase font-bold text-left ml-2 mb-3">
            Peso
          </p>
          <small className="text-right text-gray-700">
            descreva o peso em kilo
          </small>
          <input
            type="text"
            id="name"
            className="lg:w-[250px] h-[40px] p-2 border rounded  focus:outline-none shadow-md"
            name="campoPeso"
            value={formData.campoPeso}
            placeholder="8kg"
            onChange={onChange}
            autoComplete='off'
          />
        </div>
      </div>

      <div className="flex mb-[60px] flex-col lg:flex-row">
        <div className="flex flex-col lg:mr-[40px] mb-5" >
          <p className="text-1xl uppercase font-bold text-left lg:ml-2 mb-4">
            Temperamento
          </p>
          <div className="flex justify-left">
            {selectedImages.map((selected, index) => (
              <img
                key={index}
                src={selected ? selectedStar : starIcon}
                className={`w-[20px] lg:w-[30px] mx-1 ${
                  selected ? 'selected-image' : 'unselected-image'
                }`}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-1xl uppercase font-bold text-left mb-3">
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
