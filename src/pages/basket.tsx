import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { Header } from '../components/header'
import { Footer } from '../components/footer'

export default function Basket() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Footer />
    </div>
  )
}
