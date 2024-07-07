import { UseQueryResult } from "@tanstack/react-query"
import { HeroContentComponent } from "../HeroContentComponent/HeroContentComponent"
import { HeroCoverComponent } from "../HeroCoverComponent/HeroCoverComponent"
import { Loader } from "../Loader/Loader"
import { Movie } from "../../api/Movies"
import './style.css'
import './media.css'

export interface HeroSection {
  heroContentQuery: UseQueryResult<Movie>;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  infoMovieButtonsWrapper?: object;
  infoMovieTrailer?: object;
  infoMovieLastItem?: object
  infoMovieListButtons?: object
}

export const HeroSection = ({
  heroContentQuery,
  setModalActive,
  infoMovieButtonsWrapper,
  infoMovieTrailer,
  infoMovieLastItem,
  infoMovieListButtons
}: HeroSection) => {

  switch (heroContentQuery.status) {
    case 'pending':
      return (
        <div className="hero-section-loader-wrapper">
          <Loader />
        </div>
      )

    case 'success':
      return (
        <section className="hero-section">
          <HeroCoverComponent randomMovie={heroContentQuery.data} />
          <div className="container">
            <div className="main-wrapper">
              <HeroContentComponent
                randomMovie={heroContentQuery.data}
                setModalActive={setModalActive}
                infoMovieButtonsWrapper={infoMovieButtonsWrapper || {}}
                infoMovieTrailer={infoMovieTrailer || {}}
                infoMovieLastItem={infoMovieLastItem || {}}
                infoMovieListButtons={infoMovieListButtons || {}}
              />
            </div>
          </div>
        </section>
      )

    case 'error':
      return (
        <div>
          <p>Ошибка при получении данных о случайном фильме</p>
          <p>{heroContentQuery.error.toString()}</p>
        </div>
      )
  }
}
