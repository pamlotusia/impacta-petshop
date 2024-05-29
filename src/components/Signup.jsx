import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';

// Dá merge nessa 

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { createUser } = UserAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await createUser(username, email, password, phone);
      navigate('/'); // Redireciona para a página de login após o cadastro
    } catch (error) {
      setError(error.message);
      console.error('Erro ao criar usuário:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-5 rounded-md  my-20 py-8">
      <div className="rounded-md max-w-full bg-background-color shadow-lg p-7">
        <h1 className="text-2xl text-center font-bold py-6">Crie sua conta</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-5 bg-white p-2 rounded-lg">
            <label className="block text-gray-700 text-sm font-bold">
              Nome completo
            </label>
            <input
              onChange={e => setUsername(e.target.value)}
              className="w-full px-3 py-1 focus:outline-none"
              type="text"
              required
            />
          </div>
          <div className="mb-5 bg-white p-2 rounded-lg">
            <label className="block text-gray-700 text-sm font-bold">
              Telefone
            </label>
            <input
              onChange={e => setPhone(e.target.value)}
              className="w-full px-3 py-1 focus:outline-none"
              type="text"
              required
            />
          </div>
          <div className="mb-5 bg-white p-2 rounded-lg">
            <label className="block text-gray-700 text-sm font-bold">
              E-mail
            </label>
            <input
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-1 focus:outline-none"
              type="email"
              required
            />
          </div>
          <div className="mb-4 bg-white p-2 rounded-lg">
            <label className="block text-gray-700 text-sm font-bold">
              Senha
            </label>
            <input
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-1 focus:outline-none"
              type="password"
              required
            />
          </div>
          <button className="yellow mb-10 mt-10 w-full p-4 my-2 text-white uppercase font-bold font-button-confirm">
            Cadastre-se
          </button>
          <p className="py-2 text-center">
            Já possui uma conta?
            <Link to="/" className="font-bold">
              Entre por aqui
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
