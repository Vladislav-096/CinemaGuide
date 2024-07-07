import { Movie } from "../../api/Movies";
import { Button } from "../../ui/Button/Button"
import { PopUp } from "../PopUp/PopUp"
import { VideoComponent } from "../VideoComponent/VideoComponent"
import { useEffect, useState } from "react";
import './media.css'

interface TrailerComponent {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>
  randomMovie: Movie;
  infoMovieTrailer: object
}

export const TrailerComponent = ({ randomMovie, active, setActive, infoMovieTrailer }: TrailerComponent) => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 812);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 812)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.addEventListener('resize', handleResize)
    }
  }, []);

  const popUpVideoStyle = {
    backgroundColor: isLargeScreen ? 'rgba(0, 0, 0, .7)' : 'rgba(0, 0, 0)'
  }

  return (
    <div className="trailer-button-wrapper" style={infoMovieTrailer}>
      <Button
        kind='primary'
        onClick={() => setActive(true)}
      >
        Трейлер
      </Button>
      <PopUp active={active} setActive={setActive} popUpVideoStyle={popUpVideoStyle}>
        <VideoComponent randomMovie={randomMovie} active={active} setActive={setActive} />
      </PopUp>
    </div>
  )
}
