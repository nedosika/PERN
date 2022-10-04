import * as React from 'react';

import Box from "@mui/material/Box";
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

import SiteMap from "./SiteMap";
import PostTitle from "./PostTitle";
import Categories from "./Categories";
import Accordion from "../Accordion/Accordion";
import WordpressSettings from "./WordpressSettings";
import {useTasksContext} from "../../contexts/TasksContext";
import {useDialogContext} from "../../contexts/DialogContext";

const Transition = React.forwardRef((props, ref) =>
    <Slide direction="up" ref={ref} {...props} />
);

export default function CreateTaskDialog() {
    const {createTask} = useTasksContext();
    const {isOpen, toggleDialog} = useDialogContext();

    const handleCreateTask = () => {
        createTask();
    }

    return (
        <Dialog
            fullScreen
            open={isOpen}
            onClose={toggleDialog}
            TransitionComponent={Transition}
        >
            <AppBar sx={{position: 'relative'}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={toggleDialog}
                    >
                        <CloseIcon/>
                    </IconButton>
                    <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                        Create Task
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleCreateTask}>
                        Create
                    </Button>
                </Toolbar>
            </AppBar>
            <Box
                sx={{
                    margin: '20px auto',
                    '& > :not(style)': {m: 1, width: '60ch'},
                }}
            >
                <Accordion>
                    <SiteMap/>
                    <PostTitle/>
                    <Categories/>
                    <WordpressSettings/>
                </Accordion>
            </Box>
        </Dialog>
    );
}
