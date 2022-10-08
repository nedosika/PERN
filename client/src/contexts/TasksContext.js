import {createContext, useContext, useEffect, useState} from "react";
import {encode as base64_encode} from 'base-64';
import {CONFIG} from "../config";
import useWebsocket from "../hooks/useWebsocket";

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
        [TASK_FIELDS.isStrongSearch]: false,
        [TASK_FIELDS.isLoading]: false
    }
}

const TasksContext = createContext({});

export const useTasksContext = () => useContext(TasksContext);

const TasksProvider = ({children}) => {
    const [task, setTask] = useState(initialState.task);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [completed, setCompleted] = useState(0);
    const {message} = useWebsocket({url: CONFIG.WSS_URL, onOpen: () => console.log('Websocket opened')});

    const getTasks = () => {
        setLoading(true);
        return fetch(`${CONFIG.API_URL}/api/tasks/`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            }
        })
            .then((response) => response.json())
            .then(({data}) => setTasks(data))
            .catch((error) => console.log(error.message))
            .finally(() => setLoading(false));
    }

    const createTask = () =>
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
            .then(getTasks)
            .catch((error) => {
                console.log(error)
            })

    const removeTask = (id) => {
        setLoading(true);

        return fetch(`${CONFIG.API_URL}/api/tasks/${id}`, {
            method: 'DELETE'
        })
            .then(getTasks)
            .then(() => console.log('Task deleted'))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false))
    }

    const restartTask = (id) => {

    }

    useEffect(() => {
        if (message?.event === 'update') {
            setTasks((tasks) => {
                const index = tasks.findIndex((task) => task.id === message.task.id);
                return index === -1
                    ? [...tasks, message.task]
                    : [...tasks.slice(0, index), {...tasks[index], ...message.task}, ...tasks.slice(index + 1)]
            });
        }
        if(message?.task.status === 'complete'){
            console.log('Task complete');
            console.log(message.task);
            setCompleted((completed) => completed + 1);
        }
    }, [message]);

    useEffect(() => {
        getTasks();
    }, []);

    return <TasksContext.Provider value={{
        task,
        tasks,
        setTask: (field) =>
            setTask((prevState) => Object.assign({}, prevState, field)),
        isLoading,
        completed,
        createTask,
        removeTask,
        restartTask,
    }}>
        {children}
    </TasksContext.Provider>
}

export default TasksProvider;