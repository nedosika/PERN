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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AssessmentIcon from '@mui/icons-material/Assessment';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';

import Layout from "../../components/Layout";
import {DIALOGS, useDialogContext} from "../../contexts/DialogContext";
import useTasks from "../../hooks/useTasks";

const Tasks = () => {
    const {tasks} = useTasks();
    const {toggleDialog} = useDialogContext();

    const openCreateTaskDialog = () =>
        toggleDialog(DIALOGS.createTaskDialog);

    const openReportDialog = (id) => () => {
        toggleDialog(DIALOGS.reportDialog, {id});
    }

    return (
        <Layout title='Tasks'>
            <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name of site</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Progress</TableCell>
                                <TableCell/>
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
                                    <TableCell align='right'>
                                        <IconButton size="small">
                                            <DeleteIcon fontSize="inherit"/>
                                        </IconButton>
                                        <IconButton size="small">
                                            <EditIcon fontSize="inherit"/>
                                        </IconButton>
                                        <IconButton size="small" onClick={openReportDialog(task.id)}>
                                            <AssessmentIcon fontSize="inherit"/>
                                        </IconButton>
                                        <IconButton size="small">
                                            <RestartAltIcon fontSize="inherit"/>
                                        </IconButton>
                                        <IconButton size="small">
                                            <CancelIcon fontSize="inherit"/>
                                        </IconButton>
                                    </TableCell>
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
                    onClick={openCreateTaskDialog}
                >
                    <AddIcon/>
                </Fab>
            </Container>
        </Layout>
    );
};

export default Tasks;