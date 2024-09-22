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
    const [atividadesConcluidasPProjeto, setAtividadesConcluidasPProjeto] = useState([]);
    const [minhasAtividades, setMinhasAtividades] = useState([]);
    const [projetosCriados, setProjetosCriados] = useState(0);
    const [projetosAlocados, setProjetosAlocados] = useState(0);
    const [projetosConcluidos, setProjetosConcluidos] = useState(0);
    const [atividadesAndamento, setAtividadesAndamento] = useState(0);
    const colors = ['#407BFF', '#79A2FE', '#48beff', '#9FBDFF', '#73d2de', '#a1cdf4', '#60b2e5', '#457eac'];

    const token = JSON.parse(localStorage.getItem('@user'))?.tokenJWT;

    const { getLoginUser } = useAuth();
    const usuarioLogado = getLoginUser();
    const userId = usuarioLogado.id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Atividades Concluídas por Projeto
                const responseAtividadesConcluidasPProjeto = await axios.get(`http://localhost:8080/dashboard/atividades-concluidas-por-projeto/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const transformedAtividadesConcluidas = responseAtividadesConcluidasPProjeto.data.map((item, index) => ({
                    id: index,
                    label: item[0],
                    value: item[1],
                }));

                setAtividadesConcluidasPProjeto(transformedAtividadesConcluidas);

                // Minhas atividades
                const responseMinhasAtividades = await axios.get(`http://localhost:8080/dashboard/atividades/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const transformedMinhasAtividades = responseMinhasAtividades.data.map((item, index) => ({
                    id: index,
                    label: item[0],
                    value: item[1],
                }));

                setMinhasAtividades(transformedMinhasAtividades);

                // Projetos Criados
                const responseProjetosCriados = await axios.get(`http://localhost:8080/dashboard/projetos-criados/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProjetosCriados(responseProjetosCriados.data);

                // Projetos Alocados
                const responseProjetosAlocados = await axios.get(`http://localhost:8080/dashboard/projetos-alocados/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProjetosAlocados(responseProjetosAlocados.data);

                // Projetos Concluídos
                const responseProjetosConcluidos = await axios.get(`http://localhost:8080/dashboard/projetos-concluidos/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProjetosConcluidos(responseProjetosConcluidos.data);

                // Atividades Em Andamento
                const responseAtividadesAndamento = await axios.get(`http://localhost:8080/dashboard/atividades-andamento/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAtividadesAndamento(responseAtividadesAndamento.data);
            } catch (error) {
                console.error('Erro ao buscar dados da dashboard', error);
            }
        };

        fetchData();
    }, [userId]);

    const [projeto, setProjeto] = React.useState('');

    const handleChange = (event) => {
        setProjeto(event.target.value);
    };

    return (
        <>
            <div className="dashboard-container-p">
                <h1 >Dashboard Projeto</h1>
                <Box sx={{ marginRight: 8, marginBottom: 1 }}>
                    <FormControl fullWidth>
                        <InputLabel id="Select">Projeto</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={projeto}
                            label="projeto"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                {/* ESQUERDO */}
                <div className="left-side-p">
                    <div className="main-chart-p">
                        <h2>Atividades Concluídas por Projeto</h2>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Gauge
                                height={260}
                                width={290}
                                value={75}
                                startAngle={-110}
                                endAngle={110}
                                sx={{
                                    [`& .${gaugeClasses.valueText}`]: {
                                        fontSize: 30,
                                    },
                                }}
                                text={({ value, valueMax }) => `${value} / ${valueMax}`}
                            />
                        </div>
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
                            <p>{projetosConcluidos}</p>
                        </div>
                        <div className="chart-container-p">
                            <h2>Total de atividades para concluir</h2>
                            <p>{atividadesAndamento}</p>
                        </div>
                    </div>
                </div>

                {/* DIREITO */}
                <div className="right-side-p">
                    <List className="MuiListItem-root" sx={{
                        width: '92%', maxHeight: 720, /* Altura máxima da lista */
                        overflowY: 'auto' /* Habilita a rolagem vertical */
                    }}>
                        <ListItem alignItems="flex-start" style={{ display: 'flex' }}>
                            <ListItemAvatar>
                                <Avatar alt="Vitória Goncalves" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText style={{ display: 'block', marginLeft: -30 }}
                                primary="Atividade 2"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Vitória Goncalves
                                        </Typography>
                                        {" — CONCLUIDO"}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <ListItem alignItems="flex-start" style={{ display: 'flex' }}>
                            <ListItemAvatar>
                                <Avatar alt="Vitória Passos" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText style={{ display: 'block', marginLeft: -35 }}
                                primary="Atividade tal"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Vitória Passos
                                        </Typography>
                                        {" — EM ANDAMENTO"}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </List>
                </div>
            </div>
        </>
    );
};

export default DashboardProjeto;
