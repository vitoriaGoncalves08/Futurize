import Buttons from '../../components/Buttons/Buttons';
import Input from '../../components/Input/input';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import LayersIcon from '@mui/icons-material/Layers';
import Card from '../Card';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Container } from './styles';
import PauseIcon from '@mui/icons-material/Pause';


export default function List({ data, index: listIndex }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [formTask, setFormTask] = useState({
    titulo: '',
    inicio: '',
    encerramento: '',
    prioridade: '',
    integrante: '',
    descricao: '',
    estado: '',
  });

  const [dias, setDias] = useState(0);
  const [horas, setHoras] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        if (segundos < 59) {
          setSegundos(segundos + 1);
        } else if (minutos < 59) {
          setMinutos(minutos + 1);
          setSegundos(0);
        } else if (horas < 24) {
          setHoras(horas + 1);
          setMinutos(0);
          setSegundos(0);
        } else {
          setDias(dias + 1)
          setHoras(0);
          setMinutos(0);
          setSegundos(0);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [segundos, minutos, horas, dias, isRunning]);

  const handlePlayClick = () => {
    setIsRunning(!isRunning);
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
            <Input
              id="prioridade-kanban"
              type="text"
              name="prioridade"
              value={formTask.titulo}
              onChange={(e) => handleInputChange(e, 'prioridade')}
              label="Digite a prioridade"
            />
            <Input
              id="integrante-kanban"
              type="text"
              name="integrante"
              value={formTask.titulo}
              onChange={(e) => handleInputChange(e, 'integrante')}
              label="Digite o integrante"
            />
            
            <TextareaAutosize>
            </TextareaAutosize>
            
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

        <div className="Time" onClick={handlePlayClick}>
          {isRunning ? <PauseIcon /> : <WatchLaterIcon />}
          <p>
            {String(dias).padStart(2, '0')}:{String(horas).padStart(2, '0')}:{String(minutos).padStart(2, '0')}:{String(segundos).padStart(2, '0')}
          </p>
        </div>
      </div>

      <ul>
        { data.cards.map((card, index) => (
          <Card 
            key={card.id} 
            listIndex={listIndex}
            index={index} 
            data={card}
          />
        )) }
      </ul>
      
    </Container>
  );
  
}