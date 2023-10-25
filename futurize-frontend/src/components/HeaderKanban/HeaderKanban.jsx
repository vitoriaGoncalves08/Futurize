import React from 'react';
import './HeaderKanban.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Avatar from '@mui/material/Avatar';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function HeaderKanban() {
  return (
    <div className='container-header-kanban'>

      <h3 className='nome-header-kanban'>NOME PROJETO</h3>
      <div className='Estrela'>
        <StarBorderIcon></StarBorderIcon>
      </div>
      <div className='Lixo'>
        <DeleteOutlineIcon></DeleteOutlineIcon>
      </div>
    
      <div className="integrantes-header-kanban">
        
        <Avatar>H</Avatar>
        <AddCircleIcon/>
      </div>
    </div>
  );
}