import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "../Input/input";
import Buttons from "../Buttons/Buttons";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { isValid, format, parse } from "date-fns";
import "./Table.css";
import { AlertError } from "../Alert/Modal";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import useAuth from "../../hooks/useAuth";

export default function TableC() {
  const [open, setOpen] = useState(false);
  const [projectData, setProjectData] = useState(null); // Armazena os dados do projeto selecionado
  const [titulo, setTitulo] = useState("");
  const [inicio, setinicio] = useState("");
  const [estado, setEstado] = useState("");
  const [error, setError] = useState();
  const [rows, setRows] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editProjectData, setEditProjectData] = useState(null);
  const navigate = useNavigate();
  const { getLoginUser } = useAuth();
  const usuarioLogado = getLoginUser();
  const usuarioLogadoId = usuarioLogado.id;
  const usuarioLogadoName = usuarioLogado.sub;
  const [allocatedUsers, setAllocatedUsers] = useState([]);

  const token = JSON.parse(localStorage.getItem("@user"))?.tokenJWT;

  const handleClickOpen = () => {
    // Limpa os campos do formulário
    setFormProjeto({
      id: 0,
      titulo: "",
      inicio: "",
      encerramento: "",
      estado: "ANDAMENTO",
      gestor: "",
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
      console.error("ID de projeto inválido:", id);
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
    titulo: "",
    inicio: "",
    encerramento: "",
    estado: "ANDAMENTO",
    gestor: "",
  });

  const handleInputChange = (e, title) => {
    const { value } = e.target;
    if (title === "titulop") {
      setTitulo(value);
    } else {
      setFormProjeto({ ...formProjeto, [title]: value });
    }
  };
  function getStatusTagClass(estado) {
    switch (estado) {
      case "ANDAMENTO":
        return "tag-andamento";
      case "CONCLUIDO":
        return "tag-concluido";
      case "PAUSADO":
        return "tag-pausado";
      default:
        return "tag-status";
    }
  }
  useEffect(() => {
    // Função para buscar os dados do banco e preencher o estado 'rows' ao carregar a página
    const fetchData = async () => {
      try {
        if (!token) {
          console.error("Token JWT não encontrado no localStorage.");
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/Projeto/porUsuario/${usuarioLogadoId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

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
  }, [refresh]); // Agora o useEffect será executado toda vez que `refresh` mudar.

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { titulo, inicio, encerramento, estado, gestor } = formProjeto;

    const dataInicial = inicio
      ? format(parse(inicio, "dd-MM-yyyy", new Date()), "yyyy-MM-dd")
      : format(new Date(), "yyyy-MM-dd");
    const encerramentoEmData = parse(encerramento, "dd-MM-yyyy", new Date());
    const dataFinal = format(encerramentoEmData, "yyyy-MM-dd");

    const newRow = {
      titulo: titulo,
      inicio: dataInicial,
      encerramento: dataFinal,
      estado: estado.toUpperCase(),
      gestor: usuarioLogadoId,
    };

    try {
      if (!token) {
        console.error("Token JWT não encontrado no localStorage.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/Projeto",
        newRow,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setRows((prevRows) => [...prevRows, newRow]); // Adicione o novo projeto aos dados existentes
        setRefresh((prev) => !prev); // Atualize o estado `refresh`
        handleClose();
      } else {
        console.error("Erro ao salvar os dados no backend.");
      }
    } catch (error) {
      console.error("Erro ao conectar-se ao backend:", error);
    }
  };

  const confirmDelete = async () => {
    if (idToDelete !== null && idToDelete !== undefined && !isNaN(idToDelete)) {
      try {
        if (!token) {
          console.error("Token JWT não encontrado no localStorage.");
          return;
        }

        await axios.delete(`http://localhost:8080/Projeto/${idToDelete}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const updatedRows = rows.filter((row) => row.id !== idToDelete);
        setRows(updatedRows);
        setDeleteConfirmationOpen(false);
      } catch (error) {
        console.error("Erro ao excluir o item:", error);
      }
    } else {
      console.error("ID de projeto inválido:", idToDelete);
    }
  };

  const openEditProject = (project) => {
    const formattedInicio = project.inicio
      ? format(new Date(project.inicio), "dd-MM-yyyy")
      : "";
    const formattedEncerramento = project.encerramento
      ? format(new Date(project.encerramento), "dd-MM-yyyy")
      : "";

    setFormProjeto({
      id: project.id,
      titulo: project.titulo,
      inicio: formattedInicio,
      encerramento: formattedEncerramento,
      estado: project.estado,
      gestor: project.gestor,
    });

    setEditProjectData(project); // Armazena os dados do projeto selecionado
    setEditOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const { id, titulo, inicio, encerramento, estado, gestor } = formProjeto;

    let dataInicial = inicio
      ? format(parse(inicio, "dd-MM-yyyy", new Date()), "yyyy-MM-dd")
      : "";
    let dataFinal = encerramento
      ? format(parse(encerramento, "dd-MM-yyyy", new Date()), "yyyy-MM-dd")
      : "";

    // Debugging logs to check values before formatting
    console.log("Data Inicial:", inicio, "Data Final:", encerramento);

    const updatedProjectData = {
      id: id,
      titulo: titulo,
      inicio: dataInicial,
      encerramento: dataFinal,
      estado: estado,
      gestor: gestor,
    };

    try {
      if (!token) {
        console.error("Token JWT não encontrado no localStorage.");
        return;
      }

      const response = await axios.put(
        `http://localhost:8080/Projeto/${id}`,
        updatedProjectData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const updatedRows = rows.map((row) =>
          row.id === id ? { ...row, ...updatedProjectData } : row
        );
        setRows(updatedRows);
        handleEditClose();
      } else {
        console.error("Erro ao atualizar os dados no backend.");
      }
    } catch (error) {
      console.error("Erro ao conectar-se ao backend:", error);
    }
  };

  const openProjectKanban = (project) => {
    if (project && project.id) {
      console.log("Dados do projeto:", project); // Verifique os dados do projeto
      setProjectData(project); // Define os dados do projeto selecionado
      navigate(`/kanban/${project.id}`, { state: { projectData: project } }); // Abra a tela Kanban para o projeto
    } else {
      console.error("Projeto inválido:", project);
    }
  };

  const addMemberToProject = () => {
    if (selectedUserId) {
      const selectedUser = rows.find(
        (usuario) => usuario.id === selectedUserId
      );
      const newMemberData = {
        usuario: { id: selectedUserId },
        projeto: { id: projectData.id },
      };

      axios
        .post("http://localhost:8080/Alocacao_projeto", newMemberData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            addSucesso();
            setEditOpen(false);

            // Atualize o estado projectMembers após uma alocação bem-sucedida
            setProjectMembers([...projectMembers, selectedUser]);
          } else {
            addError();
          }
        })
        .catch((error) => {
          console.error("Erro ao conectar-se ao backend:", error);
        });
    }
  };

  return (
    <div className="table">
      <div className="meus-projetos">
        <h1 className="subtitulo">Meus Trabalhos</h1>
        <Buttons
          variant="outlined"
          className="button-circle"
          onClick={handleClickOpen}
        >
          +
        </Buttons>
      </div>

      <TableContainer
        component={Paper}
        style={{ maxHeight: "370px", overflowY: "auto", overflowX: "auto" }}
      >
        {/* Defina a altura para 600px e habilita a barra de rolagem vertical */}
        <Table>
          <TableHead>
            <TableRow className="row">
              <TableCell className="cel">Título</TableCell>
              <TableCell className="cel">Data de Início</TableCell>
              <TableCell className="cel">Data de Encerramento</TableCell>
              <TableCell className="cel">Estado</TableCell>
              <TableCell className="cel">Gestor</TableCell>
              <TableCell className="cel">Ações</TableCell>
              <TableCell className="cel">Board</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.titulo}</TableCell>
                <TableCell>
                  {format(new Date(row.inicio), "dd-MM-yyyy")}
                </TableCell>
                <TableCell>
                  {format(new Date(row.encerramento), "dd-MM-yyyy")}
                </TableCell>
                <TableCell>
                  <span
                    className={`tag-status ${getStatusTagClass(row.estado)}`}
                  >
                    {row.estado}
                  </span>
                </TableCell>
                <TableCell>{usuarioLogadoName}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleDelete(row.id)}
                    aria-label="delete"
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => openEditProject(row)}
                    aria-label="edit"
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <Buttons onClick={() => openProjectKanban(row)}>
                    Kanban
                  </Buttons>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Novo Trabalho</DialogTitle>
        <DialogContent>
          <Input
            autoFocus
            margin="dense"
            id="titulo"
            label="Título"
            type="text"
            fullWidth
            value={formProjeto.titulo}
            onChange={(e) => handleInputChange(e, "titulo")}
          />
          <Input
            margin="dense"
            id="inicio"
            label="Data de Início"
            type="date"
            fullWidth
            value={formProjeto.inicio}
            onChange={(e) => handleInputChange(e, "inicio")}
          />
          <Input
            margin="dense"
            id="encerramento"
            label="Data de Encerramento"
            type="date"
            fullWidth
            value={formProjeto.encerramento}
            onChange={(e) => handleInputChange(e, "encerramento")}
          />
          <FormControl fullWidth>
            <Select
              labelId="estado-label"
              id="estado"
              value={formProjeto.estado}
              onChange={(e) => handleInputChange(e, "estado")}
            >
              <MenuItem value="ANDAMENTO">Andamento</MenuItem>
              <MenuItem value="CONCLUIDO">Concluído</MenuItem>
              <MenuItem value="PAUSADO">Pausado</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Buttons onClick={handleClose} color="primary">
            Cancelar
          </Buttons>
          <Buttons onClick={handleFormSubmit} color="primary">
            Salvar
          </Buttons>
        </DialogActions>
      </Dialog>

      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Atualizar Trabalho</DialogTitle>
        <DialogContent>
          <Input
            autoFocus
            margin="dense"
            id="titulo"
            label="Título"
            type="text"
            fullWidth
            value={formProjeto.titulo}
            onChange={(e) => handleInputChange(e, "titulo")}
          />
          <Input
            margin="dense"
            id="encerramento"
            label="Data de Encerramento"
            type="date"
            fullWidth
            value={formProjeto.encerramento}
            onChange={(e) => handleInputChange(e, "encerramento")}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl fullWidth>
            <Select
              labelId="estado-label"
              id="estado"
              value={formProjeto.estado}
              onChange={(e) => handleInputChange(e, "estado")}
            >
              <MenuItem value="ANDAMENTO">Andamento</MenuItem>
              <MenuItem value="CONCLUIDO">Concluído</MenuItem>
              <MenuItem value="PAUSADO">Pausado</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Buttons onClick={handleEditClose} color="primary">
            Cancelar
          </Buttons>
          <Buttons onClick={handleEditSubmit} color="primary">
            Atualizar
          </Buttons>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteConfirmationOpen} onClose={cancelDelete}>
        <DialogTitle>Confirmação de Exclusão</DialogTitle>
        <DialogContent>
          Tem certeza de que deseja excluir este item?
        </DialogContent>
        <DialogActions>
          <Buttons onClick={cancelDelete} color="primary">
            Cancelar
          </Buttons>
          <Buttons onClick={confirmDelete} color="error">
            Excluir
          </Buttons>
        </DialogActions>
      </Dialog>
    </div>
  );
}
