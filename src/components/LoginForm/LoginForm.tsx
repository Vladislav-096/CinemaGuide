import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { fetchMe, login } from "../../api/User";
import { queryClient } from "../../api/queryClient";
import { FormField } from "../FormField/FormField";
import { Button } from "../../ui/Button/Button";
import './style.css'
import { AuthContext } from "../../context/AuthContext";

export interface LoginForm {
  isClosed: boolean;
  setPasswordError: React.Dispatch<React.SetStateAction<boolean>>;
  isPasswordError: boolean;
}

const createLoginSchema = z.object({
  // email: z.string({ required_error: 'Passoword is required' }).email('Укажите корректный адрес электронной почты'),
  email: z.string().email('Укажите корректный адрес электронной почты'),
  password: z.string().min(4, 'Пароль должен содержать не менее 4 символов')
})
type CreateLoginForm = z.infer<typeof createLoginSchema>;

export const LoginForm: FC<LoginForm> = ({ isClosed, setPasswordError, isPasswordError }) => {
  const [isTextEmail, setEmail] = useState('');
  const [isTextPassword, setPassword] = useState('');

  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    if (isClosed) {
      setEmail('');
      setPassword('');
      setPasswordError(false)
      clearErrors(); // Убирает ошибки из useForm
      reset();
    }
  }, [isClosed])

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target

    setEmail(value)
    setPasswordError(false)
    clearErrors('email')
  }

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target

    setPassword(value)
    setPasswordError(false)
    clearErrors('password')
  }

  const { register, handleSubmit, formState: { errors }, clearErrors, reset } = useForm<CreateLoginForm>({
    resolver: zodResolver(createLoginSchema),
  })

  const loginMutation = useMutation(
    {
      mutationFn: login,

      onError() {
        setPasswordError(true)
      },

      async onSuccess() {
        const profile = await fetchMe();
        console.log(profile)

        setUser(profile);
      },
    },
    queryClient
  );

  return (
    <form className="login-form" onSubmit={handleSubmit(({ email, password }) => {
      loginMutation.mutate({ email, password })
    })}>
      <FormField label="Электронная почта" errorMessage={errors.email?.message} isText={isTextEmail} >
        <input
          style={errors.email?.message ? { borderColor: 'rgb(255, 0, 0)' } : {}}
          className="form-input"
          value={isTextEmail}
          {...register('email')}
          onChange={handleChangeEmail}
        />
        <div className={!errors.email?.message ? 'form-input-icon form-input-icon-email' : 'form-input-icon form-input-icon-email-error'}></div>
      </FormField>

      <FormField label="Пароль" errorMessage={errors.password?.message} isText={isTextPassword}>
        <input
          style={errors.password?.message ? { borderColor: 'rgb(255, 0, 0)' } : {}}
          className="form-input"
          value={isTextPassword}
          {...register('password')}
          onChange={handleChangePassword}
        />
        {(isPasswordError && !errors.password?.message) && <span className="form-field__error-text">Неверный логин или пароль</span>}
        <div className={!errors.password?.message ? 'form-input-icon form-input-icon-key' : 'form-input-icon form-input-icon-key-error'}></div>
      </FormField>
      <Button
        type="submit"
        isLoading={loginMutation.isPending}
      >
        Войти
      </Button>
    </form>
  );
};
