import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import { BarChart as RechartsBarChart, Bar, CartesianGrid, Tooltip, Legend, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart as MuiPieChart } from '@mui/x-charts/PieChart';

const Dashboard = () => {
    const [atividadesConcluidas, setAtividadesConcluidas] = useState(0);
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
                const responseAtividades = await axios.get(`http://localhost:8080/dashboard/atividades/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Inclua o token correto aqui
                    },
                });
                setAtividadesConcluidas(responseAtividades.data);

                const responseProjetosAlocados = await axios.get(`http://localhost:8080/dashboard/projetos-alocados/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Inclua o token correto aqui
                    },
                });
                setProjetosAlocados(responseProjetosAlocados.data);

                const responseProjetosConcluidos = await axios.get(`http://localhost:8080/dashboard/projetos-concluidos/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Inclua o token correto aqui
                    },
                });
                setProjetosConcluidos(responseProjetosConcluidos.data);

                const responseAtividadesAndamento = await axios.get(`http://localhost:8080/dashboard/atividades-andamento/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Inclua o token correto aqui
                    },
                });
                setAtividadesAndamento(responseAtividadesAndamento.data);

                // Adicione outras chamadas de API conforme necessário

            } catch (error) {
                console.error('Erro ao buscar dados da dashboard', error);
            }
        };

        fetchData();
    }, [userId]);

    const dataAtividades = [
        { name: 'Atividades Concluídas', value: atividadesConcluidas },
        { name: 'Atividades em Andamento', value: atividadesAndamento },
    ];

    const dataProjetosAlocados = projetosAlocados;

    const dataProjetosConcluidos = projetosConcluidos;

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const data = [
        { id: 0, value: 0, label: 'BACKLOG' },
        { id: 1, value: 5, label: 'SPRINT_BACKLOG' },
        { id: 2, value: 6, label: 'DEVELOPMENT' },
        { id: 3, value: 9, label: 'DONE_DEVELOPMENT' },
        { id: 4, value: 3, label: 'TEST' },
        { id: 5, value: 2, label: 'DONE_TEST' },
        { id: 6, value: 1, label: 'REWORK' },
        { id: 7, value: 3, label: 'DONE' },
       
      ];
      
    return (
        <>
        <h1 className='title'>Dashboard</h1>
        <div className="dashboard-container">
            <div className="main-chart">
                <h2>Atividades Concluídas pro Projeto</h2>
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
                <p>{dataProjetosAlocados}</p>
            </div>
            <div className="chart-container">
                <h2>Projetos Alocados</h2>
                <p>{dataProjetosAlocados}</p>
            </div>
            <div className="chart-container">
                <h2>Projetos Concluídos</h2>
                <p>{dataProjetosConcluidos}</p>
            </div>
            <div className="chart-container">
                <h2>Atividades Concluídas</h2>
                <p>3</p>
            </div>
        </div>
        </>
    );
    
};

export default Dashboard;
