import Head from 'next/head'
import Image from 'next/image'
import styles from './Adminfeedback.module.css'

import { useState } from 'react'

import Navbar from '../Navbar'
import Table from '../Table'
import { Container, Box, Button, TextField, Divider } from '@material-ui/core'

import { useRouter } from 'next/router'
import useSwr from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

const API_URL = 'http://localhost:3001'

export default function Home() {
    const router = useRouter()
    const { data, mutate, isValidating, error } = useSwr(
        `/api/feedbacks`,
        fetcher
    )
    const [feedbackMessage, setFeedbackMessage] = useState('')
    const [feedbackFrom, setFeedbackFrom] = useState('')
    const [feedbackTo, setFeedbackTo] = useState('')
    const [mode, setMode] = useState('add')
    const [dataToUpdate, setDataToUpdate] = useState([])

    if (error) return <div>Failed to load user</div>
    if (!data) return <div>Loading...</div>

    const handleSubmit = async () => {
        let payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                feedbackMessage,
                feedbackFrom,
                feedbackTo,
            }),
        }
        fetch(API_URL + '/feedback', payload)
            .then((res) => {
                mutate()
                return res.json()
            })
            .then((res) => mutate())
            .catch((err) => console.log(err))
    }

    const handleDeleteRow = async (id) => {
        fetch(API_URL + '/feedback/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then((res) => {
                mutate()
                return res.json()
            })
            .catch((err) => console.log(err))
    }

    const handleUpdateRow = async (data) => {
        setFeedbackMessage(data.feedback_message)
        setFeedbackFrom(data.feedback_from)
        setFeedbackTo(data.feedback_to)
        setMode('update')
        setDataToUpdate(data)
    }

    const handleUpdate = async () => {
        let data = dataToUpdate
        fetch(API_URL + '/feedback/' + data.feedback_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                feedbackMessage,
                feedbackFrom,
                feedbackTo,
            }),
        })
            .then((res) => {
                mutate()
                return res.json()
            })
            .catch((err) => console.log(err))
        setFeedbackMessage('')
        setFeedbackFrom('')
        setFeedbackTo('')
        setMode('add')
        setDataToUpdate([])
    }

    return (
        <div>
            <>
                <form noValidate autoComplete="off">
                    <div style={{ marginBottom: '12px' }}>
                        <TextField
                            required
                            id="feedback-ID"
                            label="Message"
                            value={feedbackMessage}
                            onChange={(e) => setFeedbackMessage(e.target.value)}
                            style={{ marginRight: '12px' }}
                        />
                        <TextField
                            required
                            id="feedback-ID"
                            label="From"
                            value={feedbackFrom}
                            onChange={(e) => setFeedbackFrom(e.target.value)}
                            style={{ marginRight: '12px' }}
                        />
                        <TextField
                            required
                            id="feedback-ID"
                            label="To"
                            value={feedbackTo}
                            onChange={(e) => setFeedbackTo(e.target.value)}
                            style={{ marginRight: '12px' }}
                        />
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={
                            mode == 'add'
                                ? () => handleSubmit()
                                : () => handleUpdate()
                        }
                    >
                        {mode == 'add' ? 'Add feedback' : 'Update feedback'}
                    </Button>
                </form>
                <div style={{marginTop: "12px"}}>
                    <Table
                        dataFor="feedback"
                        data={data.result.feedback}
                        handleUpdateRow={(data) => handleUpdateRow(data)}
                        handleDeleteRow={(id) => handleDeleteRow(id)}
                    />
                </div>
            </>
        </div>
    )
}
