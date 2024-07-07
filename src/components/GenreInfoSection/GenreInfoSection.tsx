import { Link, useParams } from "react-router-dom";
import { MovieList, MovieListType } from "../../api/Movies";
import { MovieCards } from "../MovieCards/MovieCards";
import { Button } from "../../ui/Button/Button";
import { useEffect, useState } from "react";
import "./style.css";
import "./media.css";

interface addTenMovies {
  genre: string;
  page: number;
  count: number;
}

interface GenreInfoSection {
  setParams: React.Dispatch<React.SetStateAction<string>>;
}

export const GenreInfoSection = ({ setParams }: GenreInfoSection) => {
  const { genreName } = useParams();
  const [page, setPage] = useState(0);
  const [movies, setMovies] = useState<MovieListType>([]);
  const [isDisabled, setDisable] = useState(false);

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 577);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 577);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.addEventListener("resize", handleResize);
    };
  }, []);

  const genreCardStyle = {
    height: isLargeScreen ? "336px" : "502px",
    marginBottom: isLargeScreen ? "33px" : "24px",
  };

  const genreCardWidth = {
    width: isLargeScreen ? "224px" : "335px",
  };

  if (genreName) {
    setParams(genreName);
  }

  const handleAddMovies = () => {
    setPage(page + 1);
  };

  let genre = genreName ? String(genreName) : "";
  const count = 10;

  async function addTenMovies({ count, page, genre }: addTenMovies) {
    try {
      const response = await fetch(
        `https://cinemaguide.skillbox.cc/movie?count=${count}&page=${page}&genre=${genre}`
      );
      const data = await response.json();
      const responseData = MovieList.parse(data);

      let newMoview = [...movies, ...responseData];
      setMovies(newMoview);

      if (responseData.length < count) {
        setDisable(true);
      }
    } catch (error) {
      console.error("Error fetching new ten movies:", error);
      throw error;
    }
  }

  useEffect(() => {
    addTenMovies({ count, page, genre });
  }, [page]);

  const genreTitle =
    genre.substring(0, 1).toUpperCase() + genre.substring(1).toLowerCase();

  return (
    <section className="genre-section-page">
      <div className="container">
        <Link className="genre-name-header" to={`/movie/genre`}>
          {genreTitle}
        </Link>
        <MovieCards
          moviesData={movies}
          genreCardStyle={genreCardStyle}
          genreCardWidth={genreCardWidth}
        />
        <div className="genre-info-button-wrapper">
          <Button
            isDisabled={isDisabled && isDisabled}
            onClick={() => {
              handleAddMovies();
            }}
          >
            Показать еще
          </Button>
        </div>
      </div>
    </section>
  );
};
