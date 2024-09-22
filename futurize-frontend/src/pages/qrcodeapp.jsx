import React, { useState, useEffect } from 'react';
import QrCodeApp from "../components/QrCodeApp";
import Header from '../components/Header/Header';
import SideBar from '../components/SideBar/SideBar';
const QRCodeApp = () => {
 
  return (
    <>
      <Header style={{overflowY: 'auto'}}/>
      <SideBar>
        <QrCodeApp />
      </SideBar>
    </>
  );
};

export default QRCodeApp;
