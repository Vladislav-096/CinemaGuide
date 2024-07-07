import { useQuery } from "@tanstack/react-query";
import { getTopTenMovies } from "../../api/Movies";
import { queryClient } from "../../api/queryClient";
import { Loader } from "../Loader/Loader";
import { TopTenContentComponent } from "../TopTenContentComponent/TopTenContentComponent";
import { Button } from "../../ui/Button/Button";
import { RefetchComponent } from "../RefetchComponent/RefetchComponent";
import './style.css'

export const FetchTopTen = () => {

  const TopTenQuery = useQuery({

    queryFn: () => getTopTenMovies(),

    queryKey: ['top10'],

    retry: false

  }, queryClient)

  switch (TopTenQuery.status) {
    case 'pending':
      return (
        <div className="top-ten-loader-wrapper">
          <Loader />
        </div>
      )

    case 'success':
      return <TopTenContentComponent moviesData={TopTenQuery.data} />

    case 'error':
      return (
        <div>
          <RefetchComponent descr='Произошла ошибка при получении информации о топ 10 фильмах'>
            <Button
              kind="primary"
              onClick={() => TopTenQuery.refetch()}
              isLoading={TopTenQuery.isPending}
            >
              Повторить запрос
            </Button>
          </RefetchComponent>
        </div>
      )
  }
}

