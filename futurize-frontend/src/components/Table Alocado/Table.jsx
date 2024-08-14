import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { format } from 'date-fns';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Buttons from '../Buttons/Buttons';

export default function TableAlocado() {
  const [allocatedProjects, setAllocatedProjects] = useState([]); // Atualize o nome da variável para allocatedProjects
  const [open, setOpen] = useState(false);
  const [projectData, setProjectData] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [inicio, setinicio] = useState('');
  const [estado, setEstado] = useState('');
  const [error, setError] = useState();
  const [rows, setRows] = useState([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editProjectData, setEditProjectData] = useState(null);
  const navigate = useNavigate();
  const { getLoginUser } = useAuth();
  const usuarioLogado = getLoginUser();
  const usuarioLogadoId = usuarioLogado.id;

  const token = JSON.parse(localStorage.getItem('@user'))?.tokenJWT;

  const openDeleteConfirmation = (id) => {
    setIdToDelete(id);
    setDeleteConfirmationOpen(true);
  };

  const handleDelete = (id) => {
    if (id !== undefined && !isNaN(id)) {
      openDeleteConfirmation(id);
    } else {
      console.error('ID de projeto inválido:', id);
    }
  };

  function getStatusTagClass(estado) {
    switch (estado) {
      case 'ANDAMENTO':
        return 'tag-andamento';
      case 'CONCLUIDO':
        return 'tag-concluido';
      case 'PAUSADO':
        return 'tag-pausado';
      default:
        return 'tag-status';
    }
  }
  useEffect(() => {
    const fetchProjectMembers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/Alocacao_projeto/porUser/${usuarioLogadoId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if (response.status === 200) {
          const allocatedUsersData = response.data.map(
            (allocation) => allocation.usuario
          );
          const allocatedProjectData = response.data.map(
            (allocation) => allocation.projeto
          );
          // console.log(allocatedProjectData);

          // Atualize o estado rows com os projetos alocados
          const projectsInRows = allocatedProjectData.map((project) => ({
            id: project.id,
            titulo: project.titulo,
            inicio: project.inicio,
            encerramento: project.encerramento,
            estado: project.estado,
          }));
          setRows(projectsInRows);
        } else if (response.status === 409) {
          console.error('Erro ao buscar membros alocados ao projeto no backend.');
        }
      } catch (error) {
        console.error('Erro ao conectar-se ao backend:', error);
      }
    };

    fetchProjectMembers();
  }, [usuarioLogadoId]);

  const openProjectKanban = (project) => {
    // console.log('Dados do projeto:', project);
    setProjectData(project);
    navigate(`/kanban/${project.id}`, { state: { projectData: project } });
  };

  return (
    <div className="table">
      <div className="meus-projetos">
        <h1 className="subtitulo">Projetos que participo</h1>
      </div>
      <TableContainer
        component={Paper}
        style={{
          maxHeight: '370px',
          minHeight: '50px',
          overflowY: 'auto',
          overflowX: 'auto',
        }}
      >
        {/* Defina a altura para 600px e habilita a barra de rolagem vertical */}
        <Table sx={{ minWidth: 1500 }} aria-label="simple table">
          <TableHead>
            <TableRow className="row">
              <TableCell className="cel">TÍtulo</TableCell>
              <TableCell className="cel">Data de Início</TableCell>
              <TableCell className="cel">Data de Término</TableCell>
              <TableCell className="cel">Status</TableCell>
              <TableCell className="cel">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.titulo}
                </TableCell>
                <TableCell>{format(new Date(row.inicio), 'dd-MM-yyyy')}</TableCell>
                <TableCell>
                  {format(new Date(row.encerramento), 'dd-MM-yyyy')}
                </TableCell>
                <TableCell>
                  <span className={`tag-status ${getStatusTagClass(row.estado)}`}>
                    {row.estado}
                  </span>
                </TableCell>
                <TableCell>
                  <Buttons onClick={() => openProjectKanban(row)}>Kanban</Buttons>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {allocatedProjects.map((project) => (
        <Avatar key={project.id}>{project.titulo}</Avatar>
      ))}
    </div>
  );
}
