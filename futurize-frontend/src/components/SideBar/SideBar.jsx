import './SideBar.css';
import FolderIcon from '@mui/icons-material/Folder';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';


const Sidebar = ({children}) => {
    const { signout } = useAuth();
    const navigate = useNavigate();
  
    const handleLogout = () => {
      signout();
      navigate("/");
    };

    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/Projeto",
            name:"Projeto",
            icon:<FolderIcon/>
        },
        {
            path:"/Kanban",
            name:"Kanban",
            icon:<ViewKanbanIcon/>
        },
        {
            path:"/Calendario",
            name:"Calendário",
            icon:<CalendarMonthIcon/>
        },
        {
            path:"/Dashboard",
            name:"Dashboard",
            icon:<DashboardIcon/>
        },
        {
            path:"/Configuracoes",
            name:"Configurações",
            icon:<SettingsIcon/>
        },
    ]
    return (
        <div className="menu-lateral">
           <div style={{width: isOpen ? "220px" : "55px"}} className="sidebar-menu">
               <div className="top_section-menu">
                   {/* <h3 style={{display: isOpen ? "block" : "none"}} className="logo-menu">Logo</h3> */}
                   <div style={{marginLeft: isOpen ? "0px" : "0px"}} className="bars-menu">
                       <MenuIcon onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link-menu" activeclassName="active-menu">
                           <div className="icon-menu">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text-menu">{item.name}</div>
                       </NavLink>
                   ))
               }
                <NavLink className="link-menu logout" activeclassName="active-menu logout">
                    <div className="icon-menu logout"><LogoutIcon/></div>
                    <div style={{display: isOpen ? "block" : "none", marginLeft: 40, marginBottom: 6}} className="link_text-menu logout" onClick={handleLogout}>Sair</div>
                </NavLink>
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;


// return (
//     <div className="rectangle12">
//         <div className="SideBar">
//             {/*<i className="ph ph-list" id="btn"></i>*/}
//             <ul className="NavList>">
//                 <li>
//                     <a href="#">
//                         {/*<i className="ph ph-folder-open"></i>*/}
//                         <span className="LinksName">Projeto</span>
//                     </a>
//                     <span className="Tooltip">Projeto</span>
//                 </li>
//                 <li>
//                     <a href="#">
//                         {/* <i className="ph ph-kanban"></i> */}
//                         <span className="LinksName">Kanban</span>
//                     </a>
//                     <span className="Tooltip">Kanban</span>
//                 </li>
//                 <li>
//                     <a href="#">
//                         {/* <i className="ph ph-calendar"></i> */}
//                         <span className="LinksName">Calendário</span>
//                     </a>
//                     <span className="Tooltip">Calendário</span>
//                 </li>
//                 <li>
//                     <a href="#">
//                         {/* <i className="ph ph-chart-bar"></i> */}
//                         <span className="LinksName">Dashboard</span>
//                     </a>
//                     <span className="Tooltip">Dashboard</span>
//                 </li>
//                 <li>
//                     <a href="#">
//                         {/* <i className="ph ph-gear"></i> */}
//                         <span className="LinksName">Configurações</span>
//                     </a>
//                     <span className="Tooltip">Configurações</span>
//                 </li>
//             </ul>
//         </div>
//     </div>
// );
// }
// export default SideBar;