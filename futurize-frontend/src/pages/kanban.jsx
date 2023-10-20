import React from "react";

import GlobalStyles from '../../public/assets/css/kanban';

import HeaderKanban from '../components/HeaderKanban';
import Board from '../components/Board';

function Kanban() {
  return (
    <>
      <HeaderKanban />
      <Board />

      <GlobalStyles/>
    </>
  );
}

export default Kanban;
