import React from 'react'
import ImagemPopUp from'../images/Pop-up.svg'

const PopUp = ({appoitmentInfo}) => {

  const {date, time, service} = appoitmentInfo
  return (
    <div className='popup'>
      <div className='popup-content'>
        <h2>Agendamento concluído com sucesso!</h2>
        <p>{service}</p>
        <p>{date}</p>
        <p>às {time}</p>
        <img src={ImagemPopUp} alt="" />
        <button>Fechar</button>
      </div>
    </div>
  )
}

export default PopUp