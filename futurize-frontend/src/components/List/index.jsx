import React, { useState } from 'react';
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
import axios from 'axios'; // Importe o Axios para fazer solicitações HTTP
import useAuth from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import Card from '../Card';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Container } from './styles';

export default function List({ data, index: listIndex }) {
  const navigate = useNavigate();
  const { getLoginUserObject } = useAuth();
  const usuarioLogado = getLoginUserObject();
  const [open, setOpen] = useState(false);

  const [formTask, setFormTask] = useState({
    id: 0,
    titulo: "",
    descricao: "",
    inicio: "2018-01-01",
    encerramento: "2015-01-01",
    estado: "BACKLOG",
    dificuldade: "SIMPLES",
    prioridade: 1,
    tempo_execucao: "00-00-20",
    projeto: {
      id: 1
    },
    responsavel: {
      id: 1
    }
  });

  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      projeto: { id: projeto },
      responsavel: { id: usuarioLogado },
    };
  
    try {
      console.log("atividade",activityData);
      const response = await axios.post('http://localhost:8080/Atividade', activityData);
  
      if (response.status === 200) {
        console.log('Atividade adicionada com sucesso');
        handleClose();
      } else {
        console.error('Erro ao adicionar a atividade');
      }
    } catch (error) {
      console.error('Erro ao conectar-se ao backend:', error);
    }
  };
  

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
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
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
            </Box>

            <Input
              id="prioridade-kanban"
              type="text"
              name="prioridade"
              value={formTask.prioridade}
              onChange={(e) => handleInputChange(e, 'prioridade')}
              label="Digite a prioridade"
            />
            <Input
              id="responsavel-kanban"
              type="text"
              name="responsavel"
              value={formTask.responsavel}
              onChange={(e) => handleInputChange(e, 'responsavel')}
              label="Digite o responsavel"
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

            <DialogActions>
              <Buttons type="submit">Criar</Buttons>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <div className="CamadaTime">
        <div className="Camada">
          <LayersIcon/>1
        </div>

        <div className="Time">
          <WatchLaterIcon/>
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
