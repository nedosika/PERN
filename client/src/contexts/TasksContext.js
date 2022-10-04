import {createContext, useContext, useState} from "react";
import useTasks from "../hooks/useTasks";
import {encode as base64_encode} from 'base-64';
import {CONFIG} from "../config";

export const TASK_FIELDS = {
    wordpressUrl: 'wordpressApiUrl',
    username: 'login',
    password: 'password',
    errorsLogs: 'errorsLogs',
    infoLogs: 'infoLogs',
    consoleLogs: 'consoleLogs',
    tagTitle: 'tagTitle',
    arraysIndex: 'arraysIndex',
    isAddCategories: 'isAddCategories',
    isLoading: 'isLoading',
    progress: 'progress',
    timeout: 'timeout',
    logs: 'logs',
    urls: 'urls',
    isStrongSearch: 'isStrongSearch'
}
const initialState = {
    // [STATE_FIELDS.wordpressUrl]: 'https://wottakk.ru',
    // [STATE_FIELDS.username]: 'admin55',
    // [STATE_FIELDS.password]: 'sjuF 2lfG rsow 2exs FzWU blhg',
    // sjuF 2lfG rsow 2exs FzWU blhg
    // 9ixn TEy0 fkQF dHvb 3uqp CpyD
    // V8Gh Bu6E COTa 6K81 EOFV w69p - jancel.ru
    task: {
        [TASK_FIELDS.wordpressUrl]: '',
        [TASK_FIELDS.username]: '',
        [TASK_FIELDS.password]: '',
        [TASK_FIELDS.tagTitle]: '(?<=>)(.*)(?=<)',
        [TASK_FIELDS.arraysIndex]: 0,
        [TASK_FIELDS.isAddCategories]: true,
        [TASK_FIELDS.progress]: 0,
        [TASK_FIELDS.timeout]: 0,
        [TASK_FIELDS.logs]: [],
        [TASK_FIELDS.urls]: [],
        [TASK_FIELDS.isStrongSearch]: true,
        [TASK_FIELDS.isLoading]: false
    }
}

const TasksContext = createContext({});

export const useTasksContext = () => useContext(TasksContext);

const TasksProvider = ({children}) => {
    const [task, setTask] = useState(initialState.task);
    const {tasks, setTasks} = useTasks();

    const createTask = () => {
        fetch(`${CONFIG.API_URL}/api/tasks/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                api: `${task[TASK_FIELDS.wordpressUrl]}/wp-json/wp/v2`,
                authorization: base64_encode(`${task[TASK_FIELDS.username]}:${task[TASK_FIELDS.password]}`),
                sitemap: task[TASK_FIELDS.urls],
                arraysIndex: task[TASK_FIELDS.arraysIndex],
                isAddCategories: task[TASK_FIELDS.isAddCategories],
                isStrongSearch: task[TASK_FIELDS.isStrongSearch],
                tagTitle: task[TASK_FIELDS.tagTitle],
                timeout: task[TASK_FIELDS.timeout]
            })
        })
            .then(() => {
                console.log('task added')
            })
            .catch((error) => {
                console.log(error)
            })
            .finally()
        console.log(task);
    }

    const removeTasks = (tasks) => {

    }

    const restartTask = (id) => {

    }

    return <TasksContext.Provider value={{
        task,
        setTask: (field) =>
            setTask((prevState) => Object.assign({}, prevState, field)),
        tasks,
        createTask,
        removeTasks,
        restartTask,
    }}>
        {children}
    </TasksContext.Provider>
}

export default TasksProvider;