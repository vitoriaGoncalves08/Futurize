import styles from './NavBar.module.css';
import { useNavigate } from "react-router-dom";
import Buttons from "../Buttons/Buttons";

function NavBar() {
    const navigate = useNavigate();
    return (
        <nav>
            <div className={styles.LogoFuturize}>
                <p>FUTURIZE</p>
            </div>

            <div className={styles.MenuItens}>
                <ul>
                    <li><a href="#">Tópicos</a></li>
                    <li><a href="#">Membros</a></li>
                    <li><a href="#">Sobre nós</a></li>
                    <li><a href="#">Contato</a></li>
                </ul>
            </div>
            
            <Buttons onClick={() => navigate("/cadastro")}>Entrar</Buttons>
        </nav>
    );
}

export default NavBar;