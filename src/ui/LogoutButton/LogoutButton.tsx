import { useMutation } from "@tanstack/react-query"
import { fetchMe, logout } from "../../api/User"
import { queryClient } from "../../api/queryClient"
import { Button } from "../Button/Button"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export const LogoutButton = () => {
  let { user, setUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleLocationMain = () => {
    navigate('/');
  }

  const logoutMuitation = useMutation(
    {
      mutationFn: logout,

      async onSuccess() {
        handleLocationMain();

        try {
          await fetchMe();
        } catch (error) {
          setUser(null) // Причина ререндера?
          console.log('Контекст юзер после логаут', user)
          localStorage.setItem('user', '')
        }
      }
    },
    queryClient
  )

  return (
    <>
      <Button
        kind="primary"
        onClick={async () => {
          logoutMuitation.mutate()
        }}
        isLoading={logoutMuitation.isPending}
      >
        Выйти из аккаунта
      </Button>
    </>
  )
}
