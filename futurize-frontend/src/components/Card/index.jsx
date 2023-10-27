import React, { useRef, useContext, useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import BoardContext from '../Board/context';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import { Container, Label } from './styles';

export default function Card({ data, index, listIndex }) {
  const ref = useRef();
  const { move } = useContext(BoardContext);

  const [horas, setHoras] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

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

  return (
    <div ref={ref}>
      <Container isDragging={data ? false : true}>
        {data && (
          <>
            <header>
              {data.labels.map((label)  => (
                <Label key={label} color={label} />
              ))}
            </header>

            <h3>{data.content}</h3>
            <p>{data.descricao}</p>
            
            <div className="Data">
              <div className="Checkdata">
                <CheckBoxOutlineBlankRoundedIcon></CheckBoxOutlineBlankRoundedIcon>
                <p>{data.data}</p>
              </div>  
                 
              <div className="Prioridade">
                <p>{data.prioridade}</p>
              </div>
            </div>
           
            <div className="TempoPerfil">
              <div className="Pessoa" onClick={handlePlayClick}>
                {isRunning ? <PauseIcon /> : <PlayArrowIcon />}
                <p>
                  {String(horas).padStart(2, '0')}:{String(minutos).padStart(2, '0')}:{String(segundos).padStart(2, '0')}
                </p>
              </div>

              <div className='Perfil'>
                <p>{data.user && <img src={data.user} alt="" />}</p>
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
