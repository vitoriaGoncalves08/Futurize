import React, { useState, useEffect } from 'react';
import Buttons from '../../components/Buttons/Buttons';
import Input from '../../components/Input/input';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
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

export default function List({ data, index: listIndex }) {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const location = useLocation();
  const projectData = location.state && location.state.projectData;
  const { getLoginUserObject } = useAuth();
  const usuarioLogado = getLoginUserObject();
  const [open, setOpen] = useState(false);
  const [allocatedUsers, setAllocatedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [rows, setRows] = useState([]);

  const [formTask, setFormTask] = useState({
    id: 1,
    titulo: "",
    descricao: "",
    inicio: "2018-01-01",
    encerramento: '',
    estado: "BACKLOG",
    dificuldade: '',
    prioridade: '',
    tempo_execucao: "00-00-20",
    projeto: {
      id: projectId
    },
    responsavel: {
      id: ''
    }
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
      responsavel
    } = formTask;

    // Verifique se encerramento é uma data válida
    const encerramentoDate = formTask.encerramento instanceof Date
      ? formTask.encerramento
      : new Date(formTask.encerramento);

    // Formate a data para o formato "yyyy-MM-dd"
    const formattedDate = `${encerramentoDate.getFullYear()}-${(encerramentoDate.getMonth() + 1).toString().padStart(2, '0')}-${encerramentoDate.getDate().toString().padStart(2, '0')}`;

    const activityData = {
      id: id,
      titulo: titulo,
      descricao: descricao,
      inicio: inicio,
      encerramento: formattedDate,
      estado: estado,
      dificuldade: dificuldade,
      prioridade: prioridade,
      tempo_execucao: tempo_execucao,
      projeto: projeto,
      responsavel: { id: usuarioLogado },
    };

    try {
      console.log("atividade", activityData);
      const response = await axios.post('http://localhost:8080/Atividade', activityData);

      if (response.status === 200) {
        addSucesso('Atividade adicionada com sucesso');
        handleClose();
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
        const response = await axios.get(`http://localhost:8080/Alocacao_projeto/${projectId}`);
        if (response.status === 200) {
          const allocatedUserIds = response.data.map((allocation) => allocation.usuario);
          const allocatedUsersData = rows.filter((usuario) => allocatedUserIds.includes(usuario.id));
          setAllocatedUsers(allocatedUserIds);
          // console.log("ids", allocatedUserIds);
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
    const intervalId = setInterval(fetchProjectMembers, 60000); // Fetch every minute

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container data-done={data.done ? 'true' : 'false'}>
      <header>
        <h2>{data.title}</h2>

        {data.creatable && (
          <Buttons variant="outlined" className="button-circle" onClick={handleClickOpen}>
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
              <InputLabel id="dificuldade-label">Selecione a dificuldade</InputLabel>
              <Select
                labelId="dificuldade-label"
                id="dificuldade"
                name="dificuldade"
                value={formTask.dificuldade}
                onChange={(e) => handleInputChange(e, 'dificuldade')}
              >
                <MenuItem value=" ">Selecione a dificuldade</MenuItem>
                <MenuItem value={"SIMPLES"}>Simples</MenuItem>
                <MenuItem value={"MODERADA"}>Moderada</MenuItem>
                <MenuItem value={"COMPLEXA"}>Complexa</MenuItem>
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
                  {allocatedUsers.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.nome}
                    </MenuItem>
                  ))}
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
          <LayersIcon />1
        </div>

        <div className="Time">
          <WatchLaterIcon />
          <p>00:00:00</p>
        </div>
      </div>

      <ul>
        {data.cards.map((card, index) => (
          <Card
            key={card.id}
            listIndex={listIndex}
            index={index}
            data={card}
          />
        ))}
      </ul>

    </Container>
  );

}
