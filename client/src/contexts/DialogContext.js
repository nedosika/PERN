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
    });
    const [options, setOptions] = useState({});

    const toggleDialog = (dialog, options) =>
    {
        setOptions((prevState) => ({...prevState, [dialog]: options}));
        setDialogs((prevState) => ({
            ...prevState,
            [dialog]: !prevState[dialog]
        }));
    }

    return <DialogContext.Provider value={{
        dialogs,
        toggleDialog
    }}>
        {children}
        <CreateTaskDialog/>
        <ReportDialog {...options[DIALOGS.reportDialog]}/>
    </DialogContext.Provider>
}

export default DialogProvider;

