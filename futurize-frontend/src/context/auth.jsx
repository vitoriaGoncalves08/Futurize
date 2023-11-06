import { createContext, useEffect, useState } from 'react';
import api from '../service/api';
import { ToastError } from '../components/Alert/Toast';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    /*
      Agora, quando a aplicação inicia, a gente verifica se existe algo no localstorage
      e, caso exista, já direcionamos o brother pra /projeto
    */

    const userToken = localStorage.getItem('@user');

    if (userToken) {
      setUser(userToken);
      navigate('/projeto');
    }else{
      navigate('/');
    }
  }, []);

  const signIn = async (email, senha) => {
    /*
      No backend quase nem mexi, caso retorne algo diferente de 200 (401 para senha
      incorreta, por exemplo), vai cair no catch, se cair no catch a gente dispara
      o Toast. Com tudo certo, a variável data vai ser a resposta dq request com
      sucesso, que agora retorna o próprio usuário, vamos usar isso pra setar no nosso state
      e no localstorage (pro cara nao precisar fazer login toda vez). Ignorei a parte de token
      pq nao manjo de java, nunca mexi com spring na real :(
    */

    try {
      // Tudo deu certo (back retorna objeto do usuario)
      const { data } = await api.post('Usuario/login', { email, senha });
      localStorage.setItem('@user', JSON.stringify(data));
      setUser(data);

      navigate('/projeto');
    } catch (error) {
      // Usuário nao encontrado ou senha incorreta (back retorna string)
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
    return localStorage.getItem('@user');
  }

  const getLoginUserObject = () => {
    const userToken = localStorage.getItem('@user');
    return JSON.parse(userToken); // Retorne o objeto completo do usuário
  }

  return (
    <AuthContext.Provider value={{ user, signed: !!user, signIn, signup, signout, getLoginUser, getLoginUserObject }}>
      {children}
    </AuthContext.Provider>
  );
}