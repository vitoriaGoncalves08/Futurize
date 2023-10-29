import React, { useState, useEffect } from 'react';
import './HeaderKanban.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Avatar from '@mui/material/Avatar';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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

  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [projectMembers, setProjectMembers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null); // Estado para rastrear o ID do usuário selecionado

  const openEditDialog = () => {
    setEditOpen(true);
  };

  const handleAddMemberClick = (userId) => {
    setSelectedUserId(userId); // Defina o ID do usuário selecionado
  };

  const addMemberToProject = () => {
    if (selectedUserId) {
      const selectedUser = rows.find((usuario) => usuario.id === selectedUserId);
      setProjectMembers([...projectMembers, selectedUser]);
      setSelectedUserId(null);
  
      // Envie os dados do novo membro para o backend
      const newMemberData = {
        usuario: projectMembers, //selectedUserId
        projeto: projectData, //projectData
      };

      console.log("Dados", newMemberData);
  
      axios.post('http://localhost:8080/Alocacao_projeto', newMemberData)
        .then((response) => {
          // Verifique se a solicitação foi bem-sucedida
          if (response.status === 200) {
            console.log('Membro adicionado com sucesso ao projeto no backend.');
          } else {
            console.error('Erro ao adicionar membro ao projeto no backend.');
          }
        })
        .catch((error) => {
          console.error('Erro ao conectar-se ao backend:', error);
        });
    }
  };
  

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:8080/Usuario');
        if (response.status === 200) {
          setRows(response.data);
        } else {
          console.error('Erro ao buscar dados de usuários no backend.');
        }
      } catch (error) {
        console.error('Erro ao conectar-se ao backend:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const filteredEmails = rows.filter((usuario) =>
    usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-header-kanban">
      <h3 className="nome-header-kanban">{projectData.titulo}</h3>
      <div className="Estrela">
        <StarBorderIcon></StarBorderIcon>
      </div>
      <div className="Lixo">
        <DeleteOutlineIcon></DeleteOutlineIcon>
      </div>

      <div className="integrantes-header-kanban">
        <Avatar>H</Avatar>
        <AddCircleIcon onClick={openEditDialog} />

        <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
          <DialogTitle>Adicionar Membro</DialogTitle>
          <DialogContent>
            <Input
              type="text"
              label="Pesquisar por e-mail"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="group-list">
              {filteredEmails.map((usuario) => (
                <ListItem
                  button
                  key={usuario.id}
                  onClick={() => handleAddMemberClick(usuario.id)}
                  style={{
                    backgroundColor:
                      usuario.id === selectedUserId ? '#e0e0e0' : 'transparent',
                  }}
                >
                  <ListItemText primary={usuario.email} />
                </ListItem>
              ))}
            </div>
          </DialogContent>
          <DialogActions style={{ display: 'block' }}>
            <Buttons
              style={{ marginRight: 30 }}
              onClick={() => setEditOpen(false)}
            >
              Cancelar
            </Buttons>
            <Buttons onClick={() => addMemberToProject()}>Adicionar</Buttons>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
