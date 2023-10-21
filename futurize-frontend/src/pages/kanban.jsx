import React from 'react';
import { DndProvider } from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

import GlobalStyle from '../../public/assets/css/kanban';

import Header from '../components/Header/Header';
import Board from '../components/Board';
import SideBar from '../components/SideBar/SideBar';
import HeaderKanban from '../components/HeaderKanban/HeaderKanban';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <SideBar>
      <HeaderKanban/>
        <Board />
        <GlobalStyle />
        </SideBar>
    </DndProvider>
  );
}

export default App;