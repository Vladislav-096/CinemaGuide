import { memo } from "react"
import { FetchTopTen } from "../FetchTopTen/FetchTopTen"
import '../../index.css'
import './style.css'
import './media.css'

export const TopTenSection = () => {

  return (
    <section className="top-ten-section">
      <div className="container second-container">
        <div className="container">
          <h2 className="top-ten-section__header" >Топ 10 фильмов</h2>
        </div>
        <FetchTopTen />
      </div>
    </section>
  )
}

export const MemoTopTenSection = memo(TopTenSection)
