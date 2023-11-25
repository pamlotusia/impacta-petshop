import React, { useEffect, useState } from 'react';

function Price({ serviceType, groomingType, selectedPet, setFinalPrice }) {
  const [finalPrice, setFinalPriceLocal] = useState(0);

  useEffect(() => {
    const calculatePrice = () => {
      let basePrice = 0;

      if (serviceType === 'Apenas banho') {
        basePrice += 40;
      } else if (serviceType === 'Banho & Tosa') {
        basePrice += 50;

        if (groomingType !== 'Tosa higiênica') {
          basePrice += 10;
        }
      }

      // Adicione lógica para calcular o preço com base nas informações do pet

      setFinalPriceLocal(basePrice.toFixed(2));
      setFinalPrice(basePrice.toFixed(2)); // Atualiza o preço no componente Home
    };

    calculatePrice();
  }, [serviceType, groomingType, selectedPet, setFinalPrice]);

  return (
    <div className='text-center bg-white  p-2 w-[340px] rounded-lg shadow mt-8 price-component'>
      <p className="text-xl font-bold color-title ">Valor final</p>
      <p className='grey-font'>R$ {finalPrice}</p>
    </div>
  );
}

export default Price;
