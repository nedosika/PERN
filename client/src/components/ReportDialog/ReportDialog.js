import React from 'react';
import {DIALOGS, useDialogContext} from "../../contexts/DialogContext";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import Slide from "@mui/material/Slide";

const Transition = React.forwardRef((props, ref) =>
    <Slide direction="up" ref={ref} {...props} />
);

const ReportDialog = () => {
    const {dialogs: {[DIALOGS.reportDialog]: isOpen}, toggleDialog} = useDialogContext();

    const closeDialog = () =>
        toggleDialog(DIALOGS.reportDialog)

    return (
        <Dialog
            fullScreen
            open={isOpen}
            onClose={closeDialog}
            TransitionComponent={Transition}
        >
            <AppBar sx={{position: 'relative'}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={closeDialog}
                    >
                        <CloseIcon/>
                    </IconButton>
                    <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                        Report
                    </Typography>
                    <Button autoFocus color="inherit" onClick={closeDialog}>
                        Close
                    </Button>
                </Toolbar>
            </AppBar>
            <Box
                sx={{
                    margin: '20px auto',
                    '& > :not(style)': {m: 1, width: '60ch'},
                }}
            >
                Report
            </Box>
        </Dialog>
    );
};

export default ReportDialog;