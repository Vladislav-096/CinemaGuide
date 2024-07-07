import { Link } from "react-router-dom"
import { getFilteredMovieByGenre } from "../../api/Movies";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { Loader } from "../Loader/Loader";
import './style.css'
import './media.css'

interface GenreCard {
  genre: string
  customKey: number
}

export const GenreCard = ({ genre, customKey }: GenreCard) => {

  const count = 1;
  const genreTitle = genre.substring(0, 1).toUpperCase() + genre.substring(1).toLowerCase();

  const getOneMovieGenre = useQuery({
    queryFn: () => getFilteredMovieByGenre({ genre, count }),
    queryKey: ['genre', customKey],
    retry: false
  }, queryClient);

  switch (getOneMovieGenre.status) {
    case 'pending':
      return (
        <li className="genre-card-list-item">
          <div className="genre-card-link genre-movie-loader-wrapper">
            <div className="genre-movie-image genre-movie-loader">
              <Loader />
            </div>
          </div>
        </li>
      )

    case 'success':
      return (
        <li className="genre-card-list-item">
          <Link className="genre-card-link" to={`/movie/genre/${genre}`}>
            {
              (getOneMovieGenre.data[0].backdropUrl !== null && getOneMovieGenre.data[0].backdropUrl !== undefined)
                ? <img className="genre-movie-image" src={getOneMovieGenre.data[0].backdropUrl} />
                : <div className="genre-movie-image genre-movie-image-error" >Обложка не доступна</div>
            }
            <div className="genre-card-descr">
              <span className="genre-card-descr-span">{genreTitle}</span>
            </div>
          </Link>
        </li>
      )

    case 'error':
      return (
        <div>Ошибка при создании картчоки фильма</div>
      )
  }
}
