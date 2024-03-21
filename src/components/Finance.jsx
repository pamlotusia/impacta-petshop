import React from 'react'
import { FinanceData } from '../Data/Data'

const Finance = () => {
  return (
    <div className="flex justify-center h-screen top-0 ml-[15%] w-[80%]">
      <div className="font-poppins">
        <p className="text-2xl grey-font my-5">Financeiro</p>
        {FinanceData.map((mes, mesIndex) => (
          <div key={mesIndex} className="my-10">
            <p className="font-bold pink-font text-xl my-2">{mes.mes}</p>
            <div className="finance-grid">
              {mes.semanas.map((semana, semanaIndex) => (
                <div key={semanaIndex}>
                  <p className="text-1xl ml-2 grey-font">
                    Semana {semanaIndex + 1}
                  </p>
                  <div className="finance-cards">
                    {semana.cards.map((card, cardIndex) => (
                      <div key={cardIndex}>
                        <div className="w-[248px] h-[70px] btn-cancel flex flex-col justify-evenly rounded-[10px] grey-font font-nunito">
                          <p className="font-bold text-sm ml-2 pink-font">
                            expectativa:
                            <span className="font-normal grey-font ml-3">
                              {' '}
                              R${card.expectativa}
                            </span>
                          </p>
                          <p className="font-bold text-sm ml-2">
                            rendimento bruto:
                            <span className="font-normal ml-3">
                              {' '}
                              R${card.rendimento_bruto}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Finance
