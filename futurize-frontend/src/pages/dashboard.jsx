import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import GlobalStyle from '../../public/assets/css/kanban';

import Header from '../components/Header/Header';
import Board from '../components/Board';
import SideBar from '../components/SideBar/SideBar';
import Dashboard from '../components/Dashboard';

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <SideBar>
       <Dashboard />
      </SideBar>
    </DndProvider>
  );
}
