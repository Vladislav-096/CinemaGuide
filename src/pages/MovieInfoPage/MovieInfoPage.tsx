import { Dispatch, SetStateAction } from "react";
import { MovieInfoSection } from "../../components/MovieInfoSection/MovieInfoSection";

interface MovieInfoPage {
  setModalActive: Dispatch<SetStateAction<boolean>>
}

export function MovieInfoPage({ setModalActive }: MovieInfoPage) {

  return (
    <MovieInfoSection
      setModalActive={setModalActive}
    />
  )
}
