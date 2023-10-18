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

export default function TableC() {
  const [open, setOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [inicio, setinicio] = useState("");
  const [estado, setEstado] = useState("");
  const [error, setError] = useState();
  const [rows, setRows] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getCurrentDate = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    return `${year}-${month}-${day}`; // Formate a data de acordo com "yyyy-MM-dd"
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
    const { titulo, inicio, encerramento, estado } = formData;
  
    const dataInicio = getCurrentDate(); // Data de início formatada em "yyyy-MM-dd"
    const inicioDate = parse(inicio, 'dd-MM-yyyy', new Date()); // Converta o formato da data do componente Input para 'dd-MM-yyyy'
  
    if (!isValid(inicioDate)) {
      const formattedInicio = format(inicioDate, 'yyyy-MM-dd'); // Formate a data de término para o formato esperado pelo banco
  
      const newRow = {
        titulo: titulo,
        inicio: formattedInicio,
        encerramento: encerramento,
        estado: estado.toUpperCase(),
      };

      try {
        const response = await axios.post("http://localhost:8080/Projeto", newRow);

        if (response.status === 200) {
          const updatedRows = [...rows, newRow];
          setRows(updatedRows);
          localStorage.setItem("formData", JSON.stringify(updatedRows));
          handleClose();
        } else {
          console.error("Erro ao salvar os dados no backend.");
        }
      } catch (error) {
        console.error("Erro ao conectar-se ao backend:", error);
      }
    } else {
      console.error("Data de término inválida.");
    }
  };

  const [formData, setFormData] = useState({
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
      // Handle other input fields based on their titles
      setFormData({ ...formData, [title]: value });
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 10 }} aria-label="simple table">
          <TableHead>
            <TableRow className='row'>
              <TableCell className='cel'>TÍtulo</TableCell>
              <TableCell className='cel'>Data de Início</TableCell>
              <TableCell className='cel'>Data de Término</TableCell>
              <TableCell className='cel'>Status</TableCell>
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
                  <span className={`tag-status ${getStatusTagClass(row.estado)}`} >{row.estado}</span>
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
              value={formData.titulo}
              onChange={(e) => handleInputChange(e, 'titulo')}
              label="Digite seu titulo"
            />
            <Input
              id="encerramento"
              type="date"
              name="encerramento"
              value={formData.encerramento}
              onChange={(e) => handleInputChange(e, 'encerramento')}
              label="Digite a data final"
            />
            <DialogActions>
              <Buttons type="submit">Criar</Buttons>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
