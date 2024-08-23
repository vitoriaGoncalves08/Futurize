import { useNavigate } from "react-router-dom";
import "./SiteInicial.css";
import Buttons from "../Buttons/Buttons";

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';

import backlog from "/assets/img/card-backlog.png";
import sprintBacklog from "/assets/img/card-sprint-backlog.png";
import development from "/assets/img/card-development.png";
import doneDevelopment from "/assets/img/card-done-development.png";
import test from "/assets/img/card-test.png";
import doneTest from "/assets/img/card-done-test.png";
import rework from "/assets/img/card-rework.png";
import done from "/assets/img/card-done.png";
import secao1 from "/assets/img/secao1.svg";
import secao2 from "/assets/img/secao2.svg";
import secao3 from "/assets/img/secao3.svg";
import secao4 from "/assets/img/secao4.svg";
import logo from "/assets/img/logoProjeto.png";
import wave from "../../../public/assets/img/wave-footer.svg";

import { useState } from "react";

function SiteInicial() {
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);

  const cards = [
    {
      title: "BACKLOG",
      imgSrc: backlog,
      description: "Demanda total de atividades",
    },
    {
      title: "SPRINT BACKLOG",
      imgSrc: sprintBacklog,
      description: "Conjunto de atividades",
    },
    {
      title: "DEVELOPMENT",
      imgSrc: development,
      description: "O que está sendo feito",
    },
    {
      title: "DONE DEVELOPMENT",
      imgSrc: doneDevelopment,
      description: "Atividades concluídas",
    },
    {
      title: "TEST",
      imgSrc: test,
      description: "Está sendo testado",
    },
    {
      title: "DONE TEST",
      imgSrc: doneTest,
      description: "Atividades concluídas",
    },
    {
      title: "REWORK",
      imgSrc: rework,
      description: "Finalizado, mas precisou retomar",
    },
    {
      title: "DONE",
      imgSrc: done,
      description: "Finalizado",
    },
  ];

  const totalSlides = Math.ceil(cards.length / 3);

  const moveSlide = (direction) => {
    let newSlide = currentSlide + direction;
    if (newSlide < 0) {
      newSlide = totalSlides - 1;
    } else if (newSlide >= totalSlides) {
      newSlide = 0;
    }
    setCurrentSlide(newSlide);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="SiteInicial">
      <nav id="inicio">
        <div className="LogoFuturize">
          <img src={logo} alt="" />
        </div>

        <div className="MenuItens">
          <ul>
            <li>
              <a href="#" onClick={() => scrollToSection("funcionamento")}>
                Funcionamento
              </a>
            </li>
            <li>
              <a href="#" onClick={() => scrollToSection("kanban")}>
                Kanban
              </a>
            </li>
            <li>
              <a href="#" onClick={() => scrollToSection("modelos")}>
                Modelos
              </a>
            </li>
            <li>
              <a href="#" onClick={() => scrollToSection("projetos")}>
                Projetos
              </a>
            </li>
            <li>
              <a href="#" onClick={() => scrollToSection("tarefas")}>
                Tarefas
              </a>
            </li>
          </ul>
        </div>

        <Buttons onClick={() => navigate("/login")}>Entrar</Buttons>
      </nav>

      <div className="HeroContent">
        <div className="Titulo">
          <p>Gerencie suas atividades acadêmicas</p>
        </div>

        <div className="Subtitulo">
          <p>
            Desbloqueie uma eficiência sem precedentes e organize-se em projetos
            de grande escala!
          </p>
        </div>

        <div className="ButtonCriarConta">
          <Buttons onClick={() => navigate("/Cadastro")}>Criar Conta</Buttons>
        </div>
      </div>

      <section className="Wave">
        <img src={wave} alt="Onda azul" />
      </section>

      <div id="kanban" className="MainContent">
        <section id="status" class="status">
          <div className="t-status">
            <span>Board Kanban</span>
          </div>
          <div className="carousel-container">
            <div
              className="carousel"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {cards.map((card, index) => (
                <div className="card" key={index}>
                  <h3>{card.title}</h3>
                  <img src={card.imgSrc} alt={card.title} />
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
            <button className="prev" onClick={() => moveSlide(-1)}>
              &#10094;
            </button>
            <button className="next" onClick={() => moveSlide(1)}>
              &#10095;
            </button>
          </div>
        </section>

        <div id="funcionamento" className="secao">
          <div className="texto">
            <h2> Desperte o potencial máximo dos seus projetos</h2>
            <p>
              Transforme o jeito de gerenciar projetos! Visualize e organize
              tarefas de forma intuitiva, com atualizações em tempo real e
              colaboração eficaz em equipe. Personalize conforme sua necessidade
              e alcance o sucesso com facilidade. Experimente a revolução Kanban
              hoje!
            </p>
          </div>
          <img src={secao1} alt="" />
        </div>

        <div id="modelos" className="secao">
          <div className="texto">
            <h2>
              Personalize o seu fluxo de trabalho e ajuste conforme a
              necessidade do seu projeto!
            </h2>
            <p>
              O Kanban é como um quadro de tarefas virtual, onde você visualiza
              e move suas atividades de uma etapa para outra. Imagine post-its
              digitais que representam suas tarefas. Arraste e solte para mudar
              o status de: "A fazer" para "Em progresso" e finalmente para
              "Concluído". Simples assim!
            </p>
          </div>
          <img src={secao2} alt="" />
        </div>

        <div id="projetos" className="secao">
          <div className="texto">
            <h2>
              Organize-se e alcance o sucesso de forma rápida e divertida.{" "}
            </h2>
            <p>
              A nossa plataforma permite que você defina metas, atribua tarefas
              e estabeleça prazos de maneira descomplicada. Imagine reunir sua
              equipe em um ambiente digital onde todos têm uma visão clara do
              que precisa ser feito.
            </p>
            <p>
              Além disso, você pode monitorar o progresso em tempo real,
              identificando gargalos e oportunidades de otimização. Colabore de
              maneira eficaz, comentando diretamente nas tarefas e recebendo
              notificações instantâneas.
            </p>
          </div>
          <img src={secao3} alt="" />
        </div>

        <div id="tarefas" className="secao">
          <div className="texto">
            <h2>A simplicidade do arrastar e soltar </h2>
            <p>
              Já imaginou ter total controle sobre o que precisa ser feito? Por
              quem e até quando?
            </p>
            <p>
              Dentro da nossa plataforma, as tarefas são como peças de um
              quebra-cabeça que compõem o seu projeto. Elas podem ser criadas,
              atribuídas a membros da equipe e definidas com prazos claros.
            </p>
          </div>
          <img src={secao4} alt="" />
        </div>

        {/* <div id="sobre" className="secao">
          <div className="texto">
            <h2>Sobre nós</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis
              animi non quis nihil suscipit pariatur, vero veniam ab tempora
              nobis blanditiis illum autem laborum quod exercitationem debitis
              laudantium. Distinctio, omnis?
            </p>
          </div>
        </div> */}

        <footer>
          <div className="logo-direitos">
            <div className="imageLogo">
              <a href="" onClick={() => scrollToSection("inicio")}>
                <img src={logo} alt="" />
              </a>
            </div>
            <div className="direitosReservados">
              <p>Copyright © 2024 Futurize</p>
            </div>
          </div>

          <div className="redesSociais">
            <ul>
              <li>
                <a href="#">
                  <FacebookIcon sx={{ fontSize: 50 }} />
                </a>
              </li>
              <li>
                <a href="#">
                  <InstagramIcon sx={{ fontSize: 50 }} />
                </a>
              </li>
              <li>
                <a href="#">
                  <LinkedInIcon sx={{ fontSize: 50 }} />
                </a>
              </li>
              <li>
                <a href="#">
                  <XIcon sx={{ fontSize: 50 }} />
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default SiteInicial;
