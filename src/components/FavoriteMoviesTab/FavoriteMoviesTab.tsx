import { UseQueryResult } from "@tanstack/react-query"
import { MovieListType } from "../../api/Movies"
import { Loader } from "../Loader/Loader"
import { MovieCards } from "../MovieCards/MovieCards"
import './style.css'

interface FavoriteMoviesTab {
  GetFavoriteListQuery: UseQueryResult<MovieListType>
}

export const FavoriteMoviesTab = ({ GetFavoriteListQuery }: FavoriteMoviesTab) => {

  switch (GetFavoriteListQuery.status) {
    case 'pending':
      return (
        <div className="favorites-loader-wrapper">
          <Loader />;
        </div>
      )

    case 'success':
      return (
        <div className="second-container">
          <MovieCards moviesData={GetFavoriteListQuery.data} />
        </div>
      );

    case 'error':
      return (
        <div>
          Ошибка при получении списка избранных фильмов
        </div>
      )
  }
};
