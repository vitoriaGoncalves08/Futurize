import React, { useRef, useEffect, useState, useContext } from 'react'; // Import useContext

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { CSS } from '@dnd-kit/utilities';
import PauseIcon from '@mui/icons-material/Pause';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Container, Label } from './styles';
import Avatar from '@mui/material/Avatar';
import Buttons from '../Buttons/Buttons';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import * as Sortable from '@dnd-kit/sortable';
import { ToastSuccess, ToastError } from '../Alert/Toast';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Card({ index, listIndex, data }) {
  const [horas, setHoras] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        if (segundos < 59) {
          setSegundos(segundos + 1);
        } else if (minutos < 59) {
          setMinutos(minutos + 1);
          setSegundos(0);
        } else {
          setHoras(horas + 1);
          setMinutos(0);
          setSegundos(0);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [segundos, minutos, horas, isRunning]);

  const handlePlayClick = () => {
    setIsRunning(!isRunning);
  };

  function formatEncerramento(encerramento) {
    const encerramentoDate = new Date(encerramento);
    const dia = encerramentoDate.getDate().toString().padStart(2, '0');
    const mes = (encerramentoDate.getMonth() + 1).toString().padStart(2, '0');
    const ano = encerramentoDate.getFullYear();
    return `${dia}-${mes}-${ano}`;
  }

  function formatMemberName(name) {
    if (name) {
      const names = name.split(' ');
      if (names.length === 1) {
        return names[0].charAt(0).toUpperCase();
      } else {
        return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
      }
    } else {
      return ''; // Return an empty string if the name is null or undefined
    }
  }

  function getStatusTagColor(dificuldade) {
    switch (dificuldade) {
      case 'SIMPLES':
        return 'green';
      case 'MODERADA':
        return 'orange';
      case 'COMPLEXA':
        return 'red';
      default:
        return 'gray';
    }
  }

  const openDeleteConfirmationDialog = () => {
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmationDialog = () => {
    setDeleteConfirmationOpen(false);
  };

  function addSucessoGeneral(suc) {
    ToastSuccess({
      text: suc,
      title: 'Sucesso!',
    });
    setDeleteConfirmationOpen(false);
  }

  const confirmDeleteAllocation = async (e) => {
    e.preventDefault();
    closeDeleteConfirmationDialog(); // Fechar o diálogo de confirmação
    addSucessoGeneral('Membro excluído com sucesso!');

    try {
      // Certifique-se de ter o 'id' da atividade disponível em 'data'
      const idToDelete = data.id;
      console.log(idToDelete);

      if (!idToDelete) {
        console.error('ID da atividade não encontrado');
        return;
      }

      // Faça a chamada de API para excluir a atividade no backend
      await axios.delete(`http://localhost:8080/Atividade/${idToDelete}`);

      console.log('Atividade excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir a atividade:', error);
    }
  };

  return (
    <>
      <Container>
        <>
          <header>
            <Label color={getStatusTagColor(data.dificuldade)}></Label>
            <button onClick={openDeleteConfirmationDialog}>
              <DeleteIcon />
            </button>
          </header>

          {data.estado}

          <h5>{data.titulo}</h5>

          <p>{data.descricao || 'Descrição não disponível'}</p>

          <div className="Data">
            <div className="Checkdata">
              <CheckBoxIcon />
              <p>{formatEncerramento(data.encerramento)}</p>
            </div>
            <div className="Prioridade">
              <Label>{data.prioridade}</Label>
            </div>
          </div>

          <div className="TempoPerfil">
            <div className="Pessoa" onClick={handlePlayClick}>
              {isRunning ? <PauseIcon /> : <PlayArrowIcon />}
              <p>
                {String(horas).padStart(2, '0')}:{String(minutos).padStart(2, '0')}:
                {String(segundos).padStart(2, '0')}
              </p>
            </div>
            <div className="Perfil">
              <Avatar>{formatMemberName(data.responsavel.nome)}</Avatar>
            </div>
          </div>
        </>
      </Container>

      <Dialog open={deleteConfirmationOpen} onClose={closeDeleteConfirmationDialog}>
        <DialogTitle>Confirmação de Exclusão</DialogTitle>

        <DialogContent>
          Tem certeza de que deseja excluir esta alocação?
        </DialogContent>

        <DialogActions>
          <Buttons onClick={closeDeleteConfirmationDialog}>Cancelar</Buttons>
          <Buttons onClick={confirmDeleteAllocation}>Confirmar</Buttons>
        </DialogActions>
      </Dialog>
    </>
  );
}
