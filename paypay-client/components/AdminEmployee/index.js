import Head from 'next/head'
import Image from 'next/image'
import styles from './AdminEmployee.module.css'

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
        `/api/employees`,
        fetcher
    )
    const [employeeName, setEmployeeName] = useState('')
    const [mode, setMode] = useState('add')
    const [dataToUpdate, setDataToUpdate] = useState([])
    const [currentUser, setCurrentUser] = useState('admin')

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
                employeeName,
            }),
        }
        fetch(API_URL + '/employee', payload)
            .then((res) => {
                mutate()
                return res.json()
            })
            .then((res) => mutate())
            .catch((err) => console.log(err))
    }

    const handleDeleteRow = async (id) => {
        fetch(API_URL + '/employee/' + id, {
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
        setEmployeeName(data.employee_name)
        setMode('update')
        setDataToUpdate(data)
    }

    const handleUpdate = async () => {
        let data = dataToUpdate
        fetch(API_URL + '/employee/' + data.employee_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                employeeName,
            }),
        })
            .then((res) => {
                mutate()
                return res.json()
            })
            .catch((err) => console.log(err))
        setEmployeeName('')
        setMode('add')
        setDataToUpdate([])
    }

    return (
        <div>
            {currentUser == 'admin' && (
                <>
                    <form noValidate autoComplete="off">
                        <div style={{ marginBottom: '12px' }}>
                            <TextField
                                required
                                id="Employee-ID"
                                label="Employee Name"
                                value={employeeName}
                                onChange={(e) =>
                                    setEmployeeName(e.target.value)
                                }
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
                            {mode == 'add' ? 'Add Employee' : 'Update Employee'}
                        </Button>
                    </form>
                    <div style={{ marginTop: '12px' }}>
                        <Table
                            dataFor="employee"
                            data={data.result.employee}
                            handleUpdateRow={(data) => handleUpdateRow(data)}
                            handleDeleteRow={(id) => handleDeleteRow(id)}
                        />
                    </div>
                </>
            )}
            {currentUser == 'employee' && <></>}
        </div>
    )
}
