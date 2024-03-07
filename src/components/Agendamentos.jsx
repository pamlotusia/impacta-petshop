import React, { useState } from 'react'
import { AgendamentosData } from '../Data/Data'

const Agendamentos = () => {
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  }

  return (
    <div className="">
      <div className="flex mt-10 justify-between items-center">
        <p className="text-2xl grey-font">Agendamentos</p>
        <div className="flex">
          <p
            className={`mx-1 p-2 px-5 light-blue-input rounded-[50px] ${selectedFilter === 'dia' ? 'button-active' : 'text-black'}`}
            onClick={() => handleFilterClick('dia')}
          >
            dia
          </p>
          <p
            className={`mx-1 p-2 px-5 light-blue-input rounded-[50px] ${selectedFilter === 'semana' ? 'button-active' : 'text-black'}`}
            onClick={() => handleFilterClick('semana')}
          >
            semana
          </p>
          <p
            className={`mx-1 p-2 px-5 light-blue-input rounded-[50px] ${selectedFilter === 'mês' ? 'bg-blue-500 text-white' : 'text-black'}`}
            onClick={() => handleFilterClick('mês')}
          >
            mês
          </p>
        </div>
      </div>

      <div className="Cards flex mt-10">
        {AgendamentosData.map((card, id) => {
          return (
            <div>
              <p className="m-3">{card.time}</p>

              <div className="parentContainer">
                <p className="text-md font-bold">{card.typeService}</p>
                <p className="text-sm">
                  {card.nameOwner}, {card.sizeAnimal}, {card.price}
                </p>
                <p>
                  <span className="font-bold font-md">alterar status </span>

                  <select className="btn-select">
                    <option value="">Selecione uma opção</option>
                    {Array.from(
                      new Set(AgendamentosData.flatMap(card => card.state))
                    ).map((state, index) => (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Agendamentos
