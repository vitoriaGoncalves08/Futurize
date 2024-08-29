import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import { BarChart as RechartsBarChart, Bar, CartesianGrid, Tooltip, Legend, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart as MuiPieChart } from '@mui/x-charts/PieChart';

const Dashboard = () => {
    const [atividadesConcluidasPProjeto, setAtividadesConcluidasPProjeto] = useState(0);
    const [minhasAtividades, setMinhasAtividades] = useState(0);
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
                setMinhasAtividades(responseMinhasAtividades.data);

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

    const data = [
        { id: 0, value: 0, label: 'Total de Tarefas' },
        { id: 1, value: 5, label: 'Tarefas a Fazer' },
        { id: 2, value: 6, label: 'Em Andamento' },
        { id: 3, value: 9, label: 'Feito' },
        { id: 4, value: 3, label: 'A Revisar' },
        { id: 5, value: 2, label: 'Revisado' },
        { id: 6, value: 1, label: 'Refazendo' },
        { id: 7, value: 3, label: 'Concluído' },       
      ];
      
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
                    data,
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
