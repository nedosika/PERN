import {createContext, useContext} from "react";
import useTasks from "../hooks/useTasks";

const TasksContext = createContext({});

export const useTasksContext = () => useContext(TasksContext);

const TasksProvider = ({children}) => {
    const {tasks, setTasks} = useTasks();

    const createTask = ({}) => {

    }

    const removeTasks = (tasks) => {

    }

    const restartTask = (id) => {

    }

    return <TasksContext.Provider value={{
        tasks,
        createTask,
        removeTasks,
        restartTask
    }}>
        {children}
    </TasksContext.Provider>
}

export default TasksProvider;