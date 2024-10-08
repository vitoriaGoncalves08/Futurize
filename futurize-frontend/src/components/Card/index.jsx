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
import { format, parse, addDays } from 'date-fns';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';

export default function Card({ index, listIndex, data, setTasks }) {
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

  // Estado para o tempo de execução
  const [horas, setHoras] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const token = JSON.parse(localStorage.getItem('@user'))?.tokenJWT;
  

  // Função para carregar o tempo de execução do backend
  const loadExecutionTime = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/Atividade/${data.id}/tempo-execucao`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const { horas, minutos, segundos } = response.data;
        setHoras(horas || 0);
        setMinutos(minutos || 0);
        setSegundos(segundos || 0);
      } else {
        console.error('Erro ao carregar tempo de execução do backend.');
      }
    } catch (error) {
      console.error('Erro ao conectar-se ao backend:', error);
    }
  };

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSegundos(prevSegundos => {
          if (prevSegundos < 59) {
            return prevSegundos + 1;
          } else {
            setMinutos(prevMinutos => {
              if (prevMinutos < 59) {
                return prevMinutos + 1;
              } else {
                setHoras(prevHoras => prevHoras + 1);
                return 0;
              }
            });
            return 0;
          }
        });
      }, 1000);
    } else if (!isRunning && (horas > 0 || minutos > 0 || segundos > 0)) {
      saveExecutionTime({ horas, minutos, segundos });
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handlePlayClick = () => {
    setIsRunning(!isRunning);
  };

  const saveExecutionTime = async (executionTime) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/Atividade/${data.id}/tempo-execucao`,
        executionTime,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        ToastSuccess({ text: 'Tempo de execução salvo com sucesso!', title: 'Sucesso!' });
      } else {
        ToastError({ text: 'Erro ao salvar tempo de execução no backend.', title: 'Erro!' });
      }
    } catch (error) {
      ToastError({ text: `Erro ao conectar-se ao backend: ${error.message}`, title: 'Erro!' });
    }
  };
  

  function formatEncerramento(encerramento) {
    const encerramentoDate = addDays(new Date(encerramento), 1);
    const dia = encerramentoDate.getDate().toString().padStart(2, "0");
    const mes = (encerramentoDate.getMonth() + 1).toString().padStart(2, "0");
    const ano = encerramentoDate.getFullYear();
    return `${dia}/${mes}/${ano}`;
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
       // Atualize o estado das tarefas removendo a atividade deletada
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== idToDelete));
    } catch (error) {
      console.error("Erro ao excluir a atividade:", error);
    }
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

  const isValid = (date) => {
    return date instanceof Date && !isNaN(date);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const { id, titulo, descricao, inicio, encerramento, estado, dificuldade, prioridade, tempo_execucao, projeto, responsavel } = formAtividade;

    // Função para converter data de DD-MM-YYYY para YYYY-MM-DD
    const convertDateFormat = (dateString) => {
      const [day, month, year] = dateString.split('-');
      return `${year}-${month}-${day}`;
    };

    // Parse e validar datas
    const parseDate = (dateString) => {
      const formattedDate = convertDateFormat(dateString);
      const parsedDate = parse(formattedDate, 'yyyy-MM-dd', new Date());
      return isValid(parsedDate) ? format(parsedDate, 'yyyy-MM-dd') : null;
    };

    const dataInicial = parseDate(inicio);
    const dataFinal = parseDate(encerramento);

    if (!dataInicial || !dataFinal) {
      console.error('Invalid date value provided.');
      return;
    }

    const dataEditActivity = {
      id,
      titulo,
      descricao,
      inicio: dataInicial,
      encerramento: dataFinal,
      estado,
      dificuldade,
      prioridade,
      tempo_execucao,
      projeto,
      responsavel: { id: selectedUser },
    };

    try {
      const response = await axios.put(`http://localhost:8080/Atividade/${id}`, dataEditActivity, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const updatedRows = rows.map((row) => row.id === id ? { ...row, ...dataEditActivity } : row);
        setRows(updatedRows);
        setTasks((prevTasks) => 
          prevTasks.map((task) => task.id === id ? { ...task, ...dataEditActivity } : task)
        );
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
    setSelectedUser(e.target.value);
    setFormAtividade({
      ...formAtividade,
      responsavel: { id: e.target.value },
    });
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
    const response = await axios.get(
      `http://localhost:8080/Alocacao_projeto/${projectId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
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
            <Label style={{marginTop: 30}}color={getStatusTagColor(data.dificuldade)}></Label>
            <div className='acoes-card'>
              <DeleteIcon className="delete-card" onClick={openDeleteConfirmationDialog} />
              <ModeEditIcon className="edit-card" onClick={handleClickOpen}style={{ color: 'blue' }}/>
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
              <div className="play-pause-button" onClick={handlePlayClick}>
              {isRunning ? (
                  <PauseIcon className="pause-icon" />
                ) : (
                  <PlayArrowIcon className="play-icon" />
                )}
              </div>
              <div className="timer">
                <span>{data.tempo_execucao}</span>
              </div>
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
                  <MenuItem value={"TOTAL_TAREFAS"}>Backlog</MenuItem>
                  <MenuItem value={"TAREFAS_A_FAZER"}>Sprint Backlog</MenuItem>
                  <MenuItem value={"EM_ANDAMENTO"}>Development</MenuItem>
                  <MenuItem value={"FEITO"}>
                    Done Development
                  </MenuItem>
                  <MenuItem value={"A_REVISAR"}>Test</MenuItem>
                  <MenuItem value={"REVISADO"}>Done Test</MenuItem>
                  <MenuItem value={"REFAZENDO"}>Rework</MenuItem>
                  <MenuItem value={"CONCLUIDO"}>Done</MenuItem>
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
