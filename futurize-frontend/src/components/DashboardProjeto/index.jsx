import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import useAuth from "../../hooks/useAuth";
import { PieChart as MuiPieChart } from '@mui/x-charts/PieChart';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const DashboardProjeto = () => {

    const [minhasAtividades, setMinhasAtividades] = useState([]);

    const [atividadesNIniciadasPProjeto, setAtividadesNIniciadasPProjeto] = useState([]);
    const [atividadesParaConcluirPProjeto, setAtividadesParaConcluirPProjeto] = useState(0);
    const [atividadesRefeitasPProjeto, setAtividadesRefeitasPProjeto] = useState(0);
    const [integranteMaisEntregasPProjeto, setIntegranteMaisEntregasPProjeto] = useState([]);
    const [atividadesConcluidasPProjeto, setAtividadesConcluidasPProjeto] = useState([]);
    const [listagemAtividades, setListagemAtividades] = useState([]);


    const colors = ['#407BFF', '#79A2FE', '#48beff', '#9FBDFF', '#73d2de', '#a1cdf4', '#60b2e5', '#457eac'];

    const token = JSON.parse(localStorage.getItem('@user'))?.tokenJWT;

    const { getLoginUser } = useAuth();
    const usuarioLogado = getLoginUser();
    const userId = usuarioLogado.id;
    console.log("USER AQUI",usuarioLogado.id);

    const [projetos, setProjetos] = useState([]); // Armazenar projetos
    const [projeto, setProjeto] = useState('');   // Armazenar o projeto selecionado


    // Função para capturar o ID do projeto selecionado no combobox
    const handleChange = (event) => {
        setProjeto(event.target.value); // Atualiza o projeto selecionado
    };

    // useEffect para buscar os projetos do usuário
    useEffect(() => {
        const fetchProjetos = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/Projeto/porUsuario/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setProjetos(response.data); // Atualiza o estado com a lista de projetos

                // Define o valor inicial como o primeiro projeto se houver projetos
                if (response.data.length > 0) {
                    setProjeto(response.data[0].id);
                } else {
                    setProjeto('Trabalho'); // Caso não haja projetos
                }

            } catch (error) {
                console.error("Erro ao buscar os projetos:", error);
            }
        };

        fetchProjetos();
    }, [userId, token]);

    useEffect(() => {
        const fetchAtividades = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/dashboard-projeto/listagem-das-atividades-por-projeto/${userId}/${projeto}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setListagemAtividades(response.data);  // Salva as atividades no estado
            } catch (error) {
                console.error("Erro ao buscar as atividades:", error);
            }
        };

        if (projeto) {  // Garante que o projeto esteja selecionado antes de buscar as atividades
            fetchAtividades();
        }
    }, [userId, projeto, token]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Total de atividades não iniciadas
                const responseAtividadesNIniciadasPProjeto = await axios.get(`http://localhost:8080/dashboard-projeto/total-atividades-nao-iniciadas-por-projeto/${userId}/${projeto}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAtividadesNIniciadasPProjeto(responseAtividadesNIniciadasPProjeto.data);

                // Total de atividades para concluir
                const responseAtividadesParaConcluirPProjeto = await axios.get(`http://localhost:8080/dashboard-projeto/total-atividades-nao-concluidas/${userId}/${projeto}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAtividadesParaConcluirPProjeto(responseAtividadesParaConcluirPProjeto.data);


                // Total de atividades refeitas
                const responseAtividadesRefeitasPProjeto = await axios.get(`http://localhost:8080/dashboard-projeto/total-atividades-refeitas/${userId}/${projeto}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAtividadesRefeitasPProjeto(responseAtividadesRefeitasPProjeto.data);


                // Integrante com mais entregas
                const responseIntegranteMaisEntregasPProjeto = await axios.get(`http://localhost:8080/dashboard-projeto/usuario-mais-atividades-concluidas/${userId}/${projeto}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const transformedIntegranteMaisEntregasPProjeto = responseIntegranteMaisEntregasPProjeto.data.map((item, index) => ({
                    id: index,
                    label: item[1],  // Nome da pessoa (posição 1)
                    email: item[2],  // Email da pessoa (posição 2)
                    entregas: item[3], // Número de entregas (posição 3)
                }));

                setIntegranteMaisEntregasPProjeto(transformedIntegranteMaisEntregasPProjeto);
                console.log("Integrante com mais entregas:", transformedIntegranteMaisEntregasPProjeto);



                // Atividades Concluidas Por Projeto
                const responseAtividadesConcluidasPProjeto = await axios.get(`http://localhost:8080/dashboard-projeto/atividades-concluidas-por-projeto/${userId}/${projeto}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // O retorno esperado é um array com 1 elemento que contém um array com os valores [concluidas, total]
                const data = responseAtividadesConcluidasPProjeto.data;
                if (data.length > 0) {
                    const transformedAtividadesConcluidasPProjeto = {
                        concluidas: data[0][0],  // Número de atividades concluídas
                        total: data[0][1],  // Número total de atividades
                    };

                    setAtividadesConcluidasPProjeto(transformedAtividadesConcluidasPProjeto);
                    console.log("Atividades concluidas:", transformedAtividadesConcluidasPProjeto);
                }

                // TODAS ATIVIDADES
                const responseMinhasAtividades = await axios.get(`http://localhost:8080/dashboard-projeto/total-atividades-por-projeto/${userId}/${projeto}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const transformedMinhasAtividades = responseMinhasAtividades.data.map((item, index) => ({
                    id: index,
                    label: String(item[1]),  // Posição 1 contém a string (estado)
                    value: item[0],  // Posição 0 contém o número
                }));
                setMinhasAtividades(transformedMinhasAtividades);


            } catch (error) {
                console.error('Erro ao buscar dados da dashboard', error);
            }
        };

        fetchData();
    }, [userId, token, projeto]);

    const porcentagem = atividadesConcluidasPProjeto.total > 0
        ? ((atividadesConcluidasPProjeto.concluidas / atividadesConcluidasPProjeto.total) * 100).toFixed(2)
        : 0;

    return (
        <>
            <div className="dashboard-container-p">
                <h1>Dashboard Gestão dos Trabalhos</h1>
                <Box sx={{ marginRight: 8, marginBottom: 1 }}>
                    <FormControl fullWidth>
                        <InputLabel id="Select">Trabalho</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={projeto}
                            label="Trabalho"
                            onChange={handleChange} // Chama a função handleChange ao selecionar um item
                        >
                            {/* Caso não haja projetos, mostra a opção 'Trabalho' */}
                            {projetos.length === 0 ? (
                                <MenuItem value="Trabalho">Trabalho</MenuItem>
                            ) : (
                                /* Mapeia os projetos retornados do backend para exibir no combobox */
                                projetos.map((proj) => (
                                    <MenuItem key={proj.id} value={proj.id}>
                                        {proj.titulo} {/* Exibe o nome do projeto */}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                    </FormControl>
                </Box>
                {/* ESQUERDO */}
                <div className="left-side-p">
                    <div className="main-chart-p">
                        <h2>Atividades concluídas por trabalho</h2>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Gauge
                                height={265}
                                width={295}
                                value={(atividadesConcluidasPProjeto.total > 0)
                                    ? (atividadesConcluidasPProjeto.concluidas / atividadesConcluidasPProjeto.total) * 100
                                    : 0}  // Calcula a porcentagem de atividades concluídas
                                max={100}  // O valor máximo será sempre 100, pois estamos trabalhando com porcentagem
                                startAngle={-110}
                                endAngle={110}
                                sx={{
                                    [`& .${gaugeClasses.valueText}`]: {
                                        fontSize: 30,
                                    },
                                }}
                                text={({ value, valueMax }) => {

                                    return `${atividadesConcluidasPProjeto.concluidas} / ${atividadesConcluidasPProjeto.total}`;  // Exibe atividades concluídas / total e a porcentagem
                                }}
                            />
                        </div>
                        <p style={{ marginTop: -35, fontSize: 20, fontWeight: 600, textAlign: 'center' }}>{porcentagem}%</p>
                    </div>

                    <div className="main-chart-p">
                        <h2>Todas atividades</h2>
                        <MuiPieChart
                            series={[
                                {
                                    data: minhasAtividades.map((item, index) => ({
                                        ...item,
                                        color: colors[index % colors.length],
                                    })),
                                    highlightScope: { faded: 'global', highlighted: 'item' },
                                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                },
                            ]}
                            height={240}
                        />

                    </div>
                    <div className="bottom-section-p">
                        <div className="chart-container-p">
                            <h2>Total de atividades não iniciadas</h2>
                            <p>{atividadesNIniciadasPProjeto}</p>
                        </div>
                        <div className="chart-container-p">
                            <h2>Total de atividades para concluir</h2>
                            <p>{atividadesParaConcluirPProjeto}</p>
                        </div>
                    </div>
                </div>

                {/* DIREITO */}
                <div className="right-side-p">
                    <List className="MuiListItem-root" sx={{ width: '92%', height: 650, overflowY: 'auto' }}>
                        <h3>Quantidade de retrabalho nas atividades</h3>

                        {listagemAtividades.length > 0 ? (
                            listagemAtividades.map((atividadeArray, index) => {
                                const atividade = atividadeArray[0]; // Pega o primeiro item do array interno, que é o objeto da atividade
                                return (
                                    <ListItem key={atividade.id} className="line" alignItems="flex-start" style={{ display: 'flex' }}>
                                        <ListItemAvatar>
                                            <Avatar alt={atividade.responsavel.nome} src="/static/images/avatar/1.jpg" />
                                        </ListItemAvatar>
                                        <ListItemText
                                            style={{ display: 'block', marginLeft: -35 }}
                                            primary={atividade.titulo}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        <h4 style={{color: '#407BFF'}}>Atividade do responsável {atividade.responsavel.nome} -  REFEITA {atividade.quantidade_retrabalho}x</h4>
                                              
                                                    </Typography>
                                                    <p style={{ display: 'flex' }}>{"Tempo de execução: " + atividade.tempo_execucao} {" - Dificuldade: " + atividade.dificuldade} {" - Estado atual: " + atividade.estado}</p>
                                                      </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                );
                            })
                        ) : (
                            <p>Nenhuma atividade encontrada.</p>
                        )}
                    </List>

                    <div className="bottom-section-p">
                        <div className="chart-container-p">
                            <h2>Total de atividades refeitas</h2>
                            <p>{atividadesRefeitasPProjeto}</p>
                        </div>
                        <div className="chart-container-p">
                            <h2>Integrante com mais entregas</h2>
                            {integranteMaisEntregasPProjeto.map((integrante) => (
                                <p style={{ fontSize: 14, margin: 3 }} key={integrante.id}>{integrante.email}</p> // Mostra o email de cada integrante
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardProjeto;
