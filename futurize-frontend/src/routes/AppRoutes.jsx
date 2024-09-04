import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import SiteInicial from '../pages/site-inicial';
import Login from '../pages/login';
import Cadastro from '../pages/cadastro';
import Projeto from '../pages/projeto';
import Kanban from '../pages/kanban';
import MinhaDashboard from '../pages/minhadashboard';
import DashboardProjeto from '../pages/dashboardprojeto';
import useAuth from '../hooks/useAuth';
import App from '../Teste';
import { AuthProvider } from '../context/auth';

const PrivateRoute = ({ children }) => {
  const { signed } = useAuth();

  return signed ? children : <Login />;
};
// Crie o componente de rota
export default function AppRoutes() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SiteInicial />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app" element={<App />} />
          <Route
            path="/projeto"
            element={
              <PrivateRoute>
                <Projeto />
              </PrivateRoute>
            }
          />
          <Route
          path="/kanban/:projectId" 
          element={
            <PrivateRoute>
              <Kanban />
            </PrivateRoute>}
          />
        <Route
          path="/minhadashboard" 
          element={
            <PrivateRoute>
              <MinhaDashboard />
            </PrivateRoute>}
          />
        <Route
          path="/dashboardprojeto" 
          element={
            <PrivateRoute>
              <DashboardProjeto />
            </PrivateRoute>}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
