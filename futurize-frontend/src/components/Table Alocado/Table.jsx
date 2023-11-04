import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '../Input/input';
import Buttons from '../Buttons/Buttons';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { isValid, format, parse } from 'date-fns';
import "../Table/Table.css";
import { AlertError } from '../Alert/Modal';
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import useAuth from "../../hooks/useAuth";

export default function TableAlocado() {
  const [open, setOpen] = useState(false);
  const [projectData, setProjectData] = useState(null); // Armazena os dados do projeto selecionado
  const [titulo, setTitulo] = useState("");
  const [inicio, setinicio] = useState("");
  const [estado, setEstado] = useState("");
  const [error, setError] = useState();
  const [rows, setRows] = useState([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editProjectData, setEditProjectData] = useState(null);
  const navigate = useNavigate();
  const { getLoginUser } = useAuth();
  const usuarioLogado = getLoginUser();

  const handleClickOpen = () => {
    // Limpa os campos do formulário
    setFormProjeto({
      id: 0,
      titulo: '',
      inicio: '',
      encerramento: '',
      estado: 'ANDAMENTO',
      gestor: '',
    });

    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
  const cancelDelete = () => {
    // Feche a caixa de diálogo de confirmação
    setDeleteConfirmationOpen(false);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };
  const [formProjeto, setFormProjeto] = useState({
    titulo: '',
    inicio: '',
    encerramento: '',
    estado: 'ANDAMENTO',
    gestor: '',
  });

  const handleInputChange = (e, title) => {
    const { value } = e.target;
    if (title === 'titulop') {
      setTitulo(value);
    } else {
      setFormProjeto({ ...formProjeto, [title]: value });
    }
  }
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
    // Função para buscar os dados do banco e preencher o estado 'rows' ao carregar a página
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/Projeto/porUsuario/${usuarioLogado}`);
        if (response.status === 200) {
          setRows(response.data); // Atualize o estado 'rows' com os dados do banco
        } else {
          console.error("Erro ao buscar dados do banco.");
        }
      } catch (error) {
        console.error("Erro ao conectar-se ao backend:", error);
      }
    };
    fetchData(); // Chame a função para buscar os dados ao carregar a página
  }, []);

  const openProjectKanban = (project) => {
    console.log('Dados do projeto:', project); // Verifique os dados do projeto
    setProjectData(project); // Define os dados do projeto selecionado
    navigate(`/kanban/${project.id}`, { state: { projectData: project } }); // Abra a tela Kanban para o projeto
  };


  return (
    <div className='table'>
      <div className='meus-projetos'>
        <h1 className="subtitulo">Projetos que participo</h1>
      </div>
      <TableContainer component={Paper} style={{ maxHeight: '650px', minHeight: '50px', overflowY: 'auto', overflowX: 'auto' }}>
        {/* Defina a altura para 600px e habilita a barra de rolagem vertical */}
        <Table sx={{ minWidth: 1500 }} aria-label="simple table">
          <TableHead>
            <TableRow className='row'>
              <TableCell className='cel'>TÍtulo</TableCell>
              <TableCell className='cel'>Data de Início</TableCell>
              <TableCell className='cel'>Data de Término</TableCell>
              <TableCell className='cel'>Status</TableCell>
              <TableCell className='cel'>Ações</TableCell>
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
                <TableCell>{format(new Date(row.encerramento), 'dd-MM-yyyy')}</TableCell>
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
    </div>
  );
}