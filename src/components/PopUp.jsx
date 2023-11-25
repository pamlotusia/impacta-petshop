// PopUp.js

import React from 'react';

const PopUp = ({ date, time, service, price, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute w-full h-full bg-gray-900 opacity-50" onClick={onClose}></div>
      <div className="bg-white p-8 rounded-lg z-50">
        <div className="text-2xl color-title font-bold  mb-4">Agendamento Confirmado!</div>
        <div className='flex justify-center items-center flex-col grey-font'>
        <div className="mb-2">
          <strong>Data:</strong> {date}
        </div>
        <div className="mb-2">
          <strong>às </strong> {time}
        </div>
        <div className="mb-2">
          <strong>Serviço:</strong> {service}
        </div>
        <div className="mb-2">
          <strong>Valor final</strong> R$: {price}
        </div>

        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded-md font-bold mt-2"
          onClick={onClose}
        >
          Fechar
        </button>

        </div>
        
        
      </div>
    </div>
  );
};

export default PopUp;
