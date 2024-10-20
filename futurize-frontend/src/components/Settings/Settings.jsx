import React, { useEffect, useState } from "react";
import "./Settings.css";
import Buttons from "../Buttons/Buttons";
import axios from "axios";
import useAuth from "../../hooks/useAuth"; // Importe o hook de autenticação
import Buttons from "../Buttons/Buttons";
import { ToastError, ToastSuccess } from "../Alert/Toast";
import { Link, useNavigate } from 'react-router-dom';

function Settings() {
  const { getLoginUser } = useAuth(); // Obtém o usuário logado
  const usuarioLogado = getLoginUser(); // Dados do usuário logado
  const usuarioLogadoId = usuarioLogado.id; // ID do usuário logado
  const navigate = useNavigate();


  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [emailError, setEmailError] = useState("");
  const [senhaError, setSenhaError] = useState("");
  const [confirmarSenhaError, setConfirmarSenhaError] = useState("");
  const [error, setError] = useState("");
  const token = JSON.parse(localStorage.getItem("@user"))?.tokenJWT; // Obtém o token de autenticação

  // Função para validar o formato do email
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Função para mostrar o alerta caso os campos não estejam preenchidos
  function isFilled(error) {
    ToastError({
      text: error,
      title: "Erro!",
    });
  }

  function isSuccess(msg) {
    ToastSuccess({
      text: msg,
      title: "Sucesso!",
    });
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
    // Pelo menos um caractere especial
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
      return false;
    }
    // Pelo menos um número
    if (!/[0-9]/.test(senha)) {
      return false;
    }
    // Pelo menos 8 caracteres
    if (senha.length < 8) {
      return false;
    }
    return true;
  };

  // Função para buscar os dados do usuário logado
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!token) {
          console.error("Token JWT não encontrado no localStorage.");
          return;
        }

        // Faz a requisição para buscar os dados do usuário pelo ID
        const response = await axios.get(
          `http://localhost:8080/Usuario/${usuarioLogadoId}`, // Endpoint para buscar o usuário
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          const { nome, email } = response.data;
          setNome(nome); // Define o nome no state
          setEmail(email); // Define o email no state
          // senha geralmente não é retornada por questões de segurança
        } else {
          console.error("Erro ao buscar dados do usuário.");
        }
      } catch (error) {
        console.error("Erro ao conectar-se ao backend:", error);
      }
    };

    fetchUserData(); // Chama a função para buscar os dados do usuário ao carregar a página
  }, [usuarioLogadoId, token]);

  // Função para salvar as alterações dos dados do usuário
  const handleUpdateUser = async () => {
    // Função para validar se tudo foi atendido
    const isFormValid = () => {
      if (!email || !confirmarSenha || !senha || !nome) {
        isFilled("Preencha todos os campos!");
        return;
      } else if (senha !== confirmarSenha) {
        setSenhaError("As senhas não são iguais");
        setConfirmarSenhaError("As senhas não são iguais");
        return;
      } else if (!isEmailValid(email)) {
        setEmailError("Email inválido");
        return;
      } else if (!isSenhaValida(senha)) {
        setSenhaError(
          "A senha deve ter 1 caractere minúsculo, 1 maiúsculo e 8 dígitos totais"
        );
        return;
      }
    };

    try {
      if (!token) {
        console.error("Token JWT não encontrado no localStorage.");
        return;
      }

      // Faz a requisição para atualizar os dados do usuário
      const response = await axios.put(
        `http://localhost:8080/Usuario/${usuarioLogadoId}`, // Endpoint para atualizar o usuário
        {
          id: usuarioLogadoId, // Usar o id do usuário logado
          nome,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Dados alterados com sucesso!"); // Mensagem de sucesso
      } else {
        setErrorMessage("Erro ao alterar os dados do usuário.");
      }
    } catch (error) {
      setErrorMessage("Erro ao conectar-se ao backend."); // Mensagem de erro
      console.error("Erro ao conectar-se ao backend:", error);
    }
  };

  return (
    <div className="container">
      <div className="config-profile">
        <div className="headerProfile">
          <img
            src="https://via.placeholder.com/80x80"
            alt="Foto de perfil"
            className="profile-pic"
          />
          <div className="user-info">
            <h2 className="h2-user-info">{`${nome}`}</h2>
            <p className="p-user-info">{email}</p>
          </div>
          <div id="switch">
            <button className="switch-button"></button>
            <span className="switch-span"></span>
          </div>
        </div>

        <div className="edit-profile">
          <h3>Editar Dados</h3>
          <div className="inputs-edit-profile">
            <input
              className="style-inputs"
              type="text"
              placeholder="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              className="style-inputs"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Buttons onClick={handleUpdateUser}>Alterar Dados</Buttons>

            <div className="conta">
              <Link className="link" to="/forgetpassword">
                &nbsp;Esqueci minha senha
              </Link>
            </div>
          </div>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default Settings;
