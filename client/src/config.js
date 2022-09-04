console.log(process.env.NODE_ENV)

export const CONFIG = {
    NODE_ENV: process.env.NODE_ENV,
    API_URL: process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : ''
}