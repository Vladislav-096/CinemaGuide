import { useEffect, useState } from "react"
import { FavoriteMoviesTab } from "../FavoriteMoviesTab/FavoriteMoviesTab"
import { SettingsTab } from "../SettingsTab/SettingsTab"
import { useQuery } from '@tanstack/react-query'
import { getFavoriteMovies } from '../../api/Movies'
import { queryClient } from '../../api/queryClient'
import '../../index.css'
import './style.css'
import './media.css'

export const AccountSection = (

) => {
  const [tab, setTab] = useState<string>('favorite')

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768)

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768)
    }

    window.addEventListener('resize', handleResize)

    return window.addEventListener('resize', handleResize)

  }, []);

  const GetFavoriteListQuery = useQuery({
    queryFn: () => getFavoriteMovies(),
    queryKey: ['favorites'],
    retry: false
  }, queryClient)

  return (
    <section className="account-section">
      <div className="container second-container">
        <div className="container">
          <h1 className="heading-my-account">Мой аккаунт</h1>
          <nav className='nav-account'>
            <ul className="list-reset nav-account-list">
              <li className="nav-account-list-item">
                <button
                  className={tab == 'favorite' ? 'btn-reset btn-favorite-movies chosen-element' : 'btn-reset btn-favorite-movies'}
                  onClick={() => setTab('favorite')}
                >
                  {isLargeScreen ? 'Избранные фильмы' : 'Избранное'}
                </button>
              </li>
              <li className="nav-list-item">
                <button
                  onClick={() => setTab('settings')}
                  className={tab == 'settings' ? 'btn-reset btn-setings chosen-element' : 'btn-reset btn-setings'}
                >
                  {isLargeScreen ? 'Настройка аккаунта' : 'Настройки'}

                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          {tab === 'favorite' ? <FavoriteMoviesTab GetFavoriteListQuery={GetFavoriteListQuery} /> : <SettingsTab />}
        </div>
      </div>
    </section>
  )
}
