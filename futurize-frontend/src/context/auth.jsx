import { createContext, useEffect, useState } from 'react';
import api from '../service/api';
import { ToastError } from '../components/Alert/Toast';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem('@user');

    if (userToken) {
      setUser(userToken);
    } else {
      navigate('/');
    }
  }, []);

  const signIn = async (email, senha) => {
    try {
      const { data } = await api.post('/login', { email, senha });
      localStorage.setItem('@user', JSON.stringify(data));
      setUser(data);

      navigate('/projeto');
    } catch (error) {
      ToastError({
        text: error?.response?.data ?? 'Algo deu errado.',
        title: 'Erro!',
      });
    }
  };

  const signup = (name, email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem('users_bd'));

    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      return 'Já tem uma conta com esse E-mail';
    }

    let newUser;

    if (usersStorage) {
      newUser = [...usersStorage, { name, email, password }];
    } else {
      newUser = [{ name, email, password }];
    }

    localStorage.setItem('users_bd', JSON.stringify(newUser));

    return;
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem('@user');
  };

  const getLoginUser = () => {
    const userToken = localStorage.getItem('@user');
    if (userToken) {
      try {
        const tokenPayload = JSON.parse(atob(userToken.split('.')[1])); // Decodifica o payload do token JWT
        return tokenPayload;
      } catch (error) {
        console.error('Erro ao decodificar o token JWT:', error);
        return null;
      }
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, signIn, signup, signout, getLoginUser }}>
      {children}
    </AuthContext.Provider>
  );
};
