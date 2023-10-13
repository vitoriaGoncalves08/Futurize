import './SideBar.module.css';

function SideBar(){
    return (
        <div className="rectangle12">
            <div className="SideBar">
                {/*<i className="ph ph-list" id="btn"></i>*/}
                <ul className="NavList>">
                    <li>
                        <a href="#">
                            {/*<i className="ph ph-folder-open"></i>*/}
                            <span className="LinksName">Projeto</span>
                        </a>
                        <span className="Tooltip">Projeto</span>
                    </li>
                    <li>
                        <a href="#">
                            {/* <i className="ph ph-kanban"></i> */}
                            <span className="LinksName">Kanban</span>
                        </a>
                        <span className="Tooltip">Kanban</span>
                    </li>
                    <li>
                        <a href="#">
                            {/* <i className="ph ph-calendar"></i> */}
                            <span className="LinksName">Calendário</span>
                        </a>
                        <span className="Tooltip">Calendário</span>
                    </li>
                    <li>
                        <a href="#">
                            {/* <i className="ph ph-chart-bar"></i> */}
                            <span className="LinksName">Dashboard</span>
                        </a>
                        <span className="Tooltip">Dashboard</span>
                    </li>
                    <li>
                        <a href="#">
                            {/* <i className="ph ph-gear"></i> */}
                            <span className="LinksName">Configurações</span>
                        </a>
                        <span className="Tooltip">Configurações</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SideBar;