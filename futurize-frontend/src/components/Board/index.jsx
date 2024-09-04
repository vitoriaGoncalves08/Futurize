import React, { useEffect, useState, useMemo, useCallback } from 'react';

import axios from 'axios';

import * as DndKit from '@dnd-kit/core';
import * as Sortable from '@dnd-kit/sortable';

import List from '../List';

import { ContainerBoard } from './styles';
import { LIST_CODES } from '../../utils/constants';
import { useParams } from 'react-router-dom';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function loadLists() {
  return [
    {
      title: 'Total de Tarefas',
      creatable: true,
      code: LIST_CODES.TOTAL_TAREFAS,
    },
    {
      title: 'Tarefas a Fazer',
      creatable: false,
      code: LIST_CODES.TAREFAS_A_FAZER,
    },
    {
      title: 'Em Andamento',
      creatable: false,
      code: LIST_CODES.EM_ANDAMENTO,
    },
    {
      title: 'Feito',
      creatable: false,
      code: LIST_CODES.FEITO,
    },
    {
      title: 'A Revisar',
      creatable: false,
      code: LIST_CODES.A_REVISAR,
    },
    {
      title: 'Revisado',
      creatable: false,
      code: LIST_CODES.REVISADO,
    },
    {
      title: 'Refazendo',
      creatable: false,
      code: LIST_CODES.REFAZENDO,
    },
    {
      title: 'Concluído',
      creatable: false,
      done: true,
      code: LIST_CODES.CONCLUIDO,
    },
  ];
}

const data = loadLists();

export default function Board() {
  const [lists] = useState(data);
  const [tasks, setTasks] = useState([]);
  const [allocatedUsers, setAllocatedUsers] = useState([]);
  const token = JSON.parse(localStorage.getItem('@user'))?.tokenJWT;

  const { projectId } = useParams();

  const fetchProjectMembers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/Alocacao_projeto/${projectId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
        
      );
      if (response.status === 200) {
        const allocatedUserIds = response.data.map(
          (allocation) => allocation.usuario
        );
        const allocatedUsersData = rows.filter((usuario) =>
          allocatedUserIds.includes(usuario.id)
        );
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

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/Atividade/${projectId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      ); // Substitua pela sua URL de API
      if (response.status === 200) {
        setTasks(response.data);
      } else {
        console.error('Erro ao buscar listas');
      }
    } catch (error) {
      console.error('Erro ao conectar-se ao backend:', error);
    }
  };

  const getFilteredTasks = useCallback(
    (code) => tasks?.filter((task) => task.estado === code),
    [tasks]
  );
  const [forceRender, setForceRender] = useState(false);
  useEffect(() => {
    fetchProjectMembers();
    fetchTasks();
  }, []);
  
  useEffect(() => {
    console.log('Tasks updated in Board:', tasks);
  }, [tasks, forceRender]);

  async function updateTask(taskId, newState) {
    try {
        const response = await axios.put(
            `http://localhost:8080/Atividade/${taskId}`,
            {
                estado: newState, // Envia apenas o estado atualizado
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
        );

        if (response.status === 200) {
            console.log('Tarefa atualizada com sucesso no servidor.');
        } else {
            console.error('Erro ao atualizar a tarefa no servidor.');
        }
    } catch (error) {
        console.error('Erro ao conectar-se ao backend:', error);
    }
}

const updateTaskState = async (taskId, newState) => {
  try {
      const response = await axios.put(
          `http://localhost:8080/Atividade/${taskId}/estado`,
          { estado: newState },
          {
              headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
              },
          }
      );

      if (response.status === 200) {
          console.log('Estado da tarefa atualizado com sucesso.');
      } else {
          console.error('Erro ao atualizar o estado da tarefa.');
      }
  } catch (error) {
      console.error('Erro ao conectar-se ao backend:', error);
  }
};

const onDragEnd = (result) => {
  const { destination, source, draggableId } = result;

  if (!destination) {
      return;
  }

  if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
  }

  const draggedTaskIdx = tasks.findIndex((task) => task.id == draggableId);

  if (draggedTaskIdx === -1) return;

  const newTasks = [...tasks];
  const newState = destination.droppableId;

  newTasks[draggedTaskIdx].estado = newState;
  setTasks(newTasks);

  updateTaskState(newTasks[draggedTaskIdx].id, newState);
};


    /*
    só tá mudando no client-side, precisa agora salvar a alteração no banco, pra isso tu pode
    criar um endpoint que atualiza uma task específica, daqui a gente manda o id da task a ser
    atualizada (newTasks[draggedTaskIdx].id) e o novo estado dela (event.destination.droppableId).
    Esse endpoint pode ser um PATCH ou PUT.
    */


  async function updateTask(taskId, newState) {
    try {
      const response = await axios.put(
        `http://localhost:8080/Atividade/${taskId}`,
        {
          id: taskId, // Certifique-se de incluir o ID aqui
          estado: newState,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        console.log('Tarefa atualizada com sucesso no servidor.');
      } else {
        console.error('Erro ao atualizar a tarefa no servidor.');
      }
    } catch (error) {
      console.error('Erro ao conectar-se ao backend:', error);
    }
  }

  return (
  <DragDropContext onDragEnd={onDragEnd} key={tasks}>
    <ContainerBoard>
      {lists.map((list, index) => (
        <List
          key={list.code}  // Usar o código da lista como chave
          index={index}
          data={list}
          tasks={getFilteredTasks(list.code)}
          allocatedUsers={allocatedUsers}
          setTasks={setTasks}
        />
      ))}
    </ContainerBoard>
  </DragDropContext>
  );
}
