import React from 'react'

const PopUp = ({ date, time, service, onClose }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="fixed top-0 z-50 p-10 rounded-md shadow-lg my-20 py-8 flex flex-col md:w-[550px] bg-white">
        <span
          className="text-xl font-bold cursor-pointer top-3 right-3 color-title"
          onClick={onClose}
        >
          &times;
        </span>
        <p className="text-2xl text-center font-bold mb-8 color-title">
          Seu agendamento concluído com sucesso!
        </p>
          <div className="p-10 rounded-md shadow-lg bg-white  md:h-[250px] ">
            <p className="text-lg m-5 text-center font-bold color-title">
              {service}
            </p>
            <p className="text-lg m-5 text-center">{date}</p>
            <p className="text-lg m-5 text-center">às {time}</p>
          </div>
      </div>
    </div> 
  )
}
export default PopUp
