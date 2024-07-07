import { useCallback } from 'react'
import './style.css'

interface RaitingComponent {
  raiting: number;
  ratingComponentStyle: object;
}

export const RaitingComponent = ({ raiting, ratingComponentStyle }: RaitingComponent) => {

  const backgroundColor = useCallback(() => {
    if (raiting <= 4.2) {
      return '#C82020'
    } else if (raiting <= 6.3) {
      return '#777777'
    } else if (raiting <= 7.3) {
      return '#A59400'
    } else {
      return '#308E21'
    }
  }, [raiting])

  const combinedStyle = {
    backgroundColor: backgroundColor(),
    ...ratingComponentStyle
  };

  return (
    <div
      className="movie-info-list__item-raiting"
      style={combinedStyle}
    >
      {raiting.toPrecision(2)}
    </div >
  )
}
