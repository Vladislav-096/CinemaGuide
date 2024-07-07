import { MovieListType } from '../../api/Movies';
import { MovieCard } from '../MovieCard/MovieCard';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';
import '../../index.css';
import './style.css';
import './media.css';

export interface MovieCards {
  moviesData: MovieListType;
  genreCardStyle?: object;
  genreCardWidth?: object;
}

export const MovieCards = ({ moviesData, genreCardStyle, genreCardWidth }: MovieCards) => {
  const location = useLocation();

  const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  const { events } = useDraggable(ref, {
    applyRubberBandEffect: true,
    decayRate: 0.96,
  });

  return (
    <div
      {...events}
      ref={ref}
      className={
        location.pathname !== '/' && location.pathname !== '/account'
          ? 'card-list row row-cols-xxl-5 card-list-genre'
          : "card-list row row-cols-xxl-5 card-list-top-ten-account"
      }
    >
      <MovieCard
        moviesData={moviesData}
        genreCardStyle={genreCardStyle}
        genreCardWidth={genreCardWidth}
      />
    </div>
  )
}
