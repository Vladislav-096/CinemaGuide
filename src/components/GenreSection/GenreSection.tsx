import { GenrePage } from '../../pages/GenraPage/GenraPage'
import { GenreCard } from '../GenreCard/GenreCard'

import { Loader } from '../Loader/Loader'
import './style.css'
import './media.css'

export const GenreSection = ({ getGenreQuery }: GenrePage) => {

  switch (getGenreQuery.status) {
    case 'pending':
      return (
        <div className='genre-section-loader-wrapper'>
          <Loader />
        </div>
      )

    case 'success':
      return (
        <section className="genre-section">
          <div className="container">
            <h1 className='movie-genre-header' >Жанры фильмов</h1>
            <ul className='list-reset row row-cols-xxl-5 genre-card-list'>
              {getGenreQuery.data.map((genre, index) => (
                <GenreCard genre={genre} customKey={index} key={index} />
              ))}
            </ul>
          </div>
        </section>
      )

    case 'error':
      return (
        <div>Ошибка при получении списка жанров</div>
      )
  }
}
