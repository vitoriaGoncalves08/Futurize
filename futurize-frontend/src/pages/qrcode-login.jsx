import React, { useState } from 'react';
import QRCode from 'react-qr-code';  // Correct import for QRCode component

const GenerateQRCode = () => {
  const [conteudo, setConteudo] = useState("exp://192.168.15.26:8081");

  return (
    <div>
      <div>
        <QRCode value={conteudo} />
        <p>Escaneie este QR Code para se logar no app.</p>
      </div>
    </div>
  );
};

export default GenerateQRCode;
