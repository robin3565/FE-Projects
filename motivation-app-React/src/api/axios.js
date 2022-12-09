import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api.unsplash.com/photos/random',
    params: {
        client_id: process.env.REACT_APP_MOTIVATION_API_KEY,
        count: 30,
    }
});

export default instance;