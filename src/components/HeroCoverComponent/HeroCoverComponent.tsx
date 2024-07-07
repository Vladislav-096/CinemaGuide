import './style.css'
import './media.css'
import { Movie } from "../../api/Movies"

interface HeroCoverComponent {
  randomMovie: Movie
}

export const HeroCoverComponent = ({ randomMovie }: HeroCoverComponent) => {

  return (
    <picture className="cover-pic">
      {randomMovie.backdropUrl === null || randomMovie.backdropUrl === undefined ?
        <div></div> :
        <img className="cover-img" src={randomMovie.backdropUrl} alt="cover" />
      }
    </picture>
  )
}
