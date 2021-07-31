import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import gsap from 'gsap'
import { useEffect } from 'react'

const Home = ({ data }) => {
	const sharedProps = {
		opacity: 1,
		delay: 0.5,
		ease: 'power1.inOut',
	}
	useEffect(() => {
		console.log('Hey mounted!')

		gsap.set('#title, #title a', { x: -100, y: -100, color: 'transparent' })
		gsap.to('#title', {
			...sharedProps,
			x: 0,
			y: 0,
			color: 'black',
			duration: 1, // seconds
		})

		gsap.to('#title a', {
			...sharedProps,
			color: '#e01a1a',
			duration: 2, // seconds
		})
	}, [])

	// another animation
	useEffect(() => {
		gsap.set('#message', { x: 100, y: 100, color: 'transparent' })
		gsap.to('#message', {
			...sharedProps,
			x: 0,
			y: 0,
			color: 'black',
			duration: 1, // seconds
		})
	}, [])

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next + GSAP App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 id={`title`} style={{ opacity: 0 }} className={styles.title}>
					Welcome to <a href="https://nextjs.org">Next.js!</a>
				</h1>
				<h2 id={`message`} style={{ opacity: 0 }}>
					{data.message}
				</h2>
			</main>

			<footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{' '}
					<span className={styles.logo}>
						<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
					</span>
				</a>
			</footer>
		</div>
	)
}

const dev = process.env.NODE_ENV !== 'production'

export async function getStaticProps() {
	const host = dev ? 'http://localhost:3000' : `https://nextjs-gsap.vercel.app`
	let data

	try {
		const res = await fetch(`${host}/api/hello`)
		data = await res.json()
	} catch (error) {
		console.log('🚀 ~ file: index.js ~ line 93 ~ getStaticProps ~ error', error)
	}

	if (!data) {
		return {
			notFound: true,
		}
	}
	return {
		props: { data, fallback: false }, // will be passed to the page component as props
	}
}

export default Home
