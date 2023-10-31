import Buttons from '../components/Buttons/Buttons';
import '../../public/assets/css/site-inicial.css';
import { useNavigate } from 'react-router-dom';
import wave from '/assets/img/wave-footer.svg';

function SiteInicial() {
  const navigate = useNavigate();
  return (
    <div className="SiteInicial">
      <nav>
        <div className="LogoFuturize">
          <p>FUTURIZE</p>
        </div>

        <div className="MenuItens">
          <ul>
            <li>
              <a href="#">Tópicos</a>
            </li>
            <li>
              <a href="#">Membros</a>
            </li>
            <li>
              <a href="#">Sobre nós</a>
            </li>
            <li>
              <a href="#">Contato</a>
            </li>
          </ul>
        </div>
        <Buttons onClick={() => navigate('/login')}>Entrar</Buttons>
      </nav>
      <div className="HeroContent">
        <div className="Titulo">
          <p>Gerencie seus projetos</p>
        </div>

        <div className="Subtitulo">
          <p>
            Desbloqueie uma eficiência sem precedentes e organize-se em projetos de
            grande escala!
          </p>
        </div>

        <div className="ButtonCriarConta">
          {/* <button>Criar Conta</button> */}
          <Buttons onClick={() => navigate('/Cadastro')}>Criar Conta</Buttons>
        </div>

        <div className='main'>
          <div className='text-content'>
            <h1> Desperte o potencial máximo dos seus projetos</h1>
            <p>
              Transforme o jeito de gerenciar projetos! Visualize e organize tarefas de forma 
              intuitiva, com atualizações em tempo real e colaboração eficaz em equipe. 
              Personalize conforme sua necessidade e alcance o sucesso com facilidade.
              Experimente a revolução Kanban hoje! 
            </p>
          </div>

          <div className='text-content'>
            <h1>Personalize o seu fluxo de trabalho e ajuste conforme a necessidade do seu projeto!</h1>
            <p>
              O Kanban é como um quadro de tarefas virtual, onde você visualiza e move suas 
              atividades de uma etapa para outra. Imagine post-its digitais que
              representam suas tarefas. Arraste e solte para mudar o status:
              de "A fazer" para "Em progresso" e finalmente para "Concluído".
              Simples assim!
            </p>
          </div>

          <div className='text-content'>
            <h1>organize-se e alcance o sucesso de forma rápida e divertida. </h1>
            <p>
              A nossa plataforma permite que você defina metas,
              atribua tarefas e estabeleça prazos de maneira descomplicada.
              Imagine reunir sua equipe em um ambiente digital onde todos têm
              uma visão clara do que precisa ser feito.
            </p>
            <p>
              Além disso, você pode monitorar o progresso em tempo real, identificando gargalos e oportunidades de otimização. Colabore de maneira eficaz, comentando diretamente nas tarefas e recebendo notificações instantâneas.
            </p>
          </div>

          <div className='text-content'>
            <h1>A simplicidade do arrastar e soltar </h1>
            <p>
              Dentro da nossa plataforma, as tarefas são como peças de um 
              quebra-cabeça que compõem o seu projeto. Elas podem ser criadas,
              atribuídas a membros da equipe e definidas com prazos claros.
              Imagine ter total controle sobre o que precisa ser feito, 
              por quem e até quando.
            </p>
          </div>
        </div>
      </div>
 
      {/* {<footer className="Wave">
        <img src={wave} alt="" />
      </footer> } */}
    </div>
    
  );
}

export default SiteInicial;
