// import React from "react";
import React, { useState, useEffect } from "react";
import "./Settings.css";
import Buttons from '../Buttons/Buttons';


function Settings() {
  // Estados para armazenar as informações dos usuários
  const [userFirstName, setUserFirstName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  // Recupera os dados do localStorage quando a tela é carregada
  useEffect(() => {
    const savedUserFirstName = localStorage.getItem('userFirstName');
    const savedUserEmail = localStorage.getItem('userEmail');
    const savedUserPassword = localStorage.getItem('userPassword');

    if (savedUserFirstName) setUserFirstName(savedUserFirstName);
    if (savedUserEmail) setUserEmail(savedUserEmail);
    if (savedUserPassword) setUserPassword(savedUserPassword);
  }, []);

  // Função para salvar as informações no localStorage
  const handleSave = () => {
    localStorage.setItem('userFirstName', userFirstName);
    localStorage.setItem('userEmail', userEmail);
    localStorage.setItem('userPassword', userPassword);
    alert('Informações salvas com sucesso!');
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
              {userFirstName}
            </h2>
            <p className="p-user-info">
              {/* nataliasilva009@gmail.com */}
              {userEmail}
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
              id="firstName"
              value={userFirstName}
              onChange={(e) => setUserFirstName(e.target.value)}
            />
            <input
              className="style-inputs"
              type="text"
              name="lastName"
              placeholder="sobrenome"
              // value={userData.lastName}
              // onChange={handleChange}
            />
            <input
              className="style-inputs"
              type="email"
              name="email"
              id="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <input
              className="style-inputs"
              type="password"
              name="password"
              id="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
            <Buttons onClick={handleSave}>Alterar Senha</Buttons>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
