console.log(process.env)

export const CONFIG = {
    NODE_ENV: process.env.NODE_ENV,
    API_URL: process.env.REACT_APP_API_URL,
    WSS_URL: process.env.REACT_APP_WSS_URL
}