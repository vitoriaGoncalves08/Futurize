import React, { useRef, useEffect, useState, useContext } from 'react'; // Import useContext
import { useDrag, useDrop } from 'react-dnd';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Container, Label } from './styles';
import Avatar from '@mui/material/Avatar';
import BoardContext from '../Board/context';

export default function Card({ index, listIndex, data }) {
  const ref = useRef();
  const { move } = useContext(BoardContext);

  const [, drag] = useDrag({
    type: 'CARD',
    item: { type: 'CARD', index, listIndex },
  });

  const [, drop] = useDrop({
    accept: 'CARD',
    hover: (item, monitor) => {
      if (item.index === index && item.listIndex === listIndex) {
        return;
      }

      move(item.listIndex, listIndex, item.index, index);
      item.index = index;
      item.listIndex = listIndex;
    },
  });

  drag(ref);
  drop(ref);

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
      const names = name.split(" ");
      if (names.length === 1) {
        return names[0].charAt(0).toUpperCase();
      } else {
        return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
      }
    } else {
      return ""; // Return an empty string if the name is null or undefined
    }
  }

  function getStatusTagColor(dificuldade) {
    switch (dificuldade) {
      case 'SIMPLES':
        return 'yellow';
      case 'MODERADA':
        return 'orange';
      case 'COMPLEXA':
        return 'red';
      default:
        return 'gray';
    }
  }

  return (
    <div ref={ref}>
      <Container isDragging={false}>
        <>
          <header>
            <Label color={getStatusTagColor(data.dificuldade)}></Label>
          </header>
          <h5>{data.titulo}</h5>
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
                {String(horas).padStart(2, '0')}:{String(minutos).padStart(2, '0')}:{String(segundos).padStart(2, '0')}
              </p>
            </div>
            <div className="Perfil">
              <Avatar>{formatMemberName(data.responsavel.nome)}</Avatar>
            </div>
          </div>
        </>
      </Container>
    </div>
  );
}
