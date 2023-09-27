import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import SiteInicial from "../pages/site-inicial";
import Login from '../pages/login'; 
import Cadastro from '../pages/cadastro';
import Home from '../pages/home';
import useAuth from "../hooks/useAuth";
import App from "../Teste";

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
                <Route path="/app" element={<App />} />
                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}