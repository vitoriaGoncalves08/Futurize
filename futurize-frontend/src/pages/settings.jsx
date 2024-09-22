import React from "react";
import Header from '../components/Header/Header';
import SideBar from '../components/SideBar/SideBar';
import Content from '../components/Settings/Settings'


export default function Settings() {
  return (
    <>
      <Header />
      <SideBar>
        <Content />
      </SideBar>
    </>
  );
}