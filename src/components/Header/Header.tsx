import { Link, useLocation } from "react-router-dom"
import { InputSearch } from "../InputSearch/InputSearch"
import CinemaGuideLogo from '../../assets/CinemaGuide.svg'
import GenreseIcon from '../../assets/genres-icon.svg'
import SearchIcon from '../../assets/search-icon-white.svg'
import { Account } from "../Account/Account"
import { MovieList, MovieListType } from "../../api/Movies"
import { useState } from "react"
import '../../index.css'
import './style.css'
import './media.css'

type Header = {
  paramsFromGenreInfoPage: string;
  modalActive: boolean;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>
}

export interface fetchSuggestions {
  count: number;
  value: string;
}

export const Header = ({ paramsFromGenreInfoPage, modalActive, setModalActive }: Header) => {
  const [suggestions, setSuggestions] = useState<MovieListType>([])

  const [isSearchOpen, setSearch] = useState(false)

  const handleOpenSearch = () => {
    setSearch(true)
  }

  const location = useLocation();

  const fetchSuggestions = async ({ count, value }: fetchSuggestions) => {
    try {
      const response = await fetch(`https://cinemaguide.skillbox.cc/movie?count=${count}&title=${value}`);
      const data = await response.json();
      const responseData = MovieList.parse(data);
      setSuggestions(responseData);

    } catch (error) {
      console.error('Error fetching suggestions:', error);
      throw error
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-wrapper header-wrapper-main">
          <Link to={'/'} className="logo-link-wrapper">
            <img src={CinemaGuideLogo} alt="Logo" />
          </Link>
          <nav className="header-nav">
            <ul className="list-reset header-nav__list">
              <li className="header-nav__item"><Link to={"/"} className={location.pathname == '/' ? 'chosen-element' : ''}>Главная</Link></li>
              <li className="header-nav__item"><Link to={"/movie/genre"} className={location.pathname == '/movie/genre' || location.pathname == `/movie/genre/${paramsFromGenreInfoPage}` ? 'chosen-element' : ''}>Жанры</Link></li>
            </ul>
          </nav>
          <InputSearch fetchSuggestions={fetchSuggestions} suggestions={suggestions} setSearch={setSearch} />
          <div className="account-class">
            <Account
              modalActive={modalActive}
              setModalActive={setModalActive}
            />
          </div>
        </div>

        <div className="header-wrapper header-wrapper-1400 row">
          <div className='header-inner-wrapper-1400'>
            <Link to={'/'} className="logo-link-wrapper ">
              <img src={CinemaGuideLogo} alt="Logo" />
            </Link>
            <nav className="header-nav">
              <ul className="list-reset header-nav__list">
                <li className="header-nav__item"><Link to={"/"} className={location.pathname == '/' ? 'chosen-element' : ''}>Главная</Link></li>
                <li className="header-nav__item"><Link to={"/movie/genre"} className={location.pathname == '/movie/genre' || location.pathname == `/movie/genre/${paramsFromGenreInfoPage}` ? 'chosen-element' : ''}>Жанры</Link></li>
              </ul>
            </nav>
            <div className="account-class">
              <Account
                modalActive={modalActive}
                setModalActive={setModalActive}
              />
            </div>
          </div>
          <InputSearch fetchSuggestions={fetchSuggestions} suggestions={suggestions} setSearch={setSearch} />
        </div>

        <div>
          <div className="header-wrapper header-wrapper-768-375 row">
            <div className='header-inner-wrapper-768-375'>
              <Link to={'/'} className="logo-link-wrapper ">
                <img className="logo-768" src={CinemaGuideLogo} alt="Logo" />
              </Link>
              <nav className="header-nav">
                <ul className="list-reset header-nav__list">
                  <li className="header-nav-icon-link">
                    <Link to={"/movie/genre"}>
                      <img className="genre-icon-768" src={GenreseIcon} />
                    </Link>
                  </li>
                  <li className="header-nav-icon-link">
                    <button
                      className="btn-reset btn-search-bar"
                      onClick={handleOpenSearch}
                    >
                      <img src={SearchIcon} />
                    </button>
                    <div className={isSearchOpen ? 'search-bar-wrapper active' : 'search-bar-wrapper'}>
                      <InputSearch fetchSuggestions={fetchSuggestions} suggestions={suggestions} setSearch={setSearch} />
                    </div>
                  </li>
                  <li className="header-nav-icon-link">
                    <Account
                      modalActive={modalActive}
                      setModalActive={setModalActive}
                    />
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
