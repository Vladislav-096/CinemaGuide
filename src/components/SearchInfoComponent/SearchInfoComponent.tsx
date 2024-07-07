import { Link } from "react-router-dom";
import { MovieListType } from "../../api/Movies";
import { MovieCharList } from "../MovieCharList/MovieCharList";
import { useEffect, useState } from "react";
import '../../index.css'
import './style.css'
import './media.css'

interface SearchInfoComponent {
  isText: string;
  suggestions: MovieListType;
}

export const SearchInfoComponent = ({ isText, suggestions }: SearchInfoComponent) => {

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 577);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 577);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const ratingComponentStyle = {
    padding: '2px 8px 2px 22px',
    fontSize: '12px',
    backgroundPosition: '6px 4px',
    backgroundSize: '11.22px 11.47px',
    lineHeigh: '16px',
  }

  const charComponentStyle = {
    fontSize: "14px",
    marginBottom: isLargeScreen ? '6px' : '8px',
    flexWrap: isLargeScreen ? 'nowrap' : 'wrap',
  }

  const marginRight = {
    marginRight: '12px'
  }

  return (
    <>
      {suggestions.length !== 0
        && <div className={isText ? 'search-info-container active' : 'search-info-container'}>
          <ul className="list-reset search-list">
            {suggestions.map((movie, index) => (
              <li className="search-card" key={index}>
                <Link className="search-card-link" to={`/movie/${movie.id}`}>
                  <picture className="search-card-picture">
                    <img className="search-card-image" src={(movie.posterUrl !== null && movie.posterUrl !== undefined) ? movie.posterUrl : ''} />
                  </picture>
                  <div className="search-card-wrapper">
                    <MovieCharList marginRight={marginRight} ratingComponentStyle={ratingComponentStyle} charComponentStyle={charComponentStyle} randomMovie={movie} />
                    <h3 className="serch-card-title">{movie.title}</h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>}
    </>
  )
}
