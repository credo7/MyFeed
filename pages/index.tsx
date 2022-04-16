import type { NextPage } from 'next'
import Head from 'next/head'
import Header from './components/Header'

const Home: NextPage = () => {
  return (
    <div className=''>
      <Head>
        <title>Instagram</title>
      </Head>
      <Header />

      <main className=''>
      </main>

      <footer className=''>
      </footer>
    </div>
  )
}

export default Home
