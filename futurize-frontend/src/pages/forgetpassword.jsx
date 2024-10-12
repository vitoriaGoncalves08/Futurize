import React, { useEffect, useState } from "react";
import '../../public/assets/css/forget-password.css';
import axios from "axios";
import useAuth from "../hooks/useAuth"; // Importe o hook de autenticação
import Buttons from "../components/Buttons/Buttons";
import { ToastError, ToastSuccess } from "../components/Alert/Toast";

export default function Settings() {
  const { getLoginUser } = useAuth(); // Obtém o usuário logado
  const usuarioLogado = getLoginUser(); // Dados do usuário logado
  const usuarioLogadoId = usuarioLogado.id; // ID do usuário logado

  const [senhaAtual, setSenhaAtual] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [senhaError, setSenhaError] = useState("");
  const [confirmarSenhaError, setConfirmarSenhaError] = useState("");
  const [error, setError] = useState("");
  const token = JSON.parse(localStorage.getItem("@user"))?.tokenJWT; // Obtém o token de autenticação

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
      if (!confirmarSenha || !senha) {
        isFilled("Preencha todos os campos!");
        return;
      } else if (senha !== confirmarSenha) {
        setSenhaError("As senhas não são iguais");
        setConfirmarSenhaError("As senhas não são iguais");
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
          senha
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        isSuccess("Dados alterados com sucesso!"); // Mensagem de sucesso
      } else {
        isFilled("Erro ao alterar os dados do usuário."); // Mensagem de erro
      }
    } catch (error) {
      setErrorMessage("Erro ao conectar-se ao backend."); // Mensagem de erro
      console.error("Erro ao conectar-se ao backend:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="forget-container">
          <h2>Esqueci minha senha</h2>
        <input
          className="style-inputs"
          type="password"
          placeholder="senha atual"
          value={senhaAtual}
          onChange={(e) => setSenhaAtual(e.target.value)}
        />
        <input
          className="style-inputs"
          type="password"
          placeholder="senha nova"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <input
          className="style-inputs"
          type="password"
          placeholder="confirmar senha nova"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />
        <Buttons onClick={handleUpdateUser}>Alterar Dados</Buttons>
        </div>
      </div>
    </>
  );
}