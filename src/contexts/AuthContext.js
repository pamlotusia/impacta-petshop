import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isEmployee, setIsEmployee] = useState(false);

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

  const signIn = async (email, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', {
        email: email,
        password: password
      });
      setUser(response.data);
      localStorage.setItem('accessToken', response.data.token);
      setIsEmployee(false); // Define que o usuário autenticado não é um funcionário
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  const signInEmployee = async (email, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/employee-login', {
        email: email,
        password: password
      });
      setUser(response.data);
      localStorage.setItem('accessToken', response.data.token);
      setIsEmployee(true); // Define que o usuário autenticado é um funcionário
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer login de funcionário:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsEmployee(false);
    localStorage.removeItem('accessToken');
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setUser({ token: accessToken });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ createUser, signIn, signInEmployee, logout, user, isEmployee }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
