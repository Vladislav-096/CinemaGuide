import { useMutation } from "@tanstack/react-query"
import { addFavoriteMovie, removeFavoriteMovie } from "../../api/Movies"
import { queryClient } from "../../api/queryClient"
import { ToggleFavoriteMovieButton } from "../../ui/ToggleFavoriteMovieButton/ToggleFavoriteMovieButton"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { fetchMe } from "../../api/User"
import './style.css'

interface ToggleFavoriteMovieButtonComponent {
  id: number;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ToggleFavoriteMovieButtonComponent = ({ id, setModalActive }: ToggleFavoriteMovieButtonComponent) => {

  const { user, setUser } = useContext(AuthContext)

  const addFavoriteMovieMuitation = useMutation({
    mutationFn: addFavoriteMovie,
    async onSuccess() {
      const profile = await fetchMe();
      setUser(profile);
    }
  }, queryClient);

  const removeFavoriteMovieMutation = useMutation({
    mutationFn: removeFavoriteMovie,
    async onSuccess() {
      const profile = await fetchMe();
      setUser(profile);
    }
  }, queryClient);

  const favoritesMovieList = user && user.favorites && user.favorites.includes(id.toString())

  return (
    <div>
      <ToggleFavoriteMovieButton
        setModalActive={setModalActive}

        onClick={
          async () => {
            if (favoritesMovieList) {
              let movieId = id
              removeFavoriteMovieMutation.mutate({ movieId });
            } else {
              addFavoriteMovieMuitation.mutate({ id });
            }

            if (!user) {
              setModalActive(true)
            }
          }
        }
      >
        {(favoritesMovieList) && <span className="span-heart"></span>}
      </ToggleFavoriteMovieButton >
    </div>
  )
}
