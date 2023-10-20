import React from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'

import GlobalStyles from '../../public/assets/css/kanban';

import HeaderKanban from '../components/HeaderKanban';
import Board from '../components/Board';

function Kanban() {
  return (
    <DndProvider backend={HTML5Backend}>
      <HeaderKanban />
      <Board />

      <GlobalStyles/>
    </DndProvider>
  );
}

export default Kanban;
