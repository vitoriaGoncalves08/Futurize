import React, { useRef, useEffect, useState, useContext } from 'react'; // Import useContext
import { useDrag, useDrop } from 'react-dnd';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Container, Label } from './styles';
import Avatar from '@mui/material/Avatar';
import BoardContext from '../Board/context';
import Buttons from '../Buttons/Buttons';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { ToastSuccess, ToastError } from '../Alert/Toast';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export default function Card({ index, listIndex, data }) {
  const ref = useRef();
  const { move } = useContext(BoardContext);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [editedTitle, setEditedTitle] = useState(data.titulo);
  const [editedDescription, setEditedDescription] = useState(data.descricao);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'CARD', index, listIndex,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;
    }
  })

  dragRef(dropRef(ref));

  const handleEditClick = () => {
    setIsEditing(true);
    setEditingData(data);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingData(null);
    // Resetar os estados dos campos editados
    setEditedTitle(data.titulo);
    setEditedDescription(data.descricao);
    // Resetar outros campos, se necessário
  };

  const [, setFormAtividade] = useState({
    id: '',
    titulo: '',
    descricao: '',
    inicio: '',
    encerramento: '',
    estado: '',
    dificuldade: '',
    prioridade: '',
    tempo_execucao: '',
    projeto: '',
    responsavel: {id: ''},
  });

  const saveEdit = async () => {

    const { id, titulo, descricao, inicio, encerramento, estado, dificuldade, prioridade, tempo_execucao, projeto, responsavel, } = formAtividade;

    const dataEditActivity = {
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
      responsavel: {id: selectedUser},
    }
    try {
      // Realizar a chamada de API para atualizar a atividade no backend
      await axios.put(`http://localhost:8080/Atividade`, data);

      setIsEditing(false);
      setEditingData(null);
      // Atualizar os dados da atividade no estado ou realizar uma nova busca no backend
      // para obter os dados atualizados, dependendo da sua lógica
    } catch (error) {
      console.error('Erro ao editar a atividade:', error);
    }
  };


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
      return "";
    }
  }

  function getStatusTagColor(dificuldade) {
    switch (dificuldade) {
      case 'SIMPLES':
        return 'green';
      case 'MODERADA':
        return 'orange';
      case 'COMPLEXA':
        return 'red';
      default:
        return 'gray';
    }
  }

  const openDeleteConfirmationDialog = () => {
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmationDialog = () => {
    setDeleteConfirmationOpen(false);
  };

  function addSucessoGeneral(suc) {
    ToastSuccess({
      text: suc,
      title: 'Sucesso!',
    });
    setDeleteConfirmationOpen(false);
  }

  const confirmDeleteAllocation = async (e) => {
    e.preventDefault();
    closeDeleteConfirmationDialog(); // Fechar o diálogo de confirmação
    addSucessoGeneral('Membro excluído com sucesso!');

    try {
      // Certifique-se de ter o 'id' da atividade disponível em 'data'
      const idToDelete = data.id;
      console.log(idToDelete);

      if (!idToDelete) {
        console.error("ID da atividade não encontrado");
        return;
      }
      // Faça a chamada de API para excluir a atividade no backend
      await axios.delete(`http://localhost:8080/Atividade/${idToDelete}`);

      console.log('Atividade excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir a atividade:', error);
    }
  };

  function aaa(){
    console.log(data);
  }
  return (
    <div>
      {/* <Container ref={ref} isDragging={isDragging}>
        <>
          <header>
            <Label color={getStatusTagColor(data.dificuldade)}></Label>
            <div className='acoes-card'>
              <DeleteIcon className="delete-card" onClick={openDeleteConfirmationDialog}/>
              <ModeEditIcon className="edit-card" onClick={aaa} />
            </div>
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
      </Container> */}

<Container ref={ref} isDragging={isDragging}>
        <>
          <header>
            <Label color={getStatusTagColor(data.dificuldade)}></Label>
            <div className='acoes-card'>
              <DeleteIcon className="delete-card" onClick={openDeleteConfirmationDialog} />
              {isEditing ? (
                <>
                  <ModeEditIcon className="edit-card" onClick={saveEdit} />
                  <Buttons onClick={cancelEdit}>Cancelar</Buttons>
                  
                </>
              ) : (
                <ModeEditIcon className="edit-card" onClick={handleEditClick} />
              )}
            </div>
          </header>
          {isEditing ? (
            <>
             <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <h1 className="titulo">Editar Atividade</h1>
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
                  <MenuItem value={'DONE_DEVELOPMENT'}>Done Development</MenuItem>
                  <MenuItem value={'TEST'}>Test</MenuItem>
                  <MenuItem value={'DONE_TEST'}>Done Test</MenuItem>
                  <MenuItem value={'REWORK'}>Rework</MenuItem>
                  <MenuItem value={'DONE'}>Done</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <DialogActions>
              <Buttons type="submit">Editar</Buttons>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
            </>
          ) : (
            <>
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
          )}
        </>
      </Container>


        {/* Diálogo de confirmação para exclusão */}
        <Dialog
          open={deleteConfirmationOpen}
          onClose={closeDeleteConfirmationDialog}
        >
          <DialogTitle>Confirmação de Exclusão</DialogTitle>
          <DialogContent>
            Tem certeza de que deseja excluir esta alocação?
          </DialogContent>
          <DialogActions>
            <Buttons onClick={closeDeleteConfirmationDialog}>Cancelar</Buttons>
            <Buttons onClick={confirmDeleteAllocation}>Confirmar</Buttons>
          </DialogActions>
        </Dialog>
    </div>
  );
}
