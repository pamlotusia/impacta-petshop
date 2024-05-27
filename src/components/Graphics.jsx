import React from 'react'
import { CardsData } from '../Data/Data'
import CardGraphic from './CardGraphic'

const Graphics = ({props}) => {
  return (
    <div className='Graphics'>
      {CardsData.map((card, id) =>{
        return(
          <div className="cardContainer">
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