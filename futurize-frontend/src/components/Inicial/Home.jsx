import styles from './Home.module.css'
import wave from  './img/wave-footer.svg';

function Home() {
    return (
        <footer className={styles.Wave}>
            <img src={wave} alt=""/>
        </footer>
    );
}

export default Home;