import ReactPlayer from 'react-player/youtube';
import { useState } from 'react';
import { Movie } from '../../api/Movies';
import PauseButton from '../../assets/pause-button.svg'
import PlayButton from '../../assets/play-button.svg'
import '../../index.css'
import './style.css'
import './media.css'

type VideoComponent = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>
  randomMovie: Movie
}

export const VideoComponent = ({ randomMovie, active, setActive }: VideoComponent) => {

  const [isPaused, setPause] = useState(false);

  const handleClick = () => {
    setActive(!active)
  };

  const handlePaused = () => {
    setPause(true)
  }

  const handleStart = () => {
    setPause(false)
  }

  return (
    <div
      className='modal-content-video'
      onClick={e => e.stopPropagation()}
    >
      {/* Надо сделать так, чтобы видео запускалось сразу при нажатии на кнопку трейлер. Для этого надо убрать light. */}
      <ReactPlayer
        light
        onPause={handlePaused}
        onPlay={handleStart}
        url={randomMovie.trailerUrl}
        width='100%'
        height='100%'
        controls
        playing={active}
      />
      <img className={!isPaused ? 'user-select pause-button pause-button-hidden' : 'user-select pause-button'} src={PauseButton} />
      <img className={isPaused ? 'user-select play-button-hidden' : 'user-select play-button'} src={PlayButton} />
      {
        isPaused &&
        <div className='descr-wrapper'>
          <p className='video-name' >{randomMovie.title}</p>
        </div>
      }

      <button className='btn-reset btn-close btn-close-video' onClick={handleClick}></button>
    </div>
  )
}

