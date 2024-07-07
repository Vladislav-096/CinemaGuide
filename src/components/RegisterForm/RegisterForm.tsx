import { ChangeEvent, FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/User";
import { queryClient } from "../../api/queryClient";
import { FormField } from "../FormField/FormField";
import { Button } from "../../ui/Button/Button";

export interface RegisterForm {
  isClosed: boolean;
  setAuthType: React.Dispatch<React.SetStateAction<string>>;
}

const createRegisterSchema = z.object({
  email: z.string().email('Укажите корректный адрес электронной почты').min(1, 'Поле "Электронная почта" обязательное для заполнения'),
  name: z.string().min(1, 'Поле "Имя" обязательное для заполнения'),
  surname: z.string().min(1, 'Поле "Фамилия" обязательное для заполнения'),
  password: z.string().min(4, 'Пароль должен содержать не менее 4 символов'),
  confirmPassword: z.string().min(4, 'Пароль должен содержать не менее 4 символов'),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

type CreateRegForm = z.infer<typeof createRegisterSchema>;

export const RegisterForm: FC<RegisterForm> = ({ isClosed, setAuthType }) => {
  const [isTextEmail, setEmail] = useState('');
  const [isTextName, setName] = useState('');
  const [isTextSurname, setSurname] = useState('');
  const [isTextPassword, setPassword] = useState('');
  const [isTextConfirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (isClosed) {
      setEmail('');
      setName('');
      setSurname('');
      setPassword('');
      setConfirmPassword('');
      clearErrors(); // Убирает ошибки из useForm
      reset()
    }
  }, [isClosed])

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target

    setEmail(value)
    clearErrors('email');
  }

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target

    setName(value)
    clearErrors('name');
  }

  const handleChangeSurname = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target

    setSurname(value)
    clearErrors('surname');
  }

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target

    setPassword(value)
    clearErrors('password');
  }

  const handleChangeConfirmPassword = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target

    setConfirmPassword(value)
    clearErrors('confirmPassword');
  }

  const { register, handleSubmit, formState: { errors }, clearErrors, reset } = useForm<CreateRegForm>({
    resolver: zodResolver(createRegisterSchema)
  })

  const registerMutation = useMutation(
    {
      mutationFn: registerUser,
      onSuccess() {
        setAuthType('confirm')
      }
    },
    queryClient
  );

  return (
    <form className="register-form" onSubmit={handleSubmit(({ email, name, surname, password, confirmPassword }) => {
      registerMutation.mutate({ email, name, surname, password })
    })}>
      <FormField
        label="Электронная почта"
        errorMessage={errors.email?.message}
        isText={isTextEmail}>
        <input
          style={errors.email?.message ? { borderColor: 'rgb(255, 0, 0)' } : {}}
          className='form-input'
          value={isTextEmail}
          {...register('email')}
          onChange={handleChangeEmail}
        />
        <div className={!errors.email?.message ? 'form-input-icon form-input-icon-email' : 'form-input-icon form-input-icon-email-error'}></div>
      </FormField>

      <FormField
        label="Имя"
        errorMessage={errors.name?.message}
        isText={isTextName}>
        <input
          style={errors.name?.message ? { borderColor: 'rgb(255, 0, 0)' } : {}}
          className="form-input"
          value={isTextName}
          {...register('name')}
          onChange={handleChangeName}
        />
        <div className={!errors.name?.message ? 'form-input-icon form-input-icon-user' : 'form-input-icon form-input-icon-user-error'}></div>
      </FormField>

      <FormField
        label="Фамилия"
        errorMessage={errors.surname?.message}
        isText={isTextSurname}>
        <input
          style={errors.surname?.message ? { borderColor: 'rgb(255, 0, 0)' } : {}}
          className="form-input"
          value={isTextSurname}
          {...register('surname')}
          onChange={handleChangeSurname}
        />
        <div className={!errors.surname?.message ? 'form-input-icon form-input-icon-user' : 'form-input-icon form-input-icon-user-error'}></div>
      </FormField>

      <FormField
        label="Пароль"
        errorMessage={errors.password?.message}
        isText={isTextPassword}>
        <input
          style={errors.password?.message ? { borderColor: 'rgb(255, 0, 0)' } : {}}
          className="form-input"
          value={isTextPassword}
          {...register('password')}
          onChange={handleChangePassword}
        />
        <div className={!errors.password?.message ? 'form-input-icon form-input-icon-key' : 'form-input-icon form-input-icon-key-error'}></div>
      </FormField>

      <FormField
        label="Пароль"
        errorMessage={errors.confirmPassword?.message}
        isText={isTextConfirmPassword}>
        <input
          style={errors.confirmPassword?.message ? { borderColor: 'rgb(255, 0, 0)' } : {}}
          className="form-input"
          value={isTextConfirmPassword}
          {...register('confirmPassword')}
          onChange={handleChangeConfirmPassword}
        />
        <div className={!errors.confirmPassword?.message ? 'form-input-icon form-input-icon-key' : 'form-input-icon form-input-icon-key-error'}></div>
      </FormField>

      <Button className="modal-button" type='submit'
        isLoading={registerMutation.isPending}>
        Создать аккаунт
      </Button>
    </form>
  )
}
