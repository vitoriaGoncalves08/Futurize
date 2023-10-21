import React from 'react';
import './HeaderKanban.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Avatar from '@mui/material/Avatar';


export default function HeaderKanban() {
  return (
    <div className='container-header-kanban'>
      <h3 className='nome-header-kanban'>NOME PROJETO</h3>
      <div className="integrantes-header-kanban">
        <Avatar>H</Avatar>
        <AddCircleIcon/>
      </div>
    </div>
  );
}