import styles from './HeroContent.module.css';
import Buttons from "../Buttons/Buttons";
import { useNavigate } from "react-router-dom";

function HeroContent() {
  const navigate = useNavigate();
    return (
        <div className={styles.HeroContent}>
            
            <div className={styles.Titulo}>
                <p>Gerencie seus projetos</p>
            </div>
            
            <div className={styles.Subtitulo}>
                <p>Desbloqueie uma eficiência sem precedentes e organize-se em projetos de grande escala!</p>
            </div>

            <div className={styles.ButtonCriarConta}>
                {/* <button>Criar Conta</button> */}
                <Buttons onClick={() => navigate("/Cadastro")}>Criar Conta</Buttons>
            </div>
        </div>
    );
}

export default HeroContent;