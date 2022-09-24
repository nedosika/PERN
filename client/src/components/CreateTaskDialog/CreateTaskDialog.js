import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import {useTasksContext} from "../../contexts/TasksContext";
import Accordion from "../Accordion/Accordion";
import SiteMap from "./SiteMap";
import Box from "@mui/material/Box";

const Transition = React.forwardRef((props, ref) =>
    <Slide direction="up" ref={ref} {...props} />
);

export default function CreateTaskDialog() {
    const {isOpenDialog, toggleDialog} = useTasksContext();
    return (
        <Dialog
            fullScreen
            open={isOpenDialog}
            onClose={toggleDialog}
            TransitionComponent={Transition}
        >
            <AppBar sx={{position: 'relative'}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={toggleDialog}
                        aria-label="close"
                    >
                        <CloseIcon/>
                    </IconButton>
                    <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                        Create Task
                    </Typography>
                    <Button autoFocus color="inherit" onClick={toggleDialog}>
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
                </Accordion>
            </Box>
            {/*<List>*/}
            {/*    <ListItem button>*/}
            {/*        <ListItemText primary="Phone ringtone" secondary="Titania"/>*/}
            {/*    </ListItem>*/}
            {/*    <Divider/>*/}
            {/*    <ListItem button>*/}
            {/*        <ListItemText*/}
            {/*            primary="Default notification ringtone"*/}
            {/*            secondary="Tethys"*/}
            {/*        />*/}
            {/*    </ListItem>*/}
            {/*</List>*/}
        </Dialog>
    );
}
