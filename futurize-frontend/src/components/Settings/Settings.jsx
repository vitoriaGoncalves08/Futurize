import React from "react";
import "./Settings.css";

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
      </div>
    </div>
  );
}

export default Settings;
