import {useEffect, useState} from "react";

const useWebsocket = ({url, onOpen}) => {
    const [message, setMessage] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        const ws = new WebSocket(url);

        ws.onmessage = (event) => {
            try {
                setMessage(JSON.parse(event.data));
            } catch (error) {
                console.log(error.message);
                setError(error.message)
            }

        }

        ws.onopen = onOpen;
    }, [])

    return {
        message,
        error
    }
}

export default useWebsocket;