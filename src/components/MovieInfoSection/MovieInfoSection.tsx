import { HeroSection } from '../HeroSection/HeroSection';
import { useQuery } from '@tanstack/react-query';
import { getMovie } from '../../api/Movies';
import { queryClient } from '../../api/queryClient';
import { Loader } from '../Loader/Loader';
import { AboutMovieSection } from '../AboutMovieSection/AboutMovieSection';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';

interface MovieInfoSection {
  setModalActive: Dispatch<SetStateAction<boolean>>;
}

export const MovieInfoSection = ({ setModalActive }: MovieInfoSection) => {

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768)

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768)
    }

    window.addEventListener('resize', handleResize)

    return window.addEventListener('resize', handleResize)
  }, [])

  const infoMovieButtonsWrapper = {
    flexWrap: isLargeScreen ? 'wrap' : 'nowrap'
  }

  const infoMovieTrailer = {
    marginBottom: '0'
  }

  const infoMovieLastItem = {
    marginRight: isLargeScreen ? '16px' : '0',
  }

  const infoMovieListButtons = {
    marginRight: '0'
  }

  const { movieId } = useParams();

  let id = Number(movieId);

  const getMovieQuery = useQuery({
    queryFn: () => getMovie({ id }),
    queryKey: ['movie', id],
    retry: false
  }, queryClient)


  switch (getMovieQuery.status) {
    case 'pending':
      return (
        <div className='movie-info-section-loader-wrapper'>
          <Loader />
        </div>
      )

    case 'success':
      return (
        <div>
          <HeroSection
            heroContentQuery={getMovieQuery}
            setModalActive={setModalActive}
            infoMovieButtonsWrapper={infoMovieButtonsWrapper}
            infoMovieTrailer={infoMovieTrailer}
            infoMovieLastItem={infoMovieLastItem}
            infoMovieListButtons={infoMovieListButtons}
          />
          <AboutMovieSection getMovieQueryData={getMovieQuery.data} />
        </div>
      )

    case 'error':
      return (
        <div className='container' style={{ paddingTop: '177px' }}>
          Ошибка при получении данных о фильме
        </div>
      )
  }
}
