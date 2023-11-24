import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import SiteInicial from '../pages/site-inicial';
import Login from '../pages/login';
import Cadastro from '../pages/cadastro';
import Projeto from '../pages/projeto';
import Kanban from '../pages/kanban';
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
          <Route path="https://futurize-5rahehq31-vitoriagoncalves08.vercel.app" element={<SiteInicial />} />
          <Route path="https://futurize-5rahehq31-vitoriagoncalves08.vercel.app/cadastro" element={<Cadastro />} />
          <Route path="https://futurize-5rahehq31-vitoriagoncalves08.vercel.app/login" element={<Login />} />
          <Route path="https://futurize-5rahehq31-vitoriagoncalves08.vercel.app/app" element={<App />} />
          <Route
            path="https://futurize-5rahehq31-vitoriagoncalves08.vercel.app/projeto"
            element={
              <PrivateRoute>
                <Projeto />
              </PrivateRoute>
            }
          />
          <Route
          path="https://futurize-5rahehq31-vitoriagoncalves08.vercel.app/kanban/:projectId" 
          element={
            <PrivateRoute>
              <Kanban />
            </PrivateRoute>}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
