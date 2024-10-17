import './SideBar.css';
import FolderIcon from '@mui/icons-material/Folder';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
import BarChartIcon from '@mui/icons-material/BarChart';
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signout();
    navigate("/");
  };

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/Projeto",
            name: "Projeto",
            icon: <FolderIcon />
        },
        // {
        //     path:"/Kanban",
        //     name:"Kanban",
        //     icon:<ViewKanbanIcon/>
        // },
        // {
        //     path: "/Calendario",
        //     name: "Calendário",
        //     icon: <CalendarMonthIcon />
        // },
        {
            path: "/MinhaDashboard",
            name: "Minha Dashboard",
            icon: <DashboardIcon />
        },
        {
            path: "/DashboardProjeto",
            name: "Dashboard Trabalho",
            icon: <BarChartIcon />
        },
        {
            path: "/QrcodeLogin",
            name: "App Qrcode",
            icon: <AppShortcutIcon />
        },
        {
          path: "/Settings",
          name: "Configurações",
          icon: <SettingsIcon />,
        },
    ]
    return (
        <div className="menu-lateral">
            <div style={{ width: isOpen ? "220px" : "55px" }} className="sidebar-menu">
                <div className="top_section-menu">
                    {/* <h3 style={{display: isOpen ? "block" : "none"}} className="logo-menu">Logo</h3> */}
                    <div style={{ marginLeft: isOpen ? "0px" : "0px" }} className="bars-menu">
                        <MenuIcon onClick={toggle} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link-menu" activeClassName="active-menu">
                            <div className="icon-menu">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text-menu">{item.name}</div>
                        </NavLink>
                    ))
                }
                <NavLink className="link-menu logout" activeClassName="active-menu logout" onClick={handleLogout}>
                    <div className="icon-menu logout"><LogoutIcon /></div>
                    <div style={{ display: isOpen ? "block" : "none", marginLeft: 40, marginBottom: 6 }} className="link_text-menu logout">Sair</div>
                </NavLink>
            </div>
            <main>{children}</main>
        </div>
  );
};

export default Sidebar;
