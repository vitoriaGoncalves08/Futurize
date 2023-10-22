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
import "./Table.css";
import { AlertError } from '../Alert/Modal';
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function TableC() {
  const [open, setOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [inicio, setinicio] = useState("");
  const [estado, setEstado] = useState("");
  const [error, setError] = useState();
  const [rows, setRows] = useState([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const handleClickOpen = () => {
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
    openDeleteConfirmation(id);
  };

  const cancelDelete = () => {
    // Feche a caixa de diálogo de confirmação
    setDeleteConfirmationOpen(false);
  };

  const confirmDelete = async () => {
    if (idToDelete !== undefined && !isNaN(idToDelete)) {
      try {
        // Faça a chamada de exclusão para o backend
        await axios.delete(`http://localhost:8080/Projeto/delete/${idToDelete}`);
        
        // Atualize o estado `rows` após a exclusão
        const updatedRows = rows.filter((row) => row.id !== idToDelete);
        setRows(updatedRows);
      
        // Feche a caixa de diálogo de confirmação
        setDeleteConfirmationOpen(false);
      } catch (error) {
        console.error('Erro ao excluir o item:', error);
      }
    } else {
      console.error('ID de projeto inválido:', idToDelete);
    }
  };

  useEffect(() => {
    // Função para buscar os dados do banco e preencher o estado 'rows' ao carregar a página
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/Projeto");
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


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { titulo, inicio, encerramento, estado } = formProjeto;

    // Se o campo "inicio" estiver vazio, preencha com a data atual
    const dataInicial = inicio
      ? format(parse(inicio, 'dd-MM-yyyy', new Date()), 'yyyy-MM-dd')
      : format(new Date(), 'yyyy-MM-dd');

    const encerramentoEmData = parse(encerramento, 'dd-MM-yyyy', new Date());

    const dataFinal = format(encerramentoEmData, 'yyyy-MM-dd');

    const newRow = {
      titulo: titulo,
      inicio: dataInicial,
      encerramento: dataFinal,
      estado: estado.toUpperCase(),
    };

    try {
      const response = await axios.post('http://localhost:8080/Projeto', newRow);

      if (response.status === 200) {
        const updatedRows = [...rows, newRow];
        setRows(updatedRows);
        localStorage.setItem('formProjeto', JSON.stringify(updatedRows));
        handleClose();
        return;
      }

      console.error('Erro ao salvar os dados no backend.');
    } catch (error) {
      console.error('Erro ao conectar-se ao backend:', error);
    }
  };

  const [formProjeto, setFormProjeto] = useState({
    titulo: '',
    inicio: '',
    encerramento: '',
    estado: 'ANDAMENTO',
  });

  // function isError() {
  //   handleClose();
  //   AlertError({
  //     text: "A data de término não pode ser menor que a data atual.",
  //     title: "Erro!",
  //   });
  // }
  
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
 return (
  <div className='table'>
    <div className='meus-projetos'>
      <h1 className="subtitulo">Meus Projetos</h1>
      <Buttons variant="outlined" className="button-circle" onClick={handleClickOpen}>
        +
      </Buttons>
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
                <Buttons
                  className='delete-projeto'
                  onClick={() => handleDelete(row.id)} // Passa o ID do projeto para handleDelete
                >
                  <DeleteIcon />
                </Buttons>
                <Buttons className="edit-projeto">
                  <EditIcon />
                </Buttons>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <h1 className="titulo">Criar Projeto</h1>
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
        <form onSubmit={handleFormSubmit}>
          <Input
            id="titulop"
            type="text"
            name="titulop"
            value={formProjeto.titulo}
            onChange={(e) => handleInputChange(e, 'titulo')}
            label="Digite seu titulo"
          />
          <Input
            id="encerramento"
            type="date"
            name="encerramento"
            value={formProjeto.encerramento}
            onChange={(e) => handleInputChange(e, 'encerramento')}
            label="Digite a data final"
          />
          <DialogActions>
            <Buttons type="submit">Criar</Buttons>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>

      <Dialog open={deleteConfirmationOpen} onClose={cancelDelete}>
    <DialogTitle>Confirmar Exclusão</DialogTitle>
    <DialogContent>
      Tem certeza de que deseja excluir este projeto?
    </DialogContent>
    <DialogActions>
      <Buttons onClick={cancelDelete}>Cancelar</Buttons>
      <Buttons onClick={confirmDelete}>Confirmar</Buttons>
    </DialogActions>
  </Dialog>

  </div>
);
}
