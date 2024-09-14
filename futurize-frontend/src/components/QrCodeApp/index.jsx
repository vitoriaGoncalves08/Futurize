import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code'; // Componente para o QR Code
import useAuth from '../../hooks/useAuth'; // Hook de autenticação
import './QrCodeApp.css'; // Importa os estilos
import appLogo from '../../../public/assets/img/app.png'; // Importa a imagem do app

const QrCode = () => {
  const { getLoginUser } = useAuth();
  const [conteudo, setConteudo] = useState('');
  const token = JSON.parse(localStorage.getItem('@user'))?.tokenJWT;

  useEffect(() => {
    const updateQRCodeContent = () => {
      const usuarioLogado = getLoginUser();
      if (usuarioLogado) {
        const usuarioLogadoId = usuarioLogado.id;
        const usuarioLogadoName = usuarioLogado.sub;
        const qrCodeContent = `exp://192.168.15.26:8081?token=${token}&id=${usuarioLogadoId}&name=${usuarioLogadoName}`;
        setConteudo(qrCodeContent);
        console.log(qrCodeContent); // Mostra o conteúdo do QR Code no console
      } else {
        console.error('Usuário não está logado.');
      }
    };

    updateQRCodeContent();
  }, [getLoginUser]);

  return (
    <div className="qrcode-container">
      <div className="qrcode-left">
        <h1>Baixe Nosso App</h1>
        <p>
          Aproveite a melhor experiência digital com nosso aplicativo. Baixe agora escaneando o QR Code!
        </p>
        <div className="app-logo-wrapper" style={{marginTop: 80}}> 
        <img src={appLogo} alt="App logo" className="app-logo" style={{width:250, height:350}}/> {/* Adiciona a imagem do app */}
        </div>
      </div>
      <div className="qrcode-right">
        <QRCode value={conteudo} className="qrcode" style={{width:250, height:250}} />
        <p style={{marginBottom: 20}}>Escaneie este QR Code para baixar nosso aplicativo.</p>
        <div className="store-buttons">
          <div className="store-button apple">
            <i className="fab fa-apple"></i>
            <span style={{margin: '0 auto'}}>Disponível em Android</span>
          </div>
          <div className="store-button google">
            <i className="fab fa-google-play"></i>
            <span style={{margin: '0 auto'}}>Disponível em IOS</span>
          </div>
        </div>
      </div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      />
    </div>
  );
};

export default QrCode;
  