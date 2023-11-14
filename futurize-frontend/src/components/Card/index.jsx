import React, { useRef, useContext, useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import axios from 'axios'; // Importe o Axios
import BoardContext from '../Board/context';
import { Container, Label } from './styles';
import Avatar from '@mui/material/Avatar';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Card({ index, listIndex }) {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const location = useLocation();

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
    axios.get(`http://localhost:8080/Atividade/${projectId}`) // Substitua pela URL correta do seu backend
      .then((response) => {
        // Defina os dados das atividades no estado
        setActivityData(response.data);
        console.log("RD", activityData);
      })
      .catch((error) => {
        console.error('Erro ao carregar as atividades:', error);
      });
  }, []); // Certifique-se de incluir um array de dependências vazio para garantir que isso seja executado apenas uma vez após a montagem do componente

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
      return ""; // Retornar uma string vazia se o nome for nulo ou indefinido
    }
  }

  function getStatusTagColor(dificuldade) {
    switch (dificuldade) {
      case 'SIMPLES':
        return 'yellow'; // ou qualquer outra cor que desejar
      case 'MODERADA':
        return 'orange'; // ou outra cor
      case 'COMPLEXA':
        return 'red'; // ou outra cor
      default:
        return 'gray'; // ou outra cor padrão
    }
  }

  return (
    <div ref={ref}>
      <Container isDragging={activityData ? false : true}>
        {activityData && (
          <>
            <header>
              {activityData.map((activity) => (
                <Label key={activity.id} color={getStatusTagColor(activity.dificuldade)}></Label>
              ))}
            </header>
            {activityData && activityData.map((activity) => (
              <h5 key={activity.id}>{activity.titulo}</h5>
            ))}
            {activityData && activityData.map((activity) => (
              <p key={activity.id}>{activity.descricao || "Descrição não disponível"}</p>
            ))}

            <div className="Data">
              <div className="Checkdata">
                <CheckBoxIcon />
                {activityData && activityData.map((activity) => (
                  <p key={activity.id}>{formatEncerramento(activity.encerramento)}</p>
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
                {activityData && activityData.map((activity) => (
                  <Avatar key={activity.id}>{formatMemberName(activity.responsavel.nome)}</Avatar>
                ))}
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
