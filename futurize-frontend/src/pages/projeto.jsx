import Buttons from '../components/Buttons/Buttons';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import SideBar from '../components/SideBar/SideBar';
import Table from '../components/Table/Table';
import TableAlocado from '../components/Table Alocado/Table';

export default function Home() {
  const { signout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signout();
    navigate('/');
  };
  return (
    <>
      <Header />
      <SideBar>
        <Table />
        <TableAlocado />
      </SideBar>
    </>
  );
}
