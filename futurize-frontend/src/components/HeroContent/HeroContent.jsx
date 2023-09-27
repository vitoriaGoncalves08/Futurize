import styles from './HeroContent.module.css'

function HeroContent() {
    return (
        <div className={styles.HeroContent}>
            
            <div className="Titulo">
                <p>Gerencie seus projetos</p>
            </div>
            
            <div className="Subtitulo">
                <p>Desbloqueie uma eficiência sem precedentes e organize-se em projetos de grande escala!</p>
            </div>
               
            <div className="BtnCriarConta">
                <div className="ButtonCriarConta">
                    <p>Criar Conta</p>
                </div>
            </div>
        </div>
    );
}

export default HeroContent;