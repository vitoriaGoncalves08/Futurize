import './SideBar.css';
import FolderIcon from '@mui/icons-material/Folder';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';

function SideBar(){
    return (
        <div className="rectangle12">
            <div className="SideBar">
                {/*<i className="ph ph-list" id="btn"></i>*/}
                <ul className="NavList">
                    <li>
                        <a href="#">
                            <FolderIcon></FolderIcon>
                            <span className="LinksName">Projeto</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <ViewKanbanIcon></ViewKanbanIcon>
                            <span className="LinksName">Kanban</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <CalendarMonthIcon></CalendarMonthIcon>
                            <span className="LinksName">Calendário</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <DashboardIcon></DashboardIcon>
                            <span className="LinksName">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <SettingsIcon></SettingsIcon>
                            <span className="LinksName">Configurações</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SideBar;