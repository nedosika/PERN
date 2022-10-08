console.log(process.env)

export const CONFIG = {
    NODE_ENV: process.env.NODE_ENV,
    // API_URL: process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '',
    // WSS_URL: process.env.NODE_ENV === 'development' ? 'ws://localhost:5000' : '',
    API_URL: process.env.API_URL,
    WSS_URL: process.env.WSS_URL
}