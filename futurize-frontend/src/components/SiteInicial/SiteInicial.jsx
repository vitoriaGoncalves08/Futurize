import { useNavigate } from 'react-router-dom';
import './SiteInicial.css';
import Buttons from '../Buttons/Buttons';
import secao1 from '/assets/img/secao1.svg';
import secao2 from '/assets/img/secao2.svg';
import secao3 from '/assets/img/secao3.svg';
import secao4 from '/assets/img/secao4.svg';
import logo from '/assets/img/logoProjeto.png';

function SiteInicial() {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
  <div className="SiteInicial">
    <nav>
      <div className="LogoFuturize">
        <img src={logo} alt="" />
      </div>

      <div className="MenuItens">
        <ul>
          <li><a href="#" onClick={() => scrollToSection('funciona')}>Funcionamento</a></li>
          <li><a href="#" onClick={() => scrollToSection('modelos')}>Modelos</a></li>
          <li><a href="#" onClick={() => scrollToSection('projetos')}>Projetos</a></li>
          <li><a href="#" onClick={() => scrollToSection('tarefas')}>Tarefas</a></li>
          <li><a href="#" onClick={() => scrollToSection('sobre')}>Sobre nós</a></li>
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
      <div id='funciona' className='secao'>
        <div className="texto">
          <h1> Desperte o potencial máximo dos seus projetos</h1>
          <p>
            Transforme o jeito de gerenciar projetos! Visualize e organize tarefas de forma intuitiva, com atualizações em tempo real e colaboração eficaz em equipe. Personalize conforme sua necessidade e alcance o sucesso com facilidade. Experimente a revolução Kanban hoje!
          </p>
        </div>
        <img src={secao1} alt="" />
      </div>

      <section className='secao'></section>

      <div id='modelos' className='secao'>
        <div className="texto">
          <h1>Personalize o seu fluxo de trabalho e ajuste conforme a necessidade do seu projeto!</h1>
          <p>
            O Kanban é como um quadro de tarefas virtual, onde você visualiza e move suas atividades de uma etapa para outra. Imagine post-its digitais que representam suas tarefas. Arraste e solte para mudar o status de: "A fazer" para "Em progresso" e finalmente para "Concluído". Simples assim!
          </p>
        </div>
        <img src={secao2} alt="" />
      </div>

      <section className='secao'></section>

      <div id='projetos' className='secao'>
        <div className="texto">
          <h1>Organize-se e alcance o sucesso de forma rápida e divertida. </h1>
          <p>
            A nossa plataforma permite que você defina metas, atribua tarefas e estabeleça prazos de maneira descomplicada. Imagine reunir sua equipe em um ambiente digital onde todos têm uma visão clara do que precisa ser feito.
          </p>
          <p>
            Além disso, você pode monitorar o progresso em tempo real, identificando gargalos e oportunidades de otimização. Colabore de maneira eficaz, comentando diretamente nas tarefas e recebendo notificações instantâneas.
          </p>
        </div>
        <img src={secao3} alt="" />
      </div>

      <section className='secao'></section>

      <div id='tarefas' className='secao'>
        <div className="texto">
          <h1>A simplicidade do arrastar e soltar </h1>
          <p>
            Já imaginou ter total controle sobre o que precisa ser feito? Por quem e até quando?
          </p>
          <p>
            Dentro da nossa plataforma, as tarefas são como peças de um quebra-cabeça que compõem o seu projeto. Elas podem ser criadas, atribuídas a membros da equipe e definidas com prazos claros.
          </p>
        </div>
        <img src={secao4} alt="" />
      </div>

      <section className='secao'></section>

      <div id='sobre' className='secao'>
        <div className="texto">
          <h1>Sobre nós</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis animi non quis nihil suscipit pariatur, vero veniam ab tempora nobis blanditiis illum autem laborum quod exercitationem debitis laudantium. Distinctio, omnis?</p>
        </div>
      </div>

    </div>
  </div>
    
  );
}

export default SiteInicial;