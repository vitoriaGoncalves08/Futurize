import styles from './Header.module.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function Header() {
  return (
    <div className={styles.Header}>
      <div className={styles.Logo}>FUTURIZE</div>
      <img className={styles.ImgPessoa} src="https://via.placeholder.com/40x40" />
      {/* <div className={styles.OpcoesIcon}>
        <div className={styles.op}>
          <MoreVertIcon></MoreVertIcon>
        </div>
      </div> */}
    </div>
  );
}

export default Header;
