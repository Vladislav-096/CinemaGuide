import { GenreInfoSection } from "../../components/GenreInfoSection/GenreInfoSection";

export interface GenreInfoPage {
  setParams: React.Dispatch<React.SetStateAction<string>>
}

export const GenreInfoPage = ({ setParams }: GenreInfoPage) => {

  return (
    <GenreInfoSection setParams={setParams} />
  )
}
