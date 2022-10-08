import {useEffect, useState} from "react";
import useWebsocket from "./useWebsocket";
import {CONFIG} from "../config";

const useTasks = (id) => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [completed, setCompleted] = useState(0);
    const {message} = useWebsocket({url: CONFIG.WSS_URL, onOpen: () => console.log('Websocket opened')});

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
        setLoading(true);
        fetch(`${CONFIG.API_URL}/api/tasks/`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            }
        })
            .then((response) => response.json())
            .then(({data}) => setTasks(data))
            .catch((error) => console.log(error.message))
            .finally(() => setLoading(false));
    }, []);

    const task = id && tasks.find((task) => task.id === id)

    return {
        task,
        tasks,
        isLoading,
        completed,
        setTasks
    }
}

export default useTasks;