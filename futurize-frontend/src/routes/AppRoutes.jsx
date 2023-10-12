import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import SiteInicial from "../pages/site-inicial";
import Login from '../pages/login'; 
import Cadastro from '../pages/cadastro';
import Projetos from '../pages/projetos';
import useAuth from "../hooks/useAuth";
import Teste from "../Teste";

const PrivateRoute = ({ children }) => {
    const { signed } = useAuth();

    return signed ? children : <Login />;
};
  
// Crie o componente de rota
export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SiteInicial />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/login" element={<Login />} />
                <Route path="/projeto" element={<PrivateRoute><Projetos /></PrivateRoute>} />
                <Route path="/teste" element={<Teste />} />
            </Routes>
        </Router>
    );
}