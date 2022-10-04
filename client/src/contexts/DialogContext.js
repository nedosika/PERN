import {createContext, useContext, useState} from "react";
import CreateTaskDialog from "../components/CreateTaskDialog";

const DialogContext = createContext({});

const useDialogContext = () => useContext(DialogContext);

export const DialogProvider = ({children}) => {
    const [isOpen, setDialog] = useState(false);

    const toggleDialog = () => setDialog((isOpen) => !isOpen);

    return <DialogContext.Provider value={{
        isOpen, toggleDialog
    }}>
        {children}
        <CreateTaskDialog/>
    </DialogContext.Provider>
}

export default useDialogContext;

