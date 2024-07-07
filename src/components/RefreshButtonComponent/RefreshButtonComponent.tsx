import { useLocation } from "react-router-dom"
import { queryClient } from "../../api/queryClient"
import { RefreshButton } from "../../ui/RefreshButton/RefreshButton"

export const RefreshButtonComponent = () => {

  const location = useLocation()

  return (
    <RefreshButton
      onClick={async () => {
        queryClient.invalidateQueries({ queryKey: ['random'] })
      }}
      kind={location.pathname === '/' ? 'primary' : 'thirdly'}
    >
    </RefreshButton>
  )
}
