import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "../Header/Header";
import { useContext, useState } from "react";
import { MainPage } from "../../pages/MainPage/MainPage";
import { GenrePage } from "../../pages/GenraPage/GenraPage";
import { AccountPage } from "../../pages/AccountPage/AccountPage";
import { ZatichkaPage } from "../../pages/ZatichkaPage/ZatichkaPage";
import { MovieInfoPage } from "../../pages/MovieInfoPage/MovieInfoPage";
import { getGenre, getRandomMovie } from "../../api/Movies";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { GenreInfoPage } from "../../pages/GenreInfoPage/GenreInfoPage";
import { Footer } from "../Footer/Footer";
import { AuthContext } from "../../context/AuthContext";
import './style.css'

export const Layout = () => {
  const [modalActive, setModalActive] = useState(false);

  const [paramsFromGenreInfoPage, setParams] = useState('');

  const { user } = useContext(AuthContext)

  console.log('Context, user: ', user)

  const heroContentQuery = useQuery({
    queryFn: () => getRandomMovie(),
    queryKey: ['random'],
  }, queryClient);

  const getGenreQuery = useQuery({
    queryFn: () => getGenre(),
    queryKey: ['get', 'genre'],
    retry: false
  }, queryClient)

  return (
    <BrowserRouter>
      <div className="page">
        <Header
          paramsFromGenreInfoPage={paramsFromGenreInfoPage}
          modalActive={modalActive}
          setModalActive={setModalActive}
        />
        <main className="main">
          <Routes>
            <Route
              path="/"
              element={
                <MainPage
                  heroContentQuery={heroContentQuery}
                  setModalActive={setModalActive}
                />
              }
            />
            <Route path="/movie/genre" element={<GenrePage getGenreQuery={getGenreQuery} />} />
            {
              !user
                ? <Route path="/account" element={<ZatichkaPage setModalActive={setModalActive} />} />
                : <Route path="/account" element={<AccountPage />} />
            }
            <Route
              path="/movie/:movieId"
              element={<MovieInfoPage
                setModalActive={setModalActive}
              />}
            />
            <Route path="/movie/genre/:genreName" element={<GenreInfoPage setParams={setParams} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
