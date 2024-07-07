import { Movie } from '../../api/Movies';
import './style.css';
import './media.css';

interface AboutMovieSection {
  getMovieQueryData: Movie
}

export const AboutMovieSection = ({ getMovieQueryData }: AboutMovieSection) => {

  return (
    <section>
      <div className="container">
        <h2 className='about-movie-header'>О фильме</h2>
        <table className='movie-table'>
          <tbody>
            {
              (getMovieQueryData.language !== undefined && getMovieQueryData.language !== null)
              && <tr className='table-row'>
                <td className='table-data-name'>
                  <div className='table-data-name-inner-wrapepr'>
                    <span className='prop-name prop-name-lang'>Язык оригинала</span>
                    <span className='table-space'></span>
                  </div>
                </td>
                <td className='table-prop'>
                  <span> {getMovieQueryData.language} </span>
                </td>
              </tr>
            }
            {
              (getMovieQueryData.budget !== undefined && getMovieQueryData.budget !== null)
              && <tr className='table-row'>
                <td className='table-data-name'>
                  <div className='table-data-name-inner-wrapepr'>
                    <span className='prop-name'>Бюджет</span>
                    <span className='table-space'></span>
                  </div>
                </td>
                <td className='table-prop'>
                  <span> {Number(getMovieQueryData.budget).toLocaleString()} руб.</span>
                </td>
              </tr>
            }
            {
              (getMovieQueryData.revenue !== undefined && getMovieQueryData.revenue !== null)
              && <tr className='table-row'>
                <td className='table-data-name'>
                  <div className='table-data-name-inner-wrapepr'>
                    <span className='prop-name'>Выручка</span>
                    <span className='table-space'></span>
                  </div>
                </td>
                <td className='table-prop'>
                  <span>{Number(getMovieQueryData.revenue && getMovieQueryData.revenue).toLocaleString()} руб.</span>
                </td>
              </tr>
            }
            {
              (getMovieQueryData.director !== undefined && getMovieQueryData.director !== null)
              && <tr className='table-row'>
                <td className='table-data-name'>
                  <div className='table-data-name-inner-wrapepr'>
                    <span className='prop-name'>Режиссёр</span>
                    <span className='table-space'></span>
                  </div>
                </td>
                <td className='table-prop'>
                  <span> {getMovieQueryData.director}</span>
                </td>
              </tr>
            }
            {
              (getMovieQueryData.production !== undefined && getMovieQueryData.production !== null)
              && <tr className='table-row'>
                <td className='table-data-name'>
                  <div className='table-data-name-inner-wrapepr'>
                    <span className='prop-name'>Продакшен</span>
                    <span className='table-space'></span>
                  </div>
                </td>
                <td className='table-prop'>
                  <span>{getMovieQueryData.production}</span>
                </td>
              </tr>
            }
            {
              (getMovieQueryData.production !== undefined && getMovieQueryData.production !== null)
              && <tr className='table-row'>
                <td className='table-data-name'>
                  <div className='table-data-name-inner-wrapepr'>
                    <span className='prop-name'>Награды</span>
                    <span className='table-space'></span>
                  </div>
                </td>
                <td className='table-prop'>
                  <span>{getMovieQueryData.production}</span>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section >
  )
}
