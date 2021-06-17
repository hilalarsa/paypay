import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useEffect, useState } from 'react'

import Navbar from '../components/Navbar'
import AdminEmployee from '../components/AdminEmployee'
import AdminFeedback from '../components/AdminFeedback'
import { Container } from '@material-ui/core'

import { useRouter } from 'next/router'

export default function Home() {
    const router = useRouter()
    const [currentUser, setCurrentUser] = useState('admin')
    const [currentPage, setCurrentPage] = useState('adminemployee')

    const handleSwapUser = (userType) => {
        setCurrentUser(userType)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>
                    {currentUser ? currentUser.toUpperCase() : 'PayPay'}
                </title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar
                handleSwapUser={handleSwapUser}
                handleCurrentPage={(text) => setCurrentPage(text)}
                currentUser={currentUser}
            >
                <Container maxWidth="xl">
                    {currentPage == 'adminemployee' && <AdminEmployee />}
                    {currentPage == 'adminfeedback' && <AdminFeedback />}
                </Container>
            </Navbar>
        </div>
    )
}
