import React, { useEffect, useState, useCallback, FormEvent } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { NextPage } from 'next'

interface FormValues extends HTMLInputElement {
  searchTerm: { value: string }
  widthField: { value: string }
  heightField: { value: string }
}

const Home: NextPage = () => {
  const [websiteURL, setWebsiteURL] = useState(
    'https://dummy-placeholders.vercel.app/'
  )

  useEffect(() => {
    setWebsiteURL(window.location.href)
  }, [])

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()

      const { searchTerm, widthField, heightField } = e.target as FormValues

      if (searchTerm.value === '') {
        return
      }

      let search = websiteURL + `api/image/${searchTerm.value}/`

      if (widthField.value && heightField.value) {
        search = search.concat(`${widthField.value}/${heightField.value}`)
      } else if (widthField.value) {
        search = search.concat(widthField.value)
      } else if (heightField.value) {
        search = search.concat(heightField.value)
      }

      window.open(search)
    },
    [websiteURL]
  )

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
        <div className={styles.generator}>
          <h3>Try it yourself!</h3>
          <form name="image-generator" onSubmit={handleSubmit}>
            <input placeholder="Search term" name="searchTerm" required />
            <input
              placeholder="Width"
              type="number"
              name="widthField"
              maxLength={4}
              max={9999}
            />
            <input
              placeholder="Height"
              type="number"
              name="heightField"
              maxLength={4}
              max={9999}
            />
            <button type="submit">Generate</button>
          </form>
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
