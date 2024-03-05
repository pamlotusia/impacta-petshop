import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../contexts/AuthContext'
import ImagemLogin from '../images/login-icon.svg'
import axios from 'axios'

const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { signIn } = UserAuth()

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', {email, password})

      if (response.data.access === 'allowed' && response.data.token) {
        // Armazene o token JWT no localStorage ou em outro local seguro
        localStorage.setItem('token', response.data.token);

        // Faça o login no contexto (ajuste conforme necessário)
        signIn(email, password);

        // Redirecione para a página desejada
        navigate('/home');
      } else {
        setError('Falha ao fazer login. Verifique suas credenciais.');
      }

    }catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  }
  return (
    <div className="max-w-md mx-auto p-5 rounded-md  my-20 py-8">
      <img src={ImagemLogin} alt="" className="mx-auto login-img" />
      <div className="rounded-md max-w-full bg-background-color shadow-lg p-7">
        <h2
          className="text-2xl font-bold mb-10
     text-center"
        >
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 bg-white p-2 rounded-lg">
            <label className="text-gray-700 text-sm font-bold">
              E-mail:
            </label>
            <input
              onChange={e => setEmail(e.target.value)}
              type="email"
              className="w-full px-3 py-1 focus:outline-none"
            />
          </div>
          <div className="mb-4 bg-white p-2 rounded-lg">
            <label className="text-gray-700 text-sm font-bold">
              Senha:
            </label>
            <input
              onChange={e => setPassword(e.target.value)}
              type="password"
              className="w-full px-3 py-1 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="yellow mb-10 mt-10 w-full p-4 my-2 text-white uppercase font-bold font-button-confirm"
          >
            Entrar
          </button>
          <p className="py-2 text-center">
            Não possui uma conta?
            <Link to="/signup" className="font-bold">
              Cadastre-se agora!
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signin
