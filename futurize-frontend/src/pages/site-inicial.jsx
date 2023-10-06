import '../../public/assets/css/site-inicial.css';
import { useNavigate } from "react-router-dom";
import wave from '../../public/assets/img/wave-footer.svg';
import Buttons from "../components/Buttons/Buttons";

export default function SiteInicial() {
  const navigate = useNavigate();
  return (
    <>
    <div className="SiteInicial">
      <nav>
            <div className="LogoFuturize">
                <p>FUTURIZE</p>
            </div>

            <div className="MenuItens">
                <ul>
                    <li><a href="#">Tópicos</a></li>
                    <li><a href="#">Membros</a></li>
                    <li><a href="#">Sobre nós</a></li>
                    <li><a href="#">Contato</a></li>
                </ul>
            </div>
            
            <Buttons onClick={() => navigate("/cadastro")}>Entrar</Buttons>
      </nav>
      <div className="HeroContent">
            
            <div className="Titulo">
                <p>Gerencie seus projetos</p>
            </div>
            
            <div className="Subtitulo">
                <p>Aprimore sua eficiência de forma inigualável e estabeleça uma estrutura organizacional para projetos acadêmicos!</p>
            </div>

            <div className="ButtonCriarConta">
                {/* <button>Criar Conta</button> */}
                <Buttons onClick={() => navigate("/Cadastro")}>Criar Conta</Buttons>
            </div>
      </div>
    </div>
     <footer className="Wave">
     <img src={wave} alt="Onda azul"/>
    </footer>
    </>
  );
}
