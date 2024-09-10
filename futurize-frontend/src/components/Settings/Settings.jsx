import React, { useEffect, useState } from "react";
import "./Settings.css";
import Buttons from "../Buttons/Buttons";
import axios from "axios";
import useAuth from "../../hooks/useAuth"; // Importe o hook de autenticação

function Settings() {
  const { getLoginUser } = useAuth(); // Obtém o usuário logado
  const usuarioLogado = getLoginUser(); // Dados do usuário logado
  const usuarioLogadoId = usuarioLogado.id; // ID do usuário logado

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = JSON.parse(localStorage.getItem("@user"))?.tokenJWT; // Obtém o token de autenticação

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
          senha,
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
            <input
              className="style-inputs"
              type="password"
              placeholder="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <Buttons onClick={handleUpdateUser}>Alterar Dados</Buttons>
          </div>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default Settings;
