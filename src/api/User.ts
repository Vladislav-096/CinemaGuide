import { z } from "zod";
import { validateResponse } from "./validationResponse";

interface RegisterData {
  email: string;
  password: string;
  name: string;
  surname: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const UserSchema = z.object({
  favorites: z.array(z.string()).optional(),
  name: z.string(),
  surname: z.string(),
  email: z.string()
})

export type meData = z.infer<typeof UserSchema>

// Регистрация
export function registerUser({ email, name, surname, password }: RegisterData): Promise<void> {

  return fetch(`https://cinemaguide.skillbox.cc/user`, {
    method: 'POST',
    credentials: "include",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ email, password, name, surname })
  })
    .catch((error) => {
      console.log('registerUser error', error)
      throw error
    })
    .then(() => undefined)
}

// Логин
export function login({ email, password }: LoginData): Promise<void> {
  return fetch(`https://cinemaguide.skillbox.cc/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ email, password })
  })
    .then(validateResponse)
    .then(() => undefined)
}

// Логаут
export function logout() {
  return fetch(`https://cinemaguide.skillbox.cc/auth/logout`, {
    method: 'GET',
    credentials: 'include',
  })
    .then(validateResponse)
    .then(() => undefined)
}

// Проверку на авторизацию
export function fetchMe() {
  return fetch(`https://cinemaguide.skillbox.cc/profile`, {
    method: 'GET',
    credentials: "include",
  }
  )
    .then(validateResponse)
    .then((response) => { return response.json() })
    .then((data) => UserSchema.parse(data))
    .then((res) => { return res })
    .catch((error) => {
      console.log('Пользователь не авторизирован:', error)
      throw error
    })
}
