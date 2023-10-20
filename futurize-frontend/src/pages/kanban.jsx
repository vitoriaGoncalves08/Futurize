import React from 'react';
import { DndProvider } from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

import GlobalStyle from '../../public/assets/css/kanban';

import Header from '../components/HeaderKanban';
import Board from '../components/Board';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <Board />
      
      <GlobalStyle />
    </DndProvider>
  );
}

export default App;