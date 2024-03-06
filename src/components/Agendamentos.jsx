import React from 'react'
import { AgendamentosData } from '../Data/Data'

const Agendamentos = () => {
  return (
    <div className="Cards flex mt-20">
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
  )
}

export default Agendamentos
