import { UseQueryResult } from "@tanstack/react-query";
import { HeroSection } from "../../components/HeroSection/HeroSection";
import { MemoTopTenSection } from "../../components/TopTenSection/TopTenSection";
import { Movie } from "../../api/Movies";
import { useEffect } from "react";

export interface MainPage {
  heroContentQuery: UseQueryResult<Movie>;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>
}

export const MainPage = ({ heroContentQuery, setModalActive }: MainPage) => {

  useEffect(() => {
    setModalActive(false)
  }, [])

  return (
    <div>
      <HeroSection
        heroContentQuery={heroContentQuery}
        setModalActive={setModalActive}
      />
      <MemoTopTenSection />
    </div>
  )
}
