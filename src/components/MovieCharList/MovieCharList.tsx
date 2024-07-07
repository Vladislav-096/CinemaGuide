import { useCallback } from "react"
import { Movie } from "../../api/Movies"
import { RaitingComponent } from "../RaitingComponent/RaitingComponent";
import '../../index.css';
import './style.css'
import './media.css'

export interface MovieCharList {
  randomMovie: Movie;
  charComponentStyle: object;
  ratingComponentStyle: object;
  marginRight: object
}

export const MovieCharList = ({ marginRight, randomMovie, charComponentStyle, ratingComponentStyle }: MovieCharList) => {
  const convertTime = useCallback(() => {
    const minsInHour = 60;
    if (randomMovie.runtime < minsInHour) {
      return `${randomMovie.runtime} мин`
    }

    let hours = Math.floor(randomMovie.runtime / minsInHour);

    if (hours >= 1) {
      let mins = randomMovie.runtime - hours * minsInHour

      if (mins == 0) {
        return `${hours} ч`
      }

      return `${hours} ч ${mins} мин`
    }
  }, [randomMovie.runtime])

  return (
    <ul
      className="list-reset movie-info-list"
      style={charComponentStyle}
    >
      <li
        className='movie-info-list__item'
        style={marginRight}
      >
        <RaitingComponent raiting={randomMovie.tmdbRating} ratingComponentStyle={ratingComponentStyle} />
      </li>
      <li
        className='movie-info-list__item'
        style={marginRight}
      >
        {randomMovie.releaseYear}
      </li>
      <li
        className='movie-info-list__item'
        style={marginRight}
      >
        {randomMovie.genres.map((genre, index) => (
          <span className='genre-element' key={index}>{genre}</span>
        ))}
      </li>
      <li
        className='movie-info-list__item'
      >
        {convertTime()}
      </li>
    </ul>
  )
}
