// auth.js
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
     
    };

    checkAuthentication();
  }, []);

  const signin = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8080/User/login", {
        email,
        senha: password,
      });

      if (response.status === 200) {
        setUser(response.data);
      } else {
        return "E-mail ou senha incorretos";
      }
    } catch (error) {
      return "Erro ao fazer login";
    }
  };

  const signout = async () => {
    try {
      await axios.post("http://localhost:8080/User/logout");
      setUser(null);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await axios.post("http://localhost:8080/User", {
        name,
        email,
        senha: password,
      });

      if (response.status === 200) {
        // Você pode definir setUser com os detalhes do usuário aqui, se necessário.
        return null;
      } else {
        return "Erro ao cadastrar usuário";
      }
    } catch (error) {
      return "Erro ao cadastrar usuário";
    }
  };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, signin, signout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
