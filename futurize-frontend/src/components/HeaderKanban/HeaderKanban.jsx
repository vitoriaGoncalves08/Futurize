import React from 'react';
import './HeaderKanban.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Avatar from '@mui/material/Avatar';

import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



export default function HeaderKanban() {
  const { projectId } = useParams();
  const location = useLocation();
  const projectData = location.state && location.state.projectData;
  console.log('projectData:', projectData); // Adicione isso para depurar
  return (
    <div className='container-header-kanban'>
      <h3 className='nome-header-kanban'>{projectData.titulo}</h3>
      <div className="integrantes-header-kanban">
        <Avatar>H</Avatar>
        <AddCircleIcon/>
      </div>
    </div>
  );
}