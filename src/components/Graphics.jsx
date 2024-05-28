import React from 'react'
import { CardsData } from '../Data/Data'
import CardGraphic from './CardGraphic'

const Graphics = () => {
  return (
    <div className="Graphics m-10">
      {CardsData.map((card, id) => {
        return (
          <div className="cardContainer" key={id}>
            <CardGraphic
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              series={card.series}
            />
          </div>
        )
      })}
    </div>
  )
}

export default Graphics
