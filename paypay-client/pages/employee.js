import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useState } from 'react'

import Navbar from '../components/Navbar'
import Table from '../components/Table'
import AdminEmployee from '../components/AdminEmployee'
import { Container, Box, Button, TextField, Divider } from '@material-ui/core'

import { useRouter } from 'next/router'

export default function Home() {
    const router = useRouter()
    const [currentUser, setCurrentUser] = useState('employee')

    const handleSwapUser = (userType) => {
        setCurrentUser(userType)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>{currentUser ? currentUser.toUpperCase() : "PayPay"}</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar
                handleSwapUser={handleSwapUser}
                currentUser={currentUser}
            >
                <Container maxWidth="xl">
                    {/* {currentUser == 'admin' && <AdminEmployee />} */}
                    {currentUser == 'employee' && <></>}
                </Container>
            </Navbar>
        </div>
    )
}