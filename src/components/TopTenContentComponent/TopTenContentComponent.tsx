import { MovieCards } from '../MovieCards/MovieCards'
import '../../index.css'

export const TopTenContentComponent = ({ moviesData }: MovieCards) => {

  return (
    <MovieCards moviesData={moviesData} />
  )
}

// export const MemoTopTenContentComponent = memo(TopTenContentComponent)
