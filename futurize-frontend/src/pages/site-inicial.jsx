import NavBar from '../components/NavBar/NavBar';
import HeroContent from '../components/HeroContent/HeroContent';
import Inicial from '../components/Inicial/Home';

function SiteInicial() {
  return (
    <div className="SiteInicial">
      <NavBar/>
      <HeroContent/>
      <Inicial/>
    </div>
  );
}

export default SiteInicial;