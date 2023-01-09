import Link from 'next/link'
import styles from '../../styles/header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="/">Accueil</Link>
            </li>
            <li>
              <Link href="/basket">Mon Panier</Link>
            </li>
            <li>
              <Link href="/account/me">Mon Compte</Link>
            </li>
            <li>
              <Link href="/login">M'identifier</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
