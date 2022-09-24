import {useEffect, useState} from "react";
import useWebsocket from "./useWebsocket";
import {CONFIG} from "../config";

const useTasks = () => {
    const [tasks, setTasks] = useState([]);

    const {message} = useWebsocket({url: CONFIG.WSS_URL, onOpen: () => console.log('Websocket opened')});

    useEffect(() => {
        if (message?.event === 'update') {
            setTasks((tasks) => {
                const index = tasks.findIndex((task) => task.id === message.task.id);
                return index === -1
                    ? [...tasks, message.task]
                    : [...tasks.slice(0, index), message.task, ...tasks.slice(index + 1)]
            })
        }
    }, [message]);

    useEffect(() => {
        fetch(`${CONFIG.API_URL}/api/tasks/`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            }
        })
            .then((response) => response.json())
            .then(({data}) => setTasks(data))
            .catch((error) => console.log(error.message));
    }, [])

    return {
        tasks,
        setTasks
    }
}

export default useTasks;