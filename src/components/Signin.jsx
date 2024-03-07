import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';
import ImagemLogin from '../images/login-icon.svg';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await signIn(email, password);
      console.log('Resposta da API:', response); // Adicionando instrução de depuração
      navigate('/dashboard'); // Redireciona para a rota '/home' após o login bem-sucedido
    } catch (error) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-5 rounded-md my-20 py-8">
      <img src={ImagemLogin} alt="" className="mx-auto login-img" />
      <div className="rounded-md max-w-full bg-background-color shadow-lg p-7">
        <h2 className="text-2xl font-bold mb-10 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 bg-white p-2 rounded-lg">
            <label className="text-gray-700 text-sm font-bold">E-mail:</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full px-3 py-1 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4 bg-white p-2 rounded-lg">
            <label className="text-gray-700 text-sm font-bold">Senha:</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full px-3 py-1 focus:outline-none"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="yellow mb-10 mt-10 w-full p-4 my-2 text-white uppercase font-bold font-button-confirm"
          >
            Entrar
          </button>
          <p className="py-2 text-center">
            Não possui uma conta?{' '}
            <Link to="/signup" className="font-bold">
              Cadastre-se agora!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
