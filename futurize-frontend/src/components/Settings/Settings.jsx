import React, { useEffect, useState } from "react";
import "./Settings.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Buttons from "../Buttons/Buttons";
import { ToastError, ToastSuccess } from "../Alert/Toast";
import emailjs from "emailjs-com";
import Input from '../../components/Input/input';
import { AlertWarning } from "../Alert/Modal";

function Settings() {
  const { getLoginUser, signOut } = useAuth();
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
          const { nome, email } = response.data;
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

  const handleEmailConfirmation = async () => {
    try {
      await emailjs.send(
        "service_cywnwa8",
        "template_9oqatw5",
        {
          to_email: email,
          to_name: nome,
          to_token: token,
        },
        "JbJ8giCPbMPBHHmUi"
      );
      alert("E-mail de confirmação enviado. Verifique sua caixa de entrada.");
    } catch (error) {
      console.error("Erro ao enviar o e-mail de confirmação:", error);
    }
  };


  return (
    <div className="container">
      <div className="config-profile">
        <h2 className="title">Confirmação de Dados Pessoais</h2>
        <div className="headerProfile">
          <div className="user-info">
            <h3 className="p-user-info">Nome: {nome}</h3>
            <h3 className="p-user-info">E-mail: {email}</h3>
          </div>
        </div>
        <div className="edit-profile">
          <h3 className="deseja">Deseja alterar alguma informação?</h3>
          <div className="inputs-edit-profile">
            <Buttons onClick={handleEmailConfirmation}>
              Enviar Confirmação para E-mail
            </Buttons>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Settings;
