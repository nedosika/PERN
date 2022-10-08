console.log(process.env)

export const CONFIG = {
    NODE_ENV: process.env.NODE_ENV,
    API_URL: process.env.NODE_ENV === 'development'
        ? 'http://localhost:5000'
        : 'https://test-react-project.herokuapp.com/',
    WSS_URL: process.env.NODE_ENV === 'development'
        ? 'ws://localhost:5000'
        : 'ws://test-react-project.herokuapp.com/',
    //API_URL: process.env.REACT_APP_API_URL,
   //WSS_URL: process.env.REACT_APP_WSS_URL
}