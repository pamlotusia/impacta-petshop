import React, { useEffect, useState } from 'react';

const RegisterTest = () => {
  const [formData, setFormData] = useState({
    campoNome: '',
    campoIdade: '',
    campoPeso: ''
  });
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [nameAnimal, setNameAnimal] = useState('');
  const [ageAnimal, setAgeAnimal] = useState('');
  const [weightAnimal, setWeightAnimal] = useState('');
  const [selectedSize, setSelectedSize] = useState(null);
  const [starValue, setStarValue] = useState(null);
  const [observations, setObservations] = useState('');

  const handleFormChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

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
    setSelectedAnimal(animal);
  };

  const handleStarValueChange = value => {
    setStarValue(value);
  };

  const handleConfirmPet = async () => {
    if (!nameAnimal || !ageAnimal || !weightAnimal || !selectedAnimal || !selectedSize) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    console.log(observations);
    try {
      const data = {
        name: nameAnimal,
        age: parseInt(ageAnimal),
        pet_type: selectedAnimal,
        weight: parseFloat(weightAnimal),
        size: selectedSize,
        temper: starValue,
        comment: observations
      };

      // Aqui você faria a chamada para a sua API para enviar os dados
      console.log('Dados do pet:', data);

      alert('Pet cadastrado com sucesso!');
    } catch (error) {
      alert('Erro ao cadastrar pet: ' + error.message);
    }
  };

  useEffect(() => {
    setNameAnimal(formData.campoNome);
  }, [formData.campoNome]);

  useEffect(() => {
    setAgeAnimal(formData.campoIdade);
  }, [formData.campoIdade]);

  useEffect(() => {
    setWeightAnimal(formData.campoPeso);
  }, [formData.campoPeso]);

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
            nameAnimal={nameAnimal}
            ageAnimal={ageAnimal}
            weightAnimal={weightAnimal}
            selectedAnimal={selectedAnimal}
            selectedSize={selectedSize}
            starValue={starValue}
            observations={observations}
            onResetForm={handleResetForm}
            onConfirmPet={handleConfirmPet}
          />
        </div>
      </div>
    </section>
  );
};

const CardPreview = ({
  nameAnimal,
  ageAnimal,
  weightAnimal,
  selectedAnimal,
  selectedSize,
  starValue,
  observations,
  onResetForm,
  onConfirmPet
}) => {
  const handleCancel = () => {
    onResetForm();
  };

  return (
    <div className="flex flex-col">
      <div className="w-[300px] h-[350px] bg-[#F7F7F9] rounded-2xl mx-10 custom-shadow">
        <div className="flex flex-col items-center">
          <p className="w-full text-lg  text-center font-medium break-words px-3">{nameAnimal}</p>
          <p>{ageAnimal}</p>
        </div>
        <div className="grid grid-cols-2 px-10 py-5">
          <p className="px-4">{selectedSize}</p>
          <p className="px-4">{weightAnimal}</p>
          <p className="p-2">{starValue}</p>
        </div>
      </div>
      <div className="flex justify-evenly mt-8">
        <button className="text-center uppercase  btn-cancel w-[138px] h-[50px] rounded-3xl uppercase font-bold ml-5" onClick={handleCancel}>
          cancelar
        </button>
        <button
          className="text-center uppercase yellow w-[138px] h-[50px] rounded-3xl uppercase font-bold text-white mr-5"
          onClick={onConfirmPet}
        >
          confirmar
        </button>
      </div>
    </div>
  );
};

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
  const starValues = ['arisco', 'reservado', 'calmo', 'simpático', 'felizão'];

  const [selectedImages, setSelectedImages] = useState([false, false, false, false, false]);

  const handleImageClick = index => {
    const newSelectedImages = [...selectedImages];
    onStarValueChange(starValues[index]);
    newSelectedImages.fill(false);
    for (let i = 0; i <= index; i++) {
      newSelectedImages[i] = true;
    }
    setSelectedImages(newSelectedImages);
  };

  const handleSizeButtonClick = size => {
    setSelectedSize(size);
  };

  return (
    <div className="color-title">
      <div className="flex flex-col md:flex-row lg:flex-row mb-[60px]">
        <div className="flex flex-col m-2">
          <input
            type="text"
            id="name"
            className="w-auto lg:w-[280px] lg:h-[40px] border rounded focus:outline-none shadow-md p-2"
            name="campoNome"
            value={formData.campoNome}
            onChange={onChange}
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col m-2">
          <input
            type="text"
            id="name"
            className="lg:w-[280px] h-[40px] border rounded focus:outline-none shadow-md p-2"
            name="campoIdade"
            value={formData.campoIdade}
            onChange={onChange}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="flex flex-col align- mb-[60px]">
        <div className="flex ">
          <button
            className={`w-[80px] h-[80px] lg:w-[110px] lg:h-[100px] ${
              selectedAnimal === 'dog' ? 'medium-blue text-white' : 'light-blue-input color-title'
            } rounded-2xl flex flex-col justify-center items-center mx-2 custom-shadow text-white`}
            onClick={() => onAnimalButtonClick('dog')}
          >
            <p className="font-bold -mt-2 text-sm">cachorro</p>
          </button>
          {/* Botões dos outros animais aqui */}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row mb-[50px]">
        {/* Tamanhos */}
        {/* Peso */}
      </div>
      <div className="flex mb-[60px] flex-col lg:flex-row">
        <div className="flex flex-col lg:mr-[40px] mb-5">
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
          <textarea
            cols="30"
            rows="10"
            className="w-[300px] h-[150px] border rounded focus:outline-none shadow-md p-2"
            value={observations}
            onChange={e => setObservations(e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default RegisterTest;
