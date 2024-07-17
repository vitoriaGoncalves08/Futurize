import React, { useRef, useEffect, useState, useContext } from "react"; // Import useContext

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { CSS } from "@dnd-kit/utilities";
import PauseIcon from "@mui/icons-material/Pause";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Container, Label } from "./styles";
import Avatar from "@mui/material/Avatar";
import Buttons from "../Buttons/Buttons";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import * as Sortable from "@dnd-kit/sortable";
import { ToastSuccess, ToastError } from "../Alert/Toast";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Input from '../../components/Input/input';
import { format } from 'date-fns';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';

export default function Card({ index, listIndex, data }) {
  const ref = useRef();
  const { projectId } = useParams();
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [allocatedUser, setAllocatedUser] = useState([]);
  const [rows, setRows] = useState([]);
  const [editedResponsavel, setEditedResponsavel] = useState('');
  const [totalCards, setTotalCards] = useState(0);

  useEffect(() => {
    // Certifique-se de que a busca de membros alocados seja acionada quando necessário
    fetchProjectMembers();
    const intervalId = setInterval(fetchProjectMembers, 60000); // Fetch every minute
    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const [horas, setHoras] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const token = JSON.parse(localStorage.getItem('@user'))?.tokenJWT;

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
    const dia = encerramentoDate.getDate().toString().padStart(2, "0");
    const mes = (encerramentoDate.getMonth() + 1).toString().padStart(2, "0");
    const ano = encerramentoDate.getFullYear();
    return `${dia}-${mes}-${ano}`;
  }

  function formatMemberName(name) {
    if (name) {
      const names = name.split(" ");
      if (names.length === 1) {
        return names[0].charAt(0).toUpperCase();
      } else {
        return (
          names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase()
        );
      }
    } else {
      return "";
    }
  }

  function getStatusTagColor(dificuldade) {
    switch (dificuldade) {
      case "SIMPLES":
        return "green";
      case "MODERADA":
        return "orange";
      case "COMPLEXA":
        return "red";
      default:
        return "gray";
    }
  }

  const handleClickOpen = () => {
  setOpen(true);
  openEditActivity(data);
  console.log('Open Edit Dialog');  // Adicione log para depuração
};

const handleClose = () => {
  setOpen(false);
  console.log('Close Edit Dialog');  // Adicione log para depuração
};

  const openDeleteConfirmationDialog = () => {
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmationDialog = () => {
    setDeleteConfirmationOpen(false);
  };

  function addSucessoGeneral(suc) {
    ToastSuccess({
      text: suc,
      title: "Sucesso!",
    });
    setDeleteConfirmationOpen(false);
  }

  const confirmDeleteAllocation = async (e) => {
    e.preventDefault();
    closeDeleteConfirmationDialog(); // Fechar o diálogo de confirmação
    addSucessoGeneral("Atividade excluída com sucesso!");

    try {
      // Certifique-se de ter o 'id' da atividade disponível em 'data'
      const idToDelete = data.id;
      console.log(idToDelete);

      if (!idToDelete) {
        console.error("ID da atividade não encontrado");
        return;
      }

      // Faça a chamada de API para excluir a atividade no backend
      await axios.delete(`http://localhost:8080/Atividade/${idToDelete}`,{
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log("Atividade excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir a atividade:", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditingData(data);
  };
  const cancelEdit = () => {
    setIsEditing(false);
    setEditingData(null);
    // Resetar os estados dos campos editados
  };
  const [formAtividade, setFormAtividade] = useState({
    id: '',
    titulo: '',
    descricao: '',
    inicio: '',
    encerramento: '',
    estado: '',
    dificuldade: '',
    prioridade: '',
    tempo_execucao: '',
    projeto: '',
    responsavel: { id: '' },
  });

  
  const handleEditSubmit = async (e) => {
    e.preventDefault();  // Previna o comportamento padrão do formulário
    
    const {
      id,
      titulo,
      descricao,
      inicio,
      encerramento,
      estado,
      dificuldade,
      prioridade,
      tempo_execucao,
      projeto,
      responsavel,
    } = formAtividade;
    
    const dataEditActivity = {
      id: id,
      titulo: titulo,
      descricao: descricao,
      inicio: format(new Date(inicio), 'yyyy-MM-dd'),
      encerramento: format(new Date(encerramento), 'yyyy-MM-dd'),
      estado: estado,
      dificuldade: dificuldade,
      prioridade: prioridade,
      tempo_execucao: tempo_execucao,
      projeto: projeto,
      responsavel: { id: selectedUser },
    };
  
    try {
      // Realizar a chamada de API para atualizar a atividade no backend
      const response = await axios.put(
        `http://localhost:8080/Atividade/${id}`,
        dataEditActivity, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        // Atualize o estado `rows` após a edição
        const updatedRows = rows.map((row) =>
          row.id === id ? { ...row, ...dataEditActivity } : row
        );
        setRows(updatedRows);
        // Feche o modal de edição
        handleClose();
        addSucessoGeneral('Atividade editada com sucesso!');
      } else {
        console.error('Erro ao atualizar os dados no backend.');
        addError('Erro ao atualizar os dados no backend.');
      }
    } catch (error) {
      console.error('Erro ao conectar-se ao backend:', error);
      addError('Erro ao conectar-se ao backend: ' + error.message);
    }
  };
  
  console.log(data.id, data);
  const openEditActivity = (activity) => {
    setFormAtividade({
      id: activity.id,
      titulo: activity.titulo,
      descricao: activity.descricao,
      inicio: format(new Date(activity.inicio), 'dd-MM-yyyy'),
      encerramento: format(new Date(activity.encerramento), 'dd-MM-yyyy'),
      estado: activity.estado,
      dificuldade: activity.dificuldade,
      prioridade: activity.prioridade,
      tempo_execucao: activity.tempo_execucao,
      projeto: activity.projeto,
      responsavel: { id: activity.responsavel.id },
    });
    setEditedResponsavel(activity.responsavel.id);
    setSelectedUser(activity.responsavel.id);
    setOpen(true);
  };

  const handleInputChange = (e, field) => {
    if (field === 'responsavel') {
      setEditedResponsavel(e.target.value);
    } else {
      setFormAtividade({
        ...formAtividade,
        [field]: e.target.value,
      });
    }
    console.log('Field changed:', field, 'Value:', e.target.value);  // Adicione log para depuração
  };

  const fetchProjectMembers = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/Alocacao_projeto/${projectId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const allocatedUserIds = response.data.map((allocation) => allocation.usuario);
        setAllocatedUser(allocatedUserIds);
      } else if (response.status === 409) {
        console.error('Erro ao buscar membros alocados ao projeto no backend.');
      }
    } catch (error) {
      console.error('Erro ao conectar-se ao backend:', error);
    }
  };

  return (
    <>
      <Container>
        <>
          <header>
            <Label color={getStatusTagColor(data.dificuldade)}></Label>
            <div className='acoes-card'>
              <DeleteIcon className="delete-card" onClick={openDeleteConfirmationDialog} />
              <ModeEditIcon className="edit-card" onClick={handleClickOpen} />
            </div>
          </header>

        {/*  {data.estado} */}

          <h4>{data.titulo}</h4>

          <p>{data.descricao || "Descrição não disponível"}</p>

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
                {String(horas).padStart(2, "0")}:
                {String(minutos).padStart(2, "0")}:
                {String(segundos).padStart(2, "0")}
              </p>
            </div>
            <div className="Perfil">
              <Avatar>{formatMemberName(data.responsavel.nome)}</Avatar>
            </div>
          </div>
        </>
      </Container>
      {/* Diálogo de confirmação para edição */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <h1 className="titulo">Editar Atividade</h1>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        {/* Diálog de edição da atividade */}
        <DialogContent>
          <form onSubmit={handleEditSubmit}>
            <Input
              id="titulo-kanban"
              type="text"
              name="titulo"
              value={formAtividade.titulo}
              onChange={(e) => handleInputChange(e, "titulo")}
              label="Digite seu titulo"
            />
            <Input
              id="encerramento-kanban"
              type="date"
              name="encerramento"
              value={formAtividade.encerramento}
              onChange={(e) => handleInputChange(e, "encerramento")}
              label="Digite a data de encerramento"
            />
            <FormControl fullWidth>
              <InputLabel id="dificuldade-label">
                Selecione a dificuldade
              </InputLabel>
              <Select
                labelId="dificuldade-label"
                id="dificuldade"
                name="dificuldade"
                value={formAtividade.dificuldade}
                onChange={(e) => handleInputChange(e, "dificuldade")}
              >
                <MenuItem value={"SIMPLES"}>Simples</MenuItem>
                <MenuItem value={"MODERADA"}>Moderada</MenuItem>
                <MenuItem value={"COMPLEXA"}>Complexa</MenuItem>
              </Select>
            </FormControl>
            <Input
              id="prioridade-kanban"
              type="text"
              name="prioridade"
              value={formAtividade.prioridade}
              onChange={(e) => handleInputChange(e, "prioridade")}
              label="Digite a prioridade"
            />
            <Input
              id="descricao-kanban"
              type="text"
              name="descricao"
              value={formAtividade.descricao}
              onChange={(e) => handleInputChange(e, "descricao")}
              label="Digite o descricao"
              multiline={true}
            />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="responsavel-label">Responsável</InputLabel>
                <Select
                  labelId="responsavel-label"
                  id="responsavel"
                  name="responsavel"
                  value={editedResponsavel}
                  onChange={(e) => handleInputChange(e, "responsavel")}
                  label="Responsável"
                >
                  {allocatedUser.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="estado-label">Selecione a estado</InputLabel>
                <Select
                  labelId="estado-label"
                  id="estado"
                  name="estado"
                  value={formAtividade.estado}
                  onChange={(e) => handleInputChange(e, "estado")}
                >
                  <MenuItem value={"BACKLOG"}>Backlog</MenuItem>
                  <MenuItem value={"SPRINT_BACKLOG"}>Sprint Backlog</MenuItem>
                  <MenuItem value={"DEVELOPMENT"}>Development</MenuItem>
                  <MenuItem value={"DONE_DEVELOPMENT"}>
                    Done Development
                  </MenuItem>
                  <MenuItem value={"TEST"}>Test</MenuItem>
                  <MenuItem value={"DONE_TEST"}>Done Test</MenuItem>
                  <MenuItem value={"REWORK"}>Rework</MenuItem>
                  <MenuItem value={"DONE"}>Done</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <DialogActions>
              <Buttons type="submit">Editar</Buttons>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      {/* Diálogo de confirmação para exclusão */}
      <Dialog
        open={deleteConfirmationOpen}
        onClose={closeDeleteConfirmationDialog}
      >
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
