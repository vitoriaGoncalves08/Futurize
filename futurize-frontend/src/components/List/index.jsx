import React, { useState, useEffect, useMemo } from 'react';
import Buttons from '../../components/Buttons/Buttons';
import Input from '../../components/Input/input';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { CSS } from '@dnd-kit/utilities';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LayersIcon from '@mui/icons-material/Layers';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Card from '../Card';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { Container } from './styles';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import { ToastSuccess, ToastError } from '../Alert/Toast';
import { isValid, format, parse } from 'date-fns';

import { Droppable, Draggable } from 'react-beautiful-dnd';

export default function List({ data, index: listIndex, tasks, allocatedUsers }) {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const location = useLocation();
  const projectData = location.state && location.state.projectData;
  const { getLoginUserObject } = useAuth();
  const usuarioLogado = getLoginUserObject();
  const [open, setOpen] = useState(false);
  const [allocatedUser, setAllocatedUser] = useState([]);

  const [selectedUser, setSelectedUser] = useState('');
  const [selectedEstado, setSelectedEstado] = useState('');
  const [rows, setRows] = useState([]);

  const [formTask, setFormTask] = useState({
    id: 1,
    titulo: '',
    descricao: '',
    inicio: '',
    encerramento: '',
    estado: '',
    dificuldade: '',
    prioridade: '',
    tempo_execucao: '00-00-20',
    projeto: {
      id: projectId,
    },
    responsavel: {
      id: '',
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function addSucesso(success) {
    ToastSuccess({
      text: success,
      title: 'Sucesso!!',
    });
    setOpen(false);
  }

  function addError(error) {
    ToastError({
      text: error,
      title: 'Error!!',
    });
  }

  const handleInputChange = (e, field) => {
    setFormTask({
      ...formTask,
      [field]: e.target.value,
    });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

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
    } = formTask;

    // Verifique se encerramento é uma data válida
    const encerramentoDate =
      formTask.encerramento instanceof Date
        ? formTask.encerramento
        : new Date(formTask.encerramento);

    // Formate a data para o formato "yyyy-MM-dd"
    const formattedDate = `${encerramentoDate.getFullYear()}-${(
      encerramentoDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${encerramentoDate.getDate().toString().padStart(2, '0')}`;

    const dataInicial = inicio
      ? format(parse(inicio, 'dd-MM-yyyy', new Date()), 'yyyy-MM-dd')
      : format(new Date(), 'yyyy-MM-dd');
    const activityData = {
      id: id,
      titulo: titulo,
      descricao: descricao,
      inicio: dataInicial,
      encerramento: formattedDate,
      estado: estado,
      dificuldade: dificuldade,
      prioridade: prioridade,
      tempo_execucao: tempo_execucao,
      projeto: projeto,
      responsavel: { id: selectedUser },
    };

    try {
      console.log('atividade', activityData);
      const response = await axios.post(
        `https://deployfuturize-production.up.railway.app/Atividade`,
        activityData
      );

      if (response.status === 200) {
        addSucesso('Atividade adicionada com sucesso');
        handleClose();
        setTasks([...tasks, response.data]);
      } else {
        console.error('Erro ao adicionar a atividade');
      }
    } catch (error) {
      console.error('Erro ao conectar-se ao backend:', error);
    }
  };

  useEffect(() => {
    const fetchProjectMembers = async () => {
      try {
        const response = await axios.get(
          `https://deployfuturize-production.up.railway.app/Alocacao_projeto/${projectId}`
        );
        if (response.status === 200) {
          const allocatedUserIds = response.data.map(
            (allocation) => allocation.usuario
          );
          const allocatedUsersData = rows.filter((usuario) =>
            allocatedUserIds.includes(usuario.id)
          );
          setAllocatedUser(allocatedUserIds);
          // console.log("idss", allocatedUserIds);
          // console.log("data", allocatedUsersData);
        } else if (response.status === 409) {
          console.error('Erro ao buscar membros alocados ao projeto no backend.');
        }
      } catch (error) {
        console.error('Erro ao conectar-se ao backend:', error);
      }
    };
    // Certifique-se de que a busca de membros alocados seja acionada quando necessário
    fetchProjectMembers();
    const intervalId = setInterval(fetchProjectMembers, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Droppable key={data.code} droppableId={`${data.code}`}>
      {(provided, snapshot) => (
        <Container>
          <header>
            <h2>{data.title}</h2>

            {data.creatable && (
              <Buttons
                variant="outlined"
                className="button-circle"
                onClick={handleClickOpen}
              >
                +
              </Buttons>
            )}
          </header>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              <h1 className="titulo">Criar Atividade</h1>
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent>
              <form onSubmit={handleCreateTask}>
                <Input
                  id="titulo-kanban"
                  type="text"
                  name="titulo"
                  value={formTask.titulo}
                  onChange={(e) => handleInputChange(e, 'titulo')}
                  label="Digite seu titulo"
                />
                <Input
                  id="encerramento-kanban"
                  type="date"
                  name="encerramento"
                  value={formTask.encerramento}
                  onChange={(e) => handleInputChange(e, 'encerramento')}
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
                    value={formTask.dificuldade}
                    onChange={(e) => handleInputChange(e, 'dificuldade')}
                  >
                    <MenuItem value={'SIMPLES'}>Simples</MenuItem>
                    <MenuItem value={'MODERADA'}>Moderada</MenuItem>
                    <MenuItem value={'COMPLEXA'}>Complexa</MenuItem>
                  </Select>
                </FormControl>
                <Input
                  id="prioridade-kanban"
                  type="text"
                  name="prioridade"
                  value={formTask.prioridade}
                  onChange={(e) => handleInputChange(e, 'prioridade')}
                  label="Digite a prioridade"
                />
                <Input
                  id="descricao-kanban"
                  type="text"
                  name="descricao"
                  value={formTask.descricao}
                  onChange={(e) => handleInputChange(e, 'descricao')}
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
                      value={selectedUser}
                      onChange={(e) => setSelectedUser(e.target.value)}
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
                      value={formTask.estado}
                      onChange={(e) => handleInputChange(e, 'estado')}
                    >
                      <MenuItem value={'BACKLOG'}>Backlog</MenuItem>
                      <MenuItem value={'SPRINT_BACKLOG'}>Sprint Backlog</MenuItem>
                      <MenuItem value={'DEVELOPMENT'}>Development</MenuItem>
                      <MenuItem value={'DONE_DEVELOPMENT'}>
                        Done Development
                      </MenuItem>
                      <MenuItem value={'TEST'}>Test</MenuItem>
                      <MenuItem value={'DONE_TEST'}>Done Test</MenuItem>
                      <MenuItem value={'REWORK'}>Rework</MenuItem>
                      <MenuItem value={'DONE'}>Done</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <DialogActions>
                  <Buttons type="submit">Criar</Buttons>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>

          <div className="CamadaTime">
            <div className="Camada">
              <LayersIcon />
            </div>

            <div className="Time">
              <WatchLaterIcon />
              <p>00:00:00</p>
            </div>
          </div>

          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ height: '100%' }}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card
                      key={task.id}
                      listIndex={listIndex}
                      index={task.id}
                      data={task}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </Container>
      )}
    </Droppable>
  );
}
