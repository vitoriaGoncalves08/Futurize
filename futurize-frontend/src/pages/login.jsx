import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Input from '../components/Input/input';
import Buttons from '../components/Buttons/Buttons';
import '../../public/assets/css/cadastro-login.css';
import { ToastError } from '../components/Alert/Toast';

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [senhaError, setSenhaError] = useState('');

  // Função para validar o formato do email
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Função para mostrar o alerta caso os campos não estejam preenchidos
  function isFilled(error) {
    ToastError({
      text: error,
      title: 'Erro!',
    });
  }

  const handleLogin = async () => {
    if (!email | !senha) {
      isFilled('Preencha todos os campos!');
      return;
    }

    if (!isEmailValid(email)) {
      setEmailError('Email inválido');
      return;
    }
    try {
      await signIn(email, senha);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        isFilled('Credenciais inválidas. Verifique seu e-mail e senha.');
      } else {
        isFilled('Erro ao realizar o login. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <>
      <div className="container-lc">
        <h1 className="titulo">ENTRAR</h1>
        <h2 className="subtitulo">Entre em sua conta</h2>
        <div className="inputs">
          <Input
            id="email"
            type="text"
            value={email}
            label="E-mail"
            onChange={(e) => [setEmail(e.target.value), setEmailError('')]}
            helperText={emailError}
            error={Boolean(emailError)}
          />
          <Input
            id="senha"
            type="password"
            label="Senha"
            value={senha}
            onChange={(e) => [setSenha(e.target.value), setSenhaError('')]}
            helperText={senhaError}
            error={Boolean(senhaError)}
          />
          {error}
          <div className="conta">
            <h3 className="info">Não possui uma conta?</h3>
            <Link className="link" to="/cadastro">
              &nbsp;Cadastrar-se
            </Link>
          </div>
        </div>
        <Buttons onClick={handleLogin}>Entrar</Buttons>
      </div>
    </>
  );
}
