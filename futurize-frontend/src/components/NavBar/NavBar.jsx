import styles from './NavBar.module.css'

function NavBar() {
    return (
        <nav>
            <div className={styles.LogoFuturize}>
                <p>FUTURIZE</p>
            </div>

            <div className={styles.MenuItens}>
                <ul>
                    <li><a href="#">Tópicos</a></li>
                    <li><a href="#">Membros</a></li>
                    <li><a href="#">Sobre nós</a></li>
                    <li><a href="#">Contato</a></li>
                </ul>
            </div>
            
            <button className={styles.SignUp}>Entrar</button>
        </nav>
    );
}

export default NavBar;