import { UseQueryResult } from "@tanstack/react-query";
import { GetGenre } from "../../api/Movies";
import { GenreSection } from "../../components/GenreSection/GenreSection";

export interface GenrePage {
  getGenreQuery: UseQueryResult<GetGenre>;
}

export function GenrePage({ getGenreQuery }: GenrePage) {
  return <GenreSection getGenreQuery={getGenreQuery} />
}
