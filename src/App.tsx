import { Layout } from "./components/Layout/Layout";
import { useEffect, useState } from "react";

import { AuthContext, useUser } from "./context/AuthContext";
import "./index.css";
import './index-media.css';

export function App() {
  const [user, setUser] = useState<useUser | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const updateUser = (newUserData: useUser | null) => {
    setUser(newUserData); // Причина ререндера?
    if (newUserData) {
      localStorage.setItem('user', JSON.stringify(newUserData));
    } else {
      console.log('Ошибка при получении профиля')
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser: updateUser }}>
      <Layout />
    </AuthContext.Provider>
  );
}
