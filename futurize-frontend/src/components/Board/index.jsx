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
      title: 'Backlog',
      creatable: true,
      code: LIST_CODES.BACKLOG,
    },
    {
      title: 'Sprint Backlog',
      creatable: false,
      code: LIST_CODES.SPRINT_BACKLOG,
    },
    {
      title: 'Development',
      creatable: false,
      code: LIST_CODES.DEVELOPMENT,
    },
    {
      title: 'Done Development',
      creatable: false,
      code: LIST_CODES.DONE_DEVELOPMENT,
    },
    {
      title: 'Test',
      creatable: false,
      code: LIST_CODES.TEST,
    },
    {
      title: 'Done Test',
      creatable: false,
      code: LIST_CODES.DONE_TEST,
    },
    {
      title: 'Rework',
      creatable: false,
      code: LIST_CODES.REWORK,
    },
    {
      title: 'DONE',
      creatable: false,
      done: true,
      code: LIST_CODES.DONE,
    },
  ];
}

const data = loadLists();

export default function Board() {
  const [lists] = useState(data);
  const [tasks, setTasks] = useState([]);
  const [allocatedUsers, setAllocatedUsers] = useState([]);

  const { projectId } = useParams();

  const fetchProjectMembers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/Alocacao_projeto/${projectId}`
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
        `http://localhost:8080/Atividade/${projectId}`
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

  useEffect(() => {
    const intervalId = setInterval(fetchProjectMembers, 60000);
    fetchTasks();

    return () => clearInterval(intervalId);
  }, []);

  function onDragEnd(event) {
    console.log(event);

    const draggedTaskIdx = tasks.findIndex((task) => task.id == event.draggableId);

    if (draggedTaskIdx === -1) return;

    const newTasks = [...tasks];

    newTasks[draggedTaskIdx].estado = event.destination.droppableId;

    setTasks(newTasks);

    /*
    só tá mudando no client-side, precisa agora salvar a alteração no banco, pra isso tu pode
    criar um endpoint que atualiza uma task específica, daqui a gente manda o id da task a ser
    atualizada (newTasks[draggedTaskIdx].id) e o novo estado dela (event.destination.droppableId).
    Esse endpoint pode ser um PATCH ou PUT.
    */
  }

  return (
    <DragDropContext onDragEnd={onDragEnd} key={tasks}>
      <ContainerBoard key={tasks}>
        {lists.map((list, index) => (
          <List
            key={list.title}
            index={index}
            data={list}
            tasks={getFilteredTasks(list.code)}
            allocatedUsers={allocatedUsers}
          />
        ))}
      </ContainerBoard>
    </DragDropContext>
  );
}
