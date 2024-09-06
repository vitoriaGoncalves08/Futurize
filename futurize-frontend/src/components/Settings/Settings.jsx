// import React from "react";
import React, { useState, useEffect } from "react";
import "./Settings.css";
import Buttons from '../Buttons/Buttons';


function Settings() {
  // Estado para armazenar os dados do usuário
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Função que simula a obtenção dos dados do usuário (substitua com os dados reais)
  useEffect(() => {
    // Simulando os dados carregados de uma API ou do localStorage
    const user = {
      firstName: "Natália",
      lastName: "Silva",
      email: "nataliasilva009@gmail.com",
      password: "********", // Não é recomendado exibir senhas reais
    };
    setUserData(user);
  }, []);

  // Função para lidar com a mudança nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
            <h2 className="h2-user-info">
              {/* Natália Silva */}
              {userData.firstName} {userData.lastName}
            </h2>
            <p className="p-user-info">
              {/* nataliasilva009@gmail.com */}
              {userData.email}
            </p>
          </div>
          <div id="switch">
            <button className="switch-button"></button>
            <span className="switch-span"></span>
          </div>
        </div>

        <div className="edit-profile">
          <h3>Editar Dados</h3>
          <div className="inputs-edit-profile">
            {/* <input className="style-inputs" type="text" placeholder="nome" />
            <input className="style-inputs" type="text" placeholder="sobrenome" />
            <input className="style-inputs" type="email" placeholder="email" />
            <input className="style-inputs" type="password" placeholder="senha" /> */}
            <input
              className="style-inputs"
              type="text"
              name="firstName"
              placeholder="nome"
              value={userData.firstName}
              onChange={handleChange}
            />
            <input
              className="style-inputs"
              type="text"
              name="lastName"
              placeholder="sobrenome"
              value={userData.lastName}
              onChange={handleChange}
            />
            <input
              className="style-inputs"
              type="email"
              name="email"
              placeholder="email"
              value={userData.email}
              onChange={handleChange}
            />
            <input
              className="style-inputs"
              type="password"
              name="password"
              placeholder="senha"
              value={userData.password}
              onChange={handleChange}
            />
            <Buttons>Alterar Senha</Buttons>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
