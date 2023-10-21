import Buttons from '../../components/Buttons/Buttons';
import Input from '../../components/Input/input';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Card from '../Card';

import { Container } from './styles';

export default function List({ data, index: listIndex }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container done={data.done}>
      <header>
        <h2>{data.title}</h2>
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
              id="titulop"
              type="text"
              name="titulop"
              // value={formData.titulo}
              onChange={(e) => handleInputChange(e, 'titulo')}
              label="Digite seu titulo"
            />
            <Input
              id="encerramento"
              type="text"
              name="encerramento"
              // value={formData.encerramento}
              onChange={(e) => handleInputChange(e, 'encerramento')}
              label="Digite a data final"
            />
            
            <DialogActions>
              <Buttons type="submit">Criar</Buttons>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

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