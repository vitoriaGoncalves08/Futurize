import React, { useEffect, useState } from "react";
import "./SettingsSecurity.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Buttons from "../Buttons/Buttons";
import { ToastError, ToastSuccess } from "../Alert/Toast";
import Input from '../Input/input';
import { AlertWarning } from "../Alert/Modal";

function SettingsSecurity() {
  const { getLoginUser} = useAuth();
  const navigate = useNavigate();
  const usuarioLogado = getLoginUser();
  const usuarioLogadoId = usuarioLogado.id;

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState(usuarioLogado.email || "");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [nomeError, setNomeError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [senhaError, setSenhaError] = useState("");
  const [confSenhaError, setConfSenhaError] = useState("");
  const [error, setError] = useState("");
  
  const [originalEmail, setOriginalEmail] = useState(usuarioLogado.email);
  

  const token = JSON.parse(localStorage.getItem("@user"))?.tokenJWT;

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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

  const isSenhaValida = (senha) => {
    if (!/[A-Z]/.test(senha)) return false;
    if (!/[a-z]/.test(senha)) return false;
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) return false;
    if (!/[0-9]/.test(senha)) return false;
    if (senha.length < 8) return false;
    return true;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!token) {
          console.error("Token JWT não encontrado no localStorage.");
          return;
        }
        const response = await axios.get(
          `http://localhost:8080/Usuario/${usuarioLogadoId}`, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          const { nome, email} = response.data;
          setNome(nome);
          setEmail(email);
          setOriginalEmail(email); 
        } else {
          console.error("Erro ao buscar dados do usuário.");
        }
      } catch (error) {
        console.error("Erro ao conectar-se ao backend:", error);
      }
    };

    fetchUserData();
  }, [usuarioLogadoId, token]);


  const handleUpdateUser = async () => {
    if (!isFormValid()) return;

    // Verificação para mostrar alerta apenas se o email foi alterado
    if (email !== originalEmail) {
      const result = await AlertWarning({
        title: "Deseja editar o e-mail?",
        text: "Alterar o e-mail exige que você faça login novamente.",
        textButton1: "Sim, alterar",
        textButton2: "Cancelar",
      });

      if (result.isConfirmed) {
        // Executa a atualização antes de deslogar e redirecionar
        try {
          const response = await axios.put(
            `http://localhost:8080/Usuario/${usuarioLogadoId}`,
            { id: usuarioLogadoId, nome, email, senha },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 200) {
            isSuccess("Dados alterados com sucesso!");
            navigate('/login');
          } else {
            isFilled("Erro ao alterar os dados do usuário.");
          }
        } catch (error) {
          setError("Erro ao conectar-se ao backend.");
          console.error("Erro ao conectar-se ao backend:", error);
        }
        return;
      } else {
        return; // Encerra a função se o usuário cancelar
      }
    }

    // Se o e-mail não foi alterado, realiza a atualização normalmente
    try {
      const response = await axios.put(
        `http://localhost:8080/Usuario/${usuarioLogadoId}`,
        { id: usuarioLogadoId, nome, email, senha },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        isSuccess("Dados alterados com sucesso!");
        navigate('/login');
      } else {
        isFilled("Erro ao alterar os dados do usuário.");
      }
    } catch (error) {
      setError("Erro ao conectar-se ao backend.");
      console.error("Erro ao conectar-se ao backend:", error);
    }
  };

  const isFormValid = () => {
    if (!email || !confirmarSenha || !senha || !nome) {
      isFilled("Preencha todos os campos!");
      return false;
    } else if (!isEmailValid(email)) {
      setEmailError("Email inválido");
      return false;
    } else if (senha !== confirmarSenha) {
      setSenhaError("As senhas não são iguais");
      setConfSenhaError("As senhas não são iguais");
      return false;
    } else if (!isSenhaValida(senha)) {
      setSenhaError(
        "A senha deve ter 1 caractere minúsculo, 1 maiúsculo e 8 dígitos totais"
      );
      return false;
    }
    return true;
  };

  return (
    <div className="container">
      <div className="config-profile">
        <div className="edit-profile">
          <h2 className="title">Alterar dados pessoais</h2>
          <div className="inputs-edit-profile">
            <Input
              id="nome"
              type="text"
              label="Nome"
              value={nome}
              onChange={(e) => [setNome(e.target.value), setNomeError('')]}
              helperText={nomeError}
              error={Boolean(nomeError)}
            />
            <Input
              id="email"
              type="text"
              label="E-mail"
              value={email}
              onChange={(e) => [
                setEmail(e.target.value), 
                setEmailError(isEmailValid(e.target.value) ? "" : "Email inválido")
              ]}
              helperText={emailError}
              error={Boolean(emailError)}
            />
            <Input
              id="senha"
              type="password"
              label="Senha"
              value={senha}
              onChange={(e) => [
                setSenha(e.target.value),
                setSenhaError(''),
                setConfSenhaError(confirmarSenha && e.target.value !== confirmarSenha ? "As senhas não são iguais" : "")
              ]}
              helperText={senhaError}
              error={Boolean(senhaError)}
            />
            <Input
              id="confirmarsenha"
              type="password"
              label="Confirmar senha"
              value={confirmarSenha}
              onChange={(e) => [
                setConfirmarSenha(e.target.value),
                setConfSenhaError(e.target.value !== senha ? "As senhas não são iguais" : "")
              ]}
              helperText={confSenhaError}
              error={Boolean(confSenhaError)}
            />
            <Buttons onClick={handleUpdateUser}>Alterar Dados</Buttons>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsSecurity;
