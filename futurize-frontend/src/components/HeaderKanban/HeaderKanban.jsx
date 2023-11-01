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
  const [allocationDataFetched, setAllocationDataFetched] = useState(false); // Novo estado
  const [allocatedUserIds, setAllocatedUserIds] = useState(); // Novo estado

  const openAllocatedUsersDialog = () => {
    setShowAllocatedUsers(true);
  };

  function addError() {
    ToastError({
      text: 'Não foi possível adicionar esse usuário no projeto.',
      title: 'Error!!',
    });
  }

  function addSucesso() {
    ToastSuccess({
      text: 'Membro adicionado com sucesso ao projeto.',
      title: 'Sucesso!!',
    });
  }

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
        usuario: { id: selectedUserId }, //selectedUserId
        projeto: { id: projectData.id }, //projectData.id
      };

      console.log("Dados", newMemberData);

      axios.post('http://localhost:8080/Alocacao_projeto', newMemberData)
        .then((response) => {
          // Verifique se a solicitação foi bem-sucedida
          if (response.status === 200) {
            addSucesso();
            setEditOpen(false);
          } else {
            addError();
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

    if (!allocationDataFetched) {
      const fetchProjectMembers = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/Alocacao_projeto/${projectId}`);
          if (response.status === 200) {
            // Obtenha os IDs dos usuários alocados
            const allocatedUserIds = response.data.map((allocation) => allocation.usuario.id);
            // Filtrar os usuários com base em seus IDs
            const allocatedUsersData = rows.filter((usuario) => allocatedUserIds.includes(usuario.id));
            setProjectMembers(allocatedUsersData);
          } else {
            console.error('Erro ao buscar membros alocados ao projeto no backend.');
          }
        } catch (error) {
          console.error('Erro ao conectar-se ao backend:', error);
        }
        setAllocationDataFetched(true);
      };

      fetchProjectMembers();
    }

    fetchUsuarios();
  }, [projectId, allocationDataFetched]);

  const filteredEmails = rows.filter((usuario) =>
    usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function formatMemberName(name) {
    if (name) {
      const names = name.split(" ");
      if (names.length === 1) {
        return names[0].charAt(0).toUpperCase();
      } else {
        return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
      }
    } else {
      return ""; // Retornar uma string vazia se o nome for nulo ou indefinido
    }
  }
  

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
        {projectMembers.map((member) => (
          <Avatar key={member.id}>{formatMemberName(member.nome)}</Avatar>
        ))}
        <AddCircleIcon onClick={openEditDialog} />
        <button onClick={openAllocatedUsersDialog}>Mostrar Usuários Alocados</button>


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
          {/* Diálogo para mostrar usuários alocados */}
       <Dialog open={showAllocatedUsers} onClose={() => setShowAllocatedUsers(false)}>
        <DialogTitle>Usuários Alocados</DialogTitle>
        <DialogContent>
          <ul>
            {allocatedUsers.map((user) => (
              <li key={user.id}>{user.nome}</li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Buttons onClick={() => setShowAllocatedUsers(false)}>Fechar</Buttons>
        </DialogActions>
      </Dialog>
      </div>
    </div>
  );
}
