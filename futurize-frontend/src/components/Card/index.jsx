import React, { useRef, useContext, useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import axios from 'axios'; // Importe o Axios
import BoardContext from '../Board/context';
import { Container, Label } from './styles';

export default function Card({ index, listIndex }) {
  const ref = useRef();
  const { move } = useContext(BoardContext);

  const [horas, setHoras] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [activityData, setActivityData] = useState(null); // Estado para armazenar os dados da atividade

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

  useEffect(() => {
    // Realize a solicitação Axios apenas após a montagem do componente
    axios.get('http://localhost:8080/Atividade') // Substitua pela URL correta do seu backend
      .then((response) => {
        // Defina os dados das atividades no estado
        setActivityData(response.data);
        console.log(activityData);
      })
      .catch((error) => {
        console.error('Erro ao carregar as atividades:', error);
      });
  }, []); // Certifique-se de incluir um array de dependências vazio para garantir que isso seja executado apenas uma vez após a montagem do componente

  return (
    <div ref={ref}>
      <Container isDragging={activityData ? false : true}>
        {activityData && (
          <>
            <header>
              {activityData && activityData.map((activity) => (
                <Label key={activity.id}>{activity.titulo}</Label>
              ))}
            </header>
            <h5>{activityData.dificuldade}</h5>
            {activityData && activityData.map((activity) => (
              <Label key={activity.id}>{activity.descricao}</Label>
            ))}
            <div className="Data">
              <div className="Checkdata">
                <CheckBoxIcon />
                {activityData && activityData.map((activity) => (
                  <Label key={activity.id}>{activity.encerramento}</Label>
                ))}
              </div>
              <div className="Prioridade">
                {activityData && activityData.map((activity) => (
                  <Label key={activity.id}>{activity.prioridade}</Label>
                ))}
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
                {/* <p>{activityData.responsavel && <img src={activityData.responsavel} alt="" />}</p> */}
                {activityData && activityData.map((activity) => (
                  <Label key={activity.id}>{activity.responsavel.nome}</Label>
                ))}
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
