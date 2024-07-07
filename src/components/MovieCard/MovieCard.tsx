import { Link, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { removeFavoriteMovie } from "../../api/Movies";
import { queryClient } from "../../api/queryClient";
import { MovieCards } from "../MovieCards/MovieCards";
import { RemoveFavoriteMovieButton } from "../../ui/RemoveFavoriteMovieButton/RemoveFavoriteMovieButton";
import { fetchMe } from "../../api/User";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import '../../index.css'
import './style.css'
import './media.css'

export const MovieCard = ({ moviesData, genreCardStyle, genreCardWidth }: MovieCards) => {

  const location = useLocation();

  const { setUser } = useContext(AuthContext)

  const removeFavoriteMovieMutation = useMutation({
    mutationFn: removeFavoriteMovie,
    async onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
      const profile = await fetchMe();
      setUser(profile);
    }
  }, queryClient);

  return (
    <>
      {
        moviesData.map((movie, index) => (
          <div
            style={genreCardStyle}
            className='card-list-item' key={index}>
            <Link
              style={genreCardWidth}
              className='inner-wrapper'
              to={`/movie/${movie.id}`}>
              <RemoveFavoriteMovieButton
                className='btn-reset btn-close btn-close-card'
                kind={location.pathname !== '/account' ? 'thirdly' : 'primary'}
                onClick={async (event) => {
                  event.preventDefault();
                  let movieId = movie.id;
                  removeFavoriteMovieMutation.mutate({ movieId });
                }}
              />
              {location.pathname === '/' && <div className='card-number'>{index + 1}</div>}
              {movie.posterUrl === null || movie.posterUrl === undefined
                ? <div className='movie-cover movie-cover-error'>Обложка не доступна</div>
                : <img className='movie-cover' src={movie.posterUrl} />
              }
            </Link>
          </div>
        ))
      }
    </>
  )
}
