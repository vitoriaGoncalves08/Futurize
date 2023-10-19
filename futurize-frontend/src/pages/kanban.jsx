import React from "react";

import '../../public/assets/css/kanban.css';

import HeaderKanban from '../components/HeaderKanban';
import Board from '../components/Board';

function Kanban() {
  return (
    <>
      <HeaderKanban />
      <Board />

      {/* <GlobalStyles/> */}
    </>
  );
}

export default Kanban;
