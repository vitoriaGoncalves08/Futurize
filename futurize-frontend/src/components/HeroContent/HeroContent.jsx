import styles from './HeroContent.module.css'

function HeroContent() {
    return (
        <div className={styles.HeroContent}>
            
            <div className={styles.Titulo}>
                <p>Gerencie seus projetos</p>
            </div>
            
            <div className={styles.Subtitulo}>
                <p>Desbloqueie uma eficiência sem precedentes e organize-se em projetos de grande escala!</p>
            </div>

            <button className={styles.ButtonCriarConta}>Criar Conta</button>
        </div>
    );
}

export default HeroContent;