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
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ToastSuccess, ToastError } from '../Alert/Toast';
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
  const [allocatedUsers, setAllocatedUsers] = useState([]);
  const [showAllocatedUsers, setShowAllocatedUsers] = useState(false);
  const [allocationDataFetched, setAllocationDataFetched] = useState(false); // No
  const [newMembers, setNewMembers] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false); // Estado para rastrear se os dados foram carregados

  const openDeleteConfirmationDialog = () => {
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmationDialog = () => {
    setDeleteConfirmationOpen(false);
  };

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:8080/Usuario');
        if (response.status === 200) {
          setRows(response.data);
          setDataLoaded(true); // Marque os dados como carregados
        } else {
          console.error('Erro ao buscar dados de usuários no backend.');
        }
      } catch (error) {
        console.error('Erro ao conectar-se ao backend:', error);
      }
    };
    const fetchProjectMembers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/Alocacao_projeto/${projectId}`
        );
        if (response.status === 200) {
          const allocatedUserIds = response.data.map(
            (allocation) => allocation.usuario.id
          );
          const allocatedUsersData = rows.filter((usuario) =>
            allocatedUserIds.includes(usuario.id)
          );
          setAllocatedUsers(allocatedUsersData); // Defina allocatedUsers com os usuários alocados
        } else if (response.status === 409) {
          console.error('Erro ao buscar membros alocados ao projeto no backend.');
        }
      } catch (error) {
        console.error('Erro ao conectar-se ao backend:', error);
      }
    };
    if (!dataLoaded) {
      // Se os dados não foram carregados, busque-os
      fetchUsuarios();
    } else {
      // Se os dados foram carregados, busque os membros do projeto
      fetchProjectMembers();
    }
  }, [projectId, allocationDataFetched, dataLoaded]);
  if (!dataLoaded) {
    // Se os dados não foram carregados, você pode exibir uma mensagem de carregamento
    return <p>Carregando dados...</p>;
  }
  const openAllocatedUsersDialog = () => {
    setShowAllocatedUsers(true);
  };
  function addError(error) {
    ToastError({
      text: error,
      title: 'Error!!',
    });
  }
  function addSucesso() {
    ToastSuccess({
      text: 'Membro adicionado com sucesso ao projeto.',
      title: 'Sucesso!!',
    });
    setEditOpen(false);
    setNewMembers([...newMembers, newMemberData]);
  }

  function addSucessoGeneral(suc) {
    ToastSuccess({
      text: suc,
      title: 'Sucesso!',
    });
    setEditOpen(false);
  }
  const openEditDialog = () => {
    setEditOpen(true);
  };
  const handleAddMemberClick = (userId) => {
    setSelectedUserId(userId); // Defina o ID do usuário selecionado
  };
  const addMemberToProject = async () => {
    if (selectedUserId) {
      const selectedUser = rows.find((usuario) => usuario.id === selectedUserId);
      setProjectMembers([...projectMembers, selectedUser]);
      setSelectedUserId(null);

      // Envie os dados do novo membro para o backend
      const newMemberData = {
        usuario: { id: selectedUserId },
        projeto: { id: projectData.id },
      };

      // console.log(newMemberData);

      try {
        const response = await axios.post(
          'http://localhost:8080/Alocacao_projeto',
          newMemberData
        );
        if (response.status === 201) {
          // A alocação foi criada com sucesso
          addSucesso();
        } else if (response.status === 409) {
          // Trate o status 409 aqui, exibindo uma mensagem específica para o usuário
          addError(response.data.message); // Supondo que a mensagem de erro é retornada pelo backend
        } else {
          // Trate outros status de resposta, se necessário
          addSucesso();
        }
      } catch (error) {
        // addError('Erro ao conectar-se ao backend: ' + error.message);
      }
    }
  };

  const filteredEmails = rows.filter((usuario) =>
    usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function formatMemberName(name) {
    if (name) {
      const names = name.split(' ');
      if (names.length === 1) {
        return names[0].charAt(0).toUpperCase();
      } else {
        return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
      }
    } else {
      return ''; // Retornar uma string vazia se o nome for nulo ou indefinido
    }
  }

  const confirmDeleteAllocation = async () => {
    closeDeleteConfirmationDialog(); // Fechar o diálogo de confirmação
    addSucessoGeneral('Membro excluído com sucesso!');
    try {
      const response = await axios.delete(
        `http://localhost:8080/Alocacao_projeto/${projectId}/${selectedUserId}`
      );
      if (response.status === 204) {
        // A alocação foi excluída com sucesso
        console.log('Alocação excluída com sucesso.');
        // Adicione qualquer lógica adicional após a exclusão, se necessário
      } else if (response.status === 200) {
        console.log('Alocação excluída com sucesso.');
      }
    } catch (error) {
      console.error('Erro ao conectar-se ao backend:', error);
    }
  };

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
        {allocatedUsers.map((user) => (
          <Avatar key={user.id}>{formatMemberName(user.nome)}</Avatar>
        ))}
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
              onClick={openDeleteConfirmationDialog}
            >
              Deletar
            </Buttons>
            <Buttons onClick={() => addMemberToProject()}>Adicionar</Buttons>
          </DialogActions>
        </Dialog>
        {/* Diálogo para mostrar usuários alocados */}
        <Dialog
          open={showAllocatedUsers}
          onClose={() => setShowAllocatedUsers(false)}
        >
          <DialogTitle>Usuários Alocados</DialogTitle>
          <DialogContent>
            <ul>
              {allocatedUsers.map((user) => (
                <li key={user.id}>{user.nome}</li>
              ))}
              {newMembers.map((newMember) => (
                <li key={newMember.usuario.id}>{newMember.usuario.nome}</li>
              ))}
            </ul>
          </DialogContent>
          <DialogActions>
            <Buttons onClick={() => setShowAllocatedUsers(false)}>Fechar</Buttons>
          </DialogActions>
        </Dialog>

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
    </div>
  );
}
