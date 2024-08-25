import styles from './Notfound.module.css';
import ghostImg from '../../assets/ghost-img.png';
import { Link } from 'react-router-dom';

export default function Notfound() {
  return (
    <section className={styles.home}>
      <div className={styles["home-container"]}>
        <div className={styles["home-data"]}>
          <span className={styles["home-subtitle"]}>
            Error 404
          </span>
          <h1 className={styles["home-title"]}>Hey Buddy</h1>
          <p className={styles["home-des"]}>
            We can't seem to find the page you are looking for.
          </p>
          <Link to={'./'} className={styles["home-button"]}>
            Go Home
          </Link>
        </div>
        <div className={styles["home-img"]}>
          <img src={ghostImg} alt="ghost picture" />
          <div className={styles["home-shadow"]}></div>
        </div>
      </div>
    </section>
  );
}

