import Image from "next/image";
import styles from "./nav.module.css";
import Link from "next/link";

const nav = () => {
  return (
    <nav className={styles.nav}>
      <figure className={styles.nav__logo__img__wrapper}>
        <Image
          src="https://dev.d24jig8s1lr7n9.amplifyapp.com/img/blinker-icon.4f9b2663.png"
          alt="logo"
          width={200}
          height={50}
          className={styles.nav__logo__img}
        />
      </figure>
      <ul className={styles.nav__link__list}>
        <li className={styles.nav__link}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.nav__link}>
          <Link href="/components/header">Find Your Movie</Link>
        </li>
      </ul>
    </nav>
  );
};

export default nav;
