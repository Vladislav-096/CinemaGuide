import c from '../../assets/c.svg';
import vk from '../../assets/vk.svg';
import youtube from '../../assets/youtube.svg';
import ok from '../../assets/ok.svg';
import telegram from '../../assets/telegram.svg';
import './style.css';
import './media.css';


export const Footer = () => {

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner-wrapper">
          <div className="footer__message">
            <p className='footer__descr'>LLC «Мультимедиа Визион»</p>
            <div className='copy-warning-container'>
              <img className='footer__copyright' src={c} />
              <p className='footer__warnin'>Все права защищены</p>
            </div>
          </div>
          <div className="footer__links">
            <ul className="list-reset footer__link-list">
              <li className='footer__link-list-item'>
                <a className='footer__link' href="https://vk.com/video?q=never%20gonna&z=video-79153897_456239331%2Fpl_cat_trends">
                  <img src={vk} alt="vk-icon-link" />
                </a>
              </li>
              <li className='footer__link-list-item'>
                <a className='footer__link' href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                  <img src={youtube} alt="utube-icon-link" />
                </a>
              </li>
              <li className='footer__link-list-item'>
                <a className='footer__link' href="https://ok.ru/video/1482473736796">
                  <img src={ok} alt="ok-icon-link" />
                </a>
              </li>
              <li className='footer__link-list-item'>
                <a className='footer__link' href="https://t.me/ManBearPigg">
                  <img src={telegram} alt="tg-icon-link" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
