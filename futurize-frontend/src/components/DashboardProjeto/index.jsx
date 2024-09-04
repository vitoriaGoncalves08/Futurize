import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import useAuth from "../../hooks/useAuth";
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart as MuiPieChart } from '@mui/x-charts/PieChart';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

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

    return (
        <>
        <h1 className='title'>Dashboard Projeto</h1>
        <div className="dashboard-container">
        <div className="main-chart" style={{ width: '600px', height: '600px' }}>
    <h2>Atividades Concluídas por Projeto</h2>
    <Gauge
        value={75}
        startAngle={-110}
        endAngle={110}
        sx={{
            [`& .${gaugeClasses.valueText}`]: {
                fontSize: 40,
            },
        }}
        text={({ value, valueMax }) => `${value} / ${valueMax}`}
    />
</div>
            <div className="main-chart">
            <h2>Minhas atividades</h2>
            <MuiPieChart
                series={[
                    {
                      data: minhasAtividades.map((item, index) => ({
                        ...item,
                        color: colors[index % colors.length], // Ciclando pelas cores da paleta
                      })),
                      highlightScope: { faded: 'global', highlighted: 'item' },
                      faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    },
                  ]}
                height={300}
                />
            </div>
            <div className="chart-container">
                <h2>Projetos Criados</h2>
                <p>{projetosCriados}</p>
            </div>
            <div className="chart-container">
                <h2>Projetos Alocados</h2>
                <p>{projetosAlocados}</p>
            </div>
            <div className="chart-container">
                <h2>Projetos Concluídos</h2>
                <p>{projetosConcluidos}</p>
            </div>
            <div className="chart-container">
                <h2>Atividades Em Andamento</h2>
                <p>{atividadesAndamento}</p>
            </div>
        </div>
        </>
    );
};

export default DashboardProjeto;
