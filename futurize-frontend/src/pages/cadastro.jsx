import React, { useState } from "react";
import Input from '../components/Input/input';
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import Buttons from '../components/Buttons/Buttons';
import '../../public/assets/css/cadastro-login.css';
import { ToastError } from "../components/Alert/Toast";
import { AlertSuccess } from "../components/Alert/Modal";
import axios from "axios";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senhaConf, setSenhaConf] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [nomeError, setNomeError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [senhaError, setSenhaError] = useState("");
  const [senhaConfError, setSenhaConfError] = useState("");
  
  const navigate = useNavigate();

  const { signup } = useAuth();

   // Função para validar o formato do email
   const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Função para verificar se o e-mail já existe (simulando no frontend)
  const checkIfEmailExists = async (emailToCheck) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd")) || [];
  
    const hasUser = usersStorage.filter((user) => user.email === emailToCheck);
  
    return !!hasUser.length;
  };

     //função para mostrar o alerta caso os campos não estejam preenchidos
     function isFilled(error){ 
      ToastError({
        text: error,
        title: "Erro!",
      });
    }

    function isSuccess(){ 
      AlertSuccess({
        text: "Usuário cadastrado com sucesso!",
        title: "Sucesso!",
      });
      navigate("/login");
    }  

  // Função para validar a senha
  const isSenhaValida = (senha) => {
    // Pelo menos uma letra maiúscula
    if (!/[A-Z]/.test(senha)) {
      return false;
    }
    // Pelo menos uma letra minúscula
    if (!/[a-z]/.test(senha)) {
      return false;
    }
    // Pelo menos 8 caracteres
    if (senha.length < 8) {
      return false;
    }
    return true;
};
  const handleSignup = async () => {
    if (!email | !senhaConf | !senha | !nome) {
      isFilled("Preencha todos os campos!");
      return;
    } else if (senha !== senhaConf) {
      setSenhaError("As senhas não são iguais");
      setSenhaConfError("As senhas não são iguais");
      return;
    } else if (!isEmailValid(email)) {
      setEmailError("Email inválido");
      return;
    }else if (!isSenhaValida(senha)) {
      setSenhaError("Tenha 1 caracter minúsculo, 1 maiúsculo e 8 digitos totais");
      return;
    }

    // Crie um objeto com os dados a serem enviados para o backend
    const userData = {
      nome: nome,
      email: email,
      senha: senha,
    };

    try {
      // Faça a chamada Axios para o endpoint do backend
      const response = await axios.post("http://localhost:8080/User", userData);

      if (response.data.error) {
        setError(response.data.error);
      } else {
        isSuccess();
      }
    } catch (error) {
      console.error(error);
      setError("Ocorreu um erro durante o cadastro.");
    }

     // Verifica se o e-mail já existe
     const emailExists = await checkIfEmailExists(email);

     if (emailExists) {
       setEmailError("Este e-mail já está cadastrado");
       return;
     }
 
    try {
      const res = await signup(nome, email, senha);
  
      if (res && res.error) {
        setError(res.error);
      } else {
        isSuccess();
      }
    } catch (error) {
      console.error(error);
      setError("Ocorreu um erro durante o cadastro.");
    }
  };

    return (
      <>
      <div className="container">
       <h1 className="titulo">CADASTRAR</h1>
       <h2 className="subtitulo">Crie sua conta</h2>
       <div className="inputs">
       <Input
            id="nome"
            type="text"
            label="Digite seu Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        <Input
            id="email"
            type="text"
            label="Digite seu E-mail"
            value={email}
            onChange={(e) => {setEmail(e.target.value); setEmailError("");}}
            helperText={emailError}
            error={Boolean(emailError)}
          />
        <Input
          id="senha"
          type="password"
          inputVariant="outlined"
          label="Digite sua Senha"
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value);
            setSenhaError("");
          }}
          helperText={senhaError}
          error={Boolean(senhaError)} 
        />

        <Input
          id="senhaConf"
          type="password"
          inputVariant="outlined"
          label="Confirme sua Senha"
          value={senhaConf}
          onChange={(e) => {
            setSenhaConf(e.target.value);
            setSenhaConfError("");
          }}
          helperText={senhaConfError}
          error={Boolean(senhaConfError)}
        />
        <div className="conta">
          <h3 className="info">Já tem uma conta?</h3>
          <Link className="link" to="/login">&nbsp;Entre aqui!</Link>
        </div>
        </div>
        <Buttons onClick={handleSignup}>Cadastrar</Buttons>
        </div>
      </>
    )
  }