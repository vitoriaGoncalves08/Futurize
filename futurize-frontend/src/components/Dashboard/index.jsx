import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import useAuth from "../../hooks/useAuth";
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart as MuiPieChart } from '@mui/x-charts/PieChart';

const Dashboard = () => {
    const [atividadesConcluidasPProjeto, setAtividadesConcluidasPProjeto] = useState(0);
    const [minhasAtividades, setMinhasAtividades] = useState([]);
    const [projetosCriados, setProjetosCriados] = useState(0);
    const [projetosAlocados, setProjetosAlocados] = useState(0);
    const [projetosConcluidos, setProjetosConcluidos] = useState(0);
    const [atividadesAndamento, setAtividadesAndamento] = useState(0);

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
                setAtividadesConcluidasPProjeto(responseAtividadesConcluidasPProjeto.data);
                
                // Minhas atividades
                const responseMinhasAtividades = await axios.get(`http://localhost:8080/dashboard/atividades/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Transformando os dados para o formato do MuiPieChart
                const transformedData = responseMinhasAtividades.data.map((item, index) => ({
                    id: index,
                    label: item[0], // "CONCLUIDO" ou "EM_ANDAMENTO"
                    value: item[1], // 2 ou 1
                }));
                
                setMinhasAtividades(transformedData);

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
        <h1 className='title'>Minha Dashboard</h1>
        <div className="dashboard-container">
            <div className="main-chart">
                <h2>Atividades Concluídas por Projeto</h2>
                <BarChart
                xAxis={[{ scaleType: 'band', data: ['Projetinho', 'TCC', 'Trabalho 2'] }]}
                series={[{ data: [3, 4, 1] }]}
                width={500}
                height={350}
                barLabel="value"
                />
            </div>
            <div className="main-chart">
            <h2>Minhas atividades</h2>
            <MuiPieChart
                series={[
                    {
                    data: minhasAtividades,
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

export default Dashboard;
