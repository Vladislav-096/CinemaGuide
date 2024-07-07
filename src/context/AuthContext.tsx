import { createContext } from "react";

export interface useUser {
  email: string;
  name: string;
  surname: string;
  favorites?: string[];
}

interface AuthContext {
  user: useUser | null;
  setUser: (user: useUser | null) => void;
}

export const AuthContext = createContext<AuthContext>({
  user: null,
  setUser: () => { },
});
