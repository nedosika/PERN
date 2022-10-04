import {createContext, useContext, useState} from "react";
import CreateTaskDialog from "../components/CreateTaskDialog";
import ReportDialog from "../components/ReportDialog";

export const DIALOGS = {
    createTaskDialog: 'createTaskDialog',
    reportDialog: 'reportDialog'
}

const DialogContext = createContext({});

export const useDialogContext = () => useContext(DialogContext);

export const DialogProvider = ({children}) => {
    const [dialogs, setDialogs] = useState({
        [DIALOGS.createTaskDialog]: false,
        [DIALOGS.reportDialog]: false
    })

    const toggleDialog = (dialog) =>
        setDialogs((prevState) => ({
            ...prevState,
            [dialog]: !prevState[dialog]
        }));

    //const toggleDialog = () => setDialog((isOpen) => !isOpen);

    return <DialogContext.Provider value={{
        dialogs,
        toggleDialog
    }}>
        {children}
        <CreateTaskDialog/>
        <ReportDialog/>
    </DialogContext.Provider>
}

export default DialogProvider;

