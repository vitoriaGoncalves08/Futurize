import Buttons from '../Buttons/Buttons';
import './SiteInicial.css';
import { useNavigate } from 'react-router-dom';
import projeto from '/assets/img/projeto.svg';

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
            <li><a href="#funciona">Funcionamento</a></li>
            <li><a href="#modelo">Modelos</a></li>
            <li><a href="#projeto">Projetos</a></li>
            <li><a href="#tarefas">Tarefas</a></li>
            <li><a href="#sobre">Sobre nós</a></li>
          </ul>
        </div>
        <Buttons onClick={() => navigate('/login')}>Entrar</Buttons>
      </nav>
      
      <div className="HeroContent">
        <div className="Titulo">
          <p>Gerencie seus projetos acadêmicos</p>
        </div>

        <div className="Subtitulo">
          <p>
            Desbloqueie uma eficiência sem precedentes e organize-se em projetos de
            grande escala!
          </p>
        </div>

        <div className="ButtonCriarConta">
          <Buttons onClick={() => navigate('/Cadastro')}>Criar Conta</Buttons>
        </div>
      </div>

      <div className='MainContent'>

          <section id="funciona" className='secao'>
            <div className="texto">
              <h1> Desperte o potencial máximo dos seus projetos</h1>
              <p>
                Transforme o jeito de gerenciar projetos! Visualize e organize tarefas de forma intuitiva, com atualizações em tempo real e colaboração eficaz em equipe. Personalize conforme sua necessidade e alcance o sucesso com facilidade. Experimente a revolução Kanban hoje!
              </p>
            </div>
            <img src={projeto} alt="" srcset="" />
          </section>

          <div id="modelo" className='secao'>
            <div className="texto">
              <h1>Personalize o seu fluxo de trabalho e ajuste conforme a necessidade do seu projeto!</h1>
              <p>
                O Kanban é como um quadro de tarefas virtual, onde você visualiza e move suas atividades de uma etapa para outra. Imagine post-its digitais que representam suas tarefas. Arraste e solte para mudar o status de: "A fazer" para "Em progresso" e finalmente para "Concluído". Simples assim!
              </p>
            </div>
            <img src={projeto} alt="" srcset="" />
          </div>

          <div id="projeto" className='secao'>
            <div className="texto">
              <h1>Organize-se e alcance o sucesso de forma rápida e divertida. </h1>
              <p>
                A nossa plataforma permite que você defina metas, atribua tarefas e estabeleça prazos de maneira descomplicada. Imagine reunir sua equipe em um ambiente digital onde todos têm uma visão clara do que precisa ser feito.
              </p>
              <p>
                Além disso, você pode monitorar o progresso em tempo real, identificando gargalos e oportunidades de otimização. Colabore de maneira eficaz, comentando diretamente nas tarefas e recebendo notificações instantâneas.
              </p>
            </div>
            <img src={projeto} alt="" srcset="" />

          </div>

          <div id="tarefas" className='secao'>
            <div className="texto">
              <h1>A simplicidade do arrastar e soltar </h1>
              <p>
                Já imaginou ter total controle sobre o que precisa ser feito? Por quem e até quando?
              </p>
              <p>
                Dentro da nossa plataforma, as tarefas são como peças de um quebra-cabeça que compõem o seu projeto. Elas podem ser criadas, atribuídas a membros da equipe e definidas com prazos claros.
              </p>
            </div>
            <img src={projeto} alt="" srcset="" />
          </div>

          <div id="sobre" className='secao'>
            <h1>Sobre nós</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis animi non quis nihil suscipit pariatur, vero veniam ab tempora nobis blanditiis illum autem laborum quod exercitationem debitis laudantium. Distinctio, omnis?</p>
          </div>

        </div>
    </div>
    
  );
}

export default SiteInicial;