import React from 'react';

import {
    Fab,
    Paper,
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Container,
    TableContainer,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import Layout from "../../components/Layout";
import {useTasksContext} from "../../contexts/TasksContext";
import {useDialogContext} from "../../contexts/DialogContext";

const Tasks = () => {
    const {tasks} = useTasksContext();
    const {toggleDialog} = useDialogContext();

    return (
        <Layout title='Tasks'>
            <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name of site</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Progress</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasks.map((task) => (
                                <TableRow
                                    key={task.id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {task.name}
                                    </TableCell>
                                    <TableCell>{task.status}</TableCell>
                                    <TableCell>{task.progress && `${task.progress} %`}</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Fab
                    sx={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16
                    }}
                    color='primary'
                    onClick={toggleDialog}
                >
                    <AddIcon/>
                </Fab>
            </Container>
        </Layout>
    );
};

export default Tasks;