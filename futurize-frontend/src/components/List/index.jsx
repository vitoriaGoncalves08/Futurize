import React, { useState } from 'react';
import Buttons from '../../components/Buttons/Buttons';
import Input from '../../components/Input/input';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

import Card from '../Card';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Container } from './styles';

export default function List({ data, index: listIndex }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [formTask, setFormTask] = useState({
    id: 0,
    titulo: '',
    inicio: '',
    encerramento: '',
    dificuldade: ' ',
    prioridade: '',
    integrante: '',
    descricao: '',
    estado: '',
  });

  const handleInputChange = (e, field) => {
    setFormTask({
      ...formTask,
      [field]: e.target.value,
    });
  };

  return (
    <Container done={data.done}>
      <header>
        <h2>{data.title}</h2>
        <p>
          <MoreVertIcon></MoreVertIcon>
        </p>
       
        {data.creatable && (
          <Buttons variant="outlined" className="button-circle" onClick={handleClickOpen}>+</Buttons>
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
          <form>
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
                  <MenuItem value={"FACIL"}>Fácil</MenuItem>
                  <MenuItem value={"MEDIO"}>Médio</MenuItem>
                  <MenuItem value={"DIFICIL"}>Difícil</MenuItem>
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
              id="integrante-kanban"
              type="text"
              name="integrante"
              value={formTask.integrante}
              onChange={(e) => handleInputChange(e, 'integrante')}
              label="Digite o integrante"
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
          <LayersIcon></LayersIcon>1
        </div>

        <div className="Time">
          <WatchLaterIcon></WatchLaterIcon>
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
