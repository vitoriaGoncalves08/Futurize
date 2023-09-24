import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import Input from '../components/Input/input';
import Buttons from '../components/Buttons/Buttons';
import '../../public/assets/css/cadastro-login.css';

export default function Login() {

  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

   // Função para validar o formato do email
   const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    if (!email | !senha) {
      setError("Preencha todos os campos");
      return;
    } else if (!isEmailValid(email)) {
      setError("Email inválido");
      return;
    }

    const res = signin(email, senha);

    if (res) {
      setError(res);
      return;
    }

    navigate("/home");
  };

  return (
    <>
    <div className="container">
       <h1 className="titulo">ENTRAR</h1>
       <h2 className="subtitulo">Entre em sua conta</h2>
       <div className="inputs">
        <Input
          type="text"
          value={email}
          label="E-mail"
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="password"
          label="Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        {error}
        <div className="conta">
          <h3 className="info">Não possui uma conta?</h3>
          <Link className="link" to="/cadastro">&nbsp;Cadastrar-se</Link>
        </div>
          </div>
          <Buttons onClick={handleLogin}>Entrar</Buttons>
       </div>
    </>
  )
}