import { FC, useEffect, useState } from 'react';
import { Movie } from '../../api/Movies';
import { RefreshButtonComponent } from '../RefreshButtonComponent/RefreshButtonComponent';
import { ToggleFavoriteMovieButtonComponent } from '../ToggleFavoriteMovieButtonComponent/ToggleFavoriteMovieButtonComponent';
import { Link, useLocation } from 'react-router-dom';
import { TrailerComponent } from '../TrailerComponent/TrailerComponent';
import { MovieCharList } from '../MovieCharList/MovieCharList';
import '../../index.css';
import './style.css';
import './media.css';

export interface HeroContentComponent {
  randomMovie: Movie;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  infoMovieButtonsWrapper: object;
  infoMovieTrailer?: object;
  infoMovieLastItem?: object;
  infoMovieListButtons?: object;
}

export const HeroContentComponent: FC<HeroContentComponent> = ({
  randomMovie,
  setModalActive,
  infoMovieButtonsWrapper,
  infoMovieTrailer,
  infoMovieLastItem,
  infoMovieListButtons
}) => {

  const [modalTrailerActive, setModalTrailerActive] = useState(false)

  const location = useLocation();

  const [isMediumScreen, setIsMedeiumScreen] = useState(window.innerWidth > 577);

  useEffect(() => {
    const handleResize = () => {
      setIsMedeiumScreen(window.innerWidth > 577);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const ratingComponentStyle = {
    padding: '4px 12px 4px 33px',
    fontSize: '18px',
    backgroundPosition: '10px 8px',
    backgroundSize: '19.22px 14.47px',
    lineHeight: '24px',
  }

  const charComponentStyle = {
    fontSize: isMediumScreen ? '18px' : '14px',
    marginBottom: isMediumScreen ? '16px' : '12px',
    flexWrap: 'wrap',
    justifyContent: isMediumScreen ? 'flex-start' : 'center',
  }

  const marginRight = {
    marginRight: '16px'
  }

  return (
    <div className="hero-content">
      <MovieCharList marginRight={marginRight} charComponentStyle={charComponentStyle} ratingComponentStyle={ratingComponentStyle} randomMovie={randomMovie} />
      <h1 className='hero-header' >{randomMovie.title}</h1>
      <p className='hero-descr'>{randomMovie.plot}</p>
      <ul
        style={infoMovieButtonsWrapper}
        className='list-reset movie-list-buttons'
      >
        <li
          style={infoMovieListButtons}
          className='movie-list-buttons__item movie-list-buttons__item_first-child'>
          <TrailerComponent
            randomMovie={randomMovie}
            active={modalTrailerActive}
            setActive={setModalTrailerActive}
            infoMovieTrailer={infoMovieTrailer || {}}
          />
        </li>
        <li className='movie-list-buttons__item'>
          <Link
            className={location.pathname === '/' ? 'about-movie-link' : 'about-movie-link about-movie-link-none'}
            to={`/movie/${randomMovie.id}`}
          >
            О фильме
          </Link>
        </li>
        <li className='movie-list-buttons__item' style={infoMovieLastItem}>
          <ToggleFavoriteMovieButtonComponent
            id={randomMovie.id}
            setModalActive={setModalActive}
          />
        </li>
        <li className='movie-list-buttons__item'>
          <RefreshButtonComponent />
        </li>
      </ul>
    </div>
  )
}
