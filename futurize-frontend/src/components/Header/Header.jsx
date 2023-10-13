import styles from './Header.module.css'

function Header() {
    return (
        <div className={styles.Header}>
            <div className={styles.Logo}>FURURIZE</div>
            <img className={styles.ImgPessoa} src="https://via.placeholder.com/40x40" />
            <div className={styles.OpcoesIcon}>
                <i class="ph ph-dots-three-vertical" id="op"></i>
            </div>
        </div>
    );
}

export default Header;