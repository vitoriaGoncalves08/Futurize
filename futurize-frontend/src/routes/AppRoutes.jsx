import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import SiteInicial from "../pages/site-inicial";
import Login from "../pages/login";
import Cadastro from "../pages/cadastro";
import Projeto from "../pages/projeto";
import Kanban from "../pages/kanban";
import Dashboard from "../pages/dashboard";
import Settings from "../pages/settings";
import useAuth from "../hooks/useAuth";
import App from "../Teste";
import { AuthProvider } from "../context/auth";

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
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
