import { z } from "zod";
import { validateResponse } from "./validationResponse";

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  originalTitle: z.string(),
  language: z.string(),
  releaseYear: z.number().nullable(),
  releaseDate: z.string().nullable(),
  genres: z.array(z.string()),
  plot: z.string(),
  runtime: z.number(),
  budget: z.string().nullable(),
  revenue: z.string().nullable(),
  homepage: z.string(),
  status: z.string(),
  posterUrl: z.string().optional().nullable(),
  backdropUrl: z.string().nullable(),
  trailerUrl: z.string(),
  trailerYoutubeId: z.string().optional(),
  tmdbRating: z.number(),
  searchL: z.string(),
  keywords: z.array(z.string()),
  countriesOfOrigin: z.array(z.string()),
  languages: z.array(z.string()),
  cast: z.array(z.string()),
  director: z.string().nullable(),
  production: z.string().nullable(),
  awardsSummary: z.string().nullable(),
});
export type Movie = z.infer<typeof MovieSchema>;

export const MovieList = z.array(MovieSchema);
export type MovieListType = z.infer<typeof MovieList>;

// Получить рандомный фильм
export function getRandomMovie() {
  return fetch(`https://cinemaguide.skillbox.cc/movie/random`, {
    method: "GET",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => MovieSchema.parse(data))
    .catch((error) => {
      console.log("getRandomMovie error", error.issues);
      throw error.issues;
    });
}

// Получить топ 10 фильмов
export function getTopTenMovies() {
  return fetch(`https://cinemaguide.skillbox.cc/movie/top10`, {
    method: "GET",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => MovieList.parse(data))
    .catch((error) => {
      console.log("getTopTenMovies error", error);
      throw error;
    });
}

// Добавить фильм в избранное
export interface addFavoriteMovie {
  id: number;
}

export function addFavoriteMovie({ id }: addFavoriteMovie): Promise<void> {
  return fetch(`https://cinemaguide.skillbox.cc/favorites`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ id: id.toString() }),
  })
    .then(validateResponse)
    .then(() => undefined);
}

// Удалить фильм из избранного
export interface RemoveFavoriteMovie {
  movieId: number;
}

export function removeFavoriteMovie({
  movieId,
}: RemoveFavoriteMovie): Promise<void> {
  return fetch(`https://cinemaguide.skillbox.cc/favorites/${movieId}`, {
    method: "DELETE",
    credentials: "include",
  })
    .then(validateResponse)
    .then(() => undefined);
}

// Получение списка избранных фильмов
export async function getFavoriteMovies() {
  return fetch(`https://cinemaguide.skillbox.cc/favorites`, {
    method: "GET",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => MovieList.parse(data))
    .catch((error) => {
      console.log("getRandomMovie error", error.issues);
      throw error;
    });
}

// Получение фильма по id
export interface GetMovie {
  id: number;
}

export async function getMovie({ id }: GetMovie) {
  return fetch(`https://cinemaguide.skillbox.cc/movie/${id}`, {
    method: "GET",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => MovieSchema.parse(data))
    .catch((error) => {
      console.log("getMovie error", error.issues);
      throw error;
    });
}

// Получение фильмов по фильтру жанр
export interface GetFilteredMovieByGenre {
  genre: string;
  count?: number;
  page?: number;
}

export async function getFilteredMovieByGenre({
  count,
  page,
  genre,
}: GetFilteredMovieByGenre) {
  return fetch(
    `https://cinemaguide.skillbox.cc/movie?count=${count}&page=${page}&genre=${genre}`,
    {
      method: "GET",
      credentials: "include",
    }
  )
    .then((response) => response.json())
    .then((data) => MovieList.parse(data))
    .catch((error) => {
      console.log("getMovie error", error.issues);
      throw error;
    });
}

// Получение жанров
export const GenreSchema = z.string().array();
export type GetGenre = z.infer<typeof GenreSchema>;

export async function getGenre() {
  return fetch(`https://cinemaguide.skillbox.cc/movie/genres`, {
    method: "GET",
    credentials: "include",
  })
    .then((response) => {
      console.log('before', response);
      return response.json();
    })
    .then((data) => {console.log('after', data); return GenreSchema.parse(data)})
    .catch((error) => {
      console.log("getMovie error", error.issues);
      throw error;
    });
}
