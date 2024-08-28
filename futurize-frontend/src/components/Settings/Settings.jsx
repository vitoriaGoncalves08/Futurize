import React from "react";
import "./Settings.css";
import Buttons from '../Buttons/Buttons';


function Settings() {

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
            <h2 className="h2-user-info">Natália Silva</h2>
            <p className="p-user-info">nataliasilva009@gmail.com</p>
          </div>
          <div id="switch">
            <button className="switch-button"></button>
            <span className="switch-span"></span>
          </div>
        </div>

        <div className="edit-profile">
          <h3>Editar Dados</h3>
          <div className="inputs-edit-profile">
            <input type="text" placeholder="nome" />
            <input type="text" placeholder="sobrenome" />
            <input type="email" placeholder="email" />
            <input type="password" placeholder="senha" />
            <Buttons>Alterar Senha</Buttons>
          </div>
        </div>

        <hr />

        <div className="edit-font">
          <h3>Configurações</h3>
          <p>Tamanho da fonte</p>
          <div className="slider"></div>
          <p>Pequena</p>
          <p>Média</p>
          <p>Grande</p>
        </div>
      </div>
    </div>
  );
}

export default Settings;
