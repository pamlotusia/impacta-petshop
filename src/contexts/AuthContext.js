import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const createUser = async (name, email, password, phone) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/create-account', {
        name: name,
        email: email,
        password: password,
        phone: phone
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('accessToken'); // Remove o token de acesso do cache do navegador ao fazer logout
  };

  const signIn = async (email, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', {
        email: email,
        password: password
      });
      setUser(response.data);
      localStorage.setItem('accessToken', response.data.token); // Armazena o token de acesso no cache do navegador ao fazer login
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setUser({ token: accessToken });
    }
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
