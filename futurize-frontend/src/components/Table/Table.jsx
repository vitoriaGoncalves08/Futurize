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
import "./Table.css";
import { AlertError } from '../Alert/Modal';


export default function TableC() {

  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setRows(JSON.parse(savedData));
    }
  }, []);

  // Função para obter a data atual no formato "DD/MM/AAAA"
  const getCurrentDate = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  const [formData, setFormData] = useState({
    nome: '',
    dataInicio: '',
    dataFim: '',
    status: 'Concluído',
  });
  
  function getStatusTagClass(status) {
    switch (status) {
      case 'Em andamento':
        return 'tag-em-andamento';
      case 'Concluído':
        return 'tag-concluido';
      case 'Pausado':
        return 'tag-pausado';
      default:
        return 'tag-status';
    }
  }

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setRows(JSON.parse(savedData));
    }
  }, []);

  function isError(){ 
    handleClose();
    AlertError({
      text: "A data de término não pode ser maior que a data atual.",
      title: "Erro!",
    });
  }  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { nome, dataFim, status } = formData;
    const currentDate = getCurrentDate();

    // Verifique se a data de término é maior que a data atual
    if (dataFim && dataFim > currentDate) {
      const newRow = {
        nome: nome,
        dataInicio: currentDate,
        dataFim: dataFim,
        status: status,
      };
      setRows([...rows, newRow]);
      // Limpar o formulário após adicionar os dados
      setFormData({
        nome: "",
        dataInicio: "",
        dataFim: "",
        status: "",
      });

      // Salvar os dados no localStorage
      localStorage.setItem("formData", JSON.stringify([...rows, newRow]));
    } else {
      isError();
    }
    };

  const handleInputChange = (e, name) => {
    const { value } = e.target;
    if (name === 'nomep') {
      setNome(value);
    } else {
      // Handle other input fields based on their names
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className='container'>
      <div className='meus-projetos'>
        <h1 className="subtitulo">Meus Projetos</h1>
        <Buttons variant="outlined" className="button-circle" onClick={handleClickOpen}>
          +
        </Buttons>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className='row'>
              <TableCell className='cel'>Nome</TableCell>
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
                  {row.nome}
                </TableCell>
                <TableCell>{row.dataInicio}</TableCell>
                <TableCell>{row.dataFim}</TableCell>
                <TableCell>
                  <span className={`tag-status ${getStatusTagClass(row.status)}`} >{row.status}</span>
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
          id="nomep"
          type="text"
          name="nomep"
          value={formData.nome}
          onChange={(e) => handleInputChange(e, 'nome')}
          label="Digite seu Nome"
        />
       
       <Input
          id="dataFim"
          type="date"
          name="dataFim"
          value={formData.dataFim}
          onChange={(e) => handleInputChange(e, 'dataFim')}
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