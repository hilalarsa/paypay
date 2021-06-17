import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Table,
    Paper,
    TableRow,
    TableHead,
    TableContainer,
    TableBody,
    TableCell,
    Button,
} from '@material-ui/core'
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
})

const BasicTable = ({ data, handleUpdateRow, handleDeleteRow, dataFor }) => {
    const classes = useStyles()
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                {dataFor == 'employee' ? (
                    <TableRow>
                        <TableCell>Employee ID</TableCell>
                        <TableCell align="left">Employee Name</TableCell>
                        <TableCell align="left">See Feedback</TableCell>
                        <TableCell align="left">Created At</TableCell>
                        <TableCell align="left">Last Update</TableCell>
                        <TableCell align="left">Update / Delete</TableCell>
                    </TableRow>
                ) : (
                    <TableRow>
                        <TableCell>Feedback ID</TableCell>
                        <TableCell>Feedback Message</TableCell>
                        <TableCell align="left">From (employee)</TableCell>
                        <TableCell align="left">To (employee)</TableCell>
                        <TableCell align="left">Update / Delete</TableCell>
                    </TableRow>
                )}
                <TableHead></TableHead>
                <TableBody>
                    {dataFor == 'employee' ? (
                        <>
                            {data.map((item) => (
                                <TableRow key={item.employee_id}>
                                    <TableCell component="th">
                                        {item.employee_id}
                                    </TableCell>
                                    <TableCell align="left">
                                        {item.employee_name}
                                    </TableCell>
                                    <TableCell align="left">
                                        {item.feedback_id == '0'
                                            ? 'Not Available'
                                            : item.feedback_id}
                                    </TableCell>
                                    <TableCell align="left">
                                        {new Date(
                                            item.created_at
                                        ).toDateString()}
                                    </TableCell>
                                    <TableCell align="left">
                                        {new Date(
                                            item.updated_at
                                        ).toDateString()}
                                    </TableCell>
                                    <TableCell align="left">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() =>
                                                handleUpdateRow(item)
                                            }
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() =>
                                                handleDeleteRow(
                                                    item.employee_id
                                                )
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}{' '}
                        </>
                    ) : (
                        <>
                            {data.map((item) => (
                                <TableRow key={item.feedback_id}>
                                    <TableCell component="th">
                                        {item.feedback_id}
                                    </TableCell>
                                    <TableCell align="left">
                                        {item.feedback_message}
                                    </TableCell>
                                    <TableCell align="left">
                                        {item.feedback_from}
                                    </TableCell>
                                    <TableCell align="left">
                                        {item.feedback_to}
                                    </TableCell>
                                    <TableCell align="left">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() =>
                                                handleUpdateRow(item)
                                            }
                                        >
                                            Update
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default BasicTable
