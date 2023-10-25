import React, { useState, useEffect } from 'react';
import './HeaderKanban.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Avatar from '@mui/material/Avatar';

import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Buttons from '../Buttons/Buttons';
import Input from '../Input/input';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

export default function HeaderKanban() {
  const { projectId } = useParams();
  const location = useLocation();
  const projectData = location.state && location.state.projectData;
  console.log('projectData:', projectData); // Adicione isso para depurar
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  // Função para abrir a caixa de diálogo de edição (pode ser usada para adicionar membros)
  const openEditDialog = () => {
    setEditOpen(true);
  };

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:8080/Usuario");
        if (response.status === 200) {
          setRows(response.data); // Defina o estado 'rows' com os dados dos usuários
        } else {
          console.error("Erro ao buscar dados de usuários no backend.");
        }
      } catch (error) {
        console.error("Erro ao conectar-se ao backend:", error);
      }
    };

    fetchUsuarios(); // Chame a função para buscar os dados ao carregar o componente
  }, []);

  // Função para filtrar os e-mails com base no termo de pesquisa
  const filteredEmails = rows.filter((usuario) =>
    usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  };

  return (
    <div className='container-header-kanban'>
      <h3 className='nome-header-kanban'>{projectData.titulo}</h3>
      <div className="integrantes-header-kanban">
        <Avatar>H</Avatar>
        <AddCircleIcon onClick={openEditDialog} /> {/* Abre a caixa de diálogo de edição */}

        <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
          <DialogTitle>Adicionar Membro</DialogTitle>
          <DialogContent>
            {/* Adicione o conteúdo da caixa de diálogo de edição aqui */}
          </DialogContent>
          <DialogActions>
            <div className="add-integrante">
              <Input
                type="text"
                placeholder="Pesquisar por e-mail"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className='group-list'>
                {filteredEmails.map((usuario, index) => (
                  <p className="list" style={{ display: 'block' }} key={index}>{usuario.email}</p>
                ))}
              </div>
              <div>
                <Buttons style={{marginRight: 30}} onClick={() => setEditOpen(false)}>Cancelar</Buttons>
                <Buttons onClick={() => setEditOpen(false)}>Adicionar</Buttons>
              </div>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
