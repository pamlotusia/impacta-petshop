// Price.js
import React from 'react';

function Price({ serviceType, groomingType, selectedPet }) {
  const calculatePrice = () => {
    // Lógica para calcular o preço com base nas informações fornecidas
    let basePrice = 0;

    // Adicione lógica para calcular o preço com base no serviço selecionado
    if (serviceType === 'Apenas banho') {
      basePrice += 40; // Exemplo de preço para banho
    } else if (serviceType === 'Banho & Tosa') {
      basePrice += 50
      
      if(groomingType !== 'Tosa higiênica'){
        basePrice += 10
      } 
    }


    // Adicione lógica para calcular o preço com base nas informações do pet
    if (selectedPet) {
      const { peso } = selectedPet; // Substitua pelos atributos corretos
      // Lógica para calcular o preço com base no peso do pet
      // Exemplo: Adicionar um valor adicional para pets com peso específico
    }

    return basePrice;
  };

  const finalPrice = calculatePrice();

  return (
    <div className='text-center bg-white  p-2 w-[340px] rounded-lg shadow mt-8'>
      <p className="text-xl font-bold color-title ">Valor final</p>
      <p className='grey-font'>R$ {finalPrice.toFixed(2)}</p>
    </div>
  );
}

export default Price;
