import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const Dashboard = () => {
    const [atividadesConcluidas, setAtividadesConcluidas] = useState(0);
    const [projetosAlocados, setProjetosAlocados] = useState(0);
    const [projetosGestor, setProjetosGestor] = useState(0);

    useEffect(() => {
        // Mockar os dados
        const mockAtividadesConcluidas = 15; // Exemplo de valor mockado
        const mockProjetosAlocados = 10; // Exemplo de valor mockado
        const mockProjetosGestor = 5; // Exemplo de valor mockado

        setAtividadesConcluidas(mockAtividadesConcluidas);
        setProjetosAlocados(mockProjetosAlocados);
        setProjetosGestor(mockProjetosGestor);
    }, []);

    const dataAtividades = [
        { name: 'Atividades Concluídas', value: atividadesConcluidas },
    ];

    const dataProjetosAlocados = [
        { name: 'Projetos Alocados', value: projetosAlocados },
    ];

    const dataProjetosGestor = [
        { name: 'Projetos como Gestor', value: projetosGestor },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    return (
        <div>
            <h1>Dashboard</h1>

            <div>
                <h2>Atividades Concluídas</h2>
                <BarChart
                    width={600}
                    height={300}
                    data={dataAtividades}
                    margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            </div>

            <div>
                <h2>Projetos Alocados</h2>
                <PieChart width={600} height={300}>
                    <Pie
                        data={dataProjetosAlocados}
                        cx={300}
                        cy={150}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {dataProjetosAlocados.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>

            <div>
                <h2>Projetos como Gestor</h2>
                <LineChart
                    width={600}
                    height={300}
                    data={dataProjetosGestor}
                    margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
            </div>
        </div>
    );
};

export default Dashboard;
