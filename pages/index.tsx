import React, { useMemo, useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { NextPage } from 'next'

const Home: NextPage = () => {
  const [websiteURL, setWebsiteURL] = useState(
    'https://dummy-placeholders.vercel.app/'
  )

  useEffect(() => {
    setWebsiteURL(window.location.href)
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Dummy Placeholders</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Grandstander:ital,wght@0,300;0,400;0,600;1,700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <main className={styles.main}>
        <h1>Dummy placeholders</h1>
        <h2>Yet another image placeholder generator.</h2>

        <div className={styles.howto}>
          <h3>How to use:</h3>
          <p>
            Replace search-term with anything and set your preferred width and
            height. Height is optional.
          </p>
          <div className={styles.code}>
            {`${websiteURL}api/image/{search-term}/{width}/{height}`}
          </div>

          <h3>Example:</h3>
          <div className={styles.code}>
            {`${websiteURL}api/image/food/100/100`}
          </div>
          <h3>Turns into:</h3>
          <img
            src={`${websiteURL}api/image/food/100/100`}
            alt="Generated Dummy"
            width="100"
            height="100"
          />
        </div>
      </main>
      <footer className={styles.footer}>
        <span>
          Developed by{' '}
          <a
            href="https://twitter.com/maublum"
            target="_blank"
            rel="noreferrer noopener"
          >
            @maublum
          </a>{' '}
          and powered by{' '}
          <a
            href="https://pixabay.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            Pixabay
          </a>
        </span>
      </footer>
    </div>
  )
}

export default Home
