import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from "@mui/material";
import {DIALOGS, useDialogContext} from "../../contexts/DialogContext";
import useTasks from "../../hooks/useTasks";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteDialog = () => {
    const {dialogs: {[DIALOGS.deleteDialog]: isOpen}, toggleDialog} = useDialogContext();

    const handleClose = () =>
        toggleDialog(DIALOGS.deleteDialog);

    return (
        <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
        >
            <DialogTitle>{"Delete task"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are You sure to delete this Task?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose}>Agree</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteDialog;